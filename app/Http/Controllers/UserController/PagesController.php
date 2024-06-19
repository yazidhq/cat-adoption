<?php

namespace App\Http\Controllers\UserController;

use App\Http\Controllers\Controller;
use App\Models\Hewan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PagesController extends Controller
{
    public function adopsi(Request $request)
    {
        $query = Hewan::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('provinsi', 'like', "%{$search}%")
                    ->orWhere('kota', 'like', "%{$search}%");
            });
        }

        $hewan = $query->paginate(20)->withQueryString();

        return Inertia::render("UserPages/adopsi/Adopsi", [
            "hewan" => $hewan,
            "filters" => $request->only("search"),
        ]);
    }

    public function detail_adopsi()
    {
        
    }

    public function pendaftaran_adopsi()
    {

    }
}
