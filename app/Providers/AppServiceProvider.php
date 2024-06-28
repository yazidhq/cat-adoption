<?php

namespace App\Providers;

use App\Models\Event;
use Illuminate\Support\ServiceProvider;
use App\Observers\EventCloseObserver;

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
    }
}
