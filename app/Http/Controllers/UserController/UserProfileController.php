<?php

namespace App\Http\Controllers\UserController;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class UserProfileController extends Controller
{
    public function user_profile()
    {
        return Inertia::render("UserPages/profile/UserProfile");
    }

    public function update_profile()
    {

    }
}
