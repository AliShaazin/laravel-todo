<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;



// auth task routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/tasks', [TaskController::class, 'addTask']);
    Route::put('/tasks/{id}', [TaskController::class, 'updateTask']);
    Route::delete('/tasks/{id}', [TaskController::class, 'deleteTask']);
    Route::patch('/tasks/{id}/complete', [TaskController::class, 'markCompleted']);
    Route::get('/tasks', [TaskController::class, 'getAllTasks']);
});

// user routes
Route::post('/users', [UserController::class, 'addUser']);
Route::post('/login', [UserController::class, 'loginUser']);


// auth user routes
Route::middleware('auth:sanctum')->get('/users', [UserController::class, 'getAllUsers']);