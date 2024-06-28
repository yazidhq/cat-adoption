<?php

namespace App\Http\Middleware;

use App\Models\Event;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsEventClose
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $event_id = $request->route('id');
        $event  =  Event::findOrFail($event_id);
        $is_close = $event->is_close;

        if($is_close){
            return redirect()->back()->with('close', 'Event telah ditutup!');
        }
        
        return $next($request);
    }
}
