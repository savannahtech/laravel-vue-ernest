<template>
    <v-container>
        <ttu-logo-svg></ttu-logo-svg>
        <v-container class="mt-4">
            <v-card elevation="2" class="text-center">

                <!--                <v-card-title class="headline text-center">Welcome Back!</v-card-title>-->
                <br><br>
                <h1 class="p-5">Welcome!</h1>

                <v-card-text>
                    <v-container>
                        <v-form ref="form" v-model="valid">
                            <v-row>
                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <v-container>
                                        <v-card-title><h3>Register with School Credential</h3></v-card-title>

                                        <v-row class="mx-auto">

                                            <v-col
                                                cols="12"
                                                sm="12"
                                                md="6"
                                            >
                                                <v-text-field

                                                    label="Full Name"
                                                    hint="For Example: Ernest Kofi Brayce"
                                                    outlined
                                                    :rules="[rules.required]"
                                                    v-model="credential.name"


                                                ></v-text-field>
                                            </v-col>

                                            <v-col
                                                cols="12"
                                                sm="12"
                                                md="6"
                                            >
                                                <v-text-field
                                                    label="Email Address"
                                                    hint="For Example: example@gmail.com"
                                                    outlined
                                                    :rules="[rules.required, rules.email]"
                                                    v-model="credential.email"
                                                    type="email"

                                                ></v-text-field>
                                            </v-col>

                                            <v-col
                                                cols="12"
                                                sm="12"
                                                md="12"
                                            >
                                                <v-text-field
                                                    autocomplete
                                                    type="password"
                                                    label="Password"
                                                    outlined
                                                    :rules="[rules.required,rules.password]"
                                                    v-model="credential.password"

                                                ></v-text-field>
                                            </v-col>

                                            <v-col
                                                cols="12"
                                                sm="12"
                                                md="12"
                                            >
                                                <v-text-field
                                                    autocomplete
                                                    type="password"
                                                    label="Retype Password"
                                                    outlined
                                                    :rules="[rules.required,rules.confirm]"
                                                    v-model="credential.password_confirmation"


                                                ></v-text-field>
                                            </v-col>


                                            <v-col>

                                                <v-btn
                                                    color="blue"
                                                    dark
                                                    large
                                                    @click="register"
                                                >
                                                    Register
                                                </v-btn>



                                            </v-col>
                                            <v-col>




                                                <router-link to="/login">Login  Here</router-link>
                                            </v-col>

                                        </v-row>
                                    </v-container>
                                </v-col>
                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <v-container>
                                        <v-card-title>Register in with another provider:</v-card-title>

                                        <router-link to="/" class="text-center">
                                            <v-img src="/img/google.png" max-height="100"
                                                   max-width="150"
                                                   class="mx-auto"></v-img>
                                        </router-link>

                                    </v-container>
                                </v-col>
                            </v-row>
                        </v-form>

                    </v-container>
                </v-card-text>
            </v-card>
        </v-container>
    </v-container>
</template>

<script>
export default {
    name: "Register",
    data() {
        return {
            valid: true,
            files: [],
            rules: {
                required: value => !!value || 'Required.',
                counter: value => value.length <= 20 || 'Max 20 characters',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
                confirm:value => value === this.credential.password || 'Password do no match.',
                password:value => value.length >= 8 || 'Password should be more than 8 characters.'
            },
            defaultCredential: {
                email: '',
                password: '',
                name:'',
                password_confirmation:'',

            },
            credential: {
                name:'',
                email: '',
                password: '',
                password_confirmation: '',
            }
        }
    },
    computed:{
        isAuth(){
            return this.$store.getters.isAuth;
        }
    },
    methods: {
        register() {
            this.validate();
            if (this.valid) {
                let payload = {
                    name: this.credential.name,
                    email: this.credential.email,
                    password: this.credential.password,
                    password_confirmation: this.credential.password_confirmation,
                }
                this.$store.dispatch('register',payload).then(res=>{
                    // this.$router.push(res.to)
                    console.log(res)
                    this.$router.push({name:"Home"})
                });


            }

        },
        validate() {
            this.$refs.form.validate();
        }
    },
    mounted() {
        console.log(this.$store.getters.isAuth)
        if (this.$store.getters.isAuth) {
            //    Has logged in
            this.$router.push({name: 'Home'})
        }
    },
    watch:{
        isAuth(val){
            if (val){
                let to = this.$route.query.redirect;
                this.$router.push( to || "/");
            }
        }
    }

}
</script>

<style scoped>

</style>
