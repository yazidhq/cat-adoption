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

        if ($request->filled('lokasi')) {
            $lokasi = $request->input('lokasi');
            $query->where(function ($q) use ($lokasi) {
                $q->where('provinsi', 'like', "%{$lokasi}%")
                ->orWhere('kota', 'like', "%{$lokasi}%");
            });
        }

        if ($request->filled('kelamin')) {
            $kelamin = $request->input('kelamin');
            $query->where('kelamin', $kelamin);
        }

        if ($request->filled('usia')) {
            $usia = (int)$request->input('usia');
            if ($usia === 11) {
                $query->where('usia', '<=', 11);
            } elseif ($usia === 60) {
                $query->whereBetween('usia', [12, 60]);
            } elseif ($usia === 120) {
                $query->whereBetween('usia', [61, 120]);
            }
        }

        if ($request->filled('kategori')) {
            $kategori = $request->input('kategori');
            $query->where('kategori', $kategori);
        }

        $hewan = $query->orderBy('id', 'DESC')->paginate(10)->withQueryString();

        return Inertia::render('UserPages/adopsi/Adopsi', [
            'hewan' => $hewan,
            'filters' => $request->all(),
        ]);
    }

    public function detail_adopsi(string $id)
    {
        return Inertia::render('UserPages/adopsi/DetailAdopsi', [
            'hewan' => Hewan::with("shelter", "user")->findOrFail($id),
        ]);
    }

    public function pendaftaran_adopsi(string $id)
    {
        return Inertia::render('UserPages/adopsi/PendaftaranAdopsi', [
            'hewan' => Hewan::with("shelter", "user")->findOrFail($id),
            "successMessage" => session("success"),
            "errorMessage" => session("error"),
        ]);
    }
}
