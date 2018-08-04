<template>
  <div class="hello">
    <div class="row">
      <div class="col">
        <h1>WELCOME TO KEEP COUNTRY!</h1>
        <h3>Time to Wrangle Some Keeps Partner!</h3>
      </div>
    </div>
    <div class="row">
      <PublicKeeps></PublicKeeps>
    </div>
  </div>
</template>

<script>
  import PublicKeeps from './PublicKeeps'
  export default {
    name: 'Home',
    components: {
      PublicKeeps
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .clicker {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
  }

  html {
    background: #d5eeff;
    ;
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
