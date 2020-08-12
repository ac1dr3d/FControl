<?php

use Illuminate\Support\Facades\Route;

/*
  |--------------------------------------------------------------------------
  | Web Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register web routes for your application. These
  | routes are loaded by the RouteServiceProvider within a group which
  | contains the "web" middleware group. Now create something great!
  |
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/addadmin', function () {
    $user = new App\User();
    $user->username = 'admin';
    $user->is_admin = 1;
    $user->password = Hash::make('admin');
    try{
        $user->save();
        return 'admin added';
    }catch(Exception $e){
        return 'admin exists';
    }
});

Auth::routes(['register' => false,'reset'=>false]);

Route::get('/home', 'HomeController@index')->name('home');
