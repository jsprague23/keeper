<template>
  <div class="VaultDetails">
    <div class="row">
      <div class="col justify-content-center">
        <h1>Vault Details for {{activeVault.vault.id}}</h1>
      </div>
    </div>
    <div class="row">
      <div class="card-columns">
        <div v-for="VaultKeep in VaultKeeps">
          <div class="card col-6">
            <router-link :to="{name: 'KeepDetails', params:{id: VaultKeep.id}}" @click="views">
              <h3 class="card-title titles">{{VaultKeep.name}}</h3>
            </router-link>
            <img :src="VaultKeep.image">
            <h5>Description:{{VaultKeep.description}}</h5>
            <h5>Views:{{VaultKeep.views}}</h5>
            <h5>Wrangles:{{VaultKeep.keepCount}}</h5>
            <select @click="editKeep(Keep)" v-model="privacy">
              <option v-for="option in options" v-bind:value="option.value">
                {{option.text}}
              </option>
            </select>
            <span>Selected: {{selected}}</span>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Modal from './Modal'
  export default {
    name: 'VaultDetails',
    data() {
      selected:'Public'
      options:[
        {text: 'Public', value: 'public'},
        {text: 'Private', value:'private'}
      ]
      return {

      }
    },
    components:{
      Modal
    },
    computed: {},
    methods: {}
  }

</script>

<style>


</style>
