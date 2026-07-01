<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of contact submissions.
     */
    public function index()
    {
        return response()->json(ContactSubmission::latest()->get());
    }

    /**
     * Store a newly created contact submission.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        $submission = ContactSubmission::create($validated);

        return response()->json(['message' => 'Your message has been submitted successfully!', 'data' => $submission], 201);
    }

    /**
     * Display the specified contact submission.
     */
    public function show(string $id)
    {
        $submission = ContactSubmission::findOrFail($id);
        return response()->json($submission);
    }

    /**
     * Update status or details of contact submission.
     */
    public function update(Request $request, string $id)
    {
        $submission = ContactSubmission::findOrFail($id);

        $validated = $request->validate([
            'status' => 'sometimes|required|string|in:unread,read,replied,archived',
        ]);

        $submission->update($validated);

        return response()->json(['message' => 'Contact submission updated successfully', 'data' => $submission]);
    }

    /**
     * Remove the specified contact submission.
     */
    public function destroy(string $id)
    {
        $submission = ContactSubmission::findOrFail($id);
        $submission->delete();

        return response()->json(['message' => 'Contact submission deleted successfully']);
    }
}
