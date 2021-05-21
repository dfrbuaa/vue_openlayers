<template>
  <div id="all">
    <div id="tuli">
      <li id="tuli1">
        <span id="a1">图例</span>
        <span id="s1">机场数量</span>
      </li>
      <li id="tuli2" @click="show_ys()">
        <img src="../assets/img/icon-ys.png" alt="" />
        <span id="a2">运输机场</span>
        <span id="s2">250</span>
      </li>
      <li id="tuli3" @click="show_ty()">
        <img src="../assets/img/icon-ty.png" alt="" />
        <span id="a3">通航机场</span>
        <span id="s3">182</span>
      </li>
      <li id="tuli4" @click="show_all()">
        <span id="a4">显示全部</span>
        <span id="s4">432</span>
      </li>
    </div>

    <div id="bottom_menu" ref="bottom_menu_ref" v-show="show_menu">
      <div class="closing-x" @click="close_bottom_menu()"></div>
      <Bottom-Menu-Data :pointApi="pointApi"></Bottom-Menu-Data>
    </div>

    <div id="windy"></div>
  </div>
</template>

<script>
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
import "../assets/linq";
import bottom_menu_data from './bottom_menu_data'
import point_ty from '../assets/data/point_ty.json'
import point_ys from '../assets/data/point_ys.json'
import areaGeo from "../assets/data/china.json"
import areaGeo1 from "../assets/data/china_border.json"
import heilongjiang from "../assets/data/province/黑龙江省.json"
import neimenggu from "../assets/data/province/内蒙古自治区.json"
import gansu from "../assets/data/province/甘肃省.json"
import hebei from "../assets/data/province/河北省.json"
import jilin from "../assets/data/province/吉林省.json"
import liaoning from "../assets/data/province/辽宁省.json"
import ningxia from "../assets/data/province/宁夏回族自治区.json"
import qinghai from "../assets/data/province/青海省.json"
import shanxi from "../assets/data/province/山西省.json"
import shanxi1 from "../assets/data/province/陕西省.json"
import xizang from "../assets/data/province/西藏自治区.json"
import xinjiang from "../assets/data/province/新疆维吾尔自治区.json"
import sichuan from "../assets/data/province/四川省.json"
import chongqing from "../assets/data/province/重庆市.json"
import guangdong from "../assets/data/province/广东省.json"
import guangxi from "../assets/data/province/广西壮族自治区.json"
import guizhou from "../assets/data/province/贵州省.json"
import hainan from "../assets/data/province/海南省.json"
import henan from "../assets/data/province/河南省.json"
import hubei from "../assets/data/province/湖北省.json"
import hunan from "../assets/data/province/湖南省.json"
import jiangsu from "../assets/data/province/江苏省.json"
import jiangxi from "../assets/data/province/江西省.json"
import yunnan from "../assets/data/province/云南省.json"
import zhejiang from "../assets/data/province/浙江省.json"
import anhui from "../assets/data/province/安徽省.json"
import shandong from "../assets/data/province/山东省.json"
import shanghai from "../assets/data/province/上海市.json"
import tianjin from "../assets/data/province/天津市.json"
import fujian from "../assets/data/province/福建省.json"
import taiwan from "../assets/data/province/台湾省.json"



