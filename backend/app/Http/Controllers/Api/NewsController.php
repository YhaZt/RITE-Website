<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNewsRequest;
use App\Http\Requests\UpdateNewsRequest;
use App\Models\NewsItem;

class NewsController extends Controller
{
    public function index()
    {
        return response()->json(NewsItem::latest()->get());
    }

    public function store(StoreNewsRequest $request)
    {
        $item = NewsItem::create($request->validated());

        return response()->json(['message' => 'News item created successfully', 'data' => $item], 201);
    }

    public function show(string $news)
    {
        $item = NewsItem::findOrFail($news);

        return response()->json($item);
    }

    public function update(UpdateNewsRequest $request, string $news)
    {
        $item = NewsItem::findOrFail($news);
        $item->update($request->validated());

        return response()->json(['message' => 'News item updated successfully', 'data' => $item]);
    }

    public function destroy(string $news)
    {
        $item = NewsItem::findOrFail($news);
        $item->delete();

        return response()->json(['message' => 'News item deleted successfully']);
    }
}
