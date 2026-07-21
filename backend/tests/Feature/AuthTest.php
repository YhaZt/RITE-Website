<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_succeeds_with_valid_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'admin@rite.edu.ph',
            'password' => 'password',
        ]);

        $this->postJson('/api/login', [
            'email' => 'admin@rite.edu.ph',
            'password' => 'password',
        ])
            ->assertOk()
            ->assertJsonPath('user.email', 'admin@rite.edu.ph');
    }

    public function test_login_fails_with_invalid_credentials(): void
    {
        User::factory()->create([
            'email' => 'admin@rite.edu.ph',
            'password' => 'password',
        ]);

        $this->postJson('/api/login', [
            'email' => 'admin@rite.edu.ph',
            'password' => 'wrong-password',
        ])->assertStatus(422);
    }

    public function test_logout_requires_authentication(): void
    {
        $this->postJson('/api/logout')->assertUnauthorized();
    }

    public function test_authenticated_user_can_logout(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->postJson('/api/logout')
            ->assertOk()
            ->assertJsonPath('message', 'Logged out successfully');
    }
}
