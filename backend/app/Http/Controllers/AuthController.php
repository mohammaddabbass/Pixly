<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\LoginHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Laravel\Passport\Client;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
    
        $token = $user->createToken('authToken')->accessToken;
    
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'Bearer',
            ]
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }


        $user = Auth::user();
        /** @var \App\Models\User $user */
        $token = $user->createToken('authToken')->accessToken;

        return response()->json([
            'status' => 'success',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'Bearer',
            ]
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke(); // Revoke the user's token

        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function validateToken(Request $request)
    {
        return response()->json([
            "success" => true,
            "message" => "Token is valid",
            "user" => $request->user()
        ]);
    }

    private function logLoginAttempt($request, $user)
    {
        try {
            $ip = $request->ip();
            $geolocation = $this->getGeolocationData($ip);

            LoginHistory::create([
                'user_id' => $user->id,
                'ip_address' => $ip,
                'geolocation' => $geolocation ? json_encode($geolocation) : null
            ]);
        } catch (\Exception $e) {
            Log::error('Login logging failed: '.$e->getMessage());
        }
    }


    private function getGeolocationData($ip)
    {
        try {
            $response = Http::get("https://ipinfo.io/{$ip}/json", [
                'token' => env('IPINFO_TOKEN')
            ]);

            return $response->successful() ? $response->json() : null;
        } catch (\Exception $e) {
            Log::error('Geolocation lookup failed: '.$e->getMessage());
            return null;
        }
    }
}
