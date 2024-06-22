<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\KomentarBerita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BeritaController extends Controller
{
    public function index(Request $request)
    {
        $query = Berita::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                    ->orWhere('kategori', 'like', "%{$search}%");
            });
        }

        $berita = $query->orderBy('id', 'DESC')->paginate(5)->withQueryString();

        return Inertia::render("AdminPages/berita/Berita", [
            "berita" => $berita,
            "filters" => $request->only("search"),
            "successMessage" => session("success"),
            "errorMessage" => session("error"),
        ]);
    }

    public function create()
    {
        return Inertia::render("AdminPages/berita/AddBerita");
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => ['required', 'max:100'],
            'deskripsi' => ['required'],
            'kategori' => ['required', 'max:100'],
            'gambar' => ['required', 'image', 'max:2048'], 
        ]);

        DB::beginTransaction();

        try {
            if ($request->hasFile('gambar')) {
                $image = $request->file('gambar');
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('berita-img'), $imageName);
                $validated['gambar'] = $imageName;
            }

            Berita::create($validated);

            DB::commit();
            return redirect()->route('berita.index')->with('success', 'Berita has been created successfully!');
        } catch (\Throwable $e) {
            DB::rollback();
            return redirect()->route('berita.index')->with('error', $e->getMessage());
        }
    }

    public function show(string $id)
    {
        return Inertia::render("AdminPages/berita/DetailBerita", [
            "berita" => Berita::findOrFail($id),
            "komentar" => KomentarBerita::with("user")->where("berita_id", $id)->get(),
            "successMessage" => session("success"),
            "errorMessage" => session("error"),
        ]);
    }

    public function edit(string $id)
    {
        return Inertia::render("AdminPages/berita/EditBerita", [
            "berita" => Berita::findOrFail($id),
        ]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'judul' => ['required', 'max:100'],
            'deskripsi' => ['required'],
            'kategori' => ['required', 'max:100'],
            'gambar' => ['nullable', 'max:2048'],
        ]);

        DB::beginTransaction();

        try {
            $berita = Berita::findOrFail($id);

            if ($request->hasFile('gambar')) {
                if ($berita->gambar) {
                    $image_path = public_path() . '/berita-img/' . $berita->gambar;
                    unlink($image_path);
                }

                $image = $request->file('gambar');
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('berita-img'), $imageName);
                
                $validated['gambar'] = $imageName;
            } else {
                $validated['gambar'] = $berita->gambar;
            }

            $berita->update($validated);

            DB::commit();
            return redirect()->route('berita.index')->with('success', 'Berita has been updated successfully!');
        } catch (\Throwable $e) {
            DB::rollback();
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function destroy(string $id)
    {
        DB::beginTransaction();

        try {
            $berita = Berita::findOrFail($id);

            if ($berita) {
                if ($berita->gambar) {
                    $image_path = public_path() . '/berita-img/' . $berita->gambar;
                    unlink($image_path);
                }
                $berita->delete();
            } else {
                return back()->with('success', 'Berita has been deleted failed!');
            }

            DB::commit();
            return back()->with('success', 'Berita has been deleted successfully!');
        } catch (\Throwable $e) {
            DB::rollback();
            return back()->with('error', 'error' . $e . '<span hidden>' . $id . '</span>');
        }
    }

    public function destroy_komentar(string $id)
    {
        $komentar = KomentarBerita::findOrFail($id);
        $komentar->delete();
        return back()->with('success', 'Komentar has been deleted successfuly!');
    }
}
