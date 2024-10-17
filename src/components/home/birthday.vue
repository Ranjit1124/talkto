<template>
    <v-container class="main" :fluid=side>
        <v-card class="name"  >
            <v-card-title>{{ $t('Birthday') }}</v-card-title>
        </v-card>
        <v-divider :thickness="20" color="divider"></v-divider>

        <v-text-field
        v-model="search"
        type="search"
        :label="this.$t('search')"
        prepend-inner-icon="mdi-magnify"

        >
            </v-text-field>
        <!-- <v-divider  :thickness="20" color="white"></v-divider> -->
        <v-card>
                <v-data-table-virtual
                :items="birthday"
                height="600"
                :search="search"
                >
               <template v-slot:[`item.dob`]="{value}">
                <v-chip :color="getColor(value)">
                    {{ value }}
                </v-chip>
               </template>
                </v-data-table-virtual>
            </v-card>
    </v-container>   
    </template>
    <script>
// import { mapState } from 'vuex';

    export default{
        name:'birthdayPage',
        props:['side'],

        data(){
            return{
                search:'',
                birthday:[],
            }
        },
        mounted(){
            // console.log(value);
            this.axios
             .get('http://localhost:3000/signup')
             .then((response)=>{
              response.data.forEach((bd)=>{
                const details = {name:bd.name,dob:bd.dob,role:bd.role,email:bd.email}
                // this.$store.commit('birthday',details)
                this.birthday.push(details)
              })
             })


        },

        computed:{
                //   ...mapState(['birthday'])
        },
        unmounted(){
            this.$store.commit('removeData')
            console.log('br');
            

        },
        methods:{
            getColor(value){
                // const day = parseInt(value)
                const date= new Date(value)
                const day=date.getDate()
                const month=date.getMonth()
                // console.log(date);
                // console.log('0'+day);
                // console.log(month);
                const now=new Date()
                const nowDay=now.getDate()
                const nowMonth=now.getMonth()
                if(month == nowMonth && day==nowDay){
                    return 'green'
                }
                
            }
        }
    }
    </script>
<style scoped>
</style>
