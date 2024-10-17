import { createRouter, createWebHistory } from 'vue-router';

import signUp from './components/signUp.vue';
import login from './components/login.vue';
import dashboard from './components/home/dashboard.vue';
import Employee from './components/home/employee.vue';
import Home from './components/home.vue';
import NewEmployee from './components/home/newEmployee.vue';
import Holiday from './components/home/holiday.vue';
import Leave from './components/home/leave.vue';
import Attendence from './components/home/attendence.vue';
import Birthday from './components/home/birthday.vue';
import Reports from './components/home/reports.vue';
import Messages from './components/home/messages.vue';
import GroupChat from './components/home/groupChat.vue';
import BeforeMessage from './components/home/subChilds/beforeMessage.vue';
const routes = [
  {
    path: '/',
    name: 'SignUp',
    component: signUp,
  },
  {
    path: '/login',
    name: 'Login',
    component: login,
  },
  {
    path: '/home',
    name: 'homePage',
    component: Home,

     children:[
      {
      path:'dashboard',
      name:'DashboardContent',
      component:dashboard,
     },
     {
      path:'employee',
      name:'employeeContent',
      component:Employee

    },
    {
        path:'newemployee',
        name:'newEmployeeContent',
        component:NewEmployee
  
    },
    {
      path:'holiday',
      name:'holidayPage',
      component:Holiday

  },
  {
    path:'leave',
    name:'leavePage',
    component:Leave

},
{
  path:'attendence',
  name:'attendencePage',
  component:Attendence
},
{
  path:'groupchat',
  name:'groupchat',
  component:GroupChat

},
{
  path:'birthday',
  name:'birthdayPage',
  component:Birthday
},
{
  path:'reports',
  name:'reportsPage',
  component:Reports

},


    {
      path:'messages',
      name:'messagePage',
      component:Messages

    },{
      path:'beforemessage',
      name:'beforemessagePage',
      component:BeforeMessage

    }
    ]
  },

  
];

const router = createRouter({
  history: createWebHistory(), 
  routes,
});

export default router;
