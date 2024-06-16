<?php

namespace App\Http\Controllers;

use App\Models\Hewan;
use App\Models\Shelter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HewanController extends Controller
{
    public function show_by_shelter_id(string $id)
    {
        return Inertia::render("AdminPages/hewan/Hewan", [
            "shelter" => Shelter::findOrFail($id),
            "hewans" => Hewan::where('shelter_id', $id)->get(),
            "successMessage" => session('success'),
            "errorMessage" => session('error'),
        ]);
    }

    public function add_by_shelter_id(string $id)
    {
        return Inertia::render("AdminPages/hewan/AddHewan", [
            "shelter" => Shelter::findOrFail($id),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'shelter_id' => [],
            'user_id' => [],
            'nama' => ['required', 'max:100'],
            'jenis_hewan' => ['required', 'max:100'],
            'kelamin' => ['required', 'max:100'],
            'usia' => ['required', 'max:100'],
            'berat_badan' => ['required', 'max:100'],
            'steril' => ['required', 'boolean'],
            'vaksin' => ['required', 'boolean'],
            'syarat_ketentuan' => ['required'],
            'deskripsi' => ['required'],
            'foto' => ['required', 'image', 'max:2048'],
        ]);


        DB::beginTransaction();

        try {
            if ($request->hasFile('foto')) {
                $image = $request->file('foto');
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('hewan-img'), $imageName);
                $validated['foto'] = $imageName;
            }

            Hewan::create($validated);

            DB::commit();
            return redirect()->route('show_by_shelter_id', $validated['shelter_id'])->with('success', 'Hewan has been created successfully!');
        } catch (\Throwable $e) {
            DB::rollback();
            return redirect()->route('shelter.index')->with('error', $e->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

        return Inertia::render("AdminPages/hewan/EditHewan", [
            "hewan" => Hewan::with('shelter')->findOrFail($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'shelter_id' => [],
            'user_id' => [],
            'nama' => ['required', 'max:100'],
            'jenis_hewan' => ['required', 'max:100'],
            'kelamin' => ['required', 'max:100'],
            'usia' => ['required', 'max:100'],
            'berat_badan' => ['required', 'max:100'],
            'steril' => ['required', 'boolean'],
            'vaksin' => ['required', 'boolean'],
            'syarat_ketentuan' => ['required'],
            'deskripsi' => ['required'],
            'foto' => ['required', 'max:2048'],
        ]);

        DB::beginTransaction();

        try {
            $hewan = Hewan::findOrFail($id);

            if ($request->hasFile('foto')) {
                if ($hewan->foto) {
                    $image_path = public_path() . '/hewan-img/' . $hewan->foto;
                    unlink($image_path);
                }

                $image = $request->file('foto');
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('hewan-img'), $imageName);
                
                $validated['foto'] = $imageName;
            } else {
                $validated['foto'] = $hewan->foto;
            }

            $hewan->update($validated);

            DB::commit();
            return redirect()->route('show_by_shelter_id', $validated['shelter_id'])->with('success', 'Hewan has been updated successfully!');
        } catch (\Throwable $e) {
            DB::rollback();
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::beginTransaction();

        try {
            $hewan = Hewan::findOrFail($id);

            if ($hewan) {
                if ($hewan->foto) {
                    $image_path = public_path() . '/hewan-img/' . $hewan->foto;
                    unlink($image_path);
                }
                $hewan->delete();
            } else {
                return back()->with('error', 'Hewan has been deleted failed!');
            }

            DB::commit();
            return back()->with('success', 'Hewan has been deleted successfully!');
        } catch (\Throwable $e) {
            DB::rollback();
            return back()->with('error', 'error' . $e . '<span hidden>' . $id . '</span>');
        }
    }
}
