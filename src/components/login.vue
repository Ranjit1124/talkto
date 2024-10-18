<template>
  <v-container class="top" fluid>
    <v-sheet class=mains>
      <v-form @submit.prevent="loginSubmit" ref="loginForm" v-model="valid" class="form" scrolable>
        <v-card-title style="font-family: cursive;font-size:30px;">Welcome Back!!!
          <v-card-text>Login</v-card-text>
        </v-card-title>

        <v-text-field label="Email" type="email" required v-model="email" :rules="emailrules"
          prepend-inner-icon="mdi-account" variant="underlined"></v-text-field>
        <v-text-field label="password" :type="visible" required v-model="password" :rules="passwordrules"
          prepend-inner-icon="mdi-lock-outline" variant="underlined">
          <template v-slot:append>
            <v-icon @click="passwordVisible">{{ icon }}</v-icon>
          </template>
        </v-text-field>
        <v-card-subtitle>Not Registered? <router-link to="/" style="color: aliceblue;">Sign-up</router-link>
        </v-card-subtitle>
        <span v-if="errmsg" class="error-message">{{ errmsg }}</span><br>
        <v-btn class="btn" :disabled="!valid" color="success" type="submit"
          style="font-family:Arial, Helvetica, sans-serif" :loading=loading>
          Get Started
        </v-btn>
      </v-form>
    </v-sheet>
  </v-container>
</template>
<script>
export default {
  name: 'logIn',
  data() {
    return {
      icon: 'mdi-eye-off',
      name: null,
      email: '',
      password: '',
      errmsg: null,
      rolerules: [v => !!v],
      emailrules: [v => !!v, v => /.+@.+\..+/.test(v) || 'Please provide a valid Email'],
      passwordrules: [v => !!v, v => v.length > 7],
      valid: false,
      visible: 'password',
      loading: false,
    }
  },
  created() {
    console.log('smajeesh3@gmail.com');
    console.log('ajeesh1124');


  },
  methods: {
    passwordVisible() {
      this.visible = this.visible == 'text' ? "password" : "text"
      if (this.visible == 'text') {
        this.icon = 'mdi-eye'
      } else {
        this.icon = 'mdi-eye-off'
      }
    },
    loginSubmit() {
      this.loading = true
      if (this.$refs.loginForm.validate()) {
        this.axios
          .get('https://planner-node.onrender.com/signup')
          .then((response) => {
            console.log(response);

            response.data.forEach((obj) => {
              if (obj.email == this.email && obj.password == this.password) {
                const username = obj.name
                const email = obj.email
                const details = { name: username, email: email }
                this.$store.commit('loginUser', details)
                this.$router.push('/home')
              }
              else {
                setTimeout(() => {
                  this.errmsg = ''
                  this.password = ''
                  this.loading = false
                }, 1000)
                this.errmsg = "Please SignIn";
              }
            })
          })

      }
    }
  }
}
</script>
<style scoped>
.error-message {
  color: red;
  font-size: 20px;
  font-weight: 500;
}

.form {
  background: transparent;
  backdrop-filter: blur(4px);
  padding: 10px;

}

.mains {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80vh;
  text-align: center;
  width: 50%;
  padding: 20px;
  margin: 0 auto;
  color: white;
  background: transparent;

}

.top {
  background-image: url('@/assets/img/login.jpg');
  background-size: cover;
  height: 100vh;
}

@media screen and (max-width: 540px) {
  .mains {
    width: fit-content;
  }
}
</style>
