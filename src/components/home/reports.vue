<template>
    <v-container class="main" :fluid=side>
        <v-card class="name">
            <v-card-title>{{ $t('Reports') }}</v-card-title>
        </v-card>
        <v-divider :thickness="20" color="divider"></v-divider>

        <v-data-table
            :items="leaveRequest"
        >
            <template v-slot:[`item.option`]="{ item }">
                <v-btn color="success" @click="accept(item)">Accept</v-btn>
                <v-btn color="error" class="ml-5" @click="decline(item)">Decline</v-btn>
            </template>
        </v-data-table>
    </v-container>   
</template>

<script>
import { mapState } from 'vuex';


export default {
    name: 'reportsPage',
    props:['side'],

    data(){
        return{
            leaveRequest:[],
            date:new Date().toLocaleDateString(),
            applieddate:null,
        }
    },
    computed: {
        ...mapState(['username',])
    },
    async mounted(){
        
        await this.axios
           .get('http://localhost:3000/leave')
           .then((response)=>{

            response.data.forEach(element =>{
                            console.log('mounted',response.data);

              const leave = {username:element.username,
                leaveType:element.leaveType,
                option:true,
                id:element.ids,
                date:element.date}
              this.leaveRequest.push(leave)
            })
           })

    },
    methods: {
        async decline(item) {
        //     await this.axios
        //    .get('http://localhost:3000/leave')
        //    .then((response)=>{
        //     response.data.forEach(element =>{
        //         if(element.data.username==item.username){
        //         this.applieddate=element.data.date
        //       }
        //     })
        //    })
        // console.log("aapp da");

            //    await this.axios
            //     .post('http://localhost:3000/leaveapproval',{
            //         username:item.username,
            //         leaveType:item.leaveType,
            //         id:item.id,result:'Declined',
            //         date:this.date,
            //         applied:this.applieddate
            //     })

                // console.log("aapp da",this.applieddate);

                const response = await this.axios.get('http://localhost:3000/leave');

                 response.data.forEach((e)=>{
                    console.log('id',e._id);
                    console.log('ids',e.ids);
                    
                    
                    if(e.ids==item.id){
                        this.axios.delete(`http://localhost:3000/leave/${e._id}`)
                    }
                 })
                const leaveRequests = response.data;
                console.log('leaveRequests',leaveRequests);

                let leaveRequestId = null;

                for (const leaveRequest of leaveRequests) {
                    
                    if (leaveRequest.ids === item.id) {
                        leaveRequestId = leaveRequest.id;
                        break;
                    }
                }

                if (leaveRequestId !== null) {
                    // await axios.delete(`http://localhost:3002/leave/`+leaveRequestId)
                    // await this.axios.delete(`http://localhost:3000/leave/`+leaveRequestId)

                    // Remove the item from the state
                    const index = this.leaveRequest.indexOf(item);
                    if (index !== -1) {
                        this.leaveRequest.splice(index, 1);
                    }
                } else {
                    console.error('Leave request ID not found.');
                }
                // this.decline2(item)
                await this.axios
                .post('http://localhost:3000/leaveapproval',{
                    username:item.username,
                    leaveType:item.leaveType,
                    id:item.id,result:'Declined',
                    date:this.date,
                    })
                    console.log('date');
                    this.$store.commit('leaveDecline',item)
            
        },
         async decline2(item){
            await this.axios
                .post('http://localhost:3000/leaveapproval',{
                    username:item.username,
                    leaveType:item.leaveType,
                    id:item.id,result:'Declined',
                    date:this.date,
                    })
                    console.log('date');
                    this.$store.commit('leaveDecline',item)

         },
        async accept(item) {
        

                const response = await this.axios.get('http://localhost:3000/leave');
                response.data.forEach((e)=>{
                    if(e.ids==item.id){
                        this.axios.delete(`http://localhost:3000/leave/${e._id}`)
                    }
                 })

                const leaveRequests = response.data;

                let leaveRequestId = null;

                for (const leaveRequest of leaveRequests) {
                    
                    if (leaveRequest.ids === item.id) {
                        leaveRequestId = leaveRequest.id;
                        break;
                    }
                }

                if (leaveRequestId !== null) {
                    console.log(leaveRequestId);
                    // await axios.delete(`http://localhost:3002/leave/`+leaveRequestId)
                    // await this.axios.delete(`http://localhost:3000/leave/`+leaveRequestId)

                    // Remove the item from the state
                    const index = this.leaveRequest.indexOf(item);
                    if (index !== -1) {
                        this.leaveRequest.splice(index, 1);
                    }
                } else {
                    console.error('Leave request ID not found.');
                }
                this.accept2(item)
                //     await this.axios
        //    .get('http://localhost:3000/leave')
        //    .then((response)=>{
        //     response.data.forEach(element =>{
        //         if(element.username==item.username){
        //         this.applieddate=element.date
        //       }
        //     })
        //    })
        //         this.axios
        //         .post('http://localhost:3000/leaveapproval',{
        //             username:item.username,
        //             leaveType:item.leaveType,
        //             id:item.id,result:'Approved',
        //             date:this.date,
        //             applied:this.applieddate            
        //             })
        },
 async accept2(item){
    console.log('item',item);
    
                await this.axios
                .post('http://localhost:3000/leaveapproval',{
                    username:item.username,
                    leaveType:item.leaveType,
                    id:item.id,result:'Approved',
                    date:this.date,
                    })
                    console.log('date');
                    this.$store.commit('leaveAccept',item)

 },
        },


        
    }

</script>

