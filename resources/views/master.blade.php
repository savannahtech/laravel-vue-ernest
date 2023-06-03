<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
{{--    Favicons--}}
    <link rel="apple-touch-icon" sizes="180x180" href="{{asset('favicon/apple-touch-icon.png',config('app.secure', false))}}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{asset('favicon/favicon-32x32.png',config('app.secure', false))}}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{asset('favicon/favicon-16x16.png',config('app.secure', false))}}">
    <link rel="icon" href="{{asset('/favicon-16x16.png',config('app.secure', false))}}">
    <link rel="manifest" href="/site.webmanifest">

        <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="{{asset('favicon/apple-touch-icon.png',config('app.secure', false))}}">
    <meta name="theme-color" content="#ffffff">

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

{{--    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">--}}
{{--    <link rel="icon" href="/favicon.ico" type="image/x-icon">--}}
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'KMT') }}</title>

    <!-- Scripts -->
{{--    <script src="{{ asset('js/app.js') }}" defer></script>--}}

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
{{--    <link href="{{ asset('css/app.css') }}" rel="stylesheet">--}}


    @if (config('app.env') == 'local')
        <link rel="stylesheet" href="{{asset('css/app.css')}}">
    @else
        <link rel="stylesheet" href="{{asset(mix('css/app.css'), true)}}">
    @endif


</head>
<body>
<div id="app">
    <main class="py-4">
        @yield('content')
    </main>
</div>

@if (config('app.env') == 'local')
    <script src="{{asset('js/app.js')}}"></script>
@else
    <script src="{{asset(mix('js/app.js'), true)}}"></script>
@endif
</body>
</html>
