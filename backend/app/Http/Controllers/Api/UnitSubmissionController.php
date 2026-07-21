<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSubmissionRequest;
use App\Http\Requests\UpdateSubmissionStatusRequest;
use App\Mail\SubmissionStatusUpdated;
use App\Models\SubmissionStatusLog;
use App\Models\UnitSubmission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class UnitSubmissionController extends Controller
{
    public function index()
    {
        return response()->json(UnitSubmission::orderBy('created_at', 'desc')->get());
    }

    public function store(StoreSubmissionRequest $request)
    {
        $validated = $request->validated();

        $filePath = null;
        $fileName = null;

        if ($request->hasFile('attachment')) {
            $file = $request->file('attachment');
            $fileName = $file->getClientOriginalName();
            $path = $file->store('submissions', 'public');
            $filePath = '/storage/'.$path;
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
            'submission' => $submission,
        ], 201);
    }

    public function updateStatus(UpdateSubmissionStatusRequest $request, $id)
    {
        $submission = UnitSubmission::findOrFail($id);
        $validated = $request->validated();

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
            'path' => 'required|string|max:1024',
        ]);

        $relative = ltrim(str_replace(['\\', '/storage/', 'storage/'], ['/', '', ''], $validated['path']), '/');

        // Reject path traversal and non-submission paths
        if (
            str_contains($relative, '..')
            || str_contains($relative, "\0")
            || ! str_starts_with($relative, 'submissions/')
        ) {
            abort(403, 'Invalid file path');
        }

        if (! Storage::disk('public')->exists($relative)) {
            abort(404, 'File not found');
        }

        $absolutePath = Storage::disk('public')->path($relative);
        $realPath = realpath($absolutePath);
        $submissionsRoot = realpath(Storage::disk('public')->path('submissions'));

        if ($realPath === false || $submissionsRoot === false || ! str_starts_with($realPath, $submissionsRoot.DIRECTORY_SEPARATOR)) {
            abort(403, 'Invalid file path');
        }

        return response()->file($realPath, [
            'Content-Disposition' => 'inline; filename="'.basename($realPath).'"',
        ]);
    }
}
