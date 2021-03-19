<template>
  <div>
    <div>{{ this.temp_surface }}</div>
    <div>{{ this.nowPoint }}</div>
  </div>
</template>
<script>



export default {
  props: ["nowPoint"],
  data () {
    return {
      ts: [],
      units: [],
      wind_u_surface: [],
      wind_v_surface: [],
      temp_surface: []


    }
  },

  mounted () {

  },
  updated () {
    this.throttle(this.pointApi(this.nowPoint), 120000)
  },

  methods: {
    throttle (fn, delay) {
      let timer = null;
      return function () {
        if (timer) {
          return
        }
        timer = setTimeout(() => {
          fn.apply(this, arguments);
          timer = null
        }, delay)
      }
    },
    pointApi (point) {

      this.$axios({
        method: 'post',
        url: ' https://api.windy.com/api/point-forecast/v2',
        data: {
          "lat": parseFloat(point.lat),
          "lon": parseFloat(point.lng),
          "model": "gfs",
          "parameters": ["wind", "temp", "pressure"],
          "levels": ["surface"],
          "key": "fd4RLs33Bb3Mg3qginrlRtYVrhZ0otLi"

        },
        header: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        this.ts = res.data.ts;
        console.log(res.data)
        this.wind_u_surface = res.data["wind_u-surface"];
        this.temp_surface = res.data["temp_surface"];
        console.log()
      }).catch((err) => {
        console.log(err)
      })

    }
  }

}
</script>
<style scoped>
</style>