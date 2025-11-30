<?php

namespace App\Http\Controllers;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{

    //get 
    public function index()
    {
    $tasks = Task::all();
    return response()->json(['tasks' => $tasks]);
    }

    // post 
    public function store(Request $request)
    {
    $validated = $request->validate([
        'title' => 'required|string',
        'description' => 'required|string',
    ]);
      $task = Task::create($validated);
      return response()->json(['success' => 'Task created successfully', 'task' => $task]);
    }

    //put
    public function update(Request $request, $id)
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
    public function destroy($id)
    {
        Task::destroy($id);
        return response()->json(['success' => 'Task deleted successfully']);
    }

    //patch 
    public function markCompleted($id)
    {
        $task = Task::findOrFail($id);
        $task->is_completed = !$task->is_completed; 
        $task->save();
        return response()->json(['message' => 'Task marked as completed', 'task' => $task]);
    }
}
