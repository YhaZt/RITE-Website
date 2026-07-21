<?php

namespace App\Http\Requests;

use App\Models\ResearchCenter;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateResearchCenterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $param = $this->route('center');
        $id = is_numeric($param)
            ? (int) $param
            : ResearchCenter::where('slug', $param)->value('id');

        return [
            'name' => 'sometimes|required|string|max:255',
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('research_centers', 'slug')->ignore($id),
            ],
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:255',
            'contact_email' => 'nullable|email|max:255',
            'image' => 'nullable|string|max:2048',
        ];
    }
}
