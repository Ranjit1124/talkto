<template>
    <v-container class="main"  :fluid=side>
        <!-- :key="componentKey" -->
        <v-card class="name">
            <v-card-title>{{ $t('Attendence') }}</v-card-title>
        </v-card>
        <v-divider :thickness="20" color="divider"></v-divider>
        <v-card class="clock">
        <v-card>
            <v-row>
                <v-col>
                    <v-time-picker v-model="checkIn" use-seconds scrollable>

                    </v-time-picker>
                    <v-btn @click="start" :disabled="this.visible" color="success">{{$t('Check-In')}}</v-btn>
                    <v-card-text>{{ timeStart }}</v-card-text>
                </v-col>
            </v-row>
        </v-card>

            <v-card :title="$t('Today')" class="today" color="primary">
            <v-card-item>{{ this.date }}</v-card-item>
            <v-divider :thickness="30"></v-divider>
            <v-card-text style="font-family: cursive;">{{$t('Login Hours')}}</v-card-text>
            <v-card-item style="font-family: cursive;"> {{ this.hour }} :
                {{ this.minute }} :
                {{ this.second }}
            </v-card-item>
            </v-card>

            <v-card>

            <v-row>
                <v-col>

                    <v-time-picker v-model="checkOut" use-seconds scrollable>

                    </v-time-picker>
                    <v-btn @click="end" :disabled="!this.visible" color='error'>{{$t('Check-Out')}}</v-btn>
                    <v-card-text>{{ timeEnd }}</v-card-text>

                </v-col>
            </v-row>

        </v-card>

      </v-card>
    </v-container>
</template>

<script>
import { mapState } from 'vuex';


export default {
    name: 'attendencePage',
    props:['side'],

    data() {
        return {
            timeStart: null,
            timeEnd: null,
            checkIn: null,
            checkOut: null,
            date: new Date().toLocaleString(),
            time: new Date().getHours() + ":" + new Date().getMinutes() + ":" +
                new Date().getSeconds(),
        }
    },
    created() {
        setInterval(() => {
            this.checkIn = new Date().getHours() + ":" + new Date().getMinutes() + ":" +
                new Date().getSeconds()
            this.checkOut = new Date().getHours() + ":" + new Date().getMinutes() + ":" +
                new Date().getSeconds()
        }, 1000)

    },
    methods: {
        start() {
            this.timeStart = this.checkIn
            this.$store.commit('checkIn', this.checkIn)
            console.log(this.timeStart);

        },
        end() {
            // this.visible = !this.visible
            this.timeEnd = this.checkOut
            this.$store.commit('checkOut', this.checkOut)

            this.axios
                .post('http://localhost:3000/attendence', {
                    username: this.username, In: this.attendence.checkIn, Out: this.attendence.checkOut, date: this.date
                })

        }
    },
    computed: {
        ...mapState(['second', 'minute', 'hour', 'visible', 'username','attendence'])
    }
}
</script>
<style scoped>
.clock{
    display:flex;
    text-align: center;
    justify-content:space-evenly;
    flex-wrap: wrap;
    /* width: fit-content; */
    
}
.today{
    width:fit-content;
    height:fit-content;
     color: white;
    padding-top: 30px;
    margin-top:120px;
}
</style>
