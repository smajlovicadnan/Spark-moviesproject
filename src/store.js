import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)


export default new Vuex.Store({
    plugins: [createPersistedState()],
 state:{
     movies:[],
    
 },
 getters:{ 
     getMovies:state=>{
         return state.movies
     }
 },
 mutations:{
     setData(state,data){
         state.movies=data.data
    },
   
 },
 actions:{ 
     getData(context){
         Vue.axios.get("https://output.jsbin.com/wokedotuki.json")
          .then(response=>{
              context.commit('setData',response.data)
          })
     },
    
    
 }

})