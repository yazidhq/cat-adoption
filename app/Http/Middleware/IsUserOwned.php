<?php

namespace App\Http\Middleware;

use App\Models\Hewan;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsUserOwned
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $hewanId = $request->route('id');
        $hewan = Hewan::find($hewanId);

        if ($hewan && $hewan->user_id === auth()->user()->id) {
            return redirect()->route('detail_adopsi', $hewan->id)
                             ->with('owned', ucfirst($hewan->kategori) . ' tersebut milik anda!');
        }

        return $next($request);
    }
}
