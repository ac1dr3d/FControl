<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FamilyMember extends Model
{
    protected $dates = [
        'last_edited_at',
    ];

    public function editor()
    {
        return $this->belongsTo(User::class, 'id', 'last_edited_by');
    }
}
