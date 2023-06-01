<template>
    <v-container>
        <v-container class="mt-4">
            <v-row>
                <v-col md="11" lg="3" class="mx-auto">
                    <v-card :loading="loading" class="text-center" elevation="2">

                        <!--                <v-card-title class="headline text-center">Welcome Back!</v-card-title>-->
                        <br><br>
                        <h1 class="p-5">Welcome Back!</h1>

                        <v-card-text>
                            <v-container>
                                <v-form ref="form" v-model="valid">
                                    <v-row>
                                        <v-col cols="12"  lg="12" md="12" sm="12">
                                            <v-container>
                                                <v-card-title class="text-h6">Login</v-card-title>

                                                <v-row class="mx-auto">
                                                    <v-col
                                                        cols="12"
                                                        md="12"
                                                        sm="12"
                                                    >
                                                        <v-text-field
                                                            v-model="credential.email"
                                                            :rules="[rules.required, rules.email]"
                                                            hint="For Example: example@gmail.com"
                                                            label="Email Address"
                                                            outlined
                                                            type="email"
                                                            @keyup.enter="login"

                                                        ></v-text-field>
                                                    </v-col>

                                                    <v-col
                                                        cols="12"
                                                        md="12"
                                                        sm="12"
                                                    >
                                                        <v-text-field
                                                            v-model="credential.password"
                                                            :rules="[rules.required]"
                                                            label="Password"
                                                            outlined
                                                            type="password"
                                                            @keyup.enter="login"

                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col>
                                                        <v-btn
                                                            :disabled="loading"
                                                            :loading="loading"
                                                            color="blue"
                                                            :light="loading"
                                                            :dark="!loading"
                                                            large
                                                            class="px-10"
                                                            @click="login"
                                                        >
                                                            Log In
                                                        </v-btn>
                                                    </v-col>

                                                </v-row>
                                            </v-container>
                                        </v-col>
                                    </v-row>
                                </v-form>

                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
export default {
    name: "LogIn",
    data() {
        return {
            loading: false,
            valid: true,
            files: [],
            rules: {
                required: value => !!value || 'Required.',
                counter: value => value.length <= 20 || 'Max 20 characters',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
            },
            defaultCredential: {
                email: null,
                password: null
            },
            credential: {
                email: null,
                password: null
            }
        }
    },
    computed: {
        isAuth() {

            return this.$store.getters.isAuth;
        }
    },
    methods: {
        login() {
            this.$refs.form.validate();
            if (this.valid) {
                this.loading = true;

                this.$store.dispatch('login', this.credential).then(res => {
                    this.$store.dispatch('loadUser')
                }).catch(reason => {
                    this.loading = false;
                    this.$swal('Opps!',
                        reason.response.data.errors.email[0],
                        'error')
                })
            }

        },
        validate() {
            this.$refs.form.validate();
        },

    },
    watch: {
        isAuth(val) {
            if (val) {
                let to = this.$route.query.redirect;
                this.$router.push(to || "/");
            }
        }
    },
    mounted() {
        if (this.isAuth) {
            let to = this.$route.query.redirect;
            this.$router.push(to || "/");
        }
    }
}
</script>

<style scoped>

</style>
