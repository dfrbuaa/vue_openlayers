<template>
  <div>
    <div id="ddd" class="ll">
      <div id="tt">
        <table style="width: 100%" class="myTable">
          <tr>
            <td :colspan="this.$store.state.col" class="date">{{ this.$store.state.time[0] }}</td>
            <td colspan="8" class="date date1" v-for="(item, i) in time" :key="i">{{ time[i] }}</td>
          </tr>

          <tr>
            <td colspan="1" class="hour" v-for="(item, i) in hours" :key="i">{{ hours[i] }}</td>
          </tr>
          <tr>
            <td colspan="1" class="temp1" height="30px" v-for="(item, i) in temp" :key="i"></td>
          </tr>
          <tr>
            <td colspan="1" class="temp" v-for="(item, i) in temp" :key="i">{{ temp[i] }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div id="head" class="ll">
      <div>时间</div>
      <div>温度</div>
    </div>
    <div id="hpa" class="ll">
      <el-radio-group class="check" v-model="radio" size="medium">
        <el-radio-button class="hpa">hpa</el-radio-button>
        <el-radio-button class="hpa" label="800"></el-radio-button>
        <el-radio-button class="hpa" label="850"></el-radio-button>
        <el-radio-button class="hpa" label="900"></el-radio-button>
        <el-radio-button class="hpa" label="925"></el-radio-button>
        <el-radio-button class="hpa" label="950"></el-radio-button>
        <el-radio-button class="hpa" label="1000"></el-radio-button>
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
      radio: '1000'

    }
  },
  computed: {
    ...mapState(['temp', 'list_day', 'time', 'hours']),

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
    async pointApi (point) {

      const res = await this.$axios({
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
      })
      if (res.status !== 200) {
        return this.$message.error('获取表失败！')
      }
      console.log('0000000000000000000000')

      console.log(res.data)

      let temp = res.data["temp-surface"];
      this.$store.commit('changeTemp', temp)

      let ts = res.data['ts']

      ts.forEach((val) => {
        let time = new Date(val)
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let date = time.getDate();
        let week = time.getDay()
        let hours = time.getHours(); //获取当前小时数(0-23)
        let w;
        if (week === 1) w = '星期一';
        if (week === 2) w = '星期二';
        if (week === 3) w = '星期三';
        if (week === 4) w = '星期四';
        if (week === 5) w = '星期五';
        if (week === 6) w = '星期六';
        if (week === 0) w = '星期日';
        let result = `${w}${date}`;
        this.$store.commit('changeList', result)

        this.$store.commit('changeHours', hours)

      });

      this.$store.commit('changeCol')










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
  text-align: left;
  padding: 0px;
}
#hpa .check {
  padding: 10px 2px 10px 2px;
  display: flex;
  margin-left: -35px;
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
.date,
.hour,
.temp,
.temp1 {
  padding: 1px 7px 7px 7px;
}
.date {
  font-size: 14px;
  min-width: 80px;
  border-bottom: 1px solid rgb(223 228 237);
}

.date1,
.hour,
.temp {
  border-left: 1px solid rgb(223 228 237);
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
  padding: 0 5px 5px 5px;
  text-align: right;
  box-sizing: border-box;
}

#head :nth-child(1) {
  padding: 1px 7px 7px 7px;
}
#head :nth-child(2) {
  padding: 37px 7px 7px 7px;
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
  padding: 11px 0px;
  font-size: 10px;
  border: 0px;
}
/deep/.el-radio-button:first-child .el-radio-button__inner {
  border: 0;
  border-radius: 0px;
}
</style>