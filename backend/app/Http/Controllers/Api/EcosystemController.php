<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EcosystemItem;
use Illuminate\Http\Request;

class EcosystemController extends Controller
{
    public function index()
    {
        return response()->json(EcosystemItem::orderBy('sort_order', 'asc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'link' => 'nullable|string',
            'image' => 'nullable|string',
            'sort_order' => 'nullable|integer',
        ]);

        $item = EcosystemItem::create($validated);
        return response()->json(['message' => 'Ecosystem item created', 'data' => $item], 201);
    }

    public function show(string $id)
    {
        return response()->json(EcosystemItem::findOrFail($id));
    }

    public function update(Request $request, string $id)
    {
        $item = EcosystemItem::findOrFail($id);
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'category' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'link' => 'nullable|string',
            'image' => 'nullable|string',
            'sort_order' => 'nullable|integer',
        ]);
        $item->update($validated);
        return response()->json(['message' => 'Ecosystem item updated', 'data' => $item]);
    }

    public function destroy(string $id)
    {
        $item = EcosystemItem::findOrFail($id);
        $item->delete();
        return response()->json(['message' => 'Ecosystem item deleted']);
    }
}
