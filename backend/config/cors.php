<?php

$frontendUrl = rtrim((string) env('FRONTEND_URL', 'http://localhost:5173'), '/');
$extraOrigins = array_filter(array_map(
    static fn (string $origin): string => rtrim(trim($origin), '/'),
    explode(',', (string) env('CORS_ALLOWED_ORIGINS', ''))
));

$localOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
];

$allowedOrigins = array_values(array_unique(array_filter(array_merge(
    [$frontendUrl],
    $extraOrigins,
    $localOrigins
))));

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Explicit origins are required when supports_credentials is true.
    | Production: set FRONTEND_URL=https://rite.minsuibibes.com
    | Optional: CORS_ALLOWED_ORIGINS=https://rite.minsuibibes.com,https://www.rite.minsuibibes.com
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout', 'user'],

    'allowed_methods' => ['*'],

    'allowed_origins' => $allowedOrigins,

    // Safety net for production SPA hosts on minsuibibes.com
    'allowed_origins_patterns' => [
        '#^https://([a-z0-9-]+\.)?minsuibibes\.com$#',
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
