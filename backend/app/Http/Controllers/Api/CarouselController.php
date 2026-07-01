<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CarouselSlide;
use Illuminate\Http\Request;

class CarouselController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(CarouselSlide::orderBy('sort_order', 'asc')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'sort_order' => 'nullable|integer',
        ]);

        $slide = CarouselSlide::create($validated);

        return response()->json(['message' => 'Carousel slide created successfully', 'data' => $slide], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $slide = CarouselSlide::findOrFail($id);
        return response()->json($slide);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $slide = CarouselSlide::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'sort_order' => 'nullable|integer',
        ]);

        $slide->update($validated);

        return response()->json(['message' => 'Carousel slide updated successfully', 'data' => $slide]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $slide = CarouselSlide::findOrFail($id);
        $slide->delete();

        return response()->json(['message' => 'Carousel slide deleted successfully']);
    }
}
