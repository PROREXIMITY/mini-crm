<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NoteController extends Controller
{
    public function store(Request $request, Contact $contact) {
        $validated = $request->validate([
            'content' => 'required|string',
            'type' => 'nullable|string',
        ]);

        $contact->notes()->create([
            'user_id' => Auth::id(),
            'content' => $validated['content'],
            'type' => $validated['type'] ?? null,
        ]);

        return redirect()->back();
    }

    public function destroy(Note $note) {
        $note->delete();
        return redirect()->back();
    }
}