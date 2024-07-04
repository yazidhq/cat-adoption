<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'nama_depan' => 'admin',
            'role' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make("password")
        ]);

        User::factory()->create([
            'nama_depan' => 'user',
            'nama_belakang' => 'account',
            'alamat' => 'Indonesia DKI Jakarta',
            'kode_pos' => '999999',
            'nomor_wa' => '081299999999',
            'bio' => 'tester',
            'email' => 'user@gmail.com',
            'password' => Hash::make("password")
        ]);
    }
}
