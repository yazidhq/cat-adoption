<?php

use App\Http\Controllers\AdopsiController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\DonasiController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\HewanController;
use App\Http\Controllers\UserController\UserProfileController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShelterController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserController\PagesController;
use App\Http\Controllers\UserController\ProsesController;
use App\Http\Middleware\IsAdopted;
use App\Http\Middleware\IsUserOwned;
use App\Http\Middleware\UserRole;
use App\Models\Hewan;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'hewan' => Hewan::orderBy('id', 'DESC')->limit(10)->get(),
    ]);
})->name('home');

Route::controller(PagesController::class)->group(function() {
    Route::get('/adopsi', 'adopsi')->name('adopsi');
    Route::get('/detail_adopsi/{id}', 'detail_adopsi')->name('detail_adopsi');
    
    Route::get('/blog_berita', 'blog_berita')->name('blog_berita');
});

Route::middleware([UserRole::class . ':user'])->group(function () {
    Route::controller(PagesController::class)->group(function() {
        Route::middleware([IsUserOwned::class])->group(function () {
            Route::middleware([IsAdopted::class])->group(function () {
                Route::get('/pendaftaran_adopsi/{id}', 'pendaftaran_adopsi')->name('pendaftaran_adopsi');
            });
        });
    });

    Route::controller(ProsesController::class)->group(function() {
        Route::post('/proses_pendaftaran_adopsi/{id}', 'proses_pendaftaran_adopsi')->name('proses_pendaftaran_adopsi');
    });

    Route::prefix('profile')->group(function () {
        Route::controller(UserProfileController::class)->group(function () {
            Route::get('/user_profile', 'user_profile')->name('user_profile');
            Route::post('/update_profile/{id}', 'update_profile')->name('update_profile');
            Route::get('/status_adopsi', 'status_adopsi')->name('status_adopsi');
        });
    });
});

Route::middleware([UserRole::class . ':admin'])->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('AdminPages/Dashboard');
        })->name('dashboard');
    
        Route::resource('/shelter', ShelterController::class);

        Route::resource('/hewan', HewanController::class);
        Route::controller(HewanController::class)->group(function() {
            Route::get('/shelter/hewan/{id}', 'show_by_shelter_id')->name('show_by_shelter_id');
            Route::get('/shelter/add_hewan/{id}', 'add_by_shelter_id')->name('add_by_shelter_id');
            Route::get('/user/hewan/{id}', 'show_by_user_id')->name("show_by_user_id");
            Route::get('/user/add_hewan/{id}', 'add_by_user_id')->name("add_by_user_id");
        });

        Route::resource('/user', UserController::class);
        Route::post("/user/{id}", [UserController::class, 'make_user_to_admin_or_reverse'])->name("make_user_to_admin_or_reverse");
        
        Route::resource('/berita', BeritaController::class);
        Route::delete("/berita/komentar/{id}", [BeritaController::class, 'destroy_komentar'])->name("destroy_komentar");

        Route::resource('/donasi', DonasiController::class);
        Route::resource('/event', EventController::class);
        
        Route::resource('/adopsi_status', AdopsiController::class);
        Route::controller(AdopsiController::class)->group(function() {
            Route::post('/terima_adopsi/{id}', 'terima_adopsi')->name('terima_adopsi');
            Route::post('/selesai_adopsi/{id}', 'selesai_adopsi')->name('selesai_adopsi');
            Route::delete('/hapus_adopsi/{id}', 'hapus_adopsi')->name('hapus_adopsi');
        });
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