export default {
  name: 'OlMap',
  components: {
    BottomMenuData: bottom_menu_data
  },
  data () {

    // var airports = JSON.parse(airports)
    return {

      options: {
        // Required: API key
        key: '4mXxk5p6WRZ9RELoqAv7yVVCctARD66h', // REPLACE WITH YOUR KEY !!!
        // Put additional console output
        verbose: true,
        // Optional: Initial state of the map
        lat: 38,
        lon: 116,
        zoom: 5,
        overlays: 'airQ'
      },
      zoom: 1,
      point_ty: point_ty,
      point_ys: point_ys,
      map: null,
      picker: null,

      utils: null,
      broadcast: null,
      border: null,
      province: [],
      myGroup_point: null,
      myGroup_text: null,
      layers_point: [],
      layers_text: [],
      markers: null,
      show_menu: false,
      nowPoint: {},
      nowAirport: null,

    }
  },
  watch () {

  },
  mounted () {
    windyInit(this.options, windyAPI => {

      const { map, picker, utils, broadcast } = windyAPI;

      map.setMinZoom(5)
      map.setMaxZoom(10)
      this.map = map
      this.picker = picker
      this.picker1 = picker
      this.utils = utils
      this.broadcast = broadcast
      // console.log('111111111111111111111')
      // console.log(windyAPI)
      // console.log('111111111111111111111')



      // this.addPoints(this.airports)
      this.map.eachLayer(function (layer) {
        layer.setZIndex(-99999)

      })
      // var streets = L.tileLayer("http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}", { id: 'windy' }).addTo(this.map)
      this.map.on('zoomend', (e) => {
        this.zoom = map.getZoom();
        console.log(this.zoom)
        if (this.zoom >= 7) {
          // this.addBorder()
          if (this.layers_point.length === 250) {
            this.addTexts(point_ys)
          }
          if (this.layers_point.length === 182) {
            this.addTexts(point_ty)
          }
          this.addTexts(all_point)

          console.log(this.layers_point.length)

        }
        if (this.zoom < 7) {
          this.removeBorder()
          this.removeTexts()
        }
      })
      var all_point = this.point_ty.concat(this.point_ys)
      this.addPoints(all_point)
      var myStyle = {
        "color": "#fff",
        "weight": 1,
        "opacity": 0.5,
        "fillOpacity": 0,
      }
      var myStyle2 = {
        "color": "#fff",
        "weight": 1.5,
        "opacity": 1,
        "fillOpacity": 0,
      }

      var bb = L.geoJSON(areaGeo, {
        style: myStyle,
      }).addTo(this.map)
      var baa = L.geoJSON(areaGeo1, {
        style: myStyle2,
      }).addTo(this.map)






    })

  },

  methods: {
    show_ty () {
      this.removePoints()
      this.addPoints(this.point_ty)
      if (this.zoom >= 7) {
        this.removeTexts()
        this.addTexts(this.point_ty)
      }

    },
    show_ys () {
      this.removePoints()
      this.addPoints(this.point_ys)
      if (this.zoom >= 7) {
        this.removeTexts()
        this.addTexts(this.point_ys)
      }

    },
    show_all () {
      this.removePoints()
      this.addPoints(this.point_ys.concat(this.point_ty))
      if (this.zoom >= 7) {
        this.removeTexts()
        this.addTexts(this.point_ys)
      }

    },




    addBorder () {
      if (!this.province.length) {
        let myStyle1 = {
          "color": "#fff",
          "weight": 1,
          "opacity": 0.2,
          "fillOpacity": 0,
          "cursor": 'default'
        }

        this.province.push(taiwan, heilongjiang, shandong, neimenggu, gansu, hebei, jilin, liaoning, ningxia, qinghai, shanxi, shanxi1, xizang, xinjiang, sichuan, chongqing, guangdong, guangxi, guizhou, henan, hubei, hunan, jiangsu, jiangxi, yunnan, zhejiang, anhui, fujian, hainan,)
        console.log(this.province)
        this.border = L.geoJSON(this.province, {
          style: myStyle1,
        })
        this.map.addLayer(this.border)
      }

    },
    removeBorder () {
      if (this.province.length) {
        this.map.removeLayer(this.border)
        // this.border.clearLayers()
        this.province = []
      }
    },
    addPoints (coordinates) {
      if (!this.layers_point.length) {
        var icon1 = L.icon({
          iconUrl: require("../assets/img/icon-ys.png"),
          iconSize: [14, 14],
          iconAnchor: [7, 7],


        });

        var icon2 = L.icon({
          iconUrl: require("../assets/img/icon-ty.png"),
          iconSize: [14, 14],
          iconAnchor: [7, 7],

        });



        for (var i = 0; i < coordinates.length; i++) {
          var latlon = [coordinates[i].lat, coordinates[i].lon]
          var markers = L.marker([coordinates[i].lat, coordinates[i].lon], {
            icon: coordinates[i].demo == "1" ? icon1 : icon2,
            title: coordinates[i].name,
            // zIndexOffset: -999

          }).on('click', (e) => {
            console.log('eeeeeeeeeeeeeeeeeeeeeee')
            console.log(e)
            this.map.setView(e.latlng, 7)



          })

          this.layers_point.push(markers)


        }
        this.myGroup_point = L.layerGroup(this.layers_point)
        this.map.addLayer(this.myGroup_point)
      }
    }
    ,

    removePoints () {

      if (this.layers_point.length) {
        this.map.removeLayer(this.myGroup_point)
        // this.myGroup_point.clearLayers();
        this.layers_point = []
      }
    },

    addTexts (coordinates) {

      if (!this.layers_text.length) {
        for (var i = 0; i < coordinates.length; i++) {
          var icon = L.divIcon({
            html: `<div style="cursor: pointer">${coordinates[i].name}</div>`,
            className: 'my-div-icon',
            iconSize: 110,
            iconAnchor: [55, 30]
          })

          var markers_text = L.marker([coordinates[i].lat, coordinates[i].lon], {
            icon: icon,
            zIndexOffset: -999

          }).on('click', async (e) => {


            console.log(e)

            this.show_menu = true
            this.map.setView(e.latlng)
            this.$store.commit('changePoint', e.latlng);
            console.log(this.$store.state.nowPoint)
            let lat = e.latlng.lat;
            let lng = e.latlng.lng;
            let airport = Enumerable.From(this.point_ty.concat(this.point_ys)).Where(`x => x.lat === ${lat} && x.lon===${lng}`).ToArray();
            console.log(1111111111111111111111)
            this.$store.commit('changeAirport', airport)

            await this.pointApi(this.$store.state.nowAirport, '1000h')
            console.log(this.$store.state.nowAirport)

          })

          this.layers_text.push(markers_text)


        }
        this.myGroup_text = L.layerGroup(this.layers_text)
        this.map.addLayer(this.myGroup_text, {

        });
      }

    },
    removeTexts () {
      this.map.removeLayer(this.myGroup_text)
      // this.myGroup_text.clearLayers();
      this.layers_text = []

    },
    addPicker () {

      var center = this.map.getCenter()
      console.log(center)
      this.picker.open({ lat: center.lat, lon: center.lng })


    },
    closePicker () {


      this.picker.close()
      console.log('close')

    },

    close_bottom_menu () {
      this.show_menu = false
    },
    async pointApi (point, hpa) {

      const res = await this.$axios({
        method: 'post',
        url: ' https://api.windy.com/api/point-forecast/v2',
        data: {
          "lat": parseFloat(point.lat),
          "lon": parseFloat(point.lng),
          "model": "gfs",
          "parameters": ["wind", "temp", "dewpoint", "rh", "gh"],
          "levels": [hpa],
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
      this.$store.commit('changeTime', times)
      this.$store.commit('changeHours', hours_list)
      this.$store.commit('changeCol')
      //温度
      let temp = res.data[`temp-${hpa}`];
      this.$store.commit('changeTemp', temp)

      // 露点温度
      let dewpoint = res.data[`dewpoint-${hpa}`];
      this.$store.commit('changeDewpoint', dewpoint)

      //rh空气相对湿度
      let r = res.data[`rh-${hpa}`]
      let rh = []
      for (let i = 0; i < r.length; i++) {
        let j = r[i].toFixed(1);
        rh.push(j)
      }
      this.$store.commit('changeRh', rh)

      //gh位势高度
      let g = res.data[`gh-${hpa}`]
      let gh = []
      for (let i = 0; i < g.length; i++) {
        let j = g[i].toFixed(1);
        gh.push(j)
      }
      this.$store.commit('changeGh', gh)

      //风速
      let wind_u = res.data[`wind_u-${hpa}`]
      console.log(wind_u)
      let wind_v = res.data[`wind_v-${hpa}`]
      console.log(wind_v)
      let wind_s = []
      for (let i = 0; i < wind_u.length; i++) {
        let s = Math.sqrt(Math.pow(wind_u[i], 2) + Math.pow(wind_v[i], 2));
        s = s.toFixed(1)
        wind_s.push(s)
      }
      this.$store.commit('changeWinds', wind_s);
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
      this.$store.commit('changeWindd', wind_d);













    }
  }

}


</script >
<style lang="css" >
@import '../assets/css/map.css';
</style>