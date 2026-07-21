<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->statefulApi();

        // Authenticated multipart uploads from the SPA often fail CSRF across
        // api.* / rite.* subdomains even when the session cookie is valid.
        // Route remains protected by auth:sanctum.
        $middleware->validateCsrfTokens(except: [
            'api/media',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
