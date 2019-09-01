<template>
  <div class="detail">

     <ul v-for="(movies,index) in getMovies" :key="index">
         <div v-if="movies.title===movie.name">            
            <img :src="movies.cover" width="300px" height="500px">
                <div id="details">

                 <h1>{{movies.title}}</h1>
                 <p><strong>Release Date:</strong> {{movies.releaseDate}}</p>
                 <p><strong>Release Country:</strong> {{movies.releaseCountry}}</p>
                 <p><strong>Movie Rating:</strong> {{movies.rating}}</p>
                 <p><strong>Imdb: </strong> <a :href="`http://imdb.com/title/${index}`">http://imdb.com/title/{{index}}</a> </p>
                 
                </div>

         </div>
     </ul>
   </div>      
</template>
<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
export default {
    data(){
        return {
            movie:this.$route.params,
    
        }
    },
      computed:{
          ...mapGetters([
              'getMovies'
          ])
     
    },
    methods:{

    }

}
</script>
<style scoped>
.detail{
   background-color: #1a0000;
   margin-top: 20px;
   height: 550px;
}
img{
    border: 1px solid black;
    margin-top: 20px;
}
#details{
    background-color: #4d0000;
    width: 60%;
    height: 500px;
    display: absolute;
    margin-left: 30%;
    margin-top: -40%;
    
}
h1{
    text-align: center;
    font-size: 40px;
}
p{
    padding: 10px;
    margin-left: 30px;
    font-size: 25px;
    color:white;
}
a{
    color:white;
}
a:hover{
    color:yellow;
}
</style>

