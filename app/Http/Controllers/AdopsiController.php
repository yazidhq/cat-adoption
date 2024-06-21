<?php

namespace App\Http\Controllers;

use App\Models\Adopsi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdopsiController extends Controller
{
    public function index(Request $request)
    {
        $query = Adopsi::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('status', 'like', "%{$search}%");
        }

        $adopsi = $query->with("user", "hewan")->orderBy('id', 'DESC')->paginate(5)->withQueryString();

        return Inertia::render("AdminPages/adopsi/Adopsi", [
            "adopsi" => $adopsi,
            "filters" => $request->only("search"),
            "successMessage" => session("success"),
            "errorMessage" => session("error"),
        ]);
    }

    public function show(string $id)
    {
        return Inertia::render("AdminPages/adopsi/DetailAdopsi", [
            "adopsi" => Adopsi::with("user", "hewan.shelter", "hewan.user")->findOrFail($id),
        ]);
    }

    public function terima_adopsi(string $id)
    {
        $adopsi = Adopsi::findOrFail($id);
        $adopsi->status = "terima";
        $adopsi->save();

        return redirect()->route("adopsi_status.index")->with("success", "Adoption status has been accepted!");
    }

    public function selesai_adopsi(string $id)
    {
        $adopsi = Adopsi::findOrFail($id);
        $adopsi->status = "selesai";
        $adopsi->save();

        return redirect()->route("adopsi_status.index")->with("success", "Adoption status has been finished!");
    }

    public function hapus_adopsi(string $id)
    {
        $adopsi = Adopsi::findOrFail($id);

        if ($adopsi) {
            if ($adopsi->dokumen_foto) {
                $doc_path = public_path() . '/dokumen-img/' . $adopsi->dokumen_foto;
                if (file_exists($doc_path)) {
                    unlink($doc_path);
                }
            }

            $hewan = $adopsi->hewan;
            if ($hewan) {
                $hewan->is_adopsi = false;
                $hewan->save();
            }

            $adopsi->delete();

            return redirect()->route("adopsi_status.index")->with("success", "Adoption status has been deleted!");
        }
        return redirect()->route("adopsi_status.index")->with("error", "Adoption status not found!");
    }

}
