<?php

namespace App\Http\Middleware;

use App\Models\Donasi;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsDonationClose
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $donasi_id = $request->route('id');
        $donasi  =  Donasi::findOrFail($donasi_id);
        $is_close = $donasi->is_close;

        if($is_close){
            return redirect()->back()->with('close', 'Donasi telah ditutup!');
        }
        
        return $next($request);
    }
}
