export default {
    namespaced:true,
    state:{
        auth:{
            token:""
        }
    },
    mutations:{
        SET_USERINFO: function(state, payload){
            state.auth.token = payload.token
        }
    },
    actions:{
        setUser:function({commit}, payload){
            return commit("SET_USERINFO", payload)
        }
    }
}