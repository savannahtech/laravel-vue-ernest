<template>
    <v-card
        class="mx-auto"
        max-width="300"
        min-height="300"
        max-height="400"
        outlined
    >
        <v-card-title>{{title}}</v-card-title>
        <v-virtual-scroll
            :items="items"
            height="320"
            item-height="48"
        >
            <template v-slot:default="{ item }">
                <v-list-item link :class="item.id%2 === 0 ? 'primary' :'green'" ripple :variant="item.id/2 === 0 ? 'plain' :'tonal'" > {{item.title}}</v-list-item>
            </template>

        </v-virtual-scroll>
    </v-card>
</template>

<script>
    export default {
        name: "QueueList",
        props:['items', 'title']
    }
</script>

<style scoped>

</style>
