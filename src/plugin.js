export default{
    install(Vue, options) {
        const name='Adnan',lastname='Smajlovic'
    
        Vue.prototype.getfullname = function() {
          return name+lastname;
        };
        
        
}
}