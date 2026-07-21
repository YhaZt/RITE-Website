<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreResearchCenterRequest;
use App\Http\Requests\UpdateResearchCenterRequest;
use App\Models\ResearchCenter;
use Illuminate\Support\Str;

class ResearchCenterController extends Controller
{
    public function index()
    {
        return response()->json(ResearchCenter::latest()->get());
    }

    public function store(StoreResearchCenterRequest $request)
    {
        $validated = $request->validated();

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $center = ResearchCenter::create($validated);

        return response()->json(['message' => 'Research center created successfully', 'data' => $center], 201);
    }

    public function show(string $center)
    {
        $model = is_numeric($center)
            ? ResearchCenter::findOrFail($center)
            : ResearchCenter::where('slug', $center)->firstOrFail();

        return response()->json($model);
    }

    public function update(UpdateResearchCenterRequest $request, string $center)
    {
        $model = is_numeric($center)
            ? ResearchCenter::findOrFail($center)
            : ResearchCenter::where('slug', $center)->firstOrFail();

        $validated = $request->validated();

        if (isset($validated['name']) && empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $model->update($validated);

        return response()->json(['message' => 'Research center updated successfully', 'data' => $model]);
    }

    public function destroy(string $center)
    {
        $model = is_numeric($center)
            ? ResearchCenter::findOrFail($center)
            : ResearchCenter::where('slug', $center)->firstOrFail();

        $model->delete();

        return response()->json(['message' => 'Research center deleted successfully']);
    }
}
