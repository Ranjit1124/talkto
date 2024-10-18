import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state :{
    
      username:null,
      email:null,
      attendence:[{checkin:'',checkout:''}],
      second:0,
      minute:0,
      hour:0,
      visible:null,
      // item:[{Name:'',Id:'',checkIn:'',checkOut:''}],
      item:[],
      users:[],
      emp:[],
      messageName:null,
      groupmsg:[],
      decline:null,
      accept:null,
      privateMsg:[],

    },
  
  mutations: {
    loginUser(state,details){
       state.username=details.name
       state.email=details.email
       
       
    },
    checkIn(state,checkIn){
        state.attendence.checkin=checkIn
        state.visible=!state.visible
        
        // state.attendence.checkout=timings[1]
       this.second= setInterval(() => {
          state.second++
          if(state.second==60){
            state.second=0
          }

        }, 1000);
        this.minute=setInterval(()=>{
              state.minute++
              if(state.minute==60){
                state.minute=0
              }
        },60000);
       this.hour= setInterval(()=>{
          state.hour++
        },3600000)
    },
    checkOut(state,checkOut){
      state.attendence.checkout=checkOut
      state.visible=!state.visible
         clearInterval(this.second)
         clearInterval(this.minute)
         clearInterval(this.hour)
    },
    overallUser(state,employeeName){
      state.emp.push(employeeName)
    },
     removeData(state){
      state.users=[]
      state.item=[]
      state.groupmsg=[]
      state.leaveRequest =[]
      state.birthday=[]
      state.emp=[]
     },
     messages(state,item){
            state.messageName=item
            
     },
     groupMessage(state){
        axios
        .get('http://localhost:3000/msg')
        .then((response)=>{
          
          response.data.forEach((detail)=>{
            console.log('store',detail);

              const value = {name:detail.name,msg:detail.msg,id:detail.id}
              state.groupmsg.push(value)
          })
        })
     },
     leaveDecline(state,item){
           state.decline=item.username
           console.log(state.decline);
           
           
     },
     leaveAccept(state,item){
          state.accept=item.username
     },
     addMessage(state,msg){
      state.groupmsg.push({name:msg.name,msg:msg.msg})
     },
     private(state){
      axios
      .get('http://localhost:3000/private')
      .then((res)=>{
        state.privateMsg.push(res.data)
        
      })
     }
  }
}
)
export default store
