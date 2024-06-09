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
        Schema::create('perlindungans', function (Blueprint $table) {
            $table->id();
            $table->string("nama");
            $table->string("provinsi");
            $table->string("kota");
            $table->string("alamat");
            $table->string("nomor_hp");
            $table->string("kategori");
            $table->string("foto");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perlindungans');
    }
};
