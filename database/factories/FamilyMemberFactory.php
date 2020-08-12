<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\FamilyMember;
use Faker\Generator as Faker;

$factory->define(FamilyMember::class, function (Faker $faker) {
    return [
        'firstname' => $faker->firstName,
        'lastname' => $faker->lastName,
        'age' => $faker->numberBetween(20, 40),
        'relation' => $faker->randomElement(['Mom', 'Dad', 'Sister', 'Brother', 'Uncle', 'Aunt']),
        'profession' => $faker->randomElement(
            ['Graphic Designer', 'Software Engineer', 'Cook', 'Driver', 'Marketing Director', 'CEO', 'CTO']
        ),
    ];
});
