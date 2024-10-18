<template>
    <v-container class="main" :fluid=side>
        <v-card class="name">
            <v-icon @click="this.$router.go(-1)">mdi-arrow-left</v-icon>
            <v-card-title>
                {{ messageName.Name }}
            </v-card-title>
            <v-divider class="border-opacity-75"></v-divider>
            <v-divider :thickness="30" color="divider"></v-divider>

            <v-form v-model="sendbtn" @submit.prevent="sendmsg" ref="form">

                <v-text-field v-model="msg" :rules="msgRules" :label="this.$t('type something....')">

                </v-text-field>
                <v-btn color="success" prepend-icon="mdi-send" :disabled="!sendbtn" type="submit">Send

                </v-btn>
                <v-btn @click=refresh()>refresh</v-btn>
            </v-form>
        </v-card>
        <v-divider :thickness="100" color="divider"></v-divider>
        <v-card v-if="showmsg">
            <v-row>
                <v-col cols="6">
                    <v-list v-for="dash in this.filter4" :key="dash.id">
                        {{ dash.send }} : {{ dash.msg }}
                    </v-list>

                </v-col>
                <v-col cols="6">
                    <v-list v-for="content in this.filter2" :key="content.id">
                        {{ content.send }} : {{ content.msg }}
                    </v-list>

                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>
<script>
import { mapState } from 'vuex';

export default {
    name: 'messagePage',
    props: ['side'],

    data() {
        return {
            showmsg: true,
            msg: '',
            sendbtn: false,
            msgRules: [v => !!v],
            filter1: [],
            filter2: [],
            filter4: [],
            main: [],

        }
    },

    computed: {
        ...mapState(['messageName', 'username', 'privateMsg'])
    },


    created() {
        this.axios
            .get('https://planner-node.onrender.com/private')
            .then((response) => {

                this.filter1 = response.data.filter((e) => {
                    return e.send == this.username
                })
                console.log('filter1', this.filter1);

                this.filter2 = this.filter1.filter((e) => {
                    return e.receive.Name == this.messageName.Name
                })
                console.log('filter2', this.filter2);

                this.filter3 = response.data.filter((e) => {
                    return this.messageName.Name == e.send
                })
                this.filter4 = this.filter3.filter((e) => {
                    return e.receive.Name == this.username
                })
                console.log('filter4', this.filter4);
            })

    },
    methods: {
        sendmsg() {
            if (this.$refs.form.validate()) {
                this.axios
                    .post('https://planner-node.onrender.com/private', {
                        send: this.username, receive: this.messageName, msg: this.msg
                    })

                this.msg = ''

                this.$store.commit('private')
                this.update()
            }
        },
        update() {
            this.main = []
            this.axios
                .get('https://planner-node.onrender.com/private')
                .then((response) => {

                    this.filter1 = response.data.filter((e) => {
                        return e.send == this.username
                    })
                    console.log('filter1', this.filter1);

                    this.filter2 = this.filter1.filter((e) => {
                        return e.receive.Name == this.messageName.Name
                    })
                    console.log('filter2', this.filter2);

                    this.filter2.forEach((e) => {
                        this.main.push(e)
                    })
                    this.filter3 = response.data.filter((e) => {
                        return this.messageName.Name == e.send
                    })
                    this.filter4 = this.filter3.filter((e) => {
                        return e.receive.Name == this.username
                    })
                    console.log('filter4', this.filter4);
                    this.filter4.forEach((e) => {
                        this.main.push(e)

                    })

                })



        },
        refresh() {
            let naming = []
            this.axios
                .get("https://planner-node.onrender.com/private")
                .then((response) => {
                    response.data.forEach(element => {
                        naming.push(element.receive.Name)

                    });
                    this.receiver = naming.filter((e) => {
                        console.log(e);

                        return e == this.messageName.Name
                    })

                })
        }
    }

}
</script>
