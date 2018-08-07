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
          <select @click="editKeep(Keep)" v-model="selected">
              <option v-for="option in options" v-bind:value="option.value">
                {{option.text}}
              </option>
            </select>
            <span>Selected: {{selected}}</span>
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
      selected: 'Public'
      options: [{
          text: 'Public',
          value: 'public'
        },
        {
          text: 'Private',
          value: 'private'
        }
      ]
      return {

      }
    },
    mounted(){
      this.$store.state.activeKeep
    },
    computed: {
      currentUser(){
        return this.$store.state.currentUser
      },
      activeKeep(){
        this.$store.state.activeKeep
        
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
