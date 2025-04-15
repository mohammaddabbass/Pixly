<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function saveMessage(Request $request) 
    {
        $request->validate([
            'message' => 'required|string'
        ]);

        $message = Message::create([
            'user_id' => Auth::id(),
            'content' => $request->message
        ]);

        return response()->json([
            'message' => $message,
            'user' => [
                'id' => Auth::id(),
                'name' => Auth::user()->name
            ]
        ], 201);
    }
}