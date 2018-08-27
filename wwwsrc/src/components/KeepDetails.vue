<template>
  <div class="KeepDetails">
    <div class="row">
      <h1>Keep Details for {{activeKeep.name}}</h1>
      <div class="card-columns">
        <div class="card col-6">
          <h4 class="logoFont">Description: {{activeKeep.description}}</h4>
          <h4 class="logoFont">Views: {{activeKeep.views}}</h4>
          <h4 class="logoFont">Keeps: {{activeKeep.keepCount}}</h4>
          <img :src="activeKeep.image">
          <button v-if="currentUser" class="btn btn-danger" @click="deleteKeep(activeKeep.id)">Delete</button>
        </div>
      </div>      
    </div>
  </div>
</template>

<script>
  export default {
    name: 'KeepDetails',
    data() {
      return {

      }
    },
    mounted(){
      this.$store.dispatch('getKeepById', this.$route.params.KeepId)
      },
    computed: {
      currentUser(){
        return this.$store.state.currentUser
      },
      activeKeep(){
        return this.$store.state.activeKeep
        
      }
    },
    methods: {
      deleteKeep(id){
        this.$store.dispatch('deleteKeep', id)
      },
      editKeep(id){
        this.$store.dispatch('editKeep',id)
      }
    }
  }

</script>

<style>


</style>
