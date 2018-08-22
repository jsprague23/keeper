<template>
  <div class="container-fluid d-flex justify-content-center">
    <div class="row">
      <div class="jumbotron">
        <h1 class="logoFont">Howdy there cowpolk!</h1>
        <h5 class="logoFont">Here you can create vaults, keeps go inside these "vaults" which are things you are interested in and "corral" other members keeps that you like!</h5>
      </div>
      <Vaults></Vaults>
    </div>
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
        return this.$store.state.Vaults
      }
    },
    methods: {

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

  /* .logoFont {
    font-family: 'Caveat', cursive;
  }  */

</style>
