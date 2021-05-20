<template>
  <div>
    <div id="ddd" class="ll">
      <div id="tt">
        <table style="width: 100%" class="myTable">
          <tr>
            <td :colspan="this.$store.state.col" class="date">{{ this.$store.state.list_day[0] }}</td>
            <td colspan="8" class="date date1" v-for="(item, i) in time" :key="i">{{ time[i] }}</td>
            <td colspan="8" class="date date1">{{ list_day[list_day.length - 1] }}</td>
          </tr>

          <tr>
            <td colspan="1" class="hour" v-for="(item, i) in hour" :key="i">{{ hour[i] }}</td>
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
    <div id="head" class="ll">{{ this.$store.state.nowPoint }}</div>
    <div id="hpa" class="ll"></div>
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


    }
  },
  computed: {
    ...mapState(['temp', 'list_day']),
    ...mapGetters(['time', 'hour'])
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
  margin: 0 30px 0 100px;
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
#hpa {
  margin-left: -30px;
  width: 30px;
  height: 280px;

  background: red;
}
.ll {
  float: left;
  height: 280px;
}
#head {
  margin-left: -100%;
  width: 100px;
  background-color: rgb(141, 213, 231);
}
.date,
.hour,
.temp,
.temp1 {
  padding: 0 7px 7px 7px;
}
.date {
  font-size: 14px;
  min-width: 80px;
}

.date1,
.hour,
.temp {
  border-left: 1px solid rgb(168, 167, 167);
}
</style>