<?php

namespace App\Http\Middleware;

use App\Models\Hewan;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdopted
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

        if ($hewan && $hewan->is_adopsi) {
            return redirect()->route('adopsi')
                             ->with('adopted', ucfirst($hewan->kategori) . ' tersebut sudah diadopsi!');
        }

        return $next($request);
    }
}
