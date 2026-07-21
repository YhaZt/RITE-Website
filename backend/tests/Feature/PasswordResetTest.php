<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Tests\TestCase;

class PasswordResetTest extends TestCase
{
    use RefreshDatabase;

    public function test_forgot_password_sends_reset_link_for_known_user(): void
    {
        User::factory()->create(['email' => 'admin@rite.edu.ph']);

        $this->postJson('/api/forgot-password', [
            'email' => 'admin@rite.edu.ph',
        ])->assertOk();
    }

    public function test_authenticated_user_can_change_password(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('password'),
        ]);

        $this->actingAs($user)
            ->postJson('/api/user/password', [
                'current_password' => 'password',
                'password' => 'new-password-123',
                'password_confirmation' => 'new-password-123',
            ])
            ->assertOk();

        $user->refresh();
        $this->assertTrue(Hash::check('new-password-123', $user->password));
    }

    public function test_reset_password_with_valid_token(): void
    {
        $user = User::factory()->create(['email' => 'admin@rite.edu.ph']);
        $token = Password::broker()->createToken($user);

        $this->postJson('/api/reset-password', [
            'email' => 'admin@rite.edu.ph',
            'token' => $token,
            'password' => 'reset-password-123',
            'password_confirmation' => 'reset-password-123',
        ])->assertOk();

        $user->refresh();
        $this->assertTrue(Hash::check('reset-password-123', $user->password));
    }
}
