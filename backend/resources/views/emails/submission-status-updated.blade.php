<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; }
        .container { max-width: 600px; margin: 0 auto; padding: 24px; }
        .header { background: #094A25; color: #fff; padding: 20px 24px; border-radius: 8px 8px 0 0; }
        .body { background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px; }
        .status { display: inline-block; padding: 4px 12px; border-radius: 999px; font-weight: bold; font-size: 14px; background: #dbeafe; color: #1d4ed8; }
        .note { background: #fff; border-left: 4px solid #094A25; padding: 12px 16px; margin: 16px 0; }
        .meta { font-size: 13px; color: #64748b; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 style="margin:0;">RITE — Submission Update</h2>
            <p style="margin:8px 0 0; opacity:0.9;">Mindoro State University</p>
        </div>
        <div class="body">
            <p>Dear {{ $submission->sender_name }},</p>
            <p>Your submission has been updated. Here are the details:</p>

            <p class="meta"><strong>Subject:</strong> {{ $submission->subject ?? 'Unit Submission' }}</p>
            <p class="meta"><strong>Target unit:</strong> {{ $submission->target_unit }}</p>
            <p><strong>Status:</strong> <span class="status">{{ ucfirst($newStatus) }}</span></p>

            <div class="note">
                <strong>Message from RITE staff:</strong><br>
                {{ $adminNote }}
            </div>

            <p>If you have questions, please reply to this email or contact the relevant RITE unit directly.</p>
            <p class="meta">This is an automated notification from the RITE website.</p>
        </div>
    </div>
</body>
</html>
