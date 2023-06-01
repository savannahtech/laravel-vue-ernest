<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Intervention\Image\Image;

class MyController extends Controller
{
    public function uploadFiles(Request $request)
    {
        $fileNames = [];
        if ($request->hasFile('files')) {
            $files = $request->file('files');
            foreach ($files as $file){
                $img = (new Image)->make('foo.jpg')->resize(300, 200);
                $name = $file->store('/hahah');
                array_push($fileNames,$name);
            }
        }

        return [
            "fileNames"=>$fileNames,
            "request"=>$request,
            "hasfiles"=>$request->hasFile('files'),
            "hasfile"=>$request->hasFile('file'),
            "name"=>$request->name
        ];
    }
}
