<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
abstract class Controller
{

    //get 
    public function getAllTasks()
    {
    $tasks = Task::all();
    return response()->json(['tasks' => $tasks]);
    }

    // post 
    public function addTask(Request $request)
    {
    $validated = $request->validate([
        'title' => 'required|string',
        'description' => 'required|string',
    ]);
      $task = Task::create($validated);
      return response()->json(['success' => 'Task created successfully', 'task' => $task]);
    }

    //put
    public function updateTask(Request $request, $id)
    {
      $validated = $request->validate([
          'title' => 'required|string',
          'description' => 'required|string',
      ]);
      $task = Task::findOrFail($id);
      $task->update($validated);
      return response()->json(['success' => 'Task updated successfully', 'task' => $task]);
    }

    //delete 
    public function deleteTask($id)
    {
        Task::destroy($id);
        return response()->json(['success' => 'Task deleted successfully']);
    }

    //patch 
    public function markCompleted($id)
    {
        $task = Task::findOrFail($id);
        $task->is_completed = true;
        $task->save();
        return response()->json(['success' => 'Task marked as completed', 'task' => $task]);
    }
}
