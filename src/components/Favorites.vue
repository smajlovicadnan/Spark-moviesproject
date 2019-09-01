<template>
    <div>
            <div>

        <ul v-for="(movie,index) in getMovies" :key="index">
            
               <div :class="view" v-if="createMovie(index)"><p style="font-size:18px">{{movie.title}}</p>
              <router-link :to="{name:'details' ,params:{name:movie.title}}">
               <img :src="movie.cover" width="230px" height="200px">
              </router-link>
               <a style="font-size:20px">Rating:{{movie.rating}}</a><br>
               </div>
               </ul>
</div>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import firebase from '../firebase'

export default {
    data(){

     return{
     firebase:firebase.firebase,
     favorites:[],
     show:false,
     view:'inline',
     length:0,

     }
    },
    methods:{
        createMovie(index){
             for(var i=0;i<this.length;i++){
            if(index===this.favorites[i])
                return true;
                                      
        }
        }

    },
      computed:{
      ...mapGetters([
        'getMovies'
      ])
        
    },
    created(){
          var database=this.firebase.firestore();
  var movie=database.collection('favorites').get().then((snapshot)=>{
   snapshot.docs.forEach(movie=>{
       this.favorites.push(movie.data().id)
       console.log(movie.data().id)
       this.length++;
  })
  })
    }
}
</script>
<style>
.list{
 width: 250px;
  height: 350px;
  border:1px solid black;
    background-color:#1d1b1b; 
     border-radius: 25px;
    text-align: center;  
}
.inline{
  width: 230px;
  height: 350px;
  margin:10px;
  border:1px solid black;
  background-color:#201e1e; 
   border-radius: 25px;
  float: left;
  text-align: center;  
    
}
img{
opacity: 0.5;
  filter: alpha(opacity=50);
}
img:hover{  
  opacity: 1.0;
  filter: alpha(opacity=100);
}
#view{
  font-size: 25px;
  margin: 5px;
 
}
.choose-view{
  color:white;
  margin-left: 93%;
  margin-top: -38px;
  display: absolute;
  }
#view:hover {
  color:aqua;
}
#view:active{
  color:gray;
}
</style>