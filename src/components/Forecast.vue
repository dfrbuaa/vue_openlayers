<template>
  <div>
    <div id="ddd" class="ll">
      <div id="tt">
        <table style="width: 100%" class="myTable">
          <tr>
            <td :colspan="this.$store.state.col" class="date">{{ this.$store.state.list_day[0] }}</td>
            <td :colspan="8" class="date date1" v-for="(item, i) in time" :key="i">{{ time[i] }}</td>
          </tr>

          <tr>
            <td colspan="1" class="hour" v-for="(item, i) in hours" :key="i">{{ hours[i] }}</td>
            <td colspan="1" id="hour"></td>
            <td colspan="1" id="hour"></td>
            <td colspan="1" id="hour"></td>
            <td colspan="1" id="hour"></td>
            <td colspan="1" id="hour"></td>
            <td colspan="1" id="hour"></td>
            <td colspan="1" id="hour"></td>
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
    <div id="head" class="ll">{{ this.time0 }}</div>
    <div id="hpa" class="ll"></div>
  </div>
  <!-- <div id="echarts"></div> -->
</template>

<script>
import * as echarts from 'echarts';

export default {

  data () {
    return {
      show: null,
      tabPosition: 'left',
      time: this.$store.getters.time,
      hours: this.$store.state.hours,
      temp: this.$store.state.temp,


    }
  },

  mounted () {
    console.log('ttttttttttttttttttttttttt')
    console.log(this.time0)

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
}

.date1,
.hour,
.temp {
  border-left: 1px solid rgb(168, 167, 167);
}
</style>