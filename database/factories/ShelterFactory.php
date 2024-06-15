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
            'name' => fake()->catchPhrase(),
            'city' => fake()->city(),
            'address' => fake()->streetAddress(),
            'phone' => fake()->phoneNumber(),
            'category' => fake()->randomElement(['cat', 'dog']),
        ];
    }
}
