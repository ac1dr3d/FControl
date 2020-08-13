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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::resource('users', 'UserController')->except(['create', 'edit']);

Route::middleware('auth:sanctum')->group(function () {
    Route::resource('/users/{user}/familyMembers', 'FamilyController');
});
Route::middleware('auth:sanctum', 'admin')->group(function () {
    Route::resource('/users/members', 'UserController');
});
Route::middleware('auth:sanctum')->post('/search','SearchController@search');
