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
    $today = now()->toDateString();
    
    return inertia('dashboard', [
        'stats' => [
            'totalContacts' => Contact::count(),
            'totalEmails' => Email::count(),
            'totalCalls' => Activity::where('type', 'call')->count(),
            'totalMeetings' => Activity::where('type', 'meeting')->count(),
        ],
        'todayStats' => [
            'newContacts' => Contact::whereDate('created_at', $today)->count(),
            'emailsSent' => Activity::where('type', 'email')->whereDate('created_at', $today)->count(),
            'callsMade' => Activity::where('type', 'call')->whereDate('created_at', $today)->count(),
            'meetings' => Activity::where('type', 'meeting')->whereDate('created_at', $today)->count(),
        ],
        'recentActivities' => Activity::with('contact')
            ->latest()
            ->limit(5)
            ->get(),
        'favoriteContacts' => Contact::where('is_favorite', true)
            ->with('emails', 'phones')
            ->latest()
            ->limit(3)
            ->get(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/contacts', [ContactController::class, 'index'])->name('contacts.index');
    Route::post('/contacts', [ContactController::class, 'store'])->name('contacts.store');

    //Edit and Delete routes for contacts
    Route::put('/contacts/{contact}', [ContactController::class, 'update']);
    Route::delete('/contacts/{contact}', [ContactController::class, 'destroy']);
    Route::patch('/contacts/{contact}/favorite', [ContactController::class, 'toggleFavorite']);

    Route::post('/contacts/{contact}/notes', [NoteController::class, 'store']);
    Route::delete('/notes/{note}', [NoteController::class, 'destroy']);

    // Activity Timeline API Routes
    Route::get('/contacts/{contact}/activities', [ActivityController::class, 'index']);
    Route::post('/contacts/{contact}/activities', [ActivityController::class, 'store']);
    Route::delete('/activities/{activity}', [ActivityController::class, 'destroy']);
});




require __DIR__ . '/settings.php';
