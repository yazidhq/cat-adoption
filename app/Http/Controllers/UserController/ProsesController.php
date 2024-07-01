<?php

namespace App\Http\Controllers\UserController;

use App\Http\Controllers\Controller;
use App\Models\Adopsi;
use App\Models\Favorite;
use App\Models\Hewan;
use App\Models\KomentarBerita;
use App\Models\PembayaranDonasi;
use App\Models\PesertaEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Midtrans\Snap;
use Midtrans\Config;

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

    public function proses_buat_transaksi(Request $request, string $id)
    {
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production');
        Config::$isSanitized = config('services.midtrans.is_sanitized');
        Config::$is3ds = config('services.midtrans.is_3ds');

        $params = array(
            'transaction_details' => [
                'order_id' => rand(),
                'gross_amount' => $request->dana,
            ],
            'customer_details' => [
                'first_name' => auth()->user()->nama_depan,
                'last_name' => auth()->user()->nama_belakang,
                'email' => auth()->user()->email,
                'phone' => auth()->user()->nomor_wa,
            ],
        );

        $snapToken = Snap::getSnapToken($params);

        DB::beginTransaction();

        try {
            PembayaranDonasi::create([
                "user_id" => $request->user_id,
                "donasi_id" => $request->donasi_id,
                "dana" => $request->dana,
                "status" => "pending",
                "tipe_donasi" => $request->tipe_donasi,
                "snap_token" => $snapToken,
            ]);

            DB::commit();
            return redirect()->back()
                 ->with('success', 'Segera lakukan pembayaran donasimu!')
                 ->with('snap_token', $snapToken);
        } catch (\Exception $e) {
            DB::rollBack();
        }
    }

    public function proses_pembayaran_berhasil(string $snapToken)
    {
        $pembayaran = PembayaranDonasi::where("snap_token", $snapToken)->first();
        $pembayaran["status"] = "done";
        $pembayaran->save();
        return redirect()->back()->with('successPay', 'Donasimu sangat berarti untuk kami');
    }

    public function proses_pendaftaran_event(string $id)
    {
        PesertaEvent::create([
            "user_id" => auth()->user()->id,
            "event_id" => $id,
        ]);
        return redirect()->back()->with('success', 'Terimakasih sudah Mendaftar!');
    }

    public function tambah_favorite(string $id)
    {
        $user_id = auth()->user()->id;
        $hewan_id = $id;

        $favorite = Favorite::where('hewan_id', $hewan_id)->where('user_id', $user_id)->first();

        if (!$favorite) {
            Favorite::create([
                'hewan_id' => $hewan_id,
                'user_id' => $user_id,
            ]);
        }

        return redirect()->back();
    }

    public function hapus_favorite(string $id)
    {
        $user_id = auth()->user()->id;
        $hewan_id = $id;

        $favorite = Favorite::where('hewan_id', $hewan_id)->where('user_id', $user_id)->first();

        if ($favorite) {
            $favorite->delete();
        }

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
