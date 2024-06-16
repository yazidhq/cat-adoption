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
        Schema::create('hewans', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("shelter_id")->nullable();
            $table->unsignedBigInteger("user_id")->nullable();
            $table->string("nama");
            $table->string("jenis_hewan");
            $table->string("kelamin");
            $table->string("usia");
            $table->string("berat_badan");
            $table->boolean("steril")->default(false);
            $table->boolean("vaksin")->default(false);
            $table->string("syarat_ketentuan");
            $table->string("deskripsi");
            $table->boolean("is_adopsi")->default(false);
            $table->string("foto");
            $table->timestamps(); 

            $table->foreign("shelter_id")->references("id")->on("shelters")->onDelete("cascade");
            $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hewans');
    }
};
