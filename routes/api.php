<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum','admin')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum','admin')->post('/family/add', function (Request $request) {
    $validatedData = $request->validate([
        'firstname' => 'required|max:255',
        'lastname' => 'required|max:255',
        'age' => 'required|integer',
        'relation' => 'required|max:255',
        'profession' => 'required|max:255',
    ]);
    return "OK";
});
