<template>
    <v-sheet>
        <v-list-item>
            <v-list-item-content>
                <v-img append max-height="100"
                       max-width="100"src="/logo.jpeg"></v-img>
            </v-list-item-content>
        </v-list-item>

        <v-list nav dense light>
            <v-list-item>
                <v-list-item-avatar>
                    <v-img :src="$store.state.user.img_name ? $store.state.user.image_url : '/img/dfa.png'"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{`${$store.state.user.name}` }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item
                v-for="item in locations"
                :key="item.title"
                :link="true"
                :to="item.path"
                active-class="blue darken-2 white--text "
            >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-group
                v-for="item in items"
                :key="item.title"
                :prepend-icon="item.action"
                no-action
            >
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item
                    v-for="subItem in item.items"
                    :key="subItem.title"
                    active-class="blue darken-2 white--text "
                    router
                    :to="subItem.route"
                >
                    <v-list-item-content>
                        <v-list-item-title v-text="subItem.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
    </v-sheet>
</template>

<script>
import locations from "../../router/navigations";
import items from "../../router/items";
export default {
    name: "NavigationDrawer",
    data(){
        return {
            locations,
            items,
            group:null,
        }
    },
    methods:{
        moveTo(path){
            this.$router.push(path)
        },
    }
}
</script>

<style scoped>

</style>
