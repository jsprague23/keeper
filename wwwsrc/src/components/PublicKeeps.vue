<template>
  <div class="Keeps container-fluid d-flex justify-content-center">
    <div class="row">
      <div v-if="Keep.publicKeep=true" v-for="Keep in Keeps" class="col" :key="Keep.id">
        <router-link @click.native="activeKeep(Keep)" :to="{name: 'KeepDetails', params:{id: Keep.id}}" @click="views">
          <h2 class="card-title titles">{{Keep.name}}</h2>
        </router-link>
        <h4 class="logoFont">Description: {{Keep.description}}</h4>
        <h4 class="logoFont">Views: {{Keep.views}}</h4>
        <h4 class="logoFont">Wrangles: {{Keep.keepCount}}</h4>
        <img :src="Keep.image">
        <select @click="addVaultKeep(Keep)" v-model="vaultId">
          <option disabled>Select a Corral</option>
          <option v-for="Vault in Vaults" :value="Vault.id" :key="Vault.id">{{Vault.name}}</option>
        </select>
        <span>Selected: {{vaultId}}</span>
        <button @click="addVaultKeep(Keep)">Add to Corral</button>
      </div>
    </div>
    <div class="row">
      <div class="card-columns">
        <div>
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
                <input type="checkbox" placeholder="Public" id="checkbox" v-model="newKeep.checked">
                <button type="submit">Create Keep</button>
              </form>
            </div>

          </modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Modal from './Modal'
  export default {
    name: 'PublicKeeps',
    data() {
      return {
        vaultId:'',
        showModal:0,
        newKeep:{
          name:'',
          Image:'',
          Description:'',
          checked:[]
        }

      }
    },
    mounted(){
      this.$store.dispatch("getKeeps")
      this.$store.dispatch("getVaults")
    },
    computed: {
      Keeps() {
        return this.$store.state.Keeps
      },
      Vaults() {
        return this.$store.state.Vaults
      },
      currentUser(){
        return this.$store.state.currentUser
      }
    },
    components:{
      Modal
    },
    methods: {
      views(Keep){
        Keep.views++
        this.$store.dispatch('editKeep', Keep)
      },
      addVaultKeep(Keep) {
        this.$store.dispatch('createVaultKeep',{
          KeepId: Keep.id,
          VaultId: this.vaultId,
          UserId: this.currentUser.id
        })
        this.$store.dispatch('editKeep',Keep)

      },
      createKeep() {
        this.$store.dispatch('createKeep', this.newKeep)
        this.toggleModal(-1)
      },
      toggleModal(n){
        this.showModal +=n
      },
      activeKeep(Keep){
        this.$store.dispatch('activeKeep', Keep)
      }
    }
  }

</script>

<style>


</style>
