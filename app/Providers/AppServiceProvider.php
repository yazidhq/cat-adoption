<?php

namespace App\Providers;

use App\Models\Donasi;
use App\Models\Event;
use App\Observers\DonasiCloseObserver;
use App\Observers\EventCloseObserver;
use Illuminate\Support\ServiceProvider;

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
    }
}
