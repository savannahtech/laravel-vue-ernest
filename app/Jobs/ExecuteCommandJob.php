<?php

namespace App\Jobs;

use App\Events\CommandEvent;
use App\Models\Command;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Session;


class ExecuteCommandJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var Command
     */
    private $command;

    /**
     * Create a new job instance.
     *
     * @param Command $command
     */
    public function __construct(Command $command)
    {
       $this->command = $command;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
//        $this->command = $this->getCommandsAsArray()[0];
        $this->command->value = $this->command->stop + $this->command->start;
        broadcast(new CommandEvent($this->command));

    }

    public function getCommandsAsArray(){
       $commands = \session('commands');
       if (is_array($commands)){
//           usort($commands, 'type');
           return $commands;
       }
       return [];
    }


}
