<template>
    <v-container class="main" :fluid=side>
        <v-card class="name" :title="$t('Message')">

            <template v-slot:prepend>
                <v-icon @click="back">mdi-arrow-left</v-icon>
            </template>

        </v-card>
        <v-divider :thickness="20" color="divider"></v-divider>

        <v-text-field class="textfield" v-model="search" :label="this.$t('search')" prepend-inner-icon="mdi-magnify">
        </v-text-field>
        <v-data-table :items="emp" :search="search" height='300'>
            <template v-slot:append>
                <v-card-title>All Users</v-card-title>
            </template>

            <template v-slot:[`item.message`]="{ item }">

                <v-btn v-model="item.message" color="primary" text="Message" variant="flat" @click="go(item)"></v-btn>
            </template>
        </v-data-table>
    </v-container>
</template>
<script>
import { mapState } from 'vuex';

export default {
    name: 'beforeMessage',
    props: ['side'],

    data() {
        return {
            search: '',
            emp: []
        }
    },
    computed: {
        ...mapState(['users'])
    },
    mounted() {

        this.axios
            .get('https://planner-node.onrender.com/signup')
            .then((response) => {
                // console.log(response.data);
                response.data.forEach((user) => {
                    // const employeeName={title:user.name,value:user.id,role:user.role}
                    const employeeName = { Name: user.name, ID: user.id, Role: user.role, message: true }
                    this.emp.push(employeeName)


                })

            })

    },
    unmounted() {
        this.emp = []

    },
    methods: {
        back() {
            this.$router.go(-1)
            this.emp = []
        },
        go(item) {
            this.$router.push('/home/messages')
            this.$store.commit('messages', item)
        }
    }
}
</script>
<style scoped>
.textfield {
    border-radius: 2em;
    width: 50%;
}
</style>