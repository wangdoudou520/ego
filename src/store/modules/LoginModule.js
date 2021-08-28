export default {
    namespaced:true,
    state:{
       userInfo:{
           token:'',
           user:''
       }
     },
     mutations:{
       setInfo(state,payload){
          state.userInfo=payload
       },
       deleteInfo(state){
          state.userInfo={
            token:'',
            user:''
        }
       }
     },
     actions:{
 
     }
}