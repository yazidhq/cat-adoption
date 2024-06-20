<?php

namespace App\Http\Controllers\UserController;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UserProfileController extends Controller
{
    public function user_profile()
    {
        return Inertia::render("UserPages/profile/UserProfile", [
            "successMessage" => session("success"),
            "errorMessage" => session("error"),
        ]);
    }

    public function update_profile(Request $request, string $id)
    {
        $validated = $request->validate([
            'nama_depan' => ['required', 'max:100'],
            'nama_belakang' => ['required', 'max:100'],
            'alamat' => ['required', 'max:100'],
            'kode_pos' => ['required', 'max:100'],
            'nomor_wa' => ['required', 'max:100'],
            'bio' => ['required', 'max:100'],
            'email' => ['required', 'email'],
            'foto' => ['nullable', 'max:2048'],
        ]);

        DB::beginTransaction();

        try {
            $user = User::findOrFail($id);

            if ($request->hasFile('foto')) {
                if ($user->foto) {
                    $image_path = public_path() . '/user-img/' . $user->foto;
                    if (file_exists($image_path)) {
                        unlink($image_path);
                    }
                }

                $image = $request->file('foto');
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('user-img'), $imageName);

                $validated['foto'] = $imageName;
            } else {
                $validated['foto'] = $user->foto;
            }

            $user->update($validated);

            DB::commit();
            return redirect()->route('user_profile')->with('success', 'Your profile has been updated successfully!');
        } catch (\Throwable $e) {
            DB::rollback();
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
