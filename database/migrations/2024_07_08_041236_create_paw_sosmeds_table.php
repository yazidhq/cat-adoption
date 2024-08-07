<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('paw_sosmeds', function (Blueprint $table) {
            $table->id();
            $table->string("fb");
            $table->string("ig");
            $table->string("yt");
            $table->string("wa");
            $table->string("line");
            $table->string("email");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paw_sosmeds');
    }
};
