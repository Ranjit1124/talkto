<template>
    <v-container class="main" :fluid="side">
        <v-card class="name">
            <v-card-title>{{ $t('Group-Chat') }}</v-card-title>
        </v-card>
        <v-divider :thickness="20" color="divider"></v-divider>
        <v-form class="form" @submit.prevent="sendMsg" ref="forms">
            <v-text-field v-model="message" :rules="messageRules" :label="$t('type something....')" width="1000">
                <template v-slot:append>
                    <v-btn :disabled="!message" color="success" prepend-icon="mdi-send"
                        type="submit">{{ $t('Send') }}</v-btn>
                        <v-btn @click="refresh">{{ $t('Refresh') }}</v-btn>
                    <v-btn @click="clear" v-if="admin" class="ml-2" color="error">{{ $t('Clear') }}</v-btn>
                </template>
            </v-text-field>
        </v-form>
        <v-card v-for="item in groupmsg" :key="item.id">
            {{ item.name }} : {{ item.msg }}
        </v-card>
    </v-container>
</template>

<script>
import { mapState } from 'vuex';
import { io } from 'socket.io-client';

export default {
    name: 'groupChat',
    props: ['side'],
    data() {
        return {
            socket: null,
            message: '',
            messageRules: [v => !!v],
            admin: false,
        };
    },
    async created() {
        if (this.email === "smajeesh3@gmail.com") {
            this.admin = true;
        }

        this.$store.commit('groupMessage');

        if (!this.socket) {
            this.socket = io('https://planner-node.onrender.com');


            this.socket.on('connect', () => {
                console.log('Connected to server');

                this.socket.on('connect_error', (err) => {
                    console.error('Connection Error:', err);
                });

            });

            this.socket.on('chat message', (msg) => {
                console.log('Received message:', msg);
                if (!this.groupmsg.some(existingMsg => existingMsg.id === msg.id)) {
                    this.$store.commit('addMessage', msg);
                }
            });
        }
    },
    computed: {
        ...mapState(['username', 'groupmsg', 'email']),
    },
    beforeUnmount() {
        if (this.socket) {
            this.socket.off('chat message');
            this.socket.disconnect();
        }
        this.$store.commit('removeData')
    },
    methods: {
        async sendMsg() {

            if (this.$refs.forms.validate()) {


                if (this.message) {
                    const msg = {
                        name: this.username,
                        msg: this.message,
                    };
                    this.message = ''

                    this.socket.emit('chat message', msg);

                    await this.axios.post("https://planner-node.onrender.com/msg", msg);


                }
            }


        },
        async clear() {

            // this.$store.commit('groupMessage')
            await this.axios
                .get("https://planner-node.onrender.com/msg")
                .then((res) => {
                    console.log('fire', res.data.id);
                    res.data.forEach(ele => {

                        const MongoDocId = ele.id;
                        console.log('MongoDocId', MongoDocId);

                        console.log(`Deleting message with ID: ${MongoDocId}`);
                        console.log('detail', this.groupmsg);

                        this.axios.delete(`https://planner-node.onrender.com/msg/${MongoDocId}`);

                    })
                })
            this.$store.commit('removeData');

        },
        refresh(){
            this.$store.commit('removeData');

            this.$store.commit('groupMessage');

        }
    }
}
</script>

<style scoped>
.form {
    display: flex;
    flex-wrap: wrap;

}
</style>