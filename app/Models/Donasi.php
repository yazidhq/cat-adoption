<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Donasi extends Model
{
    use HasFactory;

    protected $table = "donasis";
    protected $primaryKey = "id";
    protected $keyType = "int";
    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        "tema_donasi",
        "deskripsi",
        "tipe_donasi",
        "target_dana",
        "batas_waktu",
        "gambar",
    ];

    public function pembayaran(): HasMany
    {
        return $this->hasMany(PembayaranDonasi::class, 'donasi_id');
    }
}
