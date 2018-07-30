<template>
  <div class="container-fluid d-flex justify-content-center">
    <div class="jumbotron">
      <h1 class="logoFont">Howdy there cowpolk!</h1>
      <h5 class="logoFont">Don't be shy, look around stay awhile. This is your profile after all. My hats off to you. Its a pretty nice place you've got here.</h5>
    </div>
    <Vaults></Vaults>

  </div>
</template>

<script>
  import Vaults from './Vaults'
  import Modal from './Modal'
  export default {
    name: 'ProfilePage',
    data() {
      return {

      }
    },
    components: {
      Vaults,
      Modal
    },
    computed: {
      currentUser() {
        return this.$store.state.currentUser
      },
      userVaults() {
        return this.$store.state.userVaults
      }
    },
    methods: {}
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
  
