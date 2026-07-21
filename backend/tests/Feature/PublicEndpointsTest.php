<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicEndpointsTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_metrics_endpoint(): void
    {
        $this->getJson('/api/public/metrics')
            ->assertOk()
            ->assertJsonStructure([
                'generated_at',
            ]);
    }

    public function test_public_homepage_layout_endpoint(): void
    {
        $this->getJson('/api/public/homepage-layout')
            ->assertOk()
            ->assertJsonStructure([
                'kpi',
                'charts',
                'panel',
            ]);
    }
}
