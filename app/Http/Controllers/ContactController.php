<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Contact;
use App\Models\Email;
use Illuminate\Support\Facades\Auth; //Fixes IDE warnings

class ContactController extends Controller
{


    public function index()
    {
        $contacts = Contact::with('emails')->latest()->get();
        // $contacts = Contact::latest()->get();
        return Inertia::render('contacts/index', [

            'contacts' => $contacts,
        ]);
    }



    public function create()
    {
        return Inertia::render('contacts/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'company' => 'nullable',
            'emails' => 'array',
            'emails.*.email' => 'nullable|email',
        ]);

        $contact = Contact::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'company' => $validated['company'] ?? null,
            'owner_id' => $request->user()->id
        ]);

        // Save multiple emails
        foreach ($validated['emails'] ?? [] as $emailData) {
            if (!empty($emailData['email'])) {
                $contact->emails()->create([
                    'email' => $emailData['email']
                ]);
            }
        }

        return redirect('/contacts');
    }

    public function edit(Contact $contact)
    {
        $contact->load('emails');

        return Inertia::render('contacts/edit', [
            'contact' => $contact
        ]);
    }

    public function update(Request $request, Contact $contact)
    {
        $validated = $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'company' => 'nullable',
            'emails' => 'array',
            'emails.*.email' => 'nullable|email',
        ]);

        // Update contact
        $contact->update([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'company' => $validated['company'] ?? null,
        ]);

        // STEP A: Get existing email IDs from request
        $incomingIds = collect($validated['emails'])
            ->pluck('id')
            ->filter();

        // STEP B: Delete removed emails
        $contact->emails()
            ->whereNotIn('id', $incomingIds)
            ->delete();

        // 🔥 STEP C: Update or create emails
        foreach ($validated['emails'] as $emailData) {
            if (!empty($emailData['email'])) {
                $contact->emails()->updateOrCreate(
                    ['id' => $emailData['id'] ?? null],
                    ['email' => $emailData['email']]
                );
            }
        }

        return redirect('/contacts');
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();

        return redirect('/contacts');
    }
}
