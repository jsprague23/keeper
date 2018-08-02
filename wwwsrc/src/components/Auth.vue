<template>
  <div class="container-fluid d-flex justify-content-center">
<div class="jumbotron">
  <h1>Keeper Corral</h1>
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
    name: 'Auth',
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
    mounted(){
      this.$store.dispatch('authenticate')
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
    .clicker {
      cursor: pointer;
      color: blue;
      text-decoration: underline;
    }
  
    html {
      background: #a2792f;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
    }
  
    .jumbotron {
      text-align: center;
      background: #f7ca44;
      margin-left: 5rem;
      margin-right: 5rem;
      margin-top: 5rem;
      margin-bottom: auto;
  
  
    }
  
  
    .container-fluid {
      background: #d5eeff;
      background-size: cover;
      margin: 0px;
      height: 100%;
      width: 100%;
  
    }
  
    .logoFont {
      font-family: 'Caveat', cursive;
    }
  
  </style>
  
