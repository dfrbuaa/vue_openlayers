<template>
  <div id="menu">
    <el-tabs :tab-position="tabPosition" type="border-card" style="height: 400px">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-s-order"></i> 机场</span>

        <table>
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
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-s-flag"></i> 实况</span>
        实况
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-s-marketing"></i> 预测</span>
        预测
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>



export default {
  props: ["nowPoint", "nowAirport"],
  data () {
    return {
      tabPosition: 'left',
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
el-tabs {
  height: 350px;
}
table {
  font-size: 14px;
}
table tr :nth-child(1) {
  width: 120px;
}
table tr :nth-child(2) {
  width: 90%;
}
li {
  list-style: none;
}
el-tab-pane::-webkit-scrollbar-track {
  background-color: #e7eaf1;
}

el-tab-pane::-webkit-scrollbar {
  width: 10px;
}

el-tab-pane::-webkit-scrollbar-thumb {
  background-color: #5c5c6566;
  border-radius: 10px;
}
</style>