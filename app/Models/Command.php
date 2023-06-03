<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Command
{
    use HasFactory;

    public $id;
    public $title;
    public $type;
    public $value;
    public $start;
    public $stop;

    /**
     * Command constructor.
     * @param $id
     * @param $title
     * @param $type
     * @param $value
     * @param $start
     * @param $stop
     */
    public function __construct($id, $title, $type, $value, $start, $stop)
    {
        $this->id = $id;
        $this->title = $title;
        $this->type = $type;
        $this->value = $value;
        $this->start = $start;
        $this->stop = $stop;
    }

    public static function getCommandFromRequest($request): Command
    {
        return new Command($request->id, $request->title, $request->type, $request->value, $request->start, $request->stop);
    }

    public function __toString()
    {
        return serialize($this);
    }


}
