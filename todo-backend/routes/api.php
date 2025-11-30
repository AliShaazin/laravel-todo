<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;


Route::post('/tasks', [TaskController::class, 'addTask']);
Route::put('/tasks/{id}', [TaskController::class, 'updateTask']);
Route::delete('/tasks/{id}', [TaskController::class, 'deleteTask']);
Route::patch('/tasks/{id}/complete', [TaskController::class, 'markCompleted']);
Route::get('/tasks', [TaskController::class, 'getAllTasks']);