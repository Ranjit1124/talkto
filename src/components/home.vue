<template >
  <!-- <v-toolbar >
      <v-text-field class="search"
           type="search"
            prepend-inner-icon="mdi-magnify" 
            rounded 
            placeholder="Type something to search....."
             variant="outlined"></v-text-field>
             <v-spacer/>
          <template v-slot:append>
            <v-icon id="notification" @click="privateMessage">mdi-message</v-icon>
              <v-icon @click="profileCard">mdi-account</v-icon>
          </template>
</v-toolbar>
<Sidebar> </Sidebar>
<router-view /> -->

    
    <v-layout v-if="show">
      
      <v-app-bar color="side" elevation="3">
        <v-app-bar-nav-icon @click.stop="sidebar = !sidebar"></v-app-bar-nav-icon>
        <v-app-bar-title>{{ $t('PLANNER')}}</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-form>
        <v-select
        :items="lan"
        v-model="languageChange"
        prepend-inner-icon="mdi-translate"
        class="mt-5 mr-5"
        variant='outlined'
        >
        </v-select>
      </v-form>

        <v-switch class="switch" color="green" label="Theme" @change="changeTheme()" ></v-switch>
        <!-- <v-icon @click="changeTheme()">mdi-magnify</v-icon> -->
        <v-icon id="notification" @click="privateMessage">mdi-message</v-icon>
        <v-dialog width="400">
          <template v-slot:activator="{ props: activatorProps }">
            <v-icon v-bind="activatorProps">mdi-account</v-icon>
</template>
        <v-card theme="dark" class="profile">
          <v-icon @click="closeTag">mdi-close</v-icon>
            <img src="@/assets/img/th.jpeg" />
            <v-card-title>{{ username }}</v-card-title>
            <v-card-subtitle>{{ role }}</v-card-subtitle>

            <v-btn color="red" class="logout"  @click="this.$router.push('/login')">Logout</v-btn>
        </v-card>

          </v-dialog>
      </v-app-bar>
      <!-- <v-icon @click="sidebar=!sidebar" class="menu" >mdi-menu</v-icon> -->
      <v-navigation-drawer color="side" v-model="sidebar">

        <!-- <v-icon @click="sidebar=!sidebar">mdi-arrow-left</v-icon> -->
        <!-- <v-list-item-title class="title"> PLANNER </v-list-item-title> -->
        <v-divider></v-divider>
       
        <v-list v-for="item in views[0]" :key="item.value"
         @click="mainContent(item)" color="rgb(3, 251, 106)" class="sidebarList" :prependIcon="item.prependIcon">
         <h4 class="area"><v-icon>{{item.prependIcon}}  </v-icon> {{$t(item.title)}} </h4> 
        </v-list>
        
      </v-navigation-drawer>


    </v-layout>

  <router-view v-bind:class="{ views : isoff}" v-bind:side=isoff v-if="show" />
  <!-- <div v-for="item in views[0]" :key="item">
          <div>{{$t(item.title)}}</div>
        </div> -->
        <v-card v-if="!show">please login</v-card>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'homePage',
  data() {
    return {
      show:false,
      isoff:false,
      languageChange:'en',
      lan:['en','fr','ta','de'],
      admin: false,
      sidebar: null,
      views: [],
      items: [{ title:'Dashboard', value: 1,  prependIcon: 'mdi-home' , url: 'dashboard' },
      { title: 'Employee', value: 2,  prependIcon: 'mdi-account' , url: 'employee' },
      { title: 'New-Employee', value: 3,  prependIcon: 'mdi-account-multiple' , url: 'newemployee' },
      { title: 'Holiday', value: 4, prependIcon: 'mdi-airplane-takeoff', url: 'holiday' },
      { title: 'Leave', value: 5, prependIcon: 'mdi-calendar-text', url: 'leave' },
      { title: 'Attendence', value: 6,  prependIcon: 'mdi-checkbox-multiple-marked-outline' , url: 'attendence' },
      { title: 'Birthday', value: 7, prependIcon: 'mdi-gift', url: 'birthday' },
      { title: 'Reports', value: 8,  prependIcon: 'mdi-receipt', url: 'reports' },
      { title: 'Group-Chat', value: 9, prependIcon: 'mdi-message', url: 'groupchat' }
      ],
      menuOne: [{ title:'Dashboard', value: 1,prependIcon: 'mdi-home' , url: 'dashboard' },
      { title: 'Holiday', value: 4,  prependIcon: 'mdi-airplane-takeoff' ,url:'holiday' },
      { title: 'Leave', value: 5, prependIcon: 'mdi-calendar-text' , url: 'leave' },
      { title: 'Attendence', value: 6, prependIcon: 'mdi-checkbox-multiple-marked-outline', url: 'attendence' },
      { title: 'Birthday', value: 7, prependIcon: 'mdi-gift' , url: 'birthday' },
      { title: 'Group-Chat', value: 9, prependIcon: 'mdi-message' , url: 'groupchat' }
      ],
      default: null,
      role:null,

    }
  },
  watch:{
    languageChange(lan){
      this.$i18n.locale=lan
      
    },
    sidebar(){
        if(this.sidebar==false){
        this.isoff=true
        }
        else{
          this.isoff=false
        }
    }

  },
  methods: {
    closeTag() {
            this.$router.go(-1)
        },

    changeTheme() {
      this.default = !this.default
      if (this.default) {
        this.$vuetify.theme.name = 'Theme2'
      }
      else {
        this.$vuetify.theme.name = 'Theme1'
      }

    },

    profileCard() {
      this.$router.push('/home/profile')
    },
    privateMessage() {
      this.$router.push('/home/beforemessage')
    },
    mainContent(e) {
      const value = e.url;
      this.$router.push(`/home/${value}`)

    },
  },
  computed: {
    ...mapState(['email', 'menu','username'])


  },
  created() {
    if (this.email == 'smajeesh3@gmail.com') {
      this.views.push(this.items)
    }
    else {
      this.views.push(this.menuOne)
    }
    if(this.email){
      this.show=true
    }
    else{
      this.show=true
    }
    this.$router.push('/home/dashboard')

    if (this.email == 'smajeesh3@gmail.com') {
            this.role = 'Admin'
        }
        else {
            this.role = 'user'
        }

  },

  

}
</script>

<style scoped>
#notification {
  margin-right: 10px;
}

/* .main{
  background-color: rgb(48, 78, 252);
  background-image: url('@/assets/img/download.jpeg');
  background-repeat: repeat;
} */
.switch {
  margin-right: 30px;
  margin-top: 20px;
}
img {
    border-radius: 50%;
    width:50%;
    margin: 0 auto;
}

.views{
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  margin-left:0px ;
}
.sidebarList{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: start;
  font-weight: 500;

}
.sidebarList:focus{
  border-left:5px solid rgb(5, 252, 5);
}

.area{
  margin-left:30px;
  /* margin:0 auto; */
}
.logout{
text-decoration: none;
width:fit-content;
color: white;
margin:0 auto;
}
.profile{
  padding:20px;
  text-align: center;
  /* margin: 0 auto; */
}
</style>
