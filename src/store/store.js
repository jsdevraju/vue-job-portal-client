import { createStore } from 'vuex';
import authModule from './module/authModule';

export default createStore({
    state:{
        authState:authModule.state
    },
    mutations:{

    },
    actions:{

    }, modules:{
        authModule
    },
    getters:{
        getToken: function(state){
            return state.authState.auth
        }
    }
})