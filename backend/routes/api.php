<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\CarouselController;
use App\Http\Controllers\Api\ResearchCenterController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\SiteSettingController;
use App\Http\Controllers\Api\OrgMemberController;
use App\Http\Controllers\Api\EcosystemController;
use App\Http\Controllers\Api\UnitSubmissionController;
use App\Http\Controllers\Api\PublicMetricsController;
use App\Http\Controllers\Api\MediaController;

// Auth Routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/user', [AuthController::class, 'user']);

// Public & Admin API Resource Routes
Route::apiResource('news', NewsController::class);
Route::apiResource('carousel', CarouselController::class);
Route::apiResource('centers', ResearchCenterController::class);
Route::apiResource('contact', ContactController::class);
Route::apiResource('settings', SiteSettingController::class);
Route::apiResource('org-members', OrgMemberController::class);
Route::apiResource('ecosystem', EcosystemController::class);
Route::apiResource('submissions', UnitSubmissionController::class);
Route::patch('submissions/{id}/status', [UnitSubmissionController::class, 'updateStatus']);
Route::get('submissions/attachment/preview', [UnitSubmissionController::class, 'previewFile']);
Route::post('media', [MediaController::class, 'store']);

// Public-safe dashboard metrics (cached, no auth required)
Route::get('/public/metrics', [PublicMetricsController::class, 'index']);
