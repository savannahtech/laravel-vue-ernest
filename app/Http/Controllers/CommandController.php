<?php

namespace App\Http\Controllers;

use App\Jobs\ExecuteCommandJob;
use App\Models\Command;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use function Symfony\Component\String\s;

class CommandController extends Controller
{
    public function broadcast(Request $request)
    {
//        Log::info(\session('commands'));
        $this->initCommandsInSession();


        $command = Command::getCommandFromRequest($request);
        ExecuteCommandJob::dispatch($command);
        $commands = \session('commands');
        array_push($commands, $command);
        \session(['commands'=>$commands]);
        return ["ok" => "Added to queue"];
    }

    public function initCommandsInSession(){
     $data = session('commands');
     if (!$data || !is_array($data)){
         session(['commands'=>[]]);
     }
    }

}
