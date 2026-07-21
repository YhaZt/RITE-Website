<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateNewsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'sometimes|required|string|max:255',
            'category' => 'nullable|string|max:255',
            'tags' => 'nullable|string|max:500',
            'description' => 'nullable|string',
            'date' => 'nullable|string',
            'image' => 'nullable|string|max:2048',
            'link' => 'nullable|string|max:2048',
        ];
    }
}
