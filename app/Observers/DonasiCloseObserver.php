<?php

namespace App\Observers;

use App\Models\Donasi;
use Carbon\Carbon;

class DonasiCloseObserver
{
    private function closeDonasiIfNeeded(Donasi $donasi)
    {
        date_default_timezone_set('Asia/Jakarta');
        $now = Carbon::now();
        $batasWaktu = Carbon::parse($donasi->batas_waktu);

        if ($batasWaktu <= $now) {
            $donasi->is_close = true;
            $donasi->save();
        }
    }
    
    /**
     * Handle the Donasi "retrieved" event.
     */
    public function retrieved(Donasi $donasi): void
    {
        $this->closeDonasiIfNeeded($donasi);
    }
}
