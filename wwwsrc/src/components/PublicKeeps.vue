<template>
  <div class="Keeps container-fluid d-flex justify-content-center">
    <div class="row">
      <!-- v-if="Keep.publicKeep==true"  -->
      <div v-for="Keep in Keeps" class="col" :key="Keep.id">
        <router-link :to="{name: 'KeepDetails', params:{KeepId: Keep.id}}">
          <h2 class="card-title titles">{{Keep.name}}</h2>
        </router-link>
        <h4 class="logoFont">Description: {{Keep.description}}</h4>
        <h4 class="logoFont">Views: {{Keep.views}}</h4>
        <h4 class="logoFont">Wrangles: {{Keep.keepCount}}</h4>
        <img :src="Keep.image">
        <select v-model="vaultId">
          <option disabled>Select a Corral</option>
          <option @click="addVaultKeep(Keep)" v-for="Vault in Vaults" :value="Vault.id" :key="Vault.id">{{Vault.name}}</option>
        </select>
        <span>Selected: {{vaultId}}</span>
        <button @click="addVaultKeep(Keep, vaultId)">Add to Corral</button>
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
                <select v-model="newKeep.vaultId">
                    <option disabled>Select a Corral</option>
                    <option @click="addVaultKeep(Keep)" v-for="Vault in Vaults" :value="Vault.id" :key="Vault.id">{{Vault.name}}</option>
                  </select>
                  <span>Selected: {{vaultId}}</span>
                <br>
                <div id="checkboxes">
                  <label for="public">Public</label>
                  <input name="public" type="checkbox" v-model="newKeep.publicKeep">
                </div>
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
        vaultId: '',
        showModal: 0,
        newKeep: {
          name: '',
          Image: '',
          Description: '',
          vaultId:'',
          publicKeep: false
        }
        // props:{
        //   Public:{
        //     type:Boolean,
        //     required: true,
        //   }
        // }

      }
    },
    mounted() {
      debugger
      this.$store.dispatch('authenticate'),
      this.$store.dispatch("getKeeps", this.$route.params.id),
        this.$store.dispatch('getVaults', this.$route.params.id)
    },
    computed: {

      Keeps() {
        return this.$store.state.Keeps
      },
      Vaults() {
        return this.$store.state.Vaults
      },
      currentUser() {
        return this.$store.state.currentUser
      }
    },
    components: {
      Modal
    },
    methods: {
      addVaultKeep(keep, VaultId) {
        let vaultKeep = {
          KeepId: keep.id,
          VaultId: VaultId,
          UserId: this.currentUser.id
        }
        let payload = {
          vaultKeep, keep
        }
        this.$store.dispatch('createVaultKeep', payload)
        // this.$store.dispatch('editKeep', Keep, this.currentUser.id)

      },
      createKeep() {
        this.$store.dispatch('createKeep', this.newKeep)
        this.toggleModal(-1)
      },
      toggleModal(n) {
        this.showModal += n
      },
      activeKeep(Keep) {
        this.$store.dispatch('activeKeep', Keep)
      }
    }
  }

</script>

<style>


</style>
