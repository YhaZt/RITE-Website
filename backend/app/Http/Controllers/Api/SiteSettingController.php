<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSiteSettingRequest;
use App\Models\SiteSetting;

class SiteSettingController extends Controller
{
    public function index()
    {
        $settings = SiteSetting::all()->pluck('value', 'key');

        return response()->json($settings);
    }

    public function store(StoreSiteSettingRequest $request)
    {
        $validated = $request->validated();
        $value = is_array($validated['value'] ?? null)
            ? json_encode($validated['value'])
            : ($validated['value'] ?? null);

        $setting = SiteSetting::updateOrCreate(
            ['key' => $validated['key']],
            ['value' => $value]
        );

        return response()->json(['message' => 'Setting saved successfully', 'data' => $setting]);
    }

    public function show(string $setting)
    {
        $row = SiteSetting::where('key', $setting)->first();

        return response()->json($row ? ['key' => $row->key, 'value' => $row->value] : null);
    }

    public function destroy(string $setting)
    {
        $row = SiteSetting::where('key', $setting)->first();
        if ($row) {
            $row->delete();
        }

        return response()->json(['message' => 'Setting removed successfully']);
    }
}
