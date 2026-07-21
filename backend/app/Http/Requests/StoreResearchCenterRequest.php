<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreResearchCenterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('research_centers', 'slug')],
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'contact_email' => 'nullable|email|max:255',
            'image' => 'nullable|string|max:2048',
        ];
    }
}
