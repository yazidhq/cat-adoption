<?php

namespace App\Observers;

use App\Models\Event;
use Carbon\Carbon;

class EventCloseObserver
{
    private function closeEventIfNeeded(Event $event)
    {
        date_default_timezone_set('Asia/Jakarta');
        $now = Carbon::now();

        if (!$event->is_close && $event->hari_tanggal <= $now->toDateString() && $event->waktu_mulai <= $now->toTimeString()) {
            $event->is_close = true;
            $event->save();
        }
    }

    /**
     * Handle the Event "retrieved" event.
     */
    public function retrieved(Event $event): void
    {
        $this->closeEventIfNeeded($event);
    }
}
