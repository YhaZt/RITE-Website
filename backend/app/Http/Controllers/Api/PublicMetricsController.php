<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CarouselSlide;
use App\Models\ContactSubmission;
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
    private const CENTER_SLUGS = [
        'mindoro-development' => 'Mindoro Development',
        'digital-innovation' => 'Digital Innovation & Cybersecurity',
        'environmental-studies' => 'Environmental Studies',
        'fisheries-research' => 'Fisheries R&D',
        'mimaropa-food' => 'MIMAROPA Food Innovation',
        'island-education' => 'Island Education',
        'peace-criminology' => 'Peace, Criminology & Law',
        'smart-agriculture' => 'Smart Agriculture & Biosystems',
        'textile-fiber' => 'Natural Textile Fiber',
    ];

    public function index(): JsonResponse
    {
        // Cached to reduce DB load; still "real-time enough" for public dashboards.
        $payload = Cache::remember('public_metrics:v3', now()->addSeconds(30), function () {
            $centersCount = ResearchCenter::query()->count();
            $ecosystemCount = EcosystemItem::query()->count();
            $newsCount = NewsItem::query()->count();
            $carouselCount = CarouselSlide::query()->count();
            $totalInquiries = UnitSubmission::query()->count();
            $contactCount = ContactSubmission::query()->count();

            $researchUnitCount = UnitSubmission::query()->where('target_unit', 'research-unit')->count();
            $publicationCount = UnitSubmission::query()->where('target_unit', 'publication-printing')->count();
            $techTransferCount = UnitSubmission::query()->where('target_unit', 'tech-transfer')->count();

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

            $statusLabels = [
                'pending' => 'Pending',
                'reviewing' => 'Reviewing',
                'reviewed' => 'Reviewed',
                'decline' => 'Decline',
                'approve' => 'Approve',
                'completed' => 'Approve',
                'suggestion' => 'Suggestion',
            ];

            // Merge completed into Approve for display
            $mergedStatus = [];
            foreach ($statusLabels as $status => $label) {
                $count = (int) ($statusMap[$status] ?? 0);
                if ($count <= 0) {
                    continue;
                }
                $mergedStatus[$label] = ($mergedStatus[$label] ?? 0) + $count;
            }

            $statusBreakdown = collect($mergedStatus)
                ->map(fn ($count, $label) => ['label' => $label, 'count' => $count])
                ->values()
                ->all();

            $ecosystemCategories = EcosystemItem::query()
                ->get(['category'])
                ->groupBy(fn ($item) => ucfirst($item->category ?: 'Partner'))
                ->map(fn ($items, $label) => ['label' => $label, 'count' => $items->count()])
                ->sortByDesc('count')
                ->take(5)
                ->values()
                ->all();

            // Last 6 quarters activity trend
            $quarters = [];
            $now = Carbon::now();
            for ($i = 5; $i >= 0; $i--) {
                $d = $now->copy()->subMonths($i * 3)->startOfQuarter();
                $q = $d->quarter;
                $year = $d->year;
                $key = "{$year}-Q{$q}";
                $quarters[$key] = [
                    'key' => $key,
                    'label' => "Q{$q} " . substr((string) $year, 2),
                    'count' => 0,
                    'year' => $year,
                    'quarter' => $q,
                ];
            }

            UnitSubmission::query()
                ->select('created_at')
                ->get()
                ->each(function ($row) use (&$quarters) {
                    if (! $row->created_at) {
                        return;
                    }
                    $created = Carbon::parse($row->created_at);
                    $key = $created->year . '-Q' . $created->quarter;
                    if (isset($quarters[$key])) {
                        $quarters[$key]['count']++;
                    }
                });

            $activityTrend = array_values($quarters);

            // Per-center inquiry breakdown
            $centerBreakdown = [];
            foreach (self::CENTER_SLUGS as $slug => $title) {
                $centerBreakdown[] = [
                    'slug' => $slug,
                    'title' => $title,
                    'count' => UnitSubmission::query()->where('target_unit', "center:{$slug}")->count(),
                ];
            }

            return [
                'counters' => [
                    'research_centers' => $centersCount,
                    'ecosystem_partners' => $ecosystemCount,
                    'news_items' => $newsCount,
                    'carousel_slides' => $carouselCount,
                    'total_inquiries' => $totalInquiries,
                    // Honest public KPI labels (aggregates only)
                    'research_unit' => $researchUnitCount,
                    'publication_printing' => $publicationCount,
                    'tech_transfer' => $techTransferCount,
                    'extension_projects' => $contactCount,
                    'commercialization' => $carouselCount,
                    'partnerships' => $ecosystemCount,
                ],
                'series' => [
                    'submissions_last_14_days' => $series,
                    'activity_trend_quarters' => $activityTrend,
                ],
                'breakdowns' => [
                    'inquiries_by_unit' => $unitRows,
                    'inquiry_status' => $statusBreakdown,
                    'ecosystem_categories' => $ecosystemCategories,
                    'centers_inquiry' => $centerBreakdown,
                ],
                'generated_at' => now()->toIso8601String(),
            ];
        });

        return response()->json($payload);
    }
}
