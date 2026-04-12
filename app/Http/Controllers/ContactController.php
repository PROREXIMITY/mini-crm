<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Contact;
use App\Models\Email;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;

class ContactController extends Controller
{


    public function index()
    {
        $contacts = Contact::with('emails', 'phones', 'activities')->latest()->get();
        // $contacts = Contact::latest()->get();
        return Inertia::render('contacts/ContactsPage', [

            'contacts' => $contacts,
        ]);
    }



    public function create()
    {
        return Inertia::render('contacts/create');
    }

    public function store(StoreContactRequest $request)
    {
        $validated = $request->validated();

        $contact = Contact::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'company' => $validated['company'] ?? null,
            'user_id' => $request->user()->id,
        ]);

        // Save multiple emails
        foreach ($validated['emails'] ?? [] as $emailData) {
            if (!empty($emailData['email'])) {
                $contact->emails()->create([
                    'email' => $emailData['email']
                ]);
            }
        }

        // Save multiple phones
        foreach ($validated['phones'] ?? [] as $phoneData) {
            $phone = is_array($phoneData) ? ($phoneData['phone'] ?? null) : $phoneData;
            if (!empty($phone)) {
                $contact->phones()->create([
                    'phone' => $phone
                ]);
            }
        }

        return redirect('/contacts');
    }

    public function edit(Contact $contact)
    {
        $contact->load('emails', 'phones');

        return Inertia::render('contacts/edit', [
            'contact' => $contact
        ]);
    }

    public function update(UpdateContactRequest $request, Contact $contact)
    {
        $validated = $request->validated();

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

        // STEP C: Update or create emails
        foreach ($validated['emails'] as $emailData) {
            if (!empty($emailData['email'])) {
                $contact->emails()->updateOrCreate(
                    ['id' => $emailData['id'] ?? null],
                    ['email' => $emailData['email']]
                );
            }
        }

        $incomingPhoneIds = collect($validated['phones'])
            ->pluck('id')
            ->filter();

        $contact->phones()
            ->whereNotIn('id', $incomingPhoneIds)
            ->delete();

        foreach ($validated['phones'] as $phoneData) {
            if (!empty($phoneData['phone'])) {
                $contact->phones()->updateOrCreate(
                    ['id' => $phoneData['id'] ?? null],
                    ['phone' => $phoneData['phone']]
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
