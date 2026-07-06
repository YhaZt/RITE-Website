<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'file' => 'required|file|mimes:jpeg,jpg,png,webp,gif|max:5120',
        ]);

        $file = $validated['file'];
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs('cms', $filename, 'public');

        return response()->json([
            'url' => '/storage/' . $path,
            'filename' => $file->getClientOriginalName(),
        ], 201);
    }
}
