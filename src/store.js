import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    audio:null,
    startBtn:null,
    isStart:false
  },
  mutations: {
    triggerStart(state){
      if(!state.isStart)
        state.isStart = true
      return
    }
  },
  actions: {

  }
})
