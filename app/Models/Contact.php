<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = ['first_name', 'last_name', 'company', 'owner_id'];
    protected $table = 'contacts';

    public function emails()
    {
        return $this->hasMany(Email::class);
    }
    
    public function phones()
    {
        return $this->hasMany(Phone::class);
    }
}
