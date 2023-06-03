<?php

namespace Tests\Unit;

use App\Http\Controllers\CommandController;
use PHPUnit\Framework\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
        $commCon = new CommandController();
        $result = $commCon->doCalculation(9,4);
        $this->assertTrue(true);
    }
}
