<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEcosystemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'link' => 'nullable|string|max:2048',
            'image' => 'nullable|string|max:2048',
            'sort_order' => 'nullable|integer|min:0',
        ];
    }
}
