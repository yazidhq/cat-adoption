<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Hewan extends Model
{
    use HasFactory;

    protected $table = "hewans";
    protected $primaryKey = "id";
    protected $keyType = "int";
    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        "shelter_id",
        "user_id",
        "nama",
        "jenis_hewan",
        "kelamin",
        "usia",
        "berat_badan",
        "steril",
        "vaksin",
        "syarat_ketentuan",
        "deskripsi",
        "is_adopsi",
        "foto",
    ];

    public function shelter(): BelongsTo
    {
        return $this->belongsTo(Shelter::class, 'shelter_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
