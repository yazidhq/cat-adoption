<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PawSosmed extends Model
{
    use HasFactory;

    protected $fillable = [
        "fb",
        "ig",
        "yt",
        "wa",
        "line",
        "email",
    ];
}
