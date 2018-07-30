import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'

vue.use(vuex)

var production = !window.location.host.includes('localhost');
var baseUrl = production ? '//herokuapp.com/': '//localhost:5000';

var api = axios.create({
  baseURL: baseUrl,
  timeout: 3000,
  withCredentials: true
})

var Account = axios.create({
  baseURL : baseUrl + "/Account",
  timeout: 3000,
  withCredentials: true
})

export default new vuex.Store({
  state:{
    currentUser: {},
    Vaults: [],
    Keeps: [],
    userKeeps: [],
    vaultKeeps: [],
    activeVault: {},
    activeKeep: {}


  },
  mutations: {
    deleteUser(state){
      state.currentUser = {}
    },
    setUser(state, currentUser) {
      state.currentUser = currentUser
    },
    setVaults(state, Vaults){
      state.Vaults =Vaults
    }

  },
  actions: {
    login({commit, dispatch}, loginCredentials){
      Account.post('/login', loginCredentials)
      .then(res =>{
        console.log("you done logged in!")
        commit('setUser', res.data)
        router.push({
          name:'Home'
        })
      })
    },
    logout({commit, dispatch}){
      Account.delete('/logout')
      .then(res=>{
        console.log("You done logged out")
        commit('deleteUser', res.data)
      })
    },
    register({commit, dispatch},userData){
      Account.post('/register', userData)
      .then(res=>{
        console.log("You done made the best decision of your life, since graduating grade school you done registered!")
        router.push({
          name: 'Home'
        })
      })
    },
    authenticate({commit, dispatch}){
      Account.get('/authenticate')
      .then(res => {
        console.log("Yep, this cowboy is a straight shooter")
        commit('setUser', res.data)
      })
    },
    activeVault({commit, dispatch,state}, Vault){
      commit("setActiveVault", Vault)
    },
    activeKeep({commit, dispatch, state}, Keep){
      commit("setActiveKeep", Keep)
    },
    createVault({commit,dispatch,state}, Vault){
      
      api.post("/api/Vault", Vault)      
      .then(res => {
        commit("setVaults", res.data)
        router.push({name:"VaultDetails"})
      })
      .catch(err =>{
        console.log(err)
      })
    },
    getVaults({dispatch, commit,state}){
      debugger
      api.get('/api/Vault'+ state.currentUser.id)
      .then(res =>{
        commit('setVaults', res.data)
        dispatch("getVaults")
      })
    },
    deleteVault({commit,dispatch},id){
      api.delete('/api/Vault'+ id)
      commit('setVaults')
      dispatch('getVaults')
    }
    
  }

})