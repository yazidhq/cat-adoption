<?php

namespace App\Http\Controllers;

use App\Models\Hewan;
use App\Models\Shelter;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HewanController extends Controller
{
    public function show_by_shelter_id(Request $request, int $id)
    {
        $query = Hewan::query()->where('shelter_id', $id);

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                    ->orWhere('jenis_hewan', 'like', "%{$search}%")
                    ->orWhere('kelamin', 'like', "%{$search}%")
                    ->orWhere('usia', 'like', "%{$search}%")
                    ->orWhere('berat_badan', 'like', "%{$search}%")
                    ->orWhere('syarat_ketentuan', 'like', "%{$search}%");
            });
        }

        $hewans = $query->orderBy('id', 'DESC')->paginate(4)->withQueryString();

        return Inertia::render("AdminPages/hewan/Hewan", [
            "shelter" => Shelter::findOrFail($id),
            "hewans" => $hewans,
            "filters" => $request->only('search'),
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

    public function show_by_user_id(Request $request, int $id)
    {
        $query = Hewan::query()->where('user_id', $id);

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                    ->orWhere('jenis_hewan', 'like', "%{$search}%")
                    ->orWhere('kelamin', 'like', "%{$search}%")
                    ->orWhere('usia', 'like', "%{$search}%")
                    ->orWhere('berat_badan', 'like', "%{$search}%")
                    ->orWhere('syarat_ketentuan', 'like', "%{$search}%");
            });
        }

        $hewans = $query->orderBy('id', 'DESC')->paginate(4)->withQueryString();

        return Inertia::render("AdminPages/hewan/Hewan", [
            "user" => User::findOrFail($id),
            "hewans" => $hewans,
            "filters" => $request->only('search'),
            "successMessage" => session('success'),
            "errorMessage" => session('error'),
        ]);
    }

    public function add_by_user_id(string $id)
    {
        return Inertia::render("AdminPages/hewan/AddHewan", [
            "user" => User::findOrFail($id),
        ]);
    }

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
            'provinsi' => ['required', 'max:100'],
            'kota' => ['required', 'max:100'],
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
            return redirect()->route($validated['shelter_id'] ? 'show_by_shelter_id' : 'show_by_user_id', $validated['shelter_id'] ? $validated['shelter_id'] : $validated['user_id'])->with('success', 'Hewan has been created successfully!');
        } catch (\Throwable $e) {
            DB::rollback();
            return redirect()->route('shelter.index')->with('error', $e->getMessage());
        }
    }

    public function edit(string $id)
    {

        return Inertia::render("AdminPages/hewan/EditHewan", [
            "hewan" => Hewan::with('shelter')->findOrFail($id),
        ]);
    }

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
            'provinsi' => ['required', 'max:100'],
            'kota' => ['required', 'max:100'],
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
            return redirect()->route($validated['shelter_id'] ? 'show_by_shelter_id' : 'show_by_user_id', $validated['shelter_id'] ? $validated['shelter_id'] : $validated['user_id'])->with('success', 'Hewan has been updated successfully!');
        } catch (\Throwable $e) {
            DB::rollback();
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

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
