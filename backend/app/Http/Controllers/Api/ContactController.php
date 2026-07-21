<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Models\ContactSubmission;

class ContactController extends Controller
{
    public function index()
    {
        return response()->json(ContactSubmission::latest()->get());
    }

    public function store(StoreContactRequest $request)
    {
        $submission = ContactSubmission::create($request->validated());

        return response()->json([
            'message' => 'Your message has been submitted successfully!',
            'data' => $submission,
        ], 201);
    }

    public function show(string $contact)
    {
        $submission = ContactSubmission::findOrFail($contact);

        return response()->json($submission);
    }

    public function update(UpdateContactRequest $request, string $contact)
    {
        $submission = ContactSubmission::findOrFail($contact);
        $submission->update($request->validated());

        return response()->json([
            'message' => 'Contact submission updated successfully',
            'data' => $submission,
        ]);
    }

    public function destroy(string $contact)
    {
        $submission = ContactSubmission::findOrFail($contact);
        $submission->delete();

        return response()->json(['message' => 'Contact submission archived successfully']);
    }
}
