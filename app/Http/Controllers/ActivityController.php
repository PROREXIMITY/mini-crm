<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ActivityController extends Controller
{
    /**
     * Get all activities for a contact, grouped by date
     */
    public function index(Contact $contact)
    {
        $activities = $contact
            ->activities()
            ->with('user')
            ->latestFirst()
            ->get();

        return response()->json([
            'activities' => $this->groupActivitiesByDate($activities),
        ]);
    }

    /**
     * Store a new activity
     */
    public function store(Request $request, Contact $contact)
    {
        $validated = $request->validate([
            'type' => 'required|in:note,call,email,meeting',
            'content' => 'required|string|min:1',
            'metadata' => 'nullable|json',
        ]);

        $activity = $contact->activities()->create([
            'type' => $validated['type'],
            'content' => $validated['content'],
            'metadata' => $validated['metadata'] ?? null,
            'user_id' => $request->user()->id,
        ]);

        return redirect()->back()->with('success', 'Activity added successfully');
    }

    /**
     * Delete an activity
     */
    public function destroy(Activity $activity)
    {
        $activity->delete();

        return redirect()->back()->with('success', 'Activity deleted successfully');
    }

    /**
     * Group activities by date (Today, Yesterday, Older)
     */
    private function groupActivitiesByDate($activities)
    {
    $grouped = [];

    $timezone = config('app.timezone');

    $today = Carbon::now($timezone)->startOfDay();
    $yesterday = $today->copy()->subDay();

    foreach ($activities as $activity) {
        // 🔥 THIS IS THE IMPORTANT FIX
        $activityDate = Carbon::parse($activity->created_at)
            ->setTimezone($timezone)
            ->startOfDay();

        if ($activityDate->isSameDay($today)) {
            $group = 'Today';
        } elseif ($activityDate->isSameDay($yesterday)) {
            $group = 'Yesterday';
        } else {
            $group = $activityDate->format('M d, Y');
        }

        if (!isset($grouped[$group])) {
            $grouped[$group] = [];
        }

        $grouped[$group][] = $activity->append([
            'activity_icon',
            'activity_label'
        ]);
    }

    return $grouped;
    }
}
