<template>
    <v-container>
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
                    value: 0
                },
                editedCommand: {
                    name:'',
                    start: 0,
                    stop: 0
                },
                commandsCompleted: [],
                commandsInQueue: [],
                loading: false,
            }
        },
        methods: {
            submit() {
                for (let i = 0; i < 30; i++) {
                    let data = Object.assign({}, this.defaultCommand)
                    data.id = i;
                    data.title = 'Title-' + i;
                    data.value = 2 * i;
                    this.addToComplete(data)
                }
            },
            addToQueue(command){
                this.commandsInQueue.push(command)
            },
            addToComplete(command){
                this.commandsInQueue.push(command)
            },
            executeCommand(type){
                //take edited item and add to queue
                let data = Object.assign({}, this.defaultCommand)
                data.id = this.id;
                data.title = this.editedCommand.name;
                data.value = 'N/A';
                data.type = type;
                this.addToQueue(data)
                this.id++;
                this.submitCommand();
            },
            submitCommand(command){

                this.$store.dispatch('loadPost', {url: '/send-command'}).then(res => {
                    console.log(res.data)
                })
            }
        },
        mounted() {
            var pusher = new Pusher(process.env.MIX_PUSHER_APP_KEY, {
                cluster: process.env.MIX_PUSHER_APP_CLUSTER
            });

            var channel = pusher.subscribe('command');
            channel.bind('CommandEvent', (data)=> {
                let str = JSON.stringify(data)
                console.log(str, typeof str)
                this.addToComplete(data);
            });

            // Echo.private('command')
            //     .listen('CommandEvent', (e) => {
            //         console.log("COM: ",e)
            //     });
        }
    }
</script>

<style scoped>

</style>
