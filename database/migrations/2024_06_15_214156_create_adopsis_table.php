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
        Schema::create('adopsis', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id");
            $table->unsignedBigInteger("hewan_id");
            $table->unsignedBigInteger("shelter_id");
            $table->string("dokumen_foto");
            $table->string("apakah_ada_peliharaan_lain");
            $table->string("berapa_orang_yang_tinggal_bersama");
            $table->timestamps();

            $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");
            $table->foreign("hewan_id")->references("id")->on("hewans")->onDelete("cascade");
            $table->foreign("shelter_id")->references("id")->on("shelters")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adopsis');
    }
};
