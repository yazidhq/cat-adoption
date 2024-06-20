<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Shelter extends Model
{
    use HasFactory;

    protected $table = "shelters";
    protected $primaryKey = "id";
    protected $keyType = "int";
    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        "nama",
        "provinsi",
        "kota",
        "alamat",
        "nomor_wa",
        "khusus",
        "deskripsi",
        "foto",
    ];

    public function hewan(): HasMany
    {
        return $this->hasMany(Hewan::class, 'shelter_id');
    }

    public function adopsi(): HasMany
    {
        return $this->hasMany(Adopsi::class, 'shelter_id');
    }
}
