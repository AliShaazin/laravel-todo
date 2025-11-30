<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{
    // get all users 
    public function getAllUsers()
    {
        $users = User::all();
        return response()->json(['users' => $users, 'success' => 'Users retrieved successfully']);
    }

 

}
