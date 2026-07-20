<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\JsonResponse;

class PublicHomepageLayoutController extends Controller
{
    public const SETTING_KEY = 'public_homepage_layout_v1';

    /**
     * Default public-safe layout matching the admin overview structure
     * (honest labels; no fabricated external funding).
     */
    public static function defaultLayout(): array
    {
        return [
            'kpi' => [
                ['id' => 'kpi-research-unit', 'widgetKey' => 'research_unit', 'isPublic' => true],
                ['id' => 'kpi-publication', 'widgetKey' => 'publication_printing', 'isPublic' => true],
                ['id' => 'kpi-tech-transfer', 'widgetKey' => 'tech_transfer', 'isPublic' => true],
                ['id' => 'kpi-centers', 'widgetKey' => 'research_centers', 'isPublic' => true],
                ['id' => 'kpi-extension', 'widgetKey' => 'extension_projects', 'isPublic' => true],
                ['id' => 'kpi-commercialization', 'widgetKey' => 'commercialization', 'isPublic' => true],
                ['id' => 'kpi-partnerships', 'widgetKey' => 'partnerships', 'isPublic' => true],
                ['id' => 'kpi-inquiries', 'widgetKey' => 'total_inquiries', 'isPublic' => true],
            ],
            'charts' => [
                ['id' => 'chart-status', 'widgetKey' => 'submission_status', 'isPublic' => true],
                ['id' => 'chart-trend', 'widgetKey' => 'activity_trend_quarters', 'isPublic' => true],
            ],
            'panel' => [
                ['id' => 'panel-centers', 'widgetKey' => 'centers_inquiry_breakdown', 'isPublic' => true],
            ],
        ];
    }

    public function index(): JsonResponse
    {
        $setting = SiteSetting::query()->where('key', self::SETTING_KEY)->first();
        $layout = self::defaultLayout();

        if ($setting && $setting->value) {
            $decoded = json_decode($setting->value, true);
            if (is_array($decoded)) {
                $layout = $decoded;
            }
        }

        $filterPublic = function (array $widgets): array {
            return array_values(array_filter($widgets, function ($w) {
                return is_array($w) && ! empty($w['isPublic']);
            }));
        };

        return response()->json([
            'kpi' => $filterPublic($layout['kpi'] ?? []),
            'charts' => $filterPublic($layout['charts'] ?? []),
            'panel' => $filterPublic($layout['panel'] ?? []),
        ]);
    }
}
