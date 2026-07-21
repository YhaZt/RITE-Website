<?php

namespace Tests\Feature;

use App\Models\NewsItem;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiSecurityTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_user_endpoint_returns_401(): void
    {
        // Seed a user that must NOT be returned via the old User::first() fallback
        User::factory()->create([
            'email' => 'admin@example.com',
        ]);

        $this->getJson('/api/user')
            ->assertUnauthorized();
    }

    public function test_unauthenticated_cannot_create_news(): void
    {
        $this->postJson('/api/news', [
            'title' => 'Secret news',
        ])->assertUnauthorized();
    }

    public function test_unauthenticated_cannot_upload_media(): void
    {
        $this->postJson('/api/media', [])
            ->assertUnauthorized();
    }

    public function test_unauthenticated_cannot_list_contact_submissions(): void
    {
        $this->getJson('/api/contact')
            ->assertUnauthorized();
    }

    public function test_unauthenticated_cannot_list_submissions(): void
    {
        $this->getJson('/api/submissions')
            ->assertUnauthorized();
    }

    public function test_public_can_read_news(): void
    {
        NewsItem::create([
            'title' => 'Public news',
            'description' => 'Visible to everyone',
        ]);

        $this->getJson('/api/news')
            ->assertOk()
            ->assertJsonFragment(['title' => 'Public news']);
    }

    public function test_public_can_submit_contact(): void
    {
        $this->postJson('/api/contact', [
            'name' => 'Visitor',
            'email' => 'visitor@example.com',
            'subject' => 'Hello',
            'message' => 'This is a public contact form message.',
        ])->assertCreated()
            ->assertJsonFragment(['message' => 'Your message has been submitted successfully!']);
    }

    public function test_public_can_submit_unit_submission(): void
    {
        $this->postJson('/api/submissions', [
            'target_unit' => 'Research Center',
            'sender_name' => 'Visitor',
            'email' => 'visitor@example.com',
            'message' => 'Public unit submission.',
        ])->assertCreated();
    }

    public function test_authenticated_user_can_create_news(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->postJson('/api/news', [
                'title' => 'Admin news',
                'description' => 'Created by authenticated admin',
            ])
            ->assertCreated()
            ->assertJsonPath('data.title', 'Admin news');

        $this->assertDatabaseHas('news_items', ['title' => 'Admin news']);
    }

    public function test_authenticated_user_endpoint_returns_user(): void
    {
        $user = User::factory()->create([
            'email' => 'admin@example.com',
        ]);

        $this->actingAs($user)
            ->getJson('/api/user')
            ->assertOk()
            ->assertJsonPath('email', 'admin@example.com');
    }

    public function test_register_route_is_disabled(): void
    {
        $this->postJson('/api/register', [
            'name' => 'Hacker',
            'email' => 'hacker@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ])->assertNotFound();
    }
}
