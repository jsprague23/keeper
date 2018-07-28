<template>
  <div class="container-fluid d-flex justify-content-center">
<div class="jumbotron">
  <h1>Keeper</h1>
  <div v-if="currentUser">
    You are already logged in, if you would like to visit your profile click the button at the top of the page or you can just click <router-link>Here</router-link>
  </div>
  <div v-if="!currentUser">
      <form @submit.prevent="login">
          <input type="text" placeholder="Email" v-model="log.email">
          <input type="password" placeholder="Enter password"v-model="log.password">
          <button type="submit">login</button>
        </form>
        <p @click="regLog">Don't have a username? Register here</p>
       
  
       <form @submit.prevent="userRegister" >
         <input type="text" placeholder="Email" v-model="newUser.email">
         <input type="text" placeholder="userName" v-model="newUser.userName">
         <input type="password" placeholder="password" v-model="newUser.password">
         <button type="submit">register</button>
        </form>
        <p @click="regLog">Already a user? Login Here!</p>
      </div>

  </div>

</div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        logister: false,
        log:{
          email: '',
          password:'',
        },
        newUser:{
          userName: '',
          email: '',
          password: '',
        }

      }
    },
    computed: {
      currentUser(){
        return this.$store.state.currentUser
      }
    },
    methods: {
      login(){
        this.$store.dispatch('login',this.log)
      },
      userRegister(){
        this.$store.dispatch('register',this.newUser)
        this.$store.dispatch('login',this.newUser)
      },
      regLog(){
        this.logister = !this.logister
      }
    }
  }

</script>

<style>


</style>
