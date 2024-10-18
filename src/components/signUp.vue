<template>
  <v-container class="top" fluid>
    <v-sheet class="mains">
      <v-form @submit.prevent="loginPage" v-model="isvalid" ref="signupForm" class="form">
        <v-card-title style="font-family: cursive;font-size:30px;">
          Welcome
        </v-card-title>
        <v-card-subtitle>
          Sign-Up
        </v-card-subtitle>

        <v-text-field label="Name" type="text" required v-model="name" :rules="namerules"
          prepend-inner-icon="mdi-account" variant="underlined">
        </v-text-field>



        <v-text-field label="Email" type="email" required v-model="email" :rules="emailrules" variant="underlined"
          prepend-inner-icon="mdi-email">
        </v-text-field>



        <v-text-field label="password" type="text" required v-model="password" :rules="passwordrules"
          variant="underlined" prepend-inner-icon="mdi-lock">
        </v-text-field>



        <v-text-field label="Conform Password" :type="visible" required v-model="conformPassword" variant="underlined"
          prepend-inner-icon="mdi-lock-off">
          <template v-slot:append>
            <v-icon @click="passwordVisible">{{ icon }}</v-icon>
          </template>
        </v-text-field>



        <v-autocomplete v-model="role" label="Role" required :rules="roleRules" :items="roles" clearable
          variant="underlined" prepend-inner-icon="mdi-briefcase">
        </v-autocomplete>



        <v-text-field label="DOB" type="date" required v-model="birthday" variant="underlined"
          prepend-inner-icon="mdi-cake"></v-text-field>

        <v-card-subtitle style="color: white;font-weight: 600;">Already a Member?
          <router-link to='/login' style="color: white;text-decoration: none">Login</router-link></v-card-subtitle>
        <span v-if="errmsg" class="error-message">{{ errmsg }}</span><br>
        <v-btn type="submit" :disabled="!isvalid" color="success">SignIn</v-btn>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      icon: 'mdi-eye-off',
      name: '',
      email: '',
      password: '',
      conformPassword: '',
      errmsg: '',
      role: '',
      birthday: '',
      namerules: [v => !!v || 'Name cannot be empty'],
      emailrules: [v => !!v, v => /.+@.+\..+/.test(v) || 'Please provide a valid Email'],
      passwordrules: [v => !!v, v => v.length > 7],
      roleRules: [v => !!v || 'Role cannot be empty'],
      isvalid: false,
      id: '',
      roles: ['Developer', 'Designer', 'HR', 'Tester'],
      visible: 'password',
    };
  },
  created() {

    this.axios

      .get('https://planner-node.onrender.com/signup')
      .then((response) => {
        this.id = response.data.length + 1

      })
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
    loginPage() {
      if (this.$refs.signupForm.validate()) {
        this.errmsg = '';

        if (this.password === this.conformPassword) {
          this.axios

            .post('https://planner-node.onrender.com/signup', {
              name: this.name, email: this.email, password: this.password, id: this.id, role: this.role, dob: this.birthday
            })

          this.$router.push('/login');
        }
        else {
          setTimeout(() => {
            this.errmsg = ''
          }, 1000)
          this.errmsg = "Passwords don't match";
        }

      }
    }
  }
}

</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

.error-message {
  color: red;
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
  height: 100vh;
  text-align: center;
  width: 50%;
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
