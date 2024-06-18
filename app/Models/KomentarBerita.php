<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class KomentarBerita extends Model
{
    use HasFactory;

    protected $table = "komentar_beritas";
    protected $primaryKey = "id";
    protected $keyType = "int";
    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        "user_id",
        "berita_id",
        "komentar",
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function berita(): BelongsTo
    {
        return $this->belongsTo(Berita::class, 'berita_id');
    }
}
