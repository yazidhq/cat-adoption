<?php

namespace App\Http\Controllers;

use App\Models\Donasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DonasiController extends Controller
{
    public function index(Request $request)
    {
        $query = Donasi::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('tema_donasi', 'like', "%{$search}%");
        }

        $donasi = $query->orderBy('id', 'DESC')->paginate(5)->withQueryString();

        return Inertia::render("AdminPages/donasi/Donasi", [
            "donasi" => $donasi,
            "filters" => $request->only("search"),
            "successMessage" => session("success"),
            "errorMessage" => session("error"),
        ]);
    }

    public function create()
    {
        return Inertia::render("AdminPages/donasi/AddDonasi");
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tema_donasi' => ['required'],
            'deskripsi' => ['required'],
            'target_dana' => ['required'],
            'batas_waktu' => ['required'],
            'gambar' => ['required', 'image', 'max:2048'], 
        ]);

        DB::beginTransaction();

        try {
            if ($request->hasFile('gambar')) {
                $image = $request->file('gambar');
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('donasi-img'), $imageName);
                $validated['gambar'] = $imageName;
            }

            Donasi::create($validated);

            DB::commit();
            return redirect()->route('donasi.index')->with('success', 'Donasi has been created successfully!');
        } catch (\Throwable $e) {
            DB::rollback();
            return redirect()->route('donasi.index')->with('error', $e->getMessage());
        }
    }

    public function show(string $id)
    {
        return Inertia::render("AdminPages/donasi/DetailDonasi", [
            "donasi" => Donasi::findOrFail($id),
            "successMessage" => session("success"),
            "errorMessage" => session("error"),
        ]);
    }

    public function edit(string $id)
    {
        return Inertia::render("AdminPages/donasi/EditDonasi", [
            "donasi" => Donasi::findOrFail($id),
        ]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'tema_donasi' => ['required'],
            'deskripsi' => ['required'],
            'target_dana' => ['required'],
            'batas_waktu' => ['required'],
            'gambar' => ['nullable', 'max:2048'],
        ]);

        DB::beginTransaction();

        try {
            $donasi = Donasi::findOrFail($id);

            if ($request->hasFile('gambar')) {
                if ($donasi->gambar) {
                    $image_path = public_path() . '/donasi-img/' . $donasi->gambar;
                    unlink($image_path);
                }

                $image = $request->file('gambar');
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('donasi-img'), $imageName);
                
                $validated['gambar'] = $imageName;
            } else {
                $validated['gambar'] = $donasi->gambar;
            }

            $donasi->update($validated);

            DB::commit();
            return redirect()->route('donasi.index')->with('success', 'Donasi has been updated successfully!');
        } catch (\Throwable $e) {
            DB::rollback();
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function destroy(string $id)
    {
        DB::beginTransaction();

        try {
            $donasi = Donasi::findOrFail($id);

            if ($donasi) {
                if ($donasi->gambar) {
                    $image_path = public_path() . '/donasi-img/' . $donasi->gambar;
                    unlink($image_path);
                }
                $donasi->delete();
            } else {
                return back()->with('success', 'Donasi has been deleted failed!');
            }

            DB::commit();
            return back()->with('success', 'Donasi has been deleted successfully!');
        } catch (\Throwable $e) {
            DB::rollback();
            return back()->with('error', 'error' . $e . '<span hidden>' . $id . '</span>');
        }
    }
}
