<?php

namespace Database\Factories;

use App\Models\Shelter;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shelter>
 */
class ShelterFactory extends Factory
{
    protected $model = Shelter::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama' => fake()->catchPhrase(),
            'provinsi' => fake()->city(),
            'kota' => fake()->city(),
            'alamat' => fake()->streetAddress(),
            'nomor_wa' => fake()->phoneNumber(),
            'khusus' => fake()->randomElement(['kucing', 'anjing']),
            'deskripsi' => fake()->word(),
        ];
    }
}
