<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function hewan(): HasMany
    {
        return $this->hasMany(Hewan::class, 'user_id');
    }

    public function komentar(): HasMany
    {
        return $this->hasMany(KomentarBerita::class, 'user_id');
    }

    public function pembayaran_donasi(): HasMany
    {
        return $this->hasMany(PembayaranDonasi::class, 'user_id');
    }

    public function peserta_event(): HasMany
    {
        return $this->hasMany(PesertaEvent::class, 'user_id');
    }
}
