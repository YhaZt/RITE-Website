<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsItem;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(NewsItem::latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'tags' => 'nullable|string|max:500',
            'description' => 'nullable|string',
            'date' => 'nullable|string',
            'image' => 'nullable|string',
            'link' => 'nullable|string',
        ]);

        $item = NewsItem::create($validated);

        return response()->json(['message' => 'News item created successfully', 'data' => $item], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $item = NewsItem::findOrFail($id);
        return response()->json($item);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $item = NewsItem::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'category' => 'nullable|string|max:255',
            'tags' => 'nullable|string|max:500',
            'description' => 'nullable|string',
            'date' => 'nullable|string',
            'image' => 'nullable|string',
            'link' => 'nullable|string',
        ]);

        $item->update($validated);

        return response()->json(['message' => 'News item updated successfully', 'data' => $item]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $item = NewsItem::findOrFail($id);
        $item->delete();

        return response()->json(['message' => 'News item deleted successfully']);
    }
}
