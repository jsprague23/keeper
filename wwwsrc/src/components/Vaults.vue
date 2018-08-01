<template>
  <div class="Vaults container-fluid d-flex justify-content-center">
    <div class="row">
      <div class="jumbotron logoFont">
        <h1> Your Corrals</h1>
      </div>
      <div class="card-columns">
        <div class="card Vault in Vaults">
          <router-link @click.native="activeVault(Vault)" :to "{name: 'VaultDetails', params:{id: Vaults.id}">
            <h3 class="card-title logoFont clicker">{{Vaults.name}}</h3>
          </router-link>
          <div class="card-body">
            <h5 class="logoFont">Description:</h5>
            <h3 class="logoFont font-weight-bold">Description:</h3>
            <h4 class="logoFont font-weight-light ">{{Vaults.Description}}</h4>
            <h3 class="logoFont font-weight-bold">Corral Author:</h3>
            <h3 class="logoFont font-italic font-weight-bold">{{currentUser.name}}</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="card-columns">
        <div>
          <button class="logoFont" @click="toggleModal(1)">Create a Vault</button>
          <modal :toggle="showModal">
            <div slot="header">
              <h3 class="logoFont">Create Vault</h3>
            </div>
            <div>
              <form @submit.prevent="createVault">
                <input type="text" placeholder="Vault Name" v-model="newVault.Name" required>
                <input type="text" placeholder="Vault Description" v-model="newVault.Description">
                <button class="logoFont" type="submit">Create Vault</button>
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
    name: 'Vaults',
    data() {
      return {
        showModal: 0,
        newVault: {
          Name: '',
          Description: ''
        }

      }
    },
    mounted() {
      this.$store.dispatch("getVaults")
    },
    components: {
      Modal
    },
    computed: {
      Vaults() {
        return this.$store.state.Vaults
      },
      currentUser() {
        return this.$store.state.currentUser
      }
    },
    methods: {
      deleteVault(id) {
        this.$store.dispatch('deleteVault', id)
      },
      createVault() {
        this.$store.dispatch('createVault', this.newVault)
      },
      toggleModal(n) {
        this.showModal += n
      },
      activeVault(Vault) {
        this.$store.dispatch('activeVault', Vault)
      }
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
    background: #d5eeff;
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
