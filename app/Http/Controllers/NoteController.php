<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNoteRequest;
use App\Models\Note;
use App\Models\Contact;


class NoteController extends Controller
{
    public function store(StoreNoteRequest $request, Contact $contact)
    {
        $contact->notes()->create([
            'type' => $request->type,
            'content' => $request->content,
            'user_id' => $request->user()->id,
        ]);

        $contact->load('notes'); 
        return redirect()->back()->with('success', 'Note added');
    }

    public function destroy(Note $note)
    {
        $note->delete();
        return redirect()->back()->with('success', 'Note deleted');
    }
}
