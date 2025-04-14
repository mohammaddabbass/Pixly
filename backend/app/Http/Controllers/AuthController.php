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
    
        $this->logLoginAttempt($request, $user);

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
        $this->logLoginAttempt($request, $user);

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
        $request->user()->token()->revoke(); 

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
            // $ip = '194.246.91.157'; 
            $geolocation = $this->getGeolocationData($ip);
            $userAgent = $request->userAgent();
    
            $loc = isset($geolocation['loc']) ? explode(',', $geolocation['loc']) : [];
            
            LoginHistory::create([
                'user_id' => $user->id,
                'ip_address' => $ip,
                'city' => $geolocation['city'] ?? null,
                'country' => $geolocation['country'] ?? null,
                'user_agent' => $userAgent,
                'latitude' => $loc[0] ?? null,
                'longitude' => $loc[1] ?? null
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
    
            if (!$response->successful()) {
                return null;
            }
    
            $data = $response->json();
            
            // Add fallback for missing location data
            if (!isset($data['loc']) && isset($data['latitude'], $data['longitude'])) {
                $data['loc'] = "{$data['latitude']},{$data['longitude']}";
            }
    
            return $data;
    
        } catch (\Exception $e) {
            Log::error('Geolocation lookup failed: '.$e->getMessage());
            return null;
        }
    }
}
