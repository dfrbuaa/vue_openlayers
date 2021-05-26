import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as echarts from 'echarts';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nowPoint: null,
    nowAirport: [],
    time: [],
    time1: null,
    col: null,
    hours: [],
    temp: [],
    temp_tu: [],
    dewpoint: [],
    dewpoint_tu: [],
    rh: [],
    gh: [],
    gust: [],
    wind_s: [],
    wind_d: [],
    width: null,
    hpa: null,
    show: null,

  },
  mutations: {
    changeHpa (state, msg) {
      state.hpa = msg
    },
    changePoint (state, msg) {
      state.nowPoint = msg;
    },

    changeAirport (state, msg) {
      state.nowAirport = msg;
    },
    changeShow (state, msg) {
      state.show = msg;
    },

    pointApi (state, res) {




      console.log('0000000000000000000000')

      console.log(res)

      //日期小时
      let ts = res.data['ts']
      let list = [];
      let hours_list = [];
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
        list.push(result)
        hours_list.push(hours)


      });
      let times = Array.from(new Set(list))
      state.time1 = times.shift();
      state.time = times;
      state.hours = hours_list;
      state.col = state.col = 8 - Math.floor(state.hours[0] / 3);


      //温度
      let temp = res.data[`temp-${res.hpa}`];
      console.log(hpa)
      state.temp = temp;
      state.temp_tu = JSON.parse(JSON.stringify(temp));

      state.temp.forEach((val, index,) => {
        state.temp[index] = Math.round(val - 273.15) + '°'

      })
      state.temp_tu.forEach((val, index,) => {
        state.temp_tu[index] = parseFloat((val - 273.15).toFixed(1))

      })


      // 露点温度
      let dewpoint = res.data[`dewpoint-${res.hpa}`];
      state.dewpoint = JSON.parse(JSON.stringify(dewpoint));
      state.dewpoint_tu = JSON.parse(JSON.stringify(dewpoint));
      state.dewpoint.forEach((val, index,) => {
        state.dewpoint[index] = Math.round(val - 273.15) + '°'

      })
      state.dewpoint_tu.forEach((val, index,) => {
        state.dewpoint_tu[index] = parseFloat((val - 273.15).toFixed(1))

      })

      //rh空气相对湿度
      let r = res.data[`rh-${res.hpa}`]
      let rh = []
      for (let i = 0; i < r.length; i++) {
        let j = r[i].toFixed(1);
        rh.push(j)
      }
      state.rh = rh;

      //gh位势高度
      let gh = res.data[`gh-${res.hpa}`]
      state.gh = gh
      if (gh[0]) {
        state.gh.forEach((val, index) => {
          state.gh[index] = val.toFixed(1)
        })

      }


      //阵风

      let gust = res.data[`gust-surface`]
      state.gust = gust
      if (gust) {
        state.gust.forEach((val, index) => {
          state.gust[index] = val.toFixed(1)
        })

      }

      //风速
      let wind_u = res.data[`wind_u-${res.hpa}`]
      // console.log(wind_u)
      let wind_v = res.data[`wind_v-${res.hpa}`]
      // console.log(wind_v)
      let wind_s = []
      for (let i = 0; i < wind_u.length; i++) {
        let s = Math.sqrt(Math.pow(wind_u[i], 2) + Math.pow(wind_v[i], 2));
        s = s.toFixed(1)
        wind_s.push(s)
      }
      state.wind_s = wind_s;

      let wind_d = [];
      for (let i = 0; i < wind_u.length; i++) {
        let d;
        if ((wind_u[i] > 0 && wind_v[i] > 0) || (wind_u[i] > 0 && wind_v[i] < 0)) {
          d = 270 - Math.atan(wind_v[i] / wind_u[i]) * 180 / Math.PI;
        } else if ((wind_u[i] < 0 && wind_v[i]) > 0 || (wind_u[i] < 0 && wind_v[i] < 0)) {
          d = 90 - Math.atan(wind_v[i] / wind_u[i]) * 180 / Math.PI;
        } else if (wind_u[i] === 0 && wind_v[i] > 0) {
          d = 180;
        } else if (wind_u[i] === 0 && wind_v[i] < 0) {
          d = 360;
        } else if (wind_u[i] > 0 && wind_v[i] === 0) {
          d = 270;
        } else if (wind_u[i] < 0 && wind_v[i] === 0) {
          d = 90
        } else if (wind_u[i] === 0 && wind_v[i] === 0) {
          d = '00'
        }
        d = Math.round(d)
        wind_d.push(d)
      }
      state.wind_d = wind_d;


    },
    async pointApi1 (state) {
      const res = await axios({
        method: 'post',
        url: 'http://route.showapi.com/9-5',
        // dataType: 'json',
        data: {

          "showapi_appid": '644698', //这里需要改成自己的appid
          "showapi_sign": '915e1809e7da40d18c1c602f149029ab',  //这里需要改成自己的应用的密钥secret
          "from": "5",
          "lng": "116.2278",
          "lat": "40.242266",

        },
        transformRequest: [
          function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            ret = ret.substring(0, ret.lastIndexOf('&'));
            return ret
          }
        ],
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      console.log('pppppppppppppppppp')
      let data = res.data.showapi_res_body;
      console.log(data)
    }
    ,
    addEcharts (state, id) {
      var myChart = echarts.init(document.getElementById(id));
      // 绘制图表
      let option = {}
      let option2 = {
        xAxis: {
          show: false,
          type: 'category',
          data: state.hours,
          interval: 16
        },
        yAxis: {
          type: 'value',
          min: Math.min(state.temp_tu),
          max: Math.max(state.temp_tu),

        },
        axisTick: {
          show: true,    // 是否显示坐标轴刻度
          inside: true,     // 坐标轴刻度是否朝内，默认朝外
          length: 5,    // 坐标轴刻度的长度
          lineStyle: {
            color: '#FFF',     // 刻度线的颜色
            width: 50,    // 坐标轴刻度线宽
            type: 'solid',     // 坐标轴线线的类型（'solid'，实线类型；'dashed'，虚线类型；'dotted',点状类型）
          },
        },
        grid: {
          x: 0,
          x2: 0,
          y: 1,
          y2: 1


        },
        series: [{
          name: '风速',
          type: 'line',
          data: state.temp_tu
        },
        ]

      };
      let option1 = {
        xAxis: {
          show: false,
          type: 'category',
          data: state.hours,
          interval: 16
        },
        yAxis: {
          type: 'value',
          min: Math.min(state.wind_s),
          max: Math.max(state.wind_s),

        },
        axisTick: {
          show: true,    // 是否显示坐标轴刻度
          inside: true,     // 坐标轴刻度是否朝内，默认朝外
          length: 5,    // 坐标轴刻度的长度
          lineStyle: {
            color: '#FFF',     // 刻度线的颜色
            width: 50,    // 坐标轴刻度线宽
            type: 'solid',     // 坐标轴线线的类型（'solid'，实线类型；'dashed'，虚线类型；'dotted',点状类型）
          },
        },
        grid: {
          x: 0,
          x2: 0,
          y: 1,
          y2: 1


        },
        series: [{

          type: 'line',
          data: state.wind_s
        },
        ]

      };
      if (id === 'echarts1') {
        option = option1
      } else {
        option = option2
      }
      myChart.setOption(option)
    }

  },
  getters: {


  },

  actions: {

    async postData ({ commit, }, hpa, lat, lng) {
      const res = await axios({
        method: 'post',
        url: ' https://api.windy.com/api/point-forecast/v2',
        data: {
          "lat": parseFloat(lat),
          "lon": parseFloat(lng),
          "model": "gfs",
          "parameters": ["wind", "temp", "dewpoint", "rh", "gh", "windGust"],
          "levels": [hpa],
          "key": "fd4RLs33Bb3Mg3qginrlRtYVrhZ0otLi"

        },
        header: {
          'Content-Type': 'application/json'
        }
      })
      res.hpa = hpa

      commit('pointApi', res)
    }

  },
  modules: {
  }
})
