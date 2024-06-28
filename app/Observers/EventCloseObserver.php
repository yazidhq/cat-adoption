<?php

namespace App\Observers;

use App\Models\Event;
use Carbon\Carbon;

class EventCloseObserver
{
    private function closeEventIfNeeded(Event $event)
    {
        $now = Carbon::now();

        if (!$event->is_close && $event->hari_tanggal <= $now->toDateString() && $event->waktu_mulai <= $now->toTimeString()) {
            $event->is_close = true;
            $event->save();
        }
    }

    public function retrieved(Event $event): void
    {
        $this->closeEventIfNeeded($event);
    }

    public function updated(Event $event): void
    {
        $this->closeEventIfNeeded($event);
    }

    public function deleted(Event $event): void
    {
        $this->closeEventIfNeeded($event);
    }

    public function restored(Event $event): void
    {
        $this->closeEventIfNeeded($event);
    }

    public function forceDeleted(Event $event): void
    {
        $this->closeEventIfNeeded($event);
    }
}
