<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\ActivityController;
use App\Models\Contact;
use App\Models\Email;
use App\Models\Activity;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::get('/dashboard', function () {
    return inertia('dashboard', [
        'stats' => [
            'totalContacts' => Contact::count(),
            'totalEmails' => Email::count(),
            'totalCalls' => Activity::where('type', 'call')->count(),
            'totalMeetings' => Activity::where('type', 'meeting')->count(),
        ],
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/contacts', [ContactController::class, 'index'])->name('contacts.index');
    Route::get('/contacts/create', [ContactController::class, 'create'])->name('contacts.create');
    Route::post('/contacts', [ContactController::class, 'store'])->name('contacts.store');

    //Edit and Delete routes for contacts
    Route::put('/contacts/{contact}', [ContactController::class, 'update']);
    Route::delete('/contacts/{contact}', [ContactController::class, 'destroy']);

    Route::post('/contacts/{contact}/notes', [NoteController::class, 'store']);
    Route::delete('/notes/{note}', [NoteController::class, 'destroy']);

    // Activity Timeline API Routes
    Route::get('/contacts/{contact}/activities', [ActivityController::class, 'index']);
    Route::post('/contacts/{contact}/activities', [ActivityController::class, 'store']);
    Route::delete('/activities/{activity}', [ActivityController::class, 'destroy']);
});




require __DIR__ . '/settings.php';
