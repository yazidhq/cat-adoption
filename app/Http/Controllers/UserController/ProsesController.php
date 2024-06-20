<?php

namespace App\Http\Controllers\UserController;

use App\Http\Controllers\Controller;
use App\Models\Adopsi;
use App\Models\Hewan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProsesController extends Controller
{
    public function proses_pendaftaran_adopsi(Request $request, string $id)
    {
        $hewan = Hewan::findOrFail($id);
        $shelter_id = $hewan->shelter->id;
        $user_id = auth()->user()->id;

        $validated = $request->validate([
            'user_id' => ['max:100'],
            'hewan_id' => ['max:100'],
            'shelter_id' => ['max:100'],
            'usia' => ['required', 'max:100'],
            'dokumen_foto' => ['required', 'max:2048'], 
            'apakah_ada_peliharaan_lain' => ['required', 'max:100'],
            'berapa_orang_yang_tinggal_bersama' => ['required', 'max:100'],
            'status' => ['max:100'],
        ]);

        DB::beginTransaction();

        try {
            if ($request->hasFile('dokumen_foto')) {
                $image = $request->file('dokumen_foto');
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('dokumen-img'), $imageName);
                $validated['dokumen_foto'] = $imageName;
            }

            $validated["user_id"] = $user_id;
            $validated["hewan_id"] = $id;
            $validated["shelter_id"] = $shelter_id;
            $validated["status"] = "proses";

            Adopsi::create($validated);

            DB::commit();
            return redirect()->back()->with('success', 'Data yang terkirim sedang dalam proses pemeriksaan!');
        } catch (\Throwable $e) {
            DB::rollback();
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
