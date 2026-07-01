<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UnitSubmission;
use Illuminate\Support\Facades\Storage;

class UnitSubmissionController extends Controller
{
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
            'attachment' => 'nullable|file|mimes:pdf,doc,docx,jpg,png,zip|max:10240',
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
            'status' => 'required|string|in:pending,reviewed,completed'
        ]);
        $submission->update(['status' => $validated['status']]);
        return response()->json($submission);
    }

    public function destroy($id)
    {
        $submission = UnitSubmission::findOrFail($id);
        if ($submission->file_path) {
            $relative = str_replace('/storage/', '', $submission->file_path);
            Storage::disk('public')->delete($relative);
        }
        $submission->delete();
        return response()->json(['message' => 'Submission deleted successfully']);
    }
}
