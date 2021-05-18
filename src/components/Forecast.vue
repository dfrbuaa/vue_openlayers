<template>
  <!-- <div id="echarts"></div> -->
  <div id="ddd">
    <div id="tt">
      <table width="50px" style="width: 100%" class="myTable">
        <tr>
          <td v-for="(item, i) in time" :key="i">{{ time[i] }}</td>
        </tr>
        <tr>
          <td id="hour" v-for="(item, i) in hours" :key="i">{{ hours[i] }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

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
      hours: []

    }
  },
  mounted () {
    this.pointApi(this.nowPoint)

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
          let result = `${w}${date}`
          this.time.push(result)
          this.hours.push(hours)
        });
        console.log(this.time[0].toLocaleDateString())
      }).catch((err) => {
        console.log(err)
      })

    },
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
  height: 280px;
  width: 100%;
  overflow: auto;
}

table :nth-child(1) {
  font-size: 12px;
  height: 20px;
  width: 20px;
  text-align: center;
}
</style>