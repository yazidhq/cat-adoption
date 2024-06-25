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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string("tema");
            $table->string("kategori");
            $table->string("keterangan");
            $table->string("hari_tanggal");
            $table->string("waktu_mulai");
            $table->string("waktu_selesai");
            $table->string("lokasi");
            $table->longText("deskripsi");
            $table->longText("syarat_partisipasi");
            $table->longText("benefit");
            $table->string("poster");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
