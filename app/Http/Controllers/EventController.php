<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\PesertaEvent;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $query = Event::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('tema', 'like', "%{$search}%");
        }

        $events = $query->with("peserta")->orderBy('id', 'DESC')->paginate(5)->withQueryString();

        return Inertia::render("AdminPages/event/Events", [
            "events" => $events,
            "filters" => $request->only("search"),
            "successMessage" => session("success"),
            "errorMessage" => session("error"),
        ]);
    }

    public function create()
    {
        return Inertia::render("AdminPages/event/AddEvent");
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tema' => ['required', 'max:100'],
            'kategori' => ['required', 'max:100'],
            'keterangan' => ['max:100'],
            'hari_tanggal' => ['required'],
            'waktu_mulai' => ['required'],
            'waktu_selesai' => ['required'],
            'tempat' => ['required', 'max:255'],
            'lokasi' => ['required', 'max:255'],
            'longitude' => ['required', 'max:255'],
            'latitude' => ['required', 'max:255'],
            'deskripsi' => ['required'],
            'syarat_partisipasi' => ['required'],
            'benefit' => ['required'],
            'poster' => ['required', 'image', 'max:2048'], 
        ]);

        DB::beginTransaction();

        try {
            if($validated['kategori'] === "event"){
                $validated['keterangan'] = "-";
            }

            if ($request->hasFile('poster')) {
                $image = $request->file('poster');
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('event-img'), $imageName);
                $validated['poster'] = $imageName;
            }

            Event::create($validated);

            DB::commit();
            return redirect()->route('event.index')->with('success', 'Event has been created successfully!');
        } catch (\Throwable $e) {
            DB::rollback();
            return redirect()->route('event.index')->with('error', $e->getMessage());
        }
    }

    public function show(string $id)
    {
        return Inertia::render("AdminPages/event/DetailEvent", [
            "event" => Event::findOrFail($id),
            "peserta" => PesertaEvent::with("user")->where("event_id", $id)->get(),
            "successMessage" => session("success"),
            "errorMessage" => session("error"),
        ]);
    }

    public function edit(string $id)
    {
        return Inertia::render("AdminPages/event/EditEvent", [
            "event" => Event::findOrFail($id),
        ]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'tema' => ['required', 'max:100'],
            'kategori' => ['required', 'max:100'],
            'keterangan' => ['required', 'max:100'],
            'hari_tanggal' => ['required'],
            'waktu_mulai' => ['required'],
            'waktu_selesai' => ['required'],
            'tempat' => ['required', 'max:255'],
            'lokasi' => ['required', 'max:255'],
            'longitude' => ['required', 'max:255'],
            'latitude' => ['required', 'max:255'],
            'deskripsi' => ['required'],
            'syarat_partisipasi' => ['required'],
            'benefit' => ['required'],
            'poster' => ['nullable', 'max:2048'],
        ]);

        DB::beginTransaction();

        try {
            $event = Event::findOrFail($id);

            if($validated['kategori'] === "event"){
                $validated['keterangan'] = "-";
            }

            if ($request->hasFile('poster')) {
                if ($event->poster) {
                    $image_path = public_path() . '/event-img/' . $event->poster;
                    unlink($image_path);
                }

                $image = $request->file('poster');
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('event-img'), $imageName);
                
                $validated['poster'] = $imageName;
            } else {
                $validated['poster'] = $event->poster;
            }

            $event->update($validated);

            DB::commit();
            return redirect()->route('event.index')->with('success', 'Event has been updated successfully!');
        } catch (\Throwable $e) {
            DB::rollback();
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function destroy(string $id)
    {
        DB::beginTransaction();

        try {
            $event = Event::findOrFail($id);

            if ($event) {
                if ($event->poster) {
                    $image_path = public_path() . '/event-img/' . $event->poster;
                    unlink($image_path);
                }
                $event->delete();
            } else {
                return back()->with('success', 'Event has been deleted failed!');
            }

            DB::commit();
            return back()->with('success', 'Event has been deleted successfully!');
        } catch (\Throwable $e) {
            DB::rollback();
            return back()->with('error', 'error' . $e . '<span hidden>' . $id . '</span>');
        }
    }

    public function destroy_peserta(string $id)
    {
        $peserta_event = PesertaEvent::findOrFail($id);
        $peserta_event->delete();
        return back()->with('success', 'Event participant has been deleted successfully!');
    }

    public function tutup_event(string $id)
    {
        $event = Event::findOrFail($id);
        $event->is_close = 1;
        $event->save();
        return back()->with('success', 'Event has been closed successfully!');
    }

    public function buka_event(string $id)
    {
        $event = Event::findOrFail($id);
        $event->is_close = 0;
        $event->save();

        date_default_timezone_set('Asia/Jakarta');
        $now = Carbon::now();

        if ($event->hari_tanggal <= $now->toDateString() && $event->waktu_mulai <= $now->toTimeString()) {
            return back()->with('error', 'Event has closed because it has passed the time limit!');
        } else {
            return back()->with('success', 'Event has been opened successfully!');
        }
    }
}
