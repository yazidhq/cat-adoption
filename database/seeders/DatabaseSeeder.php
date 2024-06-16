<?php

namespace Database\Seeders;

use App\Models\Shelter;
use App\Models\User;
use Database\Factories\ShelterFactory;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
            'name' => 'admin',
            'role' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make("password")
        ]);

        User::factory()->create([
            'name' => 'user',
            'email' => 'user@gmail.com',
            'password' => Hash::make("password")
        ]);

        // Shelter::factory(100)->create();
    }
}
