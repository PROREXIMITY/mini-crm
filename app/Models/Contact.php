<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = ['user_id', 'first_name', 'last_name', 'company', 'is_favorite'];
    protected $table = 'contacts';
    
    protected $casts = [
        'is_favorite' => 'boolean',
    ];

    public function emails()
    {
        return $this->hasMany(Email::class);
    }

    public function phones()
    {
        return $this->hasMany(Phone::class);
    }

    public function notes()
    {
        return $this->hasMany(Note::class);
    }

    public function activities()
    {
        return $this->hasMany(Activity::class)->orderByDesc('created_at');
    }
}
