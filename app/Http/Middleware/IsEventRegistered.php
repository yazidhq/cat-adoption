<?php

namespace App\Http\Middleware;

use App\Models\PesertaEvent;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsEventRegistered
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $event_id = $request->route('id');
        $user_id = auth()->id();

        $peserta_event = PesertaEvent::where('event_id', $event_id)
                                    ->where('user_id', $user_id)
                                    ->first();

        if ($peserta_event) {
            return redirect()->route('detail_event', $event_id)
                            ->with('registered', 'Anda sudah mendaftar Event ini!');
        }

        return $next($request);
    }
}
