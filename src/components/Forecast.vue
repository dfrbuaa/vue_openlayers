<template>
  <div>
    <div id="ddd" class="ll">
      <div id="tt">
        <table style="width: 100%" class="myTable">
          <tr style="text-align: left">
            <td :colspan="this.$store.state.col" class="date">{{ this.$store.state.time1 }}</td>
            <td colspan="8" class="date" v-for="(item, i) in time" :key="i">{{ time[i] }}</td>
          </tr>

          <tr>
            <td colspan="1" class="hour" v-for="(item, i) in hours" :key="i">{{ hours[i] }}</td>
          </tr>
          <tr>
            <td colspan="1" id="temp1" height="25px" v-for="(item, i) in temp" :key="i"></td>
          </tr>
          <tr>
            <td colspan="1" class="temp" v-for="(item, i) in temp" :key="i">{{ temp[i] }}</td>
          </tr>
          <tr>
            <td colspan="1" class="dewpoint" v-for="(item, i) in dewpoint" :key="i">{{ dewpoint[i] }}</td>
          </tr>
          <tr>
            <td colspan="1" class="rh" v-for="(item, i) in rh" :key="i">{{ rh[i] }}</td>
          </tr>
          <tr v-show="show">
            <td colspan="1" class="gh" v-for="(item, i) in gh" :key="i">{{ gh[i] }}</td>
          </tr>
          <tr v-show="!show">
            <td colspan="1" class="gh" v-for="(item, i) in gust" :key="i">{{ gust[i] }}</td>
          </tr>
          <tr>
            <td colspan="1" id="temp2" height="25px" v-for="(item, i) in temp" :key="i"></td>
          </tr>
          <tr>
            <td colspan="1" class="wind_s" v-for="(item, i) in wind_s" :key="i">{{ wind_s[i] }}</td>
          </tr>
          <tr>
            <td colspan="1" class="wind_d" v-for="(item, i) in wind_d" :key="i">
              <div id="icon" :style="{ transform: `rotate(${wind_d[i] + 135}deg)` }"><i class="el-icon-position" /></div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div id="head" class="ll">
      <div>时间 <i class="el-icon-time"></i></div>
      <div style="padding: 29px 7px 7px 7px">温度<i>℃</i></div>
      <div>露点温度<i>℃</i></div>
      <div>湿度<i>%</i></div>
      <div v-show="show">位势高度<i>m</i></div>
      <div v-show="!show">阵风<i>m/s</i></div>
      <div style="padding: 29px 7px 7px 7px">风速<i>m/s</i></div>
      <div>风向<i class="el-icon-s-flag"></i></div>
    </div>
    <div id="hpa" class="ll">
      <el-radio-group class="check" @change="changeLayer" v-model="radio" size="medium">
        <div class="hpa">hpa</div>
        <el-radio-button class="hpa" label="800h">800</el-radio-button>
        <el-radio-button class="hpa" label="850h">850</el-radio-button>
        <el-radio-button class="hpa" label="900h">900</el-radio-button>
        <el-radio-button class="hpa" label="925h">925</el-radio-button>
        <el-radio-button class="hpa" label="950h">950</el-radio-button>
        <el-radio-button class="hpa" label="1000h">1000</el-radio-button>
        <el-radio-button class="hpa" label="surface">地面</el-radio-button>
      </el-radio-group>
    </div>
  </div>

  <!-- <div id="echarts"></div> -->
</template>

<script>
import * as echarts from 'echarts';
import { mapState, mapGetters } from 'vuex'
export default {

  data () {

    return {
      show: null,
      tabPosition: 'left',
      radio: 'surface',

    }
  },
  computed: {
    ...mapState(['nowAirport', 'temp', 'time1', 'time', 'hours', 'dewpoint', 'rh', 'gh', 'gust', 'wind_s', 'wind_d']),

  },
  created () {

  },
  mounted () {

  },
  methods: {

    add_echarts (id) {

      var myChart = echarts.init(document.getElementById(id));
      // 绘制图表

      myChart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      });

      // 基于准备好的dom，初始化echarts实例

    },
    async changeLayer (hpa) {
      if (hpa === "surface") {
        this.show = false;
      } else {
        this.show = true;
      }
      await this.$store.commit('pointApi', hpa)
      console.log(33333333333333333333)
    }












  }
}

</script>

<style scoped >
#ddd ::-webkit-scrollbar-track {
  background-color: #e7eaf1;
}

#ddd ::-webkit-scrollbar {
  height: 8px;
}

#ddd ::-webkit-scrollbar-thumb {
  background-color: #5c5c6566;
  border-radius: 8px;
}
#ddd {
  height: 280px;
  width: 100%;
}
#tt {
  margin: 0 60px 0 80px;
  height: 280px;
  overflow: auto;
}

table {
  font-size: 13px;
  height: 20px;
  border-collapse: collapse;
  text-align: center;
  padding: 0px;
}
#hpa .check {
  padding: 10px 2px 10px 2px;
  display: flex;
  margin-left: -34px;
  width: 34px;
  height: 280px;
  background: linear-gradient(360deg, #4a95bb, #52ab80, transparent);
  flex-direction: column;
  justify-content: space-between;
  font-size: 10px;
  border: 1px solid #dfe4ed;
  border-radius: 4px;
  box-sizing: border-box;
  text-align: center;
}

.ll {
  float: left;
  height: 280px;
}
#head {
  margin-left: -100%;
  width: 80px;
  background-color: rgb(245 247 250);
  border-right: 1px solid rgb(223 228 237);
}

#temp1,
#temp2 {
  border: 0px;
  height: 20px;
}
.date {
  font-size: 14px;
  min-width: 80px;
  border-bottom: 1px solid rgb(223 228 237);
}

table > tr > td {
  border-left: 1px solid rgb(223 228 237);
  padding: 1px 7px 7px 7px;
}
#head {
  margin-left: -100%;
  width: 80px;
  background-color: rgb(245 247 250);
  border-right: 1px solid rgb(223 228 237);
  border-top: 1px solid rgb(223 228 237);
  top: 27px;
  position: relative;
  height: 254px;
}
#head > div {
  font-size: 13px;
  width: 80px;
  padding: 1px 7px 7px 7px;
  text-align: right;
  box-sizing: border-box;
}

/* #head :nth-child(2),
# {
  padding: 29px 7px 7px 7px;
} */
.hpa {
  border-bottom: 1px solid #f5f7fa;
  height: 30px;
}
/deep/.el-radio-button__inner {
  white-space: nowrap;
  background: transparent;
  /* border: 1px solid #DCDFE6; */
  font-weight: 500;
  border-left: 0;
  /* color: #606266; */
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  padding: 12px 0px;
  font-size: 10px;
  border: 0px;
}
/deep/.el-radio-button:first-child .el-radio-button__inner {
  border: 0;
  border-radius: 0px;
}
/deep/.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #007dff;
  background-color: #ffffff;
  border: 1px solid rgb(223 228 237);
  box-shadow: 0 0 0 0 #ffffff;
  right: 3px;
  width: 34px;
  top: -3px;
  height: 34px;
}
/deep/.el-radio-button:last-child .el-radio-button__inner {
  border-radius: 0;
}
/deep/.el-icon-position:before {
  font-size: 15px;
}
</style>