<?php

namespace App\Http\Controllers\UserController;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use App\Models\Donasi;
use App\Models\Event;
use App\Models\Hewan;
use App\Models\KomentarBerita;
use App\Models\Shelter;
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
            "hewan" => Hewan::with("shelter", "user", "favorite")->findOrFail($id),
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

    public function daftar_donasi()
    {
        return Inertia::render('UserPages/donasi/DaftarDonasi', [
            'donasi' => Donasi::orderBy('id', 'DESC')->paginate(8)->withQueryString(),
        ]);
    }

    public function detail_donasi(string $id)
    {
        return Inertia::render('UserPages/donasi/DetailDonasi', [
            'donasi' => Donasi::with('pembayaran')->findOrFail($id),
            'daftar_donasi' => Donasi::whereNot('id', $id)->orderBy('id', 'DESC')->take(4)->get(),
        ]);
    }

    public function daftar_event(Request $request)
    {
        $popular_events = Event::withCount('peserta') 
                ->where("kategori", "event")
                ->orderByDesc('peserta_count') 
                ->take(4)
                ->get(); 

        $events = Event::where("kategori", "event")
                ->orderBy('id', 'DESC')
                ->take(6)
                ->get();

        $info = Event::where("kategori", "info")
                ->orderBy('id', 'DESC')
                ->take(3)
                ->get();  

        $all_events_query = Event::where("kategori", "event")
                ->orderBy('id', 'DESC');

        $all_info_query = Event::where("kategori", "info")
                ->orderBy('id', 'DESC');

        if ($request->filled('kategori')) {
            $kategori = $request->input('kategori');
            Event::where('kategori', $kategori);
        }

        if ($request->has('search')) {
            $search = $request->get('search');
            $all_events_query->where(function ($q) use ($search) {
                $q->where('tema', 'like', "%{$search}%")
                ->orWhere('kategori', 'like', "%{$search}%")
                ->orWhere('hari_tanggal', 'like', "%{$search}%")
                ->orWhere('waktu_mulai', 'like', "%{$search}%")
                ->orWhere('lokasi', 'like', "%{$search}%");
            });
            $all_info_query->where(function ($q) use ($search) {
                $q->where('tema', 'like', "%{$search}%")
                ->orWhere('kategori', 'like', "%{$search}%")
                ->orWhere('keterangan', 'like', "%{$search}%")
                ->orWhere('hari_tanggal', 'like', "%{$search}%")
                ->orWhere('waktu_mulai', 'like', "%{$search}%")
                ->orWhere('lokasi', 'like', "%{$search}%");
            });
        }

        $all_events = $all_events_query->paginate(8)->withQueryString();
        $all_info = $all_info_query->paginate(8)->withQueryString();

        return Inertia::render('UserPages/event/DaftarEvent', [
            "popular_events" => $popular_events,
            "events" => $events,
            "info" => $info,
            "all_events" => $all_events,
            "all_info" => $all_info,
            "filters" => $request->all(),
            "search_filter" => $request->only('search'),
        ]);
    }

    public function detail_event(string $id)
    {
        $event = Event::with("peserta")->findOrFail($id);

        $events = Event::where("kategori", "event")
                    ->whereNot('id', $id)
                    ->orderBy('id', 'DESC')
                    ->take(6)
                    ->get();

        $info = Event::where("kategori", "info")
                    ->whereNot('id', $id)
                    ->orderBy('id', 'DESC')
                    ->take(3)
                    ->get();

        return Inertia::render('UserPages/event/DetailEvent', [
            "event" => $event,
            "events" => $events,
            "info" => $info,
            "successMessage" => session("success"),
            "registeredMessage" => session("registered"),
            "closeMessage" => session("close"),
        ]);
    }

    public function daftar_shelter(Request $request)
    {
        $query = Shelter::query();
        
        if ($request->filled('nama_lokasi')) {
            $lokasi = $request->input('nama_lokasi');
            $query->where(function ($q) use ($lokasi) {
                $q->where('nama', 'like', "%{$lokasi}%")
                ->orWhere('provinsi', 'like', "%{$lokasi}%")
                ->orWhere('kota', 'like', "%{$lokasi}%");
            });
        }

        if ($request->filled('khusus')) {
            $khusus = $request->input('khusus');
            $query->where('khusus', $khusus);
        }

        return Inertia::render('UserPages/shelter/DaftarShelter', [
            'shelters' => $query->orderBy('id', 'DESC')->paginate(6)->withQueryString(),
            'filters' => $request->all(),
        ]);
    }

    public function shelter_profile(string $id)
    {
        $shelter = Shelter::where('id', $id)->firstOrFail();
        $hewan = Hewan::where('shelter_id', $shelter->id)
                    ->where('is_adopsi', false)
                    ->with(['favorite' => function ($query) {
                        $query->where('user_id', auth()->id());
                    }])
                    ->paginate(8)
                    ->withQueryString();

        return Inertia::render('UserPages/shelter/ShelterProfile', [
            'shelter' => $shelter,
            'hewan' => $hewan,
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
