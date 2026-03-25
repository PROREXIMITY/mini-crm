<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Contact;
use Illuminate\Support\Facades\Auth; //Fixes IDE warnings

class ContactController extends Controller
{


    public function index() {
        $contacts = Contact::latest()->get();
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
    ]);

    Contact::create([
        ...$validated,
        'owner_id' => Auth::id(),
    ]);

    return redirect('/contacts');
}

public function edit(Contact $contact)
{
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
    ]);

    $contact->update($validated);

    return redirect('/contacts');
}

public function destroy(Contact $contact)
{
    $contact->delete();

    return redirect('/contacts');
}



}




