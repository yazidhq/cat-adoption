<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Adopsi extends Model
{
    use HasFactory;
    
    protected $table = "adopsis";
    protected $primaryKey = "id";
    protected $keyType = "int";
    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        "user_id",
        "hewan_id",
        "shelter_id",
        "usia",
        "dokumen_foto",
        "apakah_ada_peliharaan_lain",
        "berapa_orang_yang_tinggal_bersama",
        "status",
    ];
}
