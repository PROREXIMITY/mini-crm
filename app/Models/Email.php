<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Email extends Model
{

    protected $fillable = ['email'];
    public function contact()
    {

        return $this->belongsTo(Contact::class); //“This contact owns many emails”
    }

    

    
}
