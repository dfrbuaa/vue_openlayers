import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nowPoint: null,
    nowAirport: [],
    list_day: [],


    col: null,
    hours: [],
    temp: []

  },
  mutations: {
    changePoint (state, msg) {
      state.nowPoint = msg;
    },
    changeAirport (state, msg) {
      state.nowAirport = msg;
    },
    changeTemp (state, msg) {
      state.temp = msg;
      state.temp.forEach((val, index,) => {
        state.temp[index] = Math.round(val - 273.15) + '℃'

      })


    },

    changeTime (state, msg) {
      state.time = msg;
      state.time.shift()
    },


    changeHours (state, msg) {

      state.hours = msg
    },
    changeCol (state, msg) {
      state.col = 8 - Math.floor(state.hours[0] / 3);
    }

  },
  getters: {


  },

  actions: {
  },
  modules: {
  }
})
