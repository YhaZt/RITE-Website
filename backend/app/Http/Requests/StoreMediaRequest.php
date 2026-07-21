<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMediaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** Max upload size in KB (50 MB). Images are resized to WebP on save. */
    public const MAX_KB = 51200;

    public function rules(): array
    {
        return [
            'file' => 'required|file|mimes:jpeg,jpg,png,webp,gif|max:'.self::MAX_KB,
        ];
    }
}
