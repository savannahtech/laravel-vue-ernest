import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function showErrorNotification(message = 'Something went wrong!', title = 'Oops...') {
        Vue.swal.fire({
        icon: 'error',
        title: title,
        text: message,
    })
}

const store = new Vuex.Store({
    state: {
        theme: {
            primary: "green darken-3",

        },
        paginator: {
            nextPage: '',
            total: null,
            from: 1,
            to: 1,
        },
        user: {
            is_admin: false,
            img_name: null
        },
        isError: false,
        error: {
            code: 0,
            message: "",
            param: {}
        },
        process: {
            login: 100,
            logout: 200,
            register: 300,
        }
    },
    mutations: {
        updateUser(state, user) {
            state.user = user;
        },
        updateGenders(state, genders) {
            state.genders = genders;
        },
    },
    actions: {
        async loadUser(context) {
            await axios.post('/user').then(res => {
                context.commit('updateUser', res.data);
            })
        },
        loadGet(context, url) {
            return new Promise((resolve, reject) => {
                axios.get(url).then(res => {
                    resolve(res)
                }).catch(error => {
                    if (error.response.status === 419) {
                        context.dispatch('pageExpired');
                    }
                    reject(error)
                })
            })
        },
        loadPost(context, payload) {
            return new Promise((resolve, reject) => {
                axios.post(payload.url, payload).then(res => {
                    resolve(res)
                }).catch(error => {
                    if (error.response.status === 419) {
                        context.dispatch('pageExpired');
                    } else {
                        context.dispatch('registerError')
                    }
                    reject(error)
                })
            })
        },

        login: function (context, payload) {
            let info = payload;
            info.url = "/login";
            return new Promise((resolve, reject) => {
                context.dispatch("loadPost", info).then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        logout(context) {
            return new Promise((resolve) => {
                context.dispatch('loadPost', {
                    url: '/logout'
                }).then(() => {

                    context.commit('updateUser', {
                        is_admin: false,
                    },);
                })
                resolve()
            })
        },
        pageExpired(context) {
            context.commit('updateIsAuth', false)
            location.reload();
        },

        searchByQuery(context, query) {
            return new Promise((resolve, reject) => {
                let url = `/search/${query}`
                context.dispatch('loadGet', url).then(response => {
                    console.log(response)
                    context.commit('saveQueryResults', response)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        loadNext(context) {
            return new Promise(resolve => {
                if (!!context.state.paginator.nextPage) {

                    context.dispatch('loadGet', context.state.paginator.nextPage).then(response => {
                        console.log(response)
                        context.commit('addNextData', response)
                        resolve()
                    })
                }
            })
        },

        showError(context) {
            showErrorNotification(context.state.error.message)
        },
        registerError(context, payload = {}) {
            context.state.error.message = payload.errorMessage
            context.state.error.code = payload.errorCode
            context.state.error.param = payload
        },
    },
    getters: {
        isAuth: (state,) => {
            return !!state.user.id;
        }
    }
})

export default store;
