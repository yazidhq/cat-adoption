<?php

namespace App\Http\Controllers;

use App\Models\Adopsi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdopsiController extends Controller
{
    public function index(Request $request)
    {
        $query = Adopsi::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('status', 'like', "%{$search}%");
        }

        $adopsi = $query->with("user", "hewan")->orderBy('id', 'DESC')->paginate(5)->withQueryString();

        return Inertia::render("AdminPages/adopsi/Adopsi", [
            "adopsi" => $adopsi,
            "filters" => $request->only("search"),
            "successMessage" => session("success"),
            "errorMessage" => session("error"),
        ]);
    }

    public function show()
    {

    }
}
