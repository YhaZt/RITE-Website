<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UnitSubmission;
use App\Models\SubmissionStatusLog;
use App\Mail\SubmissionStatusUpdated;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UnitSubmissionController extends Controller
{
    private const STATUSES = ['pending', 'reviewing', 'reviewed', 'decline', 'approve', 'suggestion'];
    public function index()
    {
        return response()->json(UnitSubmission::orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'target_unit' => 'required|string',
            'sender_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
            'attachment' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx,jpg,jpeg,png|max:10240',
        ]);

        $filePath = null;
        $fileName = null;

        if ($request->hasFile('attachment')) {
            $file = $request->file('attachment');
            $fileName = $file->getClientOriginalName();
            $path = $file->store('submissions', 'public');
            $filePath = '/storage/' . $path;
        }

        $submission = UnitSubmission::create([
            'target_unit' => $validated['target_unit'],
            'sender_name' => $validated['sender_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'subject' => $validated['subject'] ?? 'Unit Submission',
            'message' => $validated['message'],
            'file_path' => $filePath,
            'file_name' => $fileName,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Submission received successfully!',
            'submission' => $submission
        ], 201);
    }

    public function updateStatus(Request $request, $id)
    {
        $submission = UnitSubmission::findOrFail($id);
        $validated = $request->validate([
            'status' => 'required|string|in:' . implode(',', self::STATUSES),
            'admin_note' => 'required|string|max:2000',
        ]);

        $oldStatus = $submission->status;
        $newStatus = $validated['status'];

        $submission->update(['status' => $newStatus]);

        $log = SubmissionStatusLog::create([
            'submission_id' => $submission->id,
            'old_status' => $oldStatus,
            'new_status' => $newStatus,
            'admin_note' => $validated['admin_note'],
            'changed_by' => Auth::id(),
        ]);

        try {
            Mail::to($submission->email)->send(
                new SubmissionStatusUpdated($submission, $oldStatus, $newStatus, $validated['admin_note'])
            );
            $log->update(['emailed_at' => now()]);
        } catch (\Throwable $e) {
            report($e);
        }

        return response()->json($submission->fresh());
    }

    public function destroy($id)
    {
        $submission = UnitSubmission::findOrFail($id);
        $submission->delete();

        return response()->json(['message' => 'Submission archived successfully']);
    }

    public function previewFile(Request $request)
    {
        $validated = $request->validate([
            'path' => 'required|string',
        ]);

        $relative = ltrim(str_replace(['/storage/', 'storage/'], '', $validated['path']), '/');

        if (!str_starts_with($relative, 'submissions/')) {
            abort(403, 'Invalid file path');
        }

        if (!Storage::disk('public')->exists($relative)) {
            abort(404, 'File not found');
        }

        return Storage::disk('public')->response($relative);
    }
}
