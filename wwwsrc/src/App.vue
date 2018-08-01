<template>
  <div id="app">
    <router-view/>
    <Navbar></Navbar>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  },
  mounted(){
    this.$store.dispatch('authenticate')

  }
}
</script>

<style>
#app {
  font-family: 'Jura', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color:  #a2792f;;
  margin-top: 60px;
  background-color: #d5eeff;
}
</style>
