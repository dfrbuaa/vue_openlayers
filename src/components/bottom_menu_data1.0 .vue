<template>
  <div id="menu">
    <div id="left">{{ this.temp_surface }}</div>
    <div class="right" v-if="this.nowAirport[0].demo === '2'">
      <table border="1" style="border-collapse: collapse">
        <tr>
          <td>机场名称</td>
          <td>{{ this.nowAirport[0].name }}</td>
        </tr>
        <tr>
          <td>机场分类</td>
          <td>{{ this.nowAirport[0].机场分类 }}</td>
        </tr>
        <tr>
          <td>机场运行时间</td>
          <td>{{ this.nowAirport[0].机场运行时间 }}</td>
        </tr>
        <tr>
          <td>允许飞行种类</td>
          <td>{{ this.nowAirport[0].允许飞行种类 }}</td>
        </tr>
        <tr>
          <td>机场标高</td>
          <td>{{ this.nowAirport[0].机场标高标高位置的大地水准面高差 }}</td>
        </tr>
        <tr>
          <td>基准温度</td>
          <td>{{ this.nowAirport[0].基准温度 }}</td>
        </tr>
        <tr>
          <td>磁差</td>
          <td>{{ this.nowAirport[0].磁差 }}</td>
        </tr>
        <tr>
          <td>驻场企业</td>
          <td>{{ this.nowAirport[0].驻场企业 }}</td>
        </tr>
        <tr>
          <td>常驻航空器</td>
          <td>{{ this.nowAirport[0].常驻航空器 }}</td>
        </tr>
        <tr>
          <td>机场联系方式</td>
          <td>{{ this.nowAirport[0].机场联系方式 }}</td>
        </tr>
      </table>
      <!-- <li>{{ Object.keys(this.nowAirport[0]) }}</li> 
      <li>机场名称：{{ this.nowAirport[0].name }}</li>
      <li>机场分类：{{ this.nowAirport[0].机场分类 }}</li>

      <li>机场性质：{{ this.nowAirport[0].机场性质 }}</li>
      <li>允许飞行种类：{{ this.nowAirport[0].允许飞行种类 }}</li>

      <li>机场运行时间：{{ this.nowAirport[0].机场运行时间 }}</li>
      <li>机场标高/标高位置的大地水准面高差：{{ this.nowAirport[0].机场标高标高位置的大地水准面高差 }}</li>
      <li>基准温度：{{ this.nowAirport[0].基准温度 }}</li>
      <li>磁差：{{ this.nowAirport[0].磁差 }}</li>
      <li>驻场企业：{{ this.nowAirport[0].驻场企业 }}</li>
      <li>常驻航空器：{{ this.nowAirport[0].常驻航空器 }}</li>
      <li>机场联系方式:{{ this.nowAirport[0].机场联系方式 }}</li> -->
    </div>
    <div class="right" v-if="this.nowAirport[0].demo === '1'"></div>
  </div>
</template>
<script>



export default {
  props: ["nowPoint", "nowAirport"],
  data () {
    return {
      show_right_ty: null,
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
  font-size: 14px;
  position: absolute;

  height: 300px;
  padding-right: 350px;
}
.right {
  padding: 15px;
  font-size: 14px;
  position: absolute;
  right: 0px;
  width: 400px;
  height: 275px;
  overflow: auto;

  background: rgb(214 214 214);
}
.right table tr :nth-child(1) {
  width: 120px;
}
.right table tr :nth-child(2) {
  width: 350px;
}
.right li {
  list-style: none;
}
.right::-webkit-scrollbar-track {
  background-color: #e7eaf1;
}

.right::-webkit-scrollbar {
  width: 10px;
}

.right::-webkit-scrollbar-thumb {
  background-color: #5c5c6566;
  border-radius: 10px;
}
</style>