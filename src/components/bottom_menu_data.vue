<template>
  <div id="menu">
    <el-tabs :tab-position="tabPosition" type="border-card" style="height: 400px">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-s-order"></i> 机场</span>
        <div id="ty" v-if="this.nowAirport[0].demo === '2'" style="background: rgb(247 227 216)">
          <div class="airports">
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
          </div>
        </div>
        <div id="ys" v-if="this.nowAirport[0].demo === '1'" style="background: rgb(206 221 241)">
          <div class="airports">
            <table>
              <tr>
                <td>机场名称</td>
                <td>{{ this.nowAirport[0].name }}</td>
              </tr>
              <tr>
                <td>四字代码</td>
                <td>{{ this.nowAirport[0].four }}</td>
              </tr>
            </table>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-s-flag"></i> 实况</span>
      </el-tab-pane>
      <el-tab-pane>
        <span @click="add()" slot="label"><i class="el-icon-s-marketing"></i> 预测</span>
        <Forecast ref="forecast" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>



import Forecast from './Forecast'
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
      time: [],



    }
  },
  components: {
    Forecast
  },
  mounted () {


  },


  methods: {

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

    },
    add () {
      this.$refs.forecast.add_echarts('echarts')
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
  border-bottom: 1px solid #b0b1b9;
  padding-left: 15px;
  text-align: left;
  border-right: 1px solid #b0b1b9;
}
table :hover {
  background-color: #faecdf;
}
table tr :nth-child(2) {
  width: 380px;
  border-bottom: 1px solid #b0b1b9;
  padding-left: 15px;
  text-align: left;
}
li {
  list-style: none;
}
/deep/ .el-tabs__content {
  padding: 10px 0 10px 10px;
  left: -10px;
}

#ys::-webkit-scrollbar-track,
#ty ::-webkit-scrollbar-track {
  background-color: #e7eaf1;
}

#ys::-webkit-scrollbar-track,
#ty ::-webkit-scrollbar {
  width: 10px;
}

#ys::-webkit-scrollbar-track,
#ty ::-webkit-scrollbar-thumb {
  background-color: #5c5c6566;
  border-radius: 10px;
}
#airports {
  position: relative;
  right: 0;
}
#echarts {
  width: 1000px;
  height: 300px;
}
#ty,
#ys {
  width: 100%;
  height: 280px;
}
.airports {
  color: black;
  width: 500px;
  height: 280px;
  overflow: auto;
  position: absolute;
  right: 0;
  padding: 10px;
  border-left: 2px solid #b0b1b9;
  box-sizing: border-box;
}
</style>