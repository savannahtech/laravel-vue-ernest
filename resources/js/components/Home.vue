<template>
    <v-container>

        <v-btn @click="clear()" class="">Clear</v-btn>
        <v-row>
            <v-col cols="12" md="4">
                <QueueList :items="commandsInQueue" title="Commands In Queue"></QueueList>
            </v-col>

            <v-col cols="12" md="4">
                <v-form validate-on="submit" @submit.prevent="()=>{}">
                    <v-card width="400" class="mx-auto">
                        <v-card-text>
                            <v-text-field v-model="editedCommand.name" label="Name"/>
                            <v-text-field v-model="editedCommand.start" type="number" label="Start"/>
                            <v-text-field v-model="editedCommand.stop" type="number" label="End"/>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn @click="executeCommand('A')"  class="px-10 py-4">Command A</v-btn>
                            <v-btn @click="executeCommand('B')"  class="px-10">Command B</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-col>

            <v-col cols="12" md="4">
                <QueueList :items="commandsCompleted" title="Completed Commands"></QueueList>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

    import QueueList from "./QueueList";

    export default {
        name: "Home",
        components: {QueueList},
        data() {
            return {
                id: 0,
                defaultCommand: {
                    id:0,
                    title: '',
                    type:'',
                    value: 0,
                    start: 1,
                    stop: 1
                },
                editedCommand: {
                    id:0,
                    title: '',
                    type:'',
                    value: 0,
                    start: 1,
                    stop: 1
                },
                commandsCompleted: [],
                commandsInQueue: [],
                loading: false,
            }
        },
        methods: {
            addToQueue(command){
                this.commandsInQueue.push(command)
            },
            addToComplete(command){
                this.commandsCompleted.push(command)
            },
            executeCommand(type){
                //take edited item and add to queue
                let data = Object.assign({}, this.editedCommand)
                data.id = this.id;
                data.title = this.editedCommand.name;
                data.value = 'N/A';
                data.type = type;
                this.id++;
                this.addToQueue(data)
                this.submitCommand(data);
            },
            submitCommand(command){
                command.url = '/send-command'

                if (command.type == 'B' && !this.$store.getters.isAuth){
                    this.$swal('Please Log In to use Command B');
                } else {
                    this.$store.dispatch('loadPost', command).then(res => {
                        console.log(res)
                    })
                }

            },
            clear(){
                this.commandsCompleted = [];
                this.commandsInQueue = [];
                this.$store.dispatch('loadPost', {url:'/clear'}).then(res => {
                    console.log(res)
                })
            }
        },
        mounted() {
            var pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
                cluster: process.env.MIX_PUSHER_APP_CLUSTER
            });

            var channel = pusher.subscribe('command');
            channel.bind('App\\Events\\CommandEvent', (data)=> {
                this.addToComplete(data.command);
            });
        }
    }
</script>

<style scoped>

</style>
