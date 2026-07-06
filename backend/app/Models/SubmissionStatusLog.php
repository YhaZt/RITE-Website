<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubmissionStatusLog extends Model
{
    protected $fillable = [
        'submission_id',
        'old_status',
        'new_status',
        'admin_note',
        'changed_by',
        'emailed_at',
    ];

    protected $casts = [
        'emailed_at' => 'datetime',
    ];

    public function submission(): BelongsTo
    {
        return $this->belongsTo(UnitSubmission::class, 'submission_id');
    }

    public function changedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'changed_by');
    }
}
