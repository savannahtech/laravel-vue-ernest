// window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

// try {
//     window.Popper = require('popper.js').default;
//     window.$ = window.jQuery = require('jquery');
//
//     require('bootstrap');
// } catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    encrypted: false,
    // wsHost: window.location.hostname,
    // wsPort: process.env.MIX_WEBSOCKET_PORT,
    // wssPort: process.env.MIX_WEBSOCKET_PORT,
    // disableStats: false,
    // forceTLS: false,
    // enabledTransports: ['ws']
    // enabledTransports: ['ws','wss','flash']
});

if (process.env.APP_ENV !== 'production') {
    window.Pusher.logToConsole = true;
}

window.Echo.connector.pusher.connection.bind('connecting', (payload) => {
    /**
     * All dependencies have been loaded and Channels is trying to connect.
     * The connection will also enter this state when it is trying to reconnect after a connection failure.
     */

    console.log('connecting...');

});

window.Echo.connector.pusher.connection.bind('connected', (payload) => {

    /**
     * The connection to Channels is open and authenticated with your app.
     */

    console.log('connected!', payload);
});

window.Echo.connector.pusher.connection.bind('unavailable', (payload) => {

    /**
     *  The connection is temporarily unavailable. In most cases this means that there is no internet connection.
     *  It could also mean that Channels is down, or some intermediary is blocking the connection. In this state,
     *  pusher-js will automatically retry the connection every 15 seconds.
     */

    console.log('unavailable', payload);
});

window.Echo.connector.pusher.connection.bind('failed', (payload) => {

    /**
     * Channels is not supported by the browser.
     * This implies that WebSockets are not natively available and an HTTP-based transport could not be found.
     */

    console.log('failed', payload);

});

window.Echo.connector.pusher.connection.bind('disconnected', (payload) => {

    /**
     * The Channels connection was previously connected and has now intentionally been closed
     */

    console.log('disconnected', payload);

});
