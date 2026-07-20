<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;

class SiteSettingController extends Controller
{
    /**
     * Display key-value pair map of all settings.
     */
    public function index()
    {
        $settings = SiteSetting::all()->pluck('value', 'key');
        return response()->json($settings);
    }

    /**
     * Store or update a site setting by key.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'key' => 'required|string|max:255',
            'value' => 'nullable',
        ]);

        $value = is_array($validated['value']) ? json_encode($validated['value']) : $validated['value'];

        $setting = SiteSetting::updateOrCreate(
            ['key' => $validated['key']],
            ['value' => $value]
        );

        return response()->json(['message' => 'Setting saved successfully', 'data' => $setting]);
    }

    /**
     * Show single setting by key.
     */
    public function show(string $setting)
    {
        $row = SiteSetting::where('key', $setting)->first();
        return response()->json($row ? ['key' => $row->key, 'value' => $row->value] : null);
    }

    /**
     * Remove setting by key.
     */
    public function destroy(string $setting)
    {
        $row = SiteSetting::where('key', $setting)->first();
        if ($row) {
            $row->delete();
        }
        return response()->json(['message' => 'Setting removed successfully']);
    }
}
