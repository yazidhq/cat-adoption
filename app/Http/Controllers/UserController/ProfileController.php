<?php

namespace App\Http\Controllers\UserController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function profile()
    {
        return Inertia::render("");
    }

    public function update_profile()
    {

    }
}
