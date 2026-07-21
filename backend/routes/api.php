<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CarouselController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\EcosystemController;
use App\Http\Controllers\Api\MediaController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\OrgMemberController;
use App\Http\Controllers\Api\PublicHomepageLayoutController;
use App\Http\Controllers\Api\PublicMetricsController;
use App\Http\Controllers\Api\ResearchCenterController;
use App\Http\Controllers\Api\SiteSettingController;
use App\Http\Controllers\Api\UnitSubmissionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public auth
|--------------------------------------------------------------------------
*/
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

/*
|--------------------------------------------------------------------------
| Public read endpoints (site content)
|--------------------------------------------------------------------------
*/
Route::get('news', [NewsController::class, 'index']);
Route::get('news/{news}', [NewsController::class, 'show']);
Route::get('carousel', [CarouselController::class, 'index']);
Route::get('carousel/{carousel}', [CarouselController::class, 'show']);
Route::get('centers', [ResearchCenterController::class, 'index']);
Route::get('centers/{center}', [ResearchCenterController::class, 'show']);
Route::get('org-members', [OrgMemberController::class, 'index']);
Route::get('org-members/{org_member}', [OrgMemberController::class, 'show']);
Route::get('ecosystem', [EcosystemController::class, 'index']);
Route::get('ecosystem/{ecosystem}', [EcosystemController::class, 'show']);

/*
|--------------------------------------------------------------------------
| Public write endpoints (forms)
|--------------------------------------------------------------------------
*/
Route::post('contact', [ContactController::class, 'store']);
Route::post('submissions', [UnitSubmissionController::class, 'store']);

Route::get('/public/metrics', [PublicMetricsController::class, 'index']);
Route::get('/public/homepage-layout', [PublicHomepageLayoutController::class, 'index']);

/*
|--------------------------------------------------------------------------
| Authenticated admin endpoints
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/user/password', [AuthController::class, 'changePassword']);

    Route::post('news', [NewsController::class, 'store']);
    Route::put('news/{news}', [NewsController::class, 'update']);
    Route::patch('news/{news}', [NewsController::class, 'update']);
    Route::delete('news/{news}', [NewsController::class, 'destroy']);

    Route::post('carousel', [CarouselController::class, 'store']);
    Route::put('carousel/{carousel}', [CarouselController::class, 'update']);
    Route::patch('carousel/{carousel}', [CarouselController::class, 'update']);
    Route::delete('carousel/{carousel}', [CarouselController::class, 'destroy']);

    Route::post('centers', [ResearchCenterController::class, 'store']);
    Route::put('centers/{center}', [ResearchCenterController::class, 'update']);
    Route::patch('centers/{center}', [ResearchCenterController::class, 'update']);
    Route::delete('centers/{center}', [ResearchCenterController::class, 'destroy']);

    Route::get('contact', [ContactController::class, 'index']);
    Route::get('contact/{contact}', [ContactController::class, 'show']);
    Route::put('contact/{contact}', [ContactController::class, 'update']);
    Route::patch('contact/{contact}', [ContactController::class, 'update']);
    Route::delete('contact/{contact}', [ContactController::class, 'destroy']);

    Route::apiResource('settings', SiteSettingController::class)->except(['update']);

    Route::post('org-members', [OrgMemberController::class, 'store']);
    Route::put('org-members/{org_member}', [OrgMemberController::class, 'update']);
    Route::patch('org-members/{org_member}', [OrgMemberController::class, 'update']);
    Route::delete('org-members/{org_member}', [OrgMemberController::class, 'destroy']);

    Route::post('ecosystem', [EcosystemController::class, 'store']);
    Route::put('ecosystem/{ecosystem}', [EcosystemController::class, 'update']);
    Route::patch('ecosystem/{ecosystem}', [EcosystemController::class, 'update']);
    Route::delete('ecosystem/{ecosystem}', [EcosystemController::class, 'destroy']);

    Route::get('submissions', [UnitSubmissionController::class, 'index']);
    Route::delete('submissions/{id}', [UnitSubmissionController::class, 'destroy']);
    Route::patch('submissions/{id}/status', [UnitSubmissionController::class, 'updateStatus']);
    Route::get('submissions/attachment/preview', [UnitSubmissionController::class, 'previewFile']);

    Route::post('media', [MediaController::class, 'store']);
});
