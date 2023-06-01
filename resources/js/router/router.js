import Vue from 'vue';
import VueRouter from 'vue-router';
import goTo from 'vuetify/es5/services/goto';
import store from "../store/VuexStore";

Vue.use(VueRouter);

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.

const routes = [
    {path: '/', component: require('../components/Home').default, name: "Home", meta: {requiresAuth: false}},
    {path: '/login', component: require('../components/LogIn').default, name: "Login", meta: {requiresAuth: false}},
    {
        path: '/register',
        name: "Register",
        meta: {requiresAuth: false},
        component: require('../components/Register').default
    },
    /*
    {
        name: "FilesUpload",
        path: '/files-upload',
        meta: {requiresAuth: true},
        component: require('../components/FilesUpload').default
    },*/


    {path: '*', component: require('../components/NotFound').default, name: "NotFound", meta: {requiresAuth: false}},
];


let options = {
    duration: 1000,
    offset: 1,
    easing: 'easeInOutCubic',
}

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    mode: 'history',
    routes,// short for `routes: routes`

    scrollBehavior: (to, from, savedPosition) => {
        let scrollTo = 0

        if (to.hash) {
            scrollTo = to.hash
        } else if (savedPosition) {
            scrollTo = savedPosition.y
        }

        return goTo(scrollTo, options)
    },
});

/*router.beforeRouteUpdate ((to, from, next) => {
    // Check for auth pages
    if (to.meta.requiresAuth) {
        if (store.getters.isAuth) {
            next()
        }
        else {
            //    Has logged in
            router.push(
                {
                    name: 'Login',
                    query: {
                        redirect: router.currentRoute.fullPath
                    }
                })

        }

    }else {
        next()
    }
} )*/

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (store.getters.isAuth) {
            next()
        } else {
            if ("Login" !== router.currentRoute.name) {
                router.push({
                    name: "Login",
                    query: {redirect: to.fullPath}
                })
            }

        }
    } else {
        next()

    }
})


export default router;
