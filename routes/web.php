<?php

use App\Events\CommandEvent;
use App\Http\Controllers\CommandController;
use App\Models\Command;
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

//Route::get('/', function () {
//    return view('welcome');
//});


Auth::routes();


Route::get('/login',function (){
    if (auth()->check()){
        $auth = Auth::check() ? auth()->user():[];

        return view('main',compact('auth'));
    }else{
        $auth = Auth::check() ? auth()->user():[];

        return view('main',compact('auth'));
    }


});

Route::get('/ok',function (){
    $command = new Command('12','Some Title', 'A', 123, 22, 44);

    broadcast(new CommandEvent($command));

   return ["data" => "command"];
});

Route::post('/clear',function (){
    session(['commands'=>[]]);

    return ["commands" => session('commands')];
});

Route::post('/user',function (){
   return auth()->user();
});


Route::get('login', function (){
    $auth = Auth::check() ? auth()->user():[];
    return view('main',compact('auth'));
});

Route::get('/register',function (){
    $auth = Auth::check() ? auth()->user():[];
    return view('main',compact('auth'));

});

Route::get('{name}', function (){
    $auth = Auth::check() ? auth()->user():[];
    return view('main',compact('auth',));
})->where('name','([A-z0-9\-/_.]+)?');



function sendToMain(){
    $auth = Auth::check() ? auth()->user():[];
    return view('main',compact('auth'));
}

Route::post('/send-command', [CommandController::class, 'broadcast']);
