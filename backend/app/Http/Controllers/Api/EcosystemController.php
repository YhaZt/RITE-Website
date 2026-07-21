<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEcosystemRequest;
use App\Http\Requests\UpdateEcosystemRequest;
use App\Models\EcosystemItem;

class EcosystemController extends Controller
{
    public function index()
    {
        return response()->json(EcosystemItem::orderBy('sort_order', 'asc')->get());
    }

    public function store(StoreEcosystemRequest $request)
    {
        $item = EcosystemItem::create($request->validated());

        return response()->json(['message' => 'Ecosystem item created', 'data' => $item], 201);
    }

    public function show(string $ecosystem)
    {
        return response()->json(EcosystemItem::findOrFail($ecosystem));
    }

    public function update(UpdateEcosystemRequest $request, string $ecosystem)
    {
        $item = EcosystemItem::findOrFail($ecosystem);
        $item->update($request->validated());

        return response()->json(['message' => 'Ecosystem item updated', 'data' => $item]);
    }

    public function destroy(string $ecosystem)
    {
        $item = EcosystemItem::findOrFail($ecosystem);
        $item->delete();

        return response()->json(['message' => 'Ecosystem item deleted']);
    }
}
