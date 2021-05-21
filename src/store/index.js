import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nowPoint: null,
    nowAirport: [],
    col: null,
    hours: [],
    temp: [],
    dewpoint: [],
    rh: [],
    gh: [],
    wind_s: [],
    wind_d: []

  },
  mutations: {
    changePoint (state, msg) {
      state.nowPoint = msg;
    },

    changeAirport (state, msg) {
      state.nowAirport = msg;
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
    },

    changeTemp (state, msg) {
      state.temp = msg;
      state.temp.forEach((val, index,) => {
        state.temp[index] = Math.round(val - 273.15) + '°'

      })
    },

    changeDewpoint (state, msg) {
      state.dewpoint = msg;
      state.dewpoint.forEach((val, index,) => {
        state.dewpoint[index] = Math.round(val - 273.15) + '°'

      })
    },
    changeRh (state, msg) {

      state.rh = msg;
    },
    changeGh (state, msg) {

      state.gh = msg;
    },
    changeWinds (state, msg) {

      state.wind_s = msg;
    },
    changeWindd (state, msg) {

      state.wind_d = msg;
    },



  },
  getters: {


  },

  actions: {
  },
  modules: {
  }
})
