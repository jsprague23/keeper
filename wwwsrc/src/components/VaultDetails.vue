<template>
  <div class="VaultDetails">
    <div class="row">
      <div class="col justify-content-center">
        <h1>Vault Details for "{{activeVault.name}}"</h1>
      </div>
    </div>
    <div class="row">
      <div class="card-columns">
        <div v-if="keep.vaultId==activeVault.id" v-for="Keep in Keeps">
          <div class="card col-6">
            <router-link :to="{name: 'KeepDetails', params:{id: VaultKeep.id}}" @click="views">
              <h3 class="card-title titles">{{Keep.name}}</h3>
            </router-link>
            <img :src="Keep.image">
            <h5>Description:{{Keep.description}}</h5>
            <h5>Views:{{Keep.views}}</h5>
            <h5>Wrangles:{{Keep.keepCount}}</h5>            
          </div>
          <button class="btn btn-danger" @click="deleteKeep">Delete</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button @click="toggleModal(1)">Create a Keep</button>
        <modal :toggle="showModal">
            <div slot="header">
              <h3>Create Keep</h3>
            </div>
            <div>
              <form @submit.prevent="createKeep">
                <input type="text" placeholder="Keep Name" v-model="newKeep.name" required>
                <input type="url" placeholder="Keep Image Url" v-model="newKeep.Image">
                <input type="text" placeholder="Keep Description" v-model="newKeep.Description">
                <br>
                <div id="checkboxes">
                  <label for="public">Public</label>
                <input name="public"  type="checkbox" v-model="newKeep.publicKeep">
              </div>
                <button type="submit">Create Keep</button>
              </form>
            </div>
          </modal>
      </div>
    </div>
  </div>
</template>

<script>
  import Modal from './Modal'
  export default {
    name: 'VaultDetails',
    data() {
      return {
        showModal:0,
        newKeep:{
          name:'',
          Image:'',
          Description:'',
          publicKeep: false
        }
      }
    },
    components: {
      Modal
    },
    mounted(){
      this.$store.dispatch("getVaultKeeps", this.$route.params.id)
      this.$store.dispatch("activeVault")
      this.$store.dispatch("getKeeps")
    },
    computed: {
      Keeps(){
       return this.$store.state.Keeps
      },
      Vaults(){
        return this.$store.state.Vaults
      },      
      activeVault(){
        return this.$store.state.activeVault
      },
      currentUser() {
        return this.$store.state.currentUser
      }
    },
    methods: {
      views(Keeps){
        keep.views++
        this.$store.dispatch('editKeep',keep)
      },
      deleteKeep(id){
        this.$store.dispatch('deleteKeep',id)
      },
      createKeep(){
        this.$store.dispatch('createKeep',this.newKeep)
        this.toggleModal(-1)
      },
      toggleModal(n){
        this.showModal +=n
      }
    }
  }

</script>

<style>


</style>
