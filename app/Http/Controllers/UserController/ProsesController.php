<?php

namespace App\Http\Controllers\UserController;

use App\Http\Controllers\Controller;
use App\Models\Hewan;
use Illuminate\Http\Request;

class ProsesController extends Controller
{
    public function proses_pendaftaran_adopsi(Request $request, string $id)
    {
        $hewan = Hewan::findOrFail($id);
        $shelter_id = $hewan->shelter->id;
        $user_id = auth()->user()->id;
        dd($id, $shelter_id, $user_id, $request);
    }
}
