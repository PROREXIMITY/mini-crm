<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $table = 'activities';

    protected $fillable = [
        'contact_id',
        'user_id',
        'type',
        'content',
        'metadata',
    ];

    protected $casts = [
        'metadata' => 'json',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relationships
    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Scopes
    public function scopeLatestFirst($query)
    {
        return $query->orderBy('created_at', 'desc');
    }

    public function scopeByContact($query, $contactId)
    {
        return $query->where('contact_id', $contactId);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    // Accessors for activity type icons
    public function getActivityIconAttribute()
    {
        return match ($this->type) {
            'call' => '☎️',
            'email' => '📧',
            'meeting' => '📅',
            'note' => '📝',
            default => '📌',
        };
    }

    public function getActivityLabelAttribute()
    {
        return match ($this->type) {
            'call' => 'Call',
            'email' => 'Email',
            'meeting' => 'Meeting',
            'note' => 'Note',
            default => 'Activity',
        };
    }
}
