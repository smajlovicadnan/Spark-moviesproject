<template>
    <div>
       <div class="choose-view">
             <i id="view" class="fa fa-list" @click="view='list'" alt="list"></i>
             <i id="view" class="fa fa-th" @click="view='inline'" alt="inline"></i>  
       </div>

       <div class="container">
         <router-link :to="{name:'favorites',params:{favorites}}">
      <i @click="pushFavorites(favorites)"  id="heart" class="fa fa-heart" style="color:red"></i>
      <span class="badge badge-notify" style="font-size:16px;">{{num}}</span>
         </router-link>
      </div>
           
       <div>
               <ul v-for="(movie,index) in getMovies" :key="index">
               <div :class="view"><p style="font-size:18px">{{movie.title}}</p>
              <router-link :to="{name:'details' ,params:{name:movie.title}}">
               <img :src="movie.cover" width="230px" height="200px">
              </router-link>
               <a style="font-size:20px">Rating:{{movie.rating}}</a><br>
        <div id="btn" v-for="like in movieLikes" :key="like.id">
          <div v-if="like.id===index">
           <i class="fa fa-thumbs-up" style="font-size:30px;" @click="increaseLikes(index)">
           <a >{{like.likes}}</a></i>
          <div id="btn2">
          <i id="dis" class="fa fa-thumbs-down" style="font-size:30px;color:red" @click="increaseDislikes(index)">
          <a>{{like.dislikes}}</a></i>
         </div>
         </div>
     </div>
  
    <button id="fav"><i class="fa fa-heart" @click.once="addFavorite(index)"> Add to favorite</i></button>
   </div>                    
  </ul>

         </div>
       
       
       </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
  import firebase from '../firebase'

export default {

    data(){
        return{
             view:'list',
             num:0,
             firebase:firebase.firebase,
             movieLikes:[],
             likes:0,
             dislikes:0,
             favorites:[],
             searchMovie:null,
                    
               
        }
    },
    methods:{
  addFavorite(index){
    if(this.favorites.length===0){
    this.favorites.push(index)
    this.num++
    }
    for(var i=0;i<this.favorites.length;i++){
      if(this.favorites[i]!==index){
         this.favorites.push(index)
         this.num++
      }
    }
   this.favorites=[...new Set(this.favorites)]
  },   

  increaseLikes(index){
  this.updateLikes(index)
  const increment=this.firebase.firestore.FieldValue.increment(1);
  var database=this.firebase.firestore();
  var movie=database.collection('likes').doc(index);
  const batch=database.batch();
  batch.set(movie,{likes:increment},{merge:true});
  batch.commit();

   },

  increaseDislikes(index){
  this.updateDislikes(index)
  const increment=this.firebase.firestore.FieldValue.increment(1);
  var database=this.firebase.firestore();
  var movie=database.collection('likes').doc(index);
  const batch=database.batch();
  batch.set(movie,{dislikes:increment},{merge:true});
  batch.commit();
  },
  pushLikes(){
  var database=this.firebase.firestore();
  var movie=database.collection('likes').get().then((snapshot)=>{
   snapshot.docs.forEach(movie=>{
  this.movieLikes.push({
    id:movie.id,
    likes:movie.data().likes,
    dislikes:movie.data().dislikes
  })})
 });
 },
 updateLikes(id){
   this.movieLikes.forEach(element=>{
     if(element.id===id)
    element.likes+=1
   })
 },
  updateDislikes(id){
   this.movieLikes.forEach(element=>{
     if(element.id===id)
    element.dislikes+=1;
   })
 },
 pushFavorites(favorites){
 var niz=[...new Set(favorites)]
  var database=this.firebase.firestore();
niz.forEach(index=>{
  database.collection('favorites').add({
     id:index
  })  
})

 },
  getLength(){
   var database=this.firebase.firestore();
  var movie=database.collection('favorites').get().then((snapshot)=>{
   snapshot.docs.forEach(movie=>{
   this.num=Object.keys(movie).length
  }) })
  },

    },
    computed:{
      ...mapGetters([
        'getMovies'
      ]),
      
    },
   
    created(){
      this.$store.dispatch("getData");
      this.pushLikes();
      this.getLength();

    },
    
}


</script>
<style >

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
  background-color:#1d1b1b; 
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
  text-align:center;
 
}
.choose-view{
  color:white;
  margin-left: 93%;
  margin-top: -38px;
  display: absolute;
  }
#view:hover {
  color:yellow;
}
#view:active{
  color:#1a0000;
}

#btn2{
margin-left: 130px;
margin-top:-27px;
}
#btn i{
color:green;
}
#btn i:hover{
 color:yellow;
}
#dis{
  color:red;
  margin-left:20px;
}
#dis:hover{
 color:yellow;
}
#btn{
margin-right: 120px;
}
#fav{
  margin-top: 5px;
  width: 130px;
  height: 25px;
}
#fav :hover{
 color: rgb(3, 94, 110);
}
  .container{
    margin-left: 89%;
    margin-top:-30px;
  }
.badge-notify{
   color:white;
   position:relative;
   top: -17px;
   left: -7px;
  }
  #heart{
    font-size:27px;
    opacity: 0.4;
    text-decoration: none;

  }
  #heart:hover{
    opacity: 1.0;
  }
  

</style>