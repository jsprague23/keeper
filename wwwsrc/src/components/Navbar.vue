<template>
  <div class="Navbar">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Keep Corral</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-item nav-link active" :to="{name:'Home'}">Home
            <span class="sr-only">(current)</span>
          </router-link>
          <router-link class="nav-item nav-link disabled" href="#About">Features</router-link>
          <router-link class="nav-item nav-link" :to="{name:'ProfilePage'}">Profile</router-link>
          <div v-if="!currentUser.id">
            <router-link class="nav-item nav-link" :to="{name:'Auth'}">Login/Register</router-link>
          </div>
          <button class="button" v-if="currentUser.id" @click="logout"></button>
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
      user(){
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


</style>
