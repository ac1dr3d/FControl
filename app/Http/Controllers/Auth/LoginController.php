<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\User;

class LoginController extends Controller
{
    /*
      |--------------------------------------------------------------------------
      | Login Controller
      |--------------------------------------------------------------------------
      |
      | This controller handles authenticating users for the application and
      | redirecting them to your home screen. The controller uses a trait
      | to conveniently provide its functionality to your applications.
      |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    protected $maxAttempts = 300; // Default is 5
    protected $decayMinutes = 0; // Default is 1
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return Response
     */
    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');
        if (Auth::attempt($credentials,(bool) $request->remember=='on')) {
            //    Authentication passed...
            return redirect()->intended('home');
        }else{
            $user  = User::where('username',$request->username) -> first();
            if($user ==null)
                throw ValidationException::withMessages([
                    'username'=> 'Check Username'
                ]);
            else
                throw ValidationException::withMessages([
                    'password'=> 'Check Password'
                ]);
        }
    }
}
