<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMediaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** Max upload size in KB (10 MB). */
    public const MAX_KB = 10240;

    public function rules(): array
    {
        return [
            'file' => 'required|file|mimes:jpeg,jpg,png,webp,gif|max:'.self::MAX_KB,
        ];
    }
}
