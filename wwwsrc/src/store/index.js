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
      debugger
      state.activeKeep= Keep
    },
    setActiveVault(state, Vault){
      state.activeVault=Vault
    },
    setKeeps(state,Keeps){
      debugger
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
      Account.delete('/'+state.currentUser.id)
      .then(res=>{
        console.log("You done logged out")
        commit('setUser', {})
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
        // dispatch("getVaults")
      })
    },
    activeVault({commit, state}, Vault){
      commit("setActiveVault", Vault)
      
    },
    activeKeep({commit,dispatch,state}, Keep){
      debugger
      api.get("/api/keepdetails/" + Keep.id)
      .then(res => {
        Keep.views++
        dispatch("editKeep", Keep)
        // commit("setActiveKeep", Keep)
      })
      // router.push({name:"KeepDetails", params:{id:Keep.id}})
    },
    createVault({commit,dispatch,state}, Vault){
      api.post("/api/Vault", Vault)      
      .then(res => {
        commit("setVaults", res.data)
        dispatch("getVaults")
        commit("setActiveVault", Vault)
        router.push({name:"VaultDetails", params: {id:Vault.id}})
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
      .catch(err=>{
        console.log(err)
      })
    },
    getVaultById({dispatch, commit, state}, Vault){
      api.get('/api/Vault/vaultdetails/'+ Vault.id)
      .then(res=>{
        console.log(res)
        commit('setActiveVault', res.data)
      })
    },
    deleteVault({commit,dispatch},id){
      api.delete('/api/Vault/'+ id)
      commit('setVaults')
      dispatch('getVaults')
    },
    createKeep({dispatch, commit, state},Keep){
      api.post('/api/Keep', Keep)
      .then(res=>{
        dispatch("getKeeps",res.data)
        commit('setKeeps')
        state.activeKeep = res.data
          router.push({name: "KeepDetails"})

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
    getKeepsById({commit, dispatch, state}, KeepId){
      debugger
      api.get('/api/keep/keepdetails/'+ KeepId)
      .then(res=>{
        commit('setActiveKeep', res.data)
        console.log(res)
        })
    },
    
    getKeepsByUserId({commit, dispatch, state}){
      api.get('/api/keep/user/'+ state.currentUser.id)
      .then(res=>{
        commit('setKeeps', res.data)
        console.log(res)
      })
    },
    editKeep({dispatch, commit},keep){
      api.put('/api/Keep/'+ keep.id, keep)
      .then(res=> {
        console.log(res)
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
    createVaultKeep({commit,dispatch,state},payload){
      var newVaultKeep={}
      newVaultKeep.userId = payload.vaultKeep.UserId
      newVaultKeep.keepId = payload.vaultKeep.KeepId
      newVaultKeep.vaultId = payload.vaultKeep.VaultId
      console.log(newVaultKeep)
      api.post('/api/vaultKeeps', newVaultKeep)
      .then(res=>{
        payload.keep.keepCount++;
        dispatch('activeKeep', payload.keep)
        dispatch('editKeep', payload.keep);
        })
      .catch(err =>{
        console.log(err)
      })
     
    },
    getVaultKeeps({commit,dispatch, state}, vaultId){
      debugger
      api.get('/api/VaultKeeps/'+ vaultId)
      .then(res=>{
        dispatch('getKeepsById', res.data.keepId)        
      })
      .catch(err=>{
        console.log(err)
      })
    }
    
  }

})