<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Berita extends Model
{
    use HasFactory;

    protected $table = "beritas";
    protected $primaryKey = "id";
    protected $keyType = "int";
    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        "judul",
        "deskripsi",
        "kategori",
        "gambar",
    ];

    public function komentar(): HasMany
    {
        return $this->hasMany(KomentarBerita::class, 'berita_id');
    }
}
