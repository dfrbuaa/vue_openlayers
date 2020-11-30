<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import "ol/ol.css"
import TileLayer from "ol/layer/Tile"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import XYZ from "ol/source/XYZ"
import { Map, View, Feature, ol } from "ol"
import { MultiPolygon, Polygon } from "ol/geom"


import { Style, Circle, Icon, Fill, RegularShape, Stroke, Text, } from "ol/style"
import { Point } from "ol/geom"
import { defaults as defaultControls, ScaleLine } from "ol/control"
import { fromLonLat } from "ol/proj"
import airports from '../assets/airports.json'
import areaGeo from "../../public/china.json"

export default {
  name: 'OlMap',
  data () {
    // var airports = JSON.parse(airports)
    return {
      // areaGeo: areaGeo,
      airports: airports,
      map: null,
      pointLayer: null,
      featuresArr: [],
      areaLayer: null
    }
  },
  mounted () {
    this.initMap()//初始化地图方法
    this.addPoints(this.airports)//根据坐标点批量打点
    this.addArea(areaGeo);//添加区域图层方法
  },

  methods: {
    // 初始化地图
    initMap () {
      this.map = new Map({
        target: "map",
        controls: defaultControls({
          zoom: true
        }).extend([]),
        layers: [
          new TileLayer({
            source: new XYZ({
              // url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
              url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"

            })
          })
        ],
        view: new View({
          center: fromLonLat([108.522097, 37.272848]),
          zoom: 4.7,
          maxZoom: 19,
          minZoom: 4
        }),

      })
    },

    // 批量根据经纬坐标打点
    addPoints (coordinates) {
      // 设置图层
      this.pointLayer = new VectorLayer({
        source: new VectorSource()
      })
      // 添加图层
      this.map.addLayer(this.pointLayer)
      // 循环添加feature
      for (let i = 0; i < coordinates.length; i++) {
        // 创建feature，一个feature就是一个点坐标信息
        let feature = new Feature({
          geometry: new Point(
            fromLonLat([coordinates[i].lon, coordinates[i].lat])
          )
        })
        feature.setStyle(this.getIcon(coordinates[i].name, coordinates[i].demo))
        this.featuresArr.push(feature)
      }
      // for 结束
      // 批量添加feature
      this.pointLayer.getSource().addFeatures(this.featuresArr)
    },
    // 设置icon样式
    getIcon (name, type) {
      let src = ""
      let text = ''
      type == "1"
        ? (src = require("../../public/icon-ys.png"))
        : (src = require("../../public/icon-ty.png"))



      var styleIcon = new Style({
        // 设置图片效果
        image: new Icon({
          scale: 0.4,
          src: src,
          anchor: [1, 1]
        }),
        text: new Text({
          text: "",
          font: 'normal 10px 微软雅黑',    //文字样式
          fill: new Fill({       //文本填充样式（即文字颜色)
            color: '#fff'

          })
        })
      })
      return styleIcon
    },
    // 图层样式
    addArea (geo = []) {
      if (geo.length == 0) return false;
      let areaFeature = null;
      // 设置图层
      this.areaLayer = new VectorLayer({
        source: new VectorSource({
          features: []
        })
      })
      // 添加图层
      this.map.addLayer(this.areaLayer)
      geo.forEach(g => {
        let lineData = g.features[0]
        if (lineData.geometry.type == "MultiPolygon") {
          areaFeature = new Feature({
            geometry: new MultiPolygon(
              lineData.geometry.coordinates
            ).transform("EPSG:4326", "EPSG:3857")
          })
        } else if (lineData.geometry.type == "Polygon") {
          areaFeature = new Feature({
            geometry: new Polygon(
              lineData.geometry.coordinates
            ).transform("EPSG:4326", "EPSG:3857")
          })
        }
      })
      areaFeature.setStyle(
        new Style({
          fill: new Fill({ color: "#4e98f444" }),
          stroke: new Stroke({
            width: 3,
            color: [71, 137, 227, 1]
          })
        })
      )
      this.areaLayer.getSource().addFeatures([areaFeature]);
    },


  }
}
</script>
<style  scoped>
#map {
  height: 900px;
  width: 100%;
}
</style>