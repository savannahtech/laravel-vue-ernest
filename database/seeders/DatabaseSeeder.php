<?php

namespace Database\Seeders;

use App\Models\AreaOfSpecialization;
use App\Models\Department;
use App\Models\Faculty;
use App\Models\Rank;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
//        AreaOfSpecialization::factory(10);
        Rank::factory(4)->create();
        Faculty::factory(5)->create();
        Department::factory(66)->create();
        User::factory(200)->hasAttached(AreaOfSpecialization::factory()->count(10))->create();
    }
}
