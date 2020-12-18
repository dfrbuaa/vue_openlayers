<template>
  <div id="all">
    <div id="picker_open" @click="addPicker">picker</div>
    <div id="picker_close" @click="closePicker">picker_close</div>
    <div id="windy"></div>
  </div>
</template>

<script>
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
import airports from '../assets/data/airports.json'
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
        zoom: 4,
        overlays: 'airQ'
      },
      airports: airports,
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
      markers: null

    }
  },
  mounted () {



    windyInit(this.options, windyAPI => {

      const { map, picker, utils, broadcast } = windyAPI;

      map.setMinZoom(4)
      map.setMaxZoom(10)
      this.map = map
      this.picker = picker
      this.picker1 = picker
      this.utils = utils
      this.broadcast = broadcast
      console.log('111111111111111111111')
      console.log(windyAPI)
      console.log('111111111111111111111')



      // this.addPoints(this.airports)
      this.map.eachLayer(function (layer) {
        // layer.remove()

      })
      // var streets = L.tileLayer("http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}", { id: 'windy' }).addTo(this.map)
      this.map.on('zoomend', (e) => {
        let zoom = map.getZoom();
        console.log(zoom)
        if (zoom >= 5) {

          this.addPoints(this.airports)
          console.log(this.myGroup)
        }
        if (zoom < 5) {
          this.removePoints()
        }

        if (zoom >= 6) {
          this.addBorder()
        }
        if (zoom < 6) {
          this.removeBorder()
        }
        if (zoom >= 7) {
          this.addTexts(this.airports)
        }
        if (zoom < 7) {
          this.removeTexts()
        }
      })
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

      var icon1 = L.icon({
        iconUrl: require("../assets/img/icon-ys.png"),
        iconSize: [14, 14],
        iconAnchor: [7, 7],

      });

      var icon2 = L.icon({
        iconUrl: require("../assets/img/icon-ty.png"),
        iconSize: [14, 14],
        iconAnchor: [7, 7]

      });


      if (!this.layers_point.length) {
        for (var i = 0; i < coordinates.length; i++) {
          var latlon = [coordinates[i].lat, coordinates[i].lon]
          var markers = L.marker([coordinates[i].lat, coordinates[i].lon], {
            icon: coordinates[i].demo == "1" ? icon1 : icon2,
            title: coordinates[i].name,
            // zIndexOffset: -999

          }).on('click', (e) => {
            console.log('eeeeeeeeeeeeeeeeeeeeeee')
            console.log(e)
            this.map.setView(e.latlng, 8)

          })

          this.layers_point.push(markers)
          this.myGroup_point = L.layerGroup(this.layers_point)
          this.map.addLayer(this.myGroup_point)

        }
      }

    },

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
            console.log(e)

            this.map.setView(e.latlng)
            this.addPicker(e)
          })

          this.layers_text.push(markers_text)
          this.myGroup_text = L.layerGroup(this.layers_text)
          this.map.addLayer(this.myGroup_text, {

          });

        }
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

    }

  }

}

</script>
<style  >
#all {
  position: relative;
  width: 100%;
  height: 100%;
}
#windy {
  position: absolute;
  width: 100%;
  height: 100%;
}

#windy #logo {
  visibility: hidden !important;
}
#windy .leaflet-interactive {
  cursor: default !important;
}

#windy #open-in-app {
  visibility: hidden !important;
}

.my-div-icon {
  line-height: 32px;
  opacity: 1;
  margin: 0;
  text-align: center;
  color: rgb(4, 34, 68);
  width: 100px;
  font-size: 17px;
  font-weight: 800;
}

.my-div-icon:hover {
  line-height: 32px;
  opacity: 1;
  margin: 0;
  text-align: center;
  color: rgb(252, 249, 73);
  width: 100px;
  font-size: 17px;
  font-weight: 800;
}
.basemap-layer {
  visibility: hidden;
}
#windy .leaflet-container .leaflet-overlay-pane svg,
#windy .leaflet-container .leaflet-marker-pane img,
#windy .leaflet-container .leaflet-shadow-pane img,
#windy .leaflet-container .leaflet-tile-pane img,
#windy .leaflet-container img.leaflet-image-layer,
#windy .leaflet-container .leaflet-tile {
  cursor: pointer !important;
}

#plugin-menu .build-info {
  visibility: hidden;
}

#picker_open {
  position: absolute;
  height: 120px;
  width: 120px;
  background: yellow;
  z-index: 99999999;
}
#picker_close {
  left: 130px;
  position: absolute;
  height: 120px;
  width: 120px;
  background: red;
  z-index: 99999999;
}
</style>