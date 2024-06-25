<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    use HasFactory;

    protected $table = "events";
    protected $primaryKey = "id";
    protected $keyType = "int";
    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        "tema",
        "kategori",
        "keterangan",
        "hari_tanggal",
        "waktu_mulai",
        "waktu_selesai",
        "lokasi",
        "deskripsi",
        "syarat_partisipasi",
        "benefit",
        "poster",
    ];

    public function peserta(): HasMany
    {
        return $this->hasMany(PesertaEvent::class, 'event_id');
    }
}
