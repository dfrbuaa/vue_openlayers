import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nowPoint: null,
    nowAirport: [],
    list_day: [],

    time0: null,
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
    changeList (state, msg) {
      state.list_day.push(msg)
    },
    changeTime (state, msg) {
      state.time = Array.from(new Set(state.list_day))
    },

    changeTime0 (state, msg) {
      state.time0 = state.time.shift()
    },
    changeHours (state, msg) {
      state.hours.push(msg)
    },
    changeCol (state, msg) {
      state.col = 8 - Math.floor(state.hours[0] / 3);
    }

  },
  getters: {
    time: function (state) {
      let t1 = Array.from(new Set(state.list_day))
      t1.shift()
      return t1
    }
  },

  actions: {
  },
  modules: {
  }
})
