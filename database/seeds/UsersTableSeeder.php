<?php

use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(User::class, 5)->create()
            ->each(function (User $user) {
                factory(\App\FamilyMember::class, 3)->create([
                    'user_id' => $user->id,
                    'last_edited_at' => now(),
                    'last_edited_by' => $user->id,
                ]);
            });
    }
}
