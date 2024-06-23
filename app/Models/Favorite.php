<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Favorite extends Model
{
    use HasFactory;

    protected $table = "favorites";
    protected $primaryKey = "id";
    protected $keyType = "int";
    public $timestamps = true;
    public $incrementing = true;

    protected $fillable = [
        "user_id",
        "hewan_id",
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function hewan(): BelongsTo
    {
        return $this->belongsTo(Hewan::class, 'hewan_id');
    }
}
