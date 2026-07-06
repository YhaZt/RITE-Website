<?php

namespace App\Mail;

use App\Models\UnitSubmission;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SubmissionStatusUpdated extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public UnitSubmission $submission,
        public string $oldStatus,
        public string $newStatus,
        public string $adminNote,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Update on your RITE submission: ' . ($this->submission->subject ?? 'Unit Submission'),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.submission-status-updated',
        );
    }
}
