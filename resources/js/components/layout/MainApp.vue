<template>
    <v-app>

        <v-navigation-drawer
            v-if="isLoggedIn"
            v-model="drawer"
            app
        >
            <app-nav></app-nav>
            <!--<template v-slot:append>
                <div class="pa-2">
                    <v-btn block @click="logout">
                        Logout
                    </v-btn>
                </div>
            </template>-->
        </v-navigation-drawer>

        <v-app-bar app color="indigo" dark>
<!--            <v-app-bar-nav-icon   @click.stop="drawer = !drawer"></v-app-bar-nav-icon>-->
            <v-btn icon @click.stop="drawer = !drawer"><v-icon class="mdi-arrow-left-bold-outline">{{drawer ? 'mdi-arrow-left-bold-outline':'mdi-arrow-right-bold-outline'}}</v-icon></v-btn>

            <v-toolbar-title>{{ pageName }}</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn icon to="/" v-if="!isLoggedIn"><v-icon>mdi-home</v-icon></v-btn>
            <!-- <v-btn icon>
                 <v-icon>mdi-magnify</v-icon>
             </v-btn>-->

            <!--<v-btn icon to="/">
                <v-icon>mdi-home</v-icon>
            </v-btn>-->


            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn

                        text
                        v-bind="attrs"
                        v-on="on"
                        icon
                    >
                        <v-icon class="">mdi-account-cog-outline</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                        v-if="!isLoggedIn"
                        link
                        to="/login"
                    >
                        <v-list-item-title>Log In</v-list-item-title>
                    </v-list-item>
<!--                    <v-list-item
                        v-if="!isLoggedIn"
                        link
                        to="/register"
                    >
                        <v-list-item-title>Register</v-list-item-title>
                    </v-list-item>-->

                    <v-list-item
                        @click="logout"
                        v-if="isLoggedIn"
                    >
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <v-main class="grey lighten-4">

            <!-- Provides the application the proper gutter -->
            <v-container color="grey" fluid>
                <!-- If using vue-router -->
                <router-view></router-view>
                <vue-progress-bar></vue-progress-bar>
            </v-container>

        </v-main>
        <v-footer
            absolute
            app
            class="font-weight-medium black"
            dark
        >
            <v-col
                class="text-center"
                cols="12"
            >
                &copy; {{ new Date().getFullYear() }} <!--<strong>Powered By ebrayce</strong>-->
            </v-col>
        </v-footer>
    </v-app>

</template>

<script>

import {mapActions, mapGetters, mapState} from 'vuex'

export default {
    name: "MainApp",
    props: {
        authUser: Object,
        genders:Array,
    },
    data: () => ({
        drawer: null,
        expandOnHover: false,
        group: 1,
        mini: true,
    }),
    computed: {
        ...mapState(['user','isError']),
        ...mapGetters(['isAuth','getTotalStaffsLoaded']),

        isMobile() {
            return this.$vuetify.breakpoint.mobile;
        },
        isLoggedIn() {
            return this.$store.getters.isAuth;
        },

        pageName() {
            return this.$route.name;
        }
    },
    methods: {
        ...mapActions(['showError']),
        logout() {
            this.$store.dispatch('logout').then(()=>{
                this.$router.push({
                    name:"Home"
                })
            })
        }
    },
    mounted() {

        if (!!this.authUser) {
            this.$store.commit('updateUser', this.authUser)
            this.$store.commit('updateGenders', this.genders)

        }
    },
    watch:{
        isError (value){
            if (value){
               this.showError();
            }
        }
    }
}
</script>

<style scoped>

</style>


<!--
computed: mapState ({
isMobile() {
return this.$vuetify.breakpoint.mobile;
},
isLoggedIn() {
return this.$store.getters.isAuth;
},
user() {
return this.$store.state.user;
},
pageName() {
return this.$route.name;
}
}),-->
