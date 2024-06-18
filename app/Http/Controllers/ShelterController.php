<?php

namespace App\Http\Controllers;

use App\Models\Shelter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ShelterController extends Controller
{
    public function index(Request $request)
    {
        $query = Shelter::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('nama', 'like', "%{$search}%")
                ->orWhere('provinsi', 'like', "%{$search}%")
                ->orWhere('kota', 'like', "%{$search}%")
                ->orWhere('nomor_wa', 'like', "%{$search}%");
        }

        $shelters = $query->paginate(5)->withQueryString();
        $shelters->load('hewan');

        return Inertia::render("AdminPages/shelters/Shelters", [
            "shelters" => $shelters,
            "filters" => $request->only('search'),
            "successMessage" => session("success"),
            "errorMessage" => session("error"),
        ]);
    }

    public function create()
    {
        return Inertia::render("AdminPages/shelters/AddShelter");
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => ['required', 'max:100'],
            'provinsi' => ['required', 'max:100'],
            'kota' => ['required', 'max:100'],
            'alamat' => ['required', 'max:100'],
            'nomor_wa' => ['required', 'max:100'],
            'khusus' => ['required', 'max:100'],
            'deskripsi' => ['required'],
            'foto' => ['required', 'image', 'max:2048'], 
        ]);

        DB::beginTransaction();

        try {
            if ($request->hasFile('foto')) {
                $image = $request->file('foto');
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('shelter-img'), $imageName);
                $validated['foto'] = $imageName;
            }

            Shelter::create($validated);

            DB::commit();
            return redirect()->route('shelter.index')->with('success', 'Shelter has been created successfully!');
        } catch (\Throwable $e) {
            DB::rollback();
            return redirect()->route('shelter.index')->with('error', $e->getMessage());
        }
    }

    public function show(string $id)
    {
        return Inertia::render("AdminPages/shelters/DetailShelter", [
            "shelter" => Shelter::findOrFail($id),
        ]);
    }

    public function edit(string $id)
    {
        return Inertia::render("AdminPages/shelters/EditShelter", [
            "shelter" => Shelter::findOrFail($id),
        ]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'nama' => ['required', 'max:100'],
            'provinsi' => ['required', 'max:100'],
            'kota' => ['required', 'max:100'],
            'alamat' => ['required', 'max:100'],
            'nomor_wa' => ['required', 'max:100'],
            'khusus' => ['required', 'max:100'],
            'deskripsi' => ['required'],
            'foto' => ['nullable', 'max:2048'],
        ]);

        DB::beginTransaction();

        try {
            $shelter = Shelter::findOrFail($id);

            if ($request->hasFile('foto')) {
                if ($shelter->foto) {
                    $image_path = public_path() . '/shelter-img/' . $shelter->foto;
                    unlink($image_path);
                }

                $image = $request->file('foto');
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('shelter-img'), $imageName);
                
                $validated['foto'] = $imageName;
            } else {
                $validated['foto'] = $shelter->foto;
            }

            $shelter->update($validated);

            DB::commit();
            return redirect()->route('shelter.index')->with('success', 'Shelter has been updated successfully!');
        } catch (\Throwable $e) {
            DB::rollback();
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function destroy(Request $request, $id)
    {
        DB::beginTransaction();

        try {
            $shelter = Shelter::findOrFail($id);

            if ($shelter) {
                if ($shelter->foto) {
                    $image_path = public_path() . '/shelter-img/' . $shelter->foto;
                    unlink($image_path);
                }
                $shelter->delete();
            } else {
                return back()->with('success', 'Shelter has been deleted failed!');
            }

            DB::commit();
            return back()->with('success', 'Shelter has been deleted successfully!');
        } catch (\Throwable $e) {
            DB::rollback();
            return back()->with('error', 'error' . $e . '<span hidden>' . $id . '</span>');
        }
    }
}
