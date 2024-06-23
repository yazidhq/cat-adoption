<?php

namespace App\Http\Controllers\UserController;

use App\Http\Controllers\Controller;
use App\Models\Adopsi;
use App\Models\Favorite;
use App\Models\Hewan;
use App\Models\KomentarBerita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProsesController extends Controller
{
    public function proses_pendaftaran_adopsi(Request $request, string $id)
    {
        $hewan = Hewan::findOrFail($id);
        $user_id = auth()->user()->id;

        $validated = $request->validate([
            'user_id' => ['max:100'],
            'hewan_id' => ['max:100'],
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
            $validated["status"] = "proses";

            Adopsi::create($validated);
            
            $hewan->is_adopsi = true;
            $hewan->save();

            DB::commit();
            return redirect()->route("detail_adopsi", $id)->with('success', 'Data yang terkirim sedang dalam proses pemeriksaan!');
        } catch (\Throwable $e) {
            DB::rollback();
            return redirect()->route("detail_adopsi", $id)->with('error', $e->getMessage());
        }
    }

    public function tambah_favorite(string $id)
    {
        $user_id = auth()->user()->id;
        $hewan_id = $id;

        Favorite::create([
            "user_id" => $user_id,
            "hewan_id" => $hewan_id,
        ]);

        return redirect()->back();
    }

    public function hapus_favorite(string $id)
    {
        $user_id = auth()->user()->id;
        $hewan_id = $id;

        $favorite = Favorite::where('hewan_id', $hewan_id)->where('user_id', $user_id)->first();
        $favorite->delete();

        return redirect()->back();
    }

    public function tambah_komentar(Request $request, string $id)
    {
        $validated = $request->validate([
            "user_id" => [""],
            "berita_id" => [""],
            "komentar" => ["required"],
        ]);

        $validated["user_id"] = auth()->user()->id;
        $validated["berita_id"] = $id;
        
        KomentarBerita::create($validated);
        return redirect()->back();
    }
}
