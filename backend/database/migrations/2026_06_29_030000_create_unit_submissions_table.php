<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('unit_submissions', function (Blueprint $table) {
            $table->id();
            $table->string('target_unit'); // e.g. tech-transfer, publication-printing, research-unit, csabi, mdsc, etc.
            $table->string('sender_name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('subject')->nullable();
            $table->text('message');
            $table->string('file_path')->nullable();
            $table->string('file_name')->nullable();
            $table->string('status')->default('pending'); // pending, reviewed, completed
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('unit_submissions');
    }
};
