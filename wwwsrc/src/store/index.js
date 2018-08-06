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
    },
    setActiveKeep(state, Keep){
      state.activeKeep= Keep
    },
    setActiveVault(state, Vault){
      state.activeVault=Vault
    },
    setKeeps(state,Keeps){
      state.Keeps=Keeps
    },
    setVaultKeeps(state, VaultKeeps){
      state.vaultKeeps=VaultKeeps
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
        dispatch("getVaults")
      })
    },
    logout({commit, dispatch,state}){
      Account.delete('/logout/'+state.currentUser.id)
      .then(res=>{
        console.log("You done logged out")
        commit('deleteUser', res.data)
        router.push({name: 'Auth'})
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
        dispatch("getVaults")
      })
    },
    activeVault({commit}, Vault){
      commit("setActiveVault", Vault)
    },
    activeKeep({commit}, Keep){      
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
      api.get('/api/Vault/userId/'+ state.currentUser.id)
      .then(res =>{        
        commit('setVaults', res.data)
      })
    },
    deleteVault({commit,dispatch},id){
      api.delete('/api/Vault/'+ id)
      commit('setVaults')
      dispatch('getVaults')
    },
    createKeep({dispatch, commit},Keep){
      api.post('/api/Keep', Keep)
      .then(res=>{
        dispatch("getKeeps",res.data)
        commit('setKeeps')
      })
      .catch(err=>{
        console.log(err)
      })
    },
    getKeeps({commit}){
      api.get('/api/Keep')
      .then(res=>{
        commit('setKeeps',res.data)
      })
      .catch(err=> {
        console.log(err)
      })
    },
    editKeep({dispatch, commit},keep){
      api.put('/api/Keep/'+ keep.id, keep)
      .then(res=> {
        console.log(res)
        commit('setKeeps')
        dispatch('getKeeps')
      })
    },
    deleteKeep({dispatch},id){
      api.delete('/api/Keeps/'+id)
      .then(dk=>{
        dispatch('getKeeps')
      })
      .catch(err =>{
        console.log(err,"something done gone wrong")

      })
    },
    createVaultKeep({commit,dispatch,state},vaultKeep){
      api.post('/api/vaultKeeps', vaultKeep)
      .then(res=>{
        vaultKeep.keepCount++;
        dispatch('editKeep', vaultKeep.keep);
        dispatch('getVaultKeeps')
        commit("setVaultKeeps", res.data)
      })
      .catch(err =>{
        console.log(err)
      })
     
    },
    getVaultKeeps({commit, state},){
      api.get('/api/VaultKeeps/'+ state.currentUser.id)
      .then(res=>{
        commit('setVaultKeeps', res.data)
      })
    }
    
  }

})