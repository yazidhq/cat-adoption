<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('nama_depan', 'like', "%{$search}%")
                ->orWhere('nama_belakang', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        }

        $users = $query->paginate(5)->withQueryString();
        $users->load("hewan");

        return Inertia::render("AdminPages/users/Users",[
            "users" => $users,
            "filters" => $request->only('search'),
            'successMessage' => session('success'),
            'errorMessage' => session('error'),
        ]);
    }

    public function make_user_to_admin_or_reverse(string $id)
    {
        $user = User::findOrFail($id);

        if($user->role == "user"){
            $user->role = "admin";
        } else {
            $user->role = "user";
        }

        $user->save();

        return back()->with("success", "User has been updated successfuly!");
    }
}
