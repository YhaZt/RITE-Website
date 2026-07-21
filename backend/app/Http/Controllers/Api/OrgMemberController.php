<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrgMemberRequest;
use App\Http\Requests\UpdateOrgMemberRequest;
use App\Models\OrgMember;

class OrgMemberController extends Controller
{
    public function index()
    {
        return response()->json(OrgMember::orderBy('sort_order', 'asc')->get());
    }

    public function store(StoreOrgMemberRequest $request)
    {
        $member = OrgMember::create($request->validated());

        return response()->json(['message' => 'Org member created', 'data' => $member], 201);
    }

    public function show(string $org_member)
    {
        return response()->json(OrgMember::findOrFail($org_member));
    }

    public function update(UpdateOrgMemberRequest $request, string $org_member)
    {
        $member = OrgMember::findOrFail($org_member);
        $member->update($request->validated());

        return response()->json(['message' => 'Org member updated', 'data' => $member]);
    }

    public function destroy(string $org_member)
    {
        $member = OrgMember::findOrFail($org_member);
        $member->delete();

        return response()->json(['message' => 'Org member deleted']);
    }
}
