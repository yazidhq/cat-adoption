<?php

namespace App\Providers;

use App\Models\Donasi;
use App\Models\Event;
use App\Models\EventNotif;
use App\Observers\DonasiCloseObserver;
use App\Observers\EventCloseObserver;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Event::observe(EventCloseObserver::class);
        Donasi::observe(DonasiCloseObserver::class);

        Inertia::share('event_notif', function () {
            if (Auth::check()) {
                return EventNotif::with("event")->where('user_id', Auth::id())->get();
            }
            return [];
        });
    }
}
