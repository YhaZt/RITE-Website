<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMediaRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Throwable;

class MediaController extends Controller
{
    public function store(StoreMediaRequest $request)
    {
        $file = $request->file('file');
        $originalName = $file->getClientOriginalName();
        $filename = Str::uuid()->toString().'.webp';
        $relativePath = 'cms/'.$filename;

        try {
            $binary = $this->convertToWebp($file->getRealPath(), $file->getMimeType());
        } catch (Throwable $e) {
            report($e);

            $payload = ['message' => 'Could not convert image to WebP.'];
            if (config('app.debug')) {
                $payload['error'] = $e->getMessage();
            }

            return response()->json($payload, 422);
        }

        Storage::disk('public')->put($relativePath, $binary);

        return response()->json([
            'url' => '/storage/'.$relativePath,
            'filename' => pathinfo($originalName, PATHINFO_FILENAME).'.webp',
        ], 201);
    }

    /**
     * Convert an uploaded image to WebP (max longest side 1600px, quality 82).
     */
    private function convertToWebp(string $sourcePath, ?string $mimeType): string
    {
        if (! function_exists('imagecreatefromstring') || ! function_exists('imagewebp')) {
            throw new \RuntimeException('GD extension with WebP support is required for image uploads.');
        }

        $raw = @file_get_contents($sourcePath);
        if ($raw === false) {
            throw new \RuntimeException('Unable to read uploaded file.');
        }

        $image = false;
        $mime = strtolower((string) $mimeType);
        if (($mime === 'image/jpeg' || $mime === 'image/jpg') && function_exists('imagecreatefromjpeg')) {
            $image = @imagecreatefromjpeg($sourcePath);
        } elseif ($mime === 'image/png' && function_exists('imagecreatefrompng')) {
            $image = @imagecreatefrompng($sourcePath);
        } elseif ($mime === 'image/webp' && function_exists('imagecreatefromwebp')) {
            $image = @imagecreatefromwebp($sourcePath);
        } elseif ($mime === 'image/gif' && function_exists('imagecreatefromgif')) {
            $image = @imagecreatefromgif($sourcePath);
        }

        if ($image === false) {
            $image = @imagecreatefromstring($raw);
        }

        if ($image === false) {
            throw new \RuntimeException('Unsupported or corrupt image file.');
        }

        $width = imagesx($image);
        $height = imagesy($image);
        $maxSide = 1600;

        if ($width > $maxSide || $height > $maxSide) {
            if ($width >= $height) {
                $newWidth = $maxSide;
                $newHeight = max(1, (int) round($height * ($maxSide / $width)));
            } else {
                $newHeight = $maxSide;
                $newWidth = max(1, (int) round($width * ($maxSide / $height)));
            }

            $resized = imagecreatetruecolor($newWidth, $newHeight);
            imagealphablending($resized, false);
            imagesavealpha($resized, true);
            $transparent = imagecolorallocatealpha($resized, 0, 0, 0, 127);
            imagefilledrectangle($resized, 0, 0, $newWidth, $newHeight, $transparent);
            imagealphablending($resized, true);

            imagecopyresampled($resized, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
            imagedestroy($image);
            $image = $resized;
        } else {
            imagealphablending($image, true);
            imagesavealpha($image, true);
        }

        $w = imagesx($image);
        $h = imagesy($image);
        $canvas = imagecreatetruecolor($w, $h);
        $white = imagecolorallocate($canvas, 255, 255, 255);
        imagefilledrectangle($canvas, 0, 0, $w, $h, $white);
        imagecopy($canvas, $image, 0, 0, 0, 0, $w, $h);
        imagedestroy($image);

        ob_start();
        $ok = imagewebp($canvas, null, 82);
        $webp = ob_get_clean();
        imagedestroy($canvas);

        if (! $ok || $webp === false || $webp === '') {
            throw new \RuntimeException('Failed to encode WebP image.');
        }

        return $webp;
    }
}
