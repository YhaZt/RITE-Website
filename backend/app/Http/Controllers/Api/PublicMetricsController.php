<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CarouselSlide;
use App\Models\EcosystemItem;
use App\Models\NewsItem;
use App\Models\ResearchCenter;
use App\Models\UnitSubmission;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class PublicMetricsController extends Controller
{
    public function index(): JsonResponse
    {
        // Cached to reduce DB load; still "real-time enough" for public dashboards.
        $payload = Cache::remember('public_metrics:v2', now()->addSeconds(30), function () {
            $centersCount = ResearchCenter::query()->count();
            $ecosystemCount = EcosystemItem::query()->count();
            $newsCount = NewsItem::query()->count();
            $carouselCount = CarouselSlide::query()->count();
            $totalInquiries = UnitSubmission::query()->count();

            $days = 14;
            $start = Carbon::now()->startOfDay()->subDays($days - 1);

            $rows = UnitSubmission::query()
                ->selectRaw('DATE(created_at) as day, COUNT(*) as count')
                ->where('created_at', '>=', $start)
                ->groupBy(DB::raw('DATE(created_at)'))
                ->orderBy(DB::raw('DATE(created_at)'))
                ->get();

            $map = $rows->mapWithKeys(fn ($r) => [$r->day => (int) $r->count]);

            $series = [];
            for ($i = 0; $i < $days; $i++) {
                $d = $start->copy()->addDays($i);
                $key = $d->toDateString();
                $series[] = [
                    'date' => $key,
                    'count' => (int) ($map[$key] ?? 0),
                ];
            }

            $unitMap = [];
            UnitSubmission::query()
                ->select('target_unit')
                ->get()
                ->each(function ($row) use (&$unitMap) {
                    $unit = $row->target_unit ?? 'other';
                    if (str_starts_with($unit, 'center:')) {
                        $label = 'Research Centers';
                    } elseif ($unit === 'research-unit') {
                        $label = 'Research Unit';
                    } elseif ($unit === 'publication-printing') {
                        $label = 'Publication & Printing';
                    } elseif ($unit === 'tech-transfer') {
                        $label = 'Tech Transfer';
                    } else {
                        $label = 'Other Units';
                    }
                    $unitMap[$label] = ($unitMap[$label] ?? 0) + 1;
                });

            $unitRows = collect($unitMap)
                ->map(fn ($count, $label) => ['label' => $label, 'count' => $count])
                ->sortByDesc('count')
                ->values()
                ->all();

            $statusMap = UnitSubmission::query()
                ->selectRaw('status, COUNT(*) as count')
                ->groupBy('status')
                ->pluck('count', 'status');

            $statusBreakdown = collect(['pending', 'reviewed', 'completed'])
                ->map(fn ($status) => [
                    'label' => ucfirst($status),
                    'count' => (int) ($statusMap[$status] ?? 0),
                ])
                ->all();

            $ecosystemCategories = EcosystemItem::query()
                ->get(['category'])
                ->groupBy(fn ($item) => ucfirst($item->category ?: 'Partner'))
                ->map(fn ($items, $label) => ['label' => $label, 'count' => $items->count()])
                ->sortByDesc('count')
                ->take(5)
                ->values()
                ->all();

            return [
                'counters' => [
                    'research_centers' => $centersCount,
                    'ecosystem_partners' => $ecosystemCount,
                    'news_items' => $newsCount,
                    'carousel_slides' => $carouselCount,
                    'total_inquiries' => $totalInquiries,
                ],
                'series' => [
                    'submissions_last_14_days' => $series,
                ],
                'breakdowns' => [
                    'inquiries_by_unit' => $unitRows,
                    'inquiry_status' => $statusBreakdown,
                    'ecosystem_categories' => $ecosystemCategories,
                ],
                'generated_at' => now()->toIso8601String(),
            ];
        });

        return response()->json($payload);
    }
}

