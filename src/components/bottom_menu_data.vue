<template>
  <div id="menu">
    <div id="left"></div>
    <div id="right">
      <li>{{ Object.keys(this.nowAirport[0]) }}</li>
      <!-- <li>机场名称:{{ this.nowAirport[0].name }}</li> -->
      <!-- <li>机场分类:{{ this.nowAirport[0].机场分类 }}</li>
      <li>允许飞行种类:{{ this.nowAirport[0].允许飞行种类 }}</li>
      <li>机场性质:{{ this.nowAirport[0].机场性质 }}</li>
      <li>驻场企业:{{ this.nowAirport[0].驻场企业 }}</li>
      <li>常驻航空器:{{ this.nowAirport[0].常驻航空器 }}</li>
      <li>机场运行时间:{{ this.nowAirport[0].机场运行时间 }}</li>
      <li>机场标高/标高位置的大地水准面高差:{{ this.nowAirport[0].机场标高标高位置的大地水准面高差 }}</li>
      <li>基准温度:{{ this.nowAirport[0].基准温度 }}</li>
      <li>磁差:{{ this.nowAirport[0].磁差 }}</li>
      <li>机场联系方式:{{ this.nowAirport[0].机场联系方式 }}</li> -->
    </div>
  </div>
</template>
<script>



export default {
  props: ["nowPoint", "nowAirport"],
  data () {
    return {
      ts: [],
      units: [],
      wind_u_surface: [],
      wind_v_surface: [],
      temp_surface: [],
      time: []


    }
  },

  mounted () {

  },
  watch: {
    nowPoint (newP, oldP) {
      this.pointApi(newP)
    }

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
        console.log('0000000000000000000000')

        console.log(res.data)
        this.wind_u_surface = res.data["wind_u-surface"];
        this.temp_surface = res.data["temp-surface"];
        let ts = res.data['ts']

        ts.forEach(element => {
          let time = new Date(element)
          this.time.push(time)
        });
        console.log(this.time[0].toLocaleDateString())
      }).catch((err) => {
        console.log(err)
      })

    }
  }

}
</script>
<style scoped>
#menu {
  width: 100%;
}
#left {
  position: absolute;
  width: 80%;
  height: 300px;
  padding-right: 350px;
}
#right {
  position: absolute;
  right: 0px;
  width: 20%;
  height: 300px;
  background: rgb(214 214 214);
}
</style>