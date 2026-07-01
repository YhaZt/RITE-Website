<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UnitSubmission extends Model
{
    use HasFactory;

    protected $fillable = [
        'target_unit',
        'sender_name',
        'email',
        'phone',
        'subject',
        'message',
        'file_path',
        'file_name',
        'status',
    ];
}
