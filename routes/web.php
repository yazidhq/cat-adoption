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
use App\Http\Middleware\IsDonationClose;
use App\Http\Middleware\IsEventClose;
use App\Http\Middleware\IsEventRegistered;
use App\Http\Middleware\IsUserOwned;
use App\Http\Middleware\UserRole;
use App\Models\Hewan;
use App\Models\PawSosmed;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

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

    Route::get('/daftar_donasi', 'daftar_donasi')->name('daftar_donasi');
    Route::get('/detail_donasi/{id}', 'detail_donasi')->name('detail_donasi');

    Route::get('/daftar_event', 'daftar_event')->name('daftar_event');
    Route::get('/detail_event/{id}', 'detail_event')->name('detail_event');

    Route::get('/daftar_shelter', 'daftar_shelter')->name('daftar_shelter');
    Route::get('/shelter_profile/{id}', 'shelter_profile')->name('shelter_profile');
    
    Route::get('/blog_berita', 'blog_berita')->name('blog_berita');
});

Route::middleware([UserRole::class . ':user'])->group(function () {
    Route::controller(PagesController::class)->group(function() {
        Route::get('/pendaftaran_adopsi/{id}', 'pendaftaran_adopsi')->name('pendaftaran_adopsi')->middleware([IsUserOwned::class])->middleware([IsAdopted::class]);
        Route::get('/detail_berita/{id}', 'detail_berita')->name('detail_berita');
    });
    
    Route::controller(ProsesController::class)->group(function() {
        Route::post('/proses_pendaftaran_adopsi/{id}', 'proses_pendaftaran_adopsi')->name('proses_pendaftaran_adopsi');
        Route::post('/proses_buat_transaksi/{id}', 'proses_buat_transaksi')->name('proses_buat_transaksi')->middleware([IsDonationClose::class]);
        Route::post('/proses_pembayaran_berhasil/{snapToken}', 'proses_pembayaran_berhasil')->name('proses_pembayaran_berhasil');
        Route::get('/proses_pendaftaran_event/{id}', 'proses_pendaftaran_event')->name('proses_pendaftaran_event')->middleware([IsEventRegistered::class])->middleware([IsEventClose::class]);
        Route::post('/tambah_favorite/{id}', 'tambah_favorite')->name('tambah_favorite');
        Route::post('/hapus_favorite/{id}', 'hapus_favorite')->name('hapus_favorite');
        Route::post('/tambah_komentar/{id}', 'tambah_komentar')->name('tambah_komentar');
        Route::post('/tambah_notifikasi/{id}', 'tambah_notifikasi')->name('tambah_notifikasi');
        Route::post('/hapus_notifikasi/{id}', 'hapus_notifikasi')->name('hapus_notifikasi');
    });

    Route::prefix('profile')->group(function () {
        Route::controller(UserProfileController::class)->group(function () {
            Route::get('/user_profile', 'user_profile')->name('user_profile');
            Route::post('/update_profile/{id}', 'update_profile')->name('update_profile');
            Route::get('/status_adopsi', 'status_adopsi')->name('status_adopsi');
            Route::get('/donasi_saya', 'donasi_saya')->name('donasi_saya');
            Route::get('/events', 'events')->name('events');
            Route::get('/favorite', 'favorite')->name('favorite');
        });
    });
});

Route::middleware([UserRole::class . ':admin'])->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('AdminPages/Dashboard');
        })->name('dashboard');

        Route::post('paw_sosmed', function(Request $request) {
            $request->validate([
                'fb' => 'nullable|string|max:255',
                'ig' => 'nullable|string|max:255',
                'yt' => 'nullable|string|max:255',
                'wa' => 'nullable|string|max:255',
                'line' => 'nullable|string|max:255',
                'email' => 'nullable|string|email|max:255',
            ]);

            $sosmed = PawSosmed::find(1);

            if ($sosmed) {
                $sosmed->update([
                    'fb' => $request->fb,
                    'ig' => $request->ig,
                    'yt' => $request->yt,
                    'wa' => $request->wa,
                    'line' => $request->line,
                    'email' => $request->email,
                ]);
            } else {
                PawSosmed::create([
                    'id' => 1,
                    'fb' => $request->fb,
                    'ig' => $request->ig,
                    'yt' => $request->yt,
                    'wa' => $request->wa,
                    'line' => $request->line,
                    'email' => $request->email,
                ]);
            }

            return redirect()->back();
        })->name('paw_sosmed');
    
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
        Route::controller(DonasiController::class)->group(function() {
            Route::post("/tutup_donasi/{id}", 'tutup_donasi')->name("tutup_donasi");
            Route::post("/buka_donasi/{id}", 'buka_donasi')->name("buka_donasi");
        });
        
        Route::resource('/event', EventController::class);
        Route::controller(EventController::class)->group(function() {
            Route::post("/tutup_event/{id}", 'tutup_event')->name("tutup_event");
            Route::post("/buka_event/{id}", 'buka_event')->name("buka_event");
            Route::post("/destroy_peserta/{id}", 'destroy_peserta')->name("destroy_peserta");
        });
        
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
