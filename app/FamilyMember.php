<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FamilyMember extends Model
{
    protected $fillable = [
        'firstname', 'lastname', 'age', 'relation',
        'profession', 'last_edited_at', 'last_edited_by',
    ];
    protected $dates = [
        'last_edited_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }
   
    public function editor()
    {
        return $this->belongsTo(User::class, 'id', 'last_edited_by');
    }
    // protected $fillable = ['firstname',"lastname","age","relation","profession","user_id","last_edited_at","last_edited_by"];
}
