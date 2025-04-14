<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoginHistory extends Model
{
    const UPDATED_AT = null;

    protected $fillable = [
        'user_id',
        'ip_address',
        'city',
        'country',
        'user_agent',
        'latitude',
        'longitude'
    ];
}
