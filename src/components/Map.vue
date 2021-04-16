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
        <span id="s2">251</span>
      </li>
      <li id="tuli3" @click="show_ty()">
        <img src="../assets/img/icon-ty.png" alt="" />
        <span id="a3">通航机场</span>
        <span id="s3">182</span>
      </li>
      <li id="tuli4" @click="show_all()">
        <span id="a4">显示全部</span>
        <span id="s4">433</span>
      </li>
    </div>

    <div id="bottom_menu" ref="bottom_menu_ref" v-show="show_menu">
      <div class="closing-x" @click="close_bottom_menu()"></div>
      <Bottom-Menu-Data :nowPoint="nowPoint"></Bottom-Menu-Data>
    </div>

    <div id="windy"></div>
  </div>
</template>

<script>
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
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
      nowPoint: {}

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
        if (this.zoom === 7) {
          this.addTexts(all_point)
          console.log(this.layers_point.length)

        }
        if (this.zoom < 7) {
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
      this.addBorder()
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

          }).on('click', (e) => {

            console.log(e.latlng)
            console.log(e.latlng.lat)
            this.show_menu = true
            this.map.setView(e.latlng)
            this.nowPoint = e.latlng

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
  }

}


</script >
<style lang="css" >
@import '../assets/css/map.css';
</style>