import Home from './components/Home'
import MovieDetails from './components/MovieDetails'
import Favorites from './components/Favorites'



export default [
    {path:"/", name:"home", component:Home},
    {path:"/details/:name", name:'details',component:MovieDetails, params:true},
    {path:"/favorites", name:'favorites',component:Favorites, params:true}
]
    