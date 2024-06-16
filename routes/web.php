<?php

use App\Http\Controllers\HewanController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShelterController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\UserRole;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::middleware([UserRole::class . ':user'])->group(function () {

});

Route::middleware([UserRole::class . ':admin'])->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('AdminPages/Dashboard');
        })->name('dashboard');
    
        Route::resource('/shelter', ShelterController::class);
        Route::resource('/hewan', HewanController::class);
        Route::get('/shelter/hewan/{id}', [HewanController::class, 'show_by_shelter_id'])->name("show_by_shelter_id");
        Route::get('/shelter/add_hewan/{id}', [HewanController::class, 'add_by_shelter_id'])->name("add_by_shelter_id");

        Route::resource('/user', UserController::class);
        ROute::post("/user/{id}", [UserController::class, 'make_user_to_admin_or_reverse'])->name("make_user_to_admin_or_reverse");
        Route::get('/user/hewan/{id}', [HewanController::class, 'show_by_user_id'])->name("show_by_user_id");
        Route::get('/user/add_hewan/{id}', [HewanController::class, 'add_by_user_id'])->name("add_by_user_id");
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
