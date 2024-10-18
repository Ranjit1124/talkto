<template>
    <v-container class="main" :fluid=side>
        <v-card class="name">
            <v-card-title>{{ $t('Leave') }}</v-card-title>
        </v-card>
        <v-divider :thickness="20" color="divider"></v-divider>

        <v-form v-model="valid" ref="form" @submit.prevent="validation">
            <v-row>
                <v-col>
                    <v-select :label="$t('ApplyLeave')" :items="item" v-model="leave" :rules="selected" removable>

                    </v-select>
                </v-col>
                <v-col>
                    <v-text-field type="date" v-model="date"></v-text-field>
                </v-col>
            </v-row>


            <v-btn :disabled="!valid" type="submit" color="error">{{ $t('Apply') }}</v-btn>
            <v-divider :thickness="20" color="divider"></v-divider>

        </v-form>

        <v-data-table-virtual height="500" :items=rrtt>
        </v-data-table-virtual>
    </v-container>

</template>
<script>

import { mapState } from 'vuex';

export default {
    name: 'leavePage',
    props: ['side'],

    data() {
        return {
            item: ['el', 'sl', 'cl'],
            leave: null,
            valid: false,
            selected: [v => !!v],
            id: null,
            visible: false,
            leaveType: null,
            approved: false,
            rrtt: [],
            date: null,

        }
    },
    created() {
        this.axios
            .get('https://planner-node.onrender.com/leave')
            .then((response) => {
                this.id = response.data.length + 1

            })
        console.log('username', this.username);
        console.log('decline', this.decline);


    },
    computed: {
        ...mapState(['username']),


    },
    mounted() {
        console.log('mounted');

        this.axios
            .get('https://planner-node.onrender.com/leaveapproval')
            .then((response) => {
                console.log('response', response);

                response.data.forEach(element => {
                    if (element.username == this.username) {

                        const details = {
                            AppliedFor: element.leaveType,
                            Result: element.result,
                            ResultedOn: element.date
                        }
                        this.rrtt.push(details)
                    }

                });

            })
    },
    methods: {
        validation() {
            console.log('entered');
            this.$refs.form.validate()
            this.axios
                .post('https://planner-node.onrender.com/leave', {
                    username: this.username,
                    leaveType: this.leave,
                    ids: this.id,
                    date: this.date
                })
            this.leave = ''

        }
    }

}
</script>
