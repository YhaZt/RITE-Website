<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class UnitSubmission extends Model
{
    use HasFactory, SoftDeletes;

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

    public function statusLogs(): HasMany
    {
        return $this->hasMany(SubmissionStatusLog::class, 'submission_id');
    }
}
