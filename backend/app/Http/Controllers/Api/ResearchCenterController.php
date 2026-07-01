<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ResearchCenter;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ResearchCenterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(ResearchCenter::latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:research_centers,slug',
            'description' => 'nullable|string',
            'category' => 'nullable|string',
            'contact_email' => 'nullable|email',
            'image' => 'nullable|string',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $center = ResearchCenter::create($validated);

        return response()->json(['message' => 'Research center created successfully', 'data' => $center], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $center = is_numeric($id) ? ResearchCenter::findOrFail($id) : ResearchCenter::where('slug', $id)->firstOrFail();
        return response()->json($center);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $center = is_numeric($id) ? ResearchCenter::findOrFail($id) : ResearchCenter::where('slug', $id)->firstOrFail();

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'slug' => 'nullable|string|unique:research_centers,slug,' . $center->id,
            'description' => 'nullable|string',
            'category' => 'nullable|string',
            'contact_email' => 'nullable|email',
            'image' => 'nullable|string',
        ]);

        if (isset($validated['name']) && empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $center->update($validated);

        return response()->json(['message' => 'Research center updated successfully', 'data' => $center]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $center = is_numeric($id) ? ResearchCenter::findOrFail($id) : ResearchCenter::where('slug', $id)->firstOrFail();
        $center->delete();

        return response()->json(['message' => 'Research center deleted successfully']);
    }
}
