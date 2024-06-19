<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\PesertaEvent;
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

        $events = $query->paginate(5)->withQueryString();

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
            'hari_tanggal' => ['required'],
            'waktu_mulai' => ['required'],
            'waktu_selesai' => ['required'],
            'lokasi' => ['required', 'max:100'],
            'deskripsi' => ['required'],
            'syarat_partisipasi' => ['required'],
            'hadiah_event' => ['required'],
            'poster' => ['required', 'image', 'max:2048'], 
        ]);

        DB::beginTransaction();

        try {
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
            'hari_tanggal' => ['required'],
            'waktu_mulai' => ['required'],
            'waktu_selesai' => ['required'],
            'lokasi' => ['required', 'max:100'],
            'deskripsi' => ['required'],
            'syarat_partisipasi' => ['required'],
            'hadiah_event' => ['required'],
            'poster' => ['nullable', 'max:2048'],
        ]);

        DB::beginTransaction();

        try {
            $event = Event::findOrFail($id);

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
}