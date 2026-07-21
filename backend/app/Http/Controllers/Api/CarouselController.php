<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCarouselRequest;
use App\Http\Requests\UpdateCarouselRequest;
use App\Models\CarouselSlide;

class CarouselController extends Controller
{
    public function index()
    {
        return response()->json(CarouselSlide::orderBy('sort_order', 'asc')->get());
    }

    public function store(StoreCarouselRequest $request)
    {
        $slide = CarouselSlide::create($request->validated());

        return response()->json(['message' => 'Carousel slide created successfully', 'data' => $slide], 201);
    }

    public function show(string $carousel)
    {
        $slide = CarouselSlide::findOrFail($carousel);

        return response()->json($slide);
    }

    public function update(UpdateCarouselRequest $request, string $carousel)
    {
        $slide = CarouselSlide::findOrFail($carousel);
        $slide->update($request->validated());

        return response()->json(['message' => 'Carousel slide updated successfully', 'data' => $slide]);
    }

    public function destroy(string $carousel)
    {
        $slide = CarouselSlide::findOrFail($carousel);
        $slide->delete();

        return response()->json(['message' => 'Carousel slide deleted successfully']);
    }
}
