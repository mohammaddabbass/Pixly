<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function save(Request $request) {
        $request->validate([
            'message' => 'required|string',
            'user_id' => 'required|exists:users,id'
        ]);

        $message = Message::create([
            'user_id' => $request->user_id,
            'message' => $request->message
        ]);

        return response()->json($message, 201);
    }
}
