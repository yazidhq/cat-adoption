<?php

namespace App\Http\Controllers\UserController;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use App\Models\Hewan;
use App\Models\KomentarBerita;
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

        $hewan = $query->orderBy('id', 'DESC')->with("favorite")->paginate(10)->withQueryString();

        return Inertia::render('UserPages/adopsi/Adopsi', [
            'hewan' => $hewan,
            'filters' => $request->all(),
            'adopted' => session('adopted'),
        ]);
    }

    public function detail_adopsi(string $id)
    {
        return Inertia::render('UserPages/adopsi/DetailAdopsi', [
            "hewan" => Hewan::with("shelter", "user")->findOrFail($id),
            "owned" => session("owned"),
            "successMessage" => session("success"),
            "errorMessage" => session("error"),
        ]);
    }

    public function pendaftaran_adopsi(string $id)
    {
        return Inertia::render('UserPages/adopsi/PendaftaranAdopsi', [
            'hewan' => Hewan::with("shelter", "user")->findOrFail($id),
        ]);
    }

    public function blog_berita(Request $request)
    {
        $query = Berita::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                    ->orWhere('kategori', 'like', "%{$search}%");
            });
        }

        if ($request->filled('kategori')) {
            $kategori = $request->input('kategori');
            $query->where('kategori', $kategori);
        }

        $berita = $query->orderBy('id', 'DESC')->paginate(16)->withQueryString();

        return Inertia::render('UserPages/berita/BlogBerita', [
            "berita" => $berita,
            "filters" => $request->all(),
        ]);
    }

    public function detail_berita(string $id)
    {
        $query = Berita::query();
        $berita = $query->with("komentar")->findOrFail($id);
        $komentar = KomentarBerita::with("user")->where('berita_id', $id)->orderBy('id', 'DESC')->paginate(3)->withQueryString();
        return Inertia::render('UserPages/berita/DetailBerita', [
            "berita" => $berita,
            "komentar" => $komentar,
        ]);
    }
}
