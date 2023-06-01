<?php

namespace App\Http\Controllers;

use App\Events\EventA;
use Illuminate\Http\Request;

class CommandController extends Controller
{
    public function broadcast(Request $request)
    {

        if (!$request->filled('message')) {
            return response()->json([
                'message' => 'No message to send'
            ], 422);
        }

        // TODO: Sanitize input

        event(new EventA($request->message, $request->user));

        return response()->json([], 200);
    }
}
