<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrgMember;
use Illuminate\Http\Request;

class OrgMemberController extends Controller
{
    public function index()
    {
        return response()->json(OrgMember::orderBy('sort_order', 'asc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'division' => 'nullable|string|max:255',
            'role_type' => 'nullable|string',
            'sort_order' => 'nullable|integer',
        ]);

        $member = OrgMember::create($validated);
        return response()->json(['message' => 'Org member created', 'data' => $member], 201);
    }

    public function show(string $id)
    {
        return response()->json(OrgMember::findOrFail($id));
    }

    public function update(Request $request, string $id)
    {
        $member = OrgMember::findOrFail($id);
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'title' => 'sometimes|required|string|max:255',
            'division' => 'nullable|string|max:255',
            'role_type' => 'nullable|string',
            'sort_order' => 'nullable|integer',
        ]);
        $member->update($validated);
        return response()->json(['message' => 'Org member updated', 'data' => $member]);
    }

    public function destroy(string $id)
    {
        $member = OrgMember::findOrFail($id);
        $member->delete();
        return response()->json(['message' => 'Org member deleted']);
    }
}
