@extends('master')

@section('content')
    @auth()
        <main-app :auth-user="{{$auth}}" ></main-app>
    @else
        <main-app ></main-app>
    @endauth

@endsection
