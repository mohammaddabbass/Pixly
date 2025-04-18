<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MessageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(["prefix" => "v0.1"], function() {
    Route::group(["middleware" => "auth:api"], function() {
        Route::group(["prefix" => "user"], function() {

            Route::get('/validate-token', [AuthController::class, 'validateToken']);
            Route::post('/save-message', [MessageController::class, 'saveMessage']);
            Route::get('/get-messages', [MessageController::class, 'getAll']);

        });
    }); 

    Route::group(["prefix" => "guest"], function() {
        Route::post("/login", [AuthController::class, "login"]);
        Route::post("/register", [AuthController::class, "register"]);
    });
});