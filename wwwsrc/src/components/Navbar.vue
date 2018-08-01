<template>
  <div class="Navbar">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link class="nav-item nav-link" :to="{name:'Home'}">Keeper Corral</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-item nav-link active" :to="{name:'Home'}">Home
          </router-link>
          <router-link class="nav-item nav-link disabled" href="#About">Features</router-link>
          <router-link class="nav-item nav-link active" :to="{name:'ProfilePage'}">Profile</router-link>
          <div v-if="!currentUser.id">
            <router-link class="nav-item nav-link" :to="{name:'Auth'}">Login/Register</router-link>
          </div>
          <button class="button" v-if="currentUser.id" @click="logout">Logout</button>
        </div>
      </div>
    </nav>

    </nav>

  </div>
</template>

<script>
  import router from '../router'
  export default {
    name: 'Navbar',
    data() {
      return {

      }
    },
    computed: {
      currentUser(){
        return this.$store.state.currentUser
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      }
    }
  }

</script>

<style>
  

  button:hover{
    background-color: #f7ca44;
  }
  .navbar {
    font-family: 'Jura', sans-serif;
    font-weight: bold;
    overflow: hidden;
    background-color: #f7ca44;
    position: fixed;
    /* Set the navbar to fixed position */
    top: 0;
    /* Position the navbar at the top of the page */
    width: 100%;
    /* Full width */
    box-shadow: #000000;
    color: #a2792f;
    background-color:#d5eeff;
  }

.navbar a {
    float: left;
    display: block;
    color: #a2792f;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }
  .navbar a:hover {
    background:#f7ca44;
    color: #5c3c10;
  }
  .navbar {
    background-color: #f7ca44;

  }
  .button {
    margin-left: 1rem;
    background-color: white;
    border:#5c3c10 solid .1rem;
  }

</style>
