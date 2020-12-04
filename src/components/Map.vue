<template>
  <div id="main">
    <div id="map"></div>
    <div id="popup" class="ol-popup" v-show="showPopup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content" class="popup-content"></div>
    </div>
    <div id="mouse-position"></div>
    <div id="markclick" class="ol-markclick" v-show="showMarkClick"></div>
  </div>
</template>

<script>
import "ol/ol.css"
import TileLayer from "ol/layer/Tile"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import XYZ from "ol/source/XYZ"
import { Map, View, Feature, ol } from "ol"
import { forEachFeatureAtPixel } from "ol/PluggableMap"
import { MultiPolygon, Polygon } from "ol/geom"
import { Style, Circle, Icon, Fill, RegularShape, Stroke, Text, } from "ol/style"
import { Point } from "ol/geom"
import { defaults as defaultControls, ScaleLine, FullScreen, MousePosition } from "ol/control"

import { toStringHDMS, createStringXY } from "ol/coordinate";
import Overlay from "ol/Overlay";
import { fromLonLat, transform, toLonLat } from "ol/proj";
import airports from '../assets/airports.json'
import areaGeo from "../../public/china.json"

export default {
  name: 'OlMap',
  data () {

    // var airports = JSON.parse(airports)
    return {
      zoom: 5,
      text: '',
      showPopup: false,
      showMarkClick: false,
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
    this.addArea(areaGeo)//添加区域图层方法
    this.addPoints(this.airports)//根据坐标点批量打点

    this.markclick()
    // this.addPopup()
  },

  methods: {
    // 初始化地图
    initMap () {
      // 比例尺控件
      var scaleLineControl = new ScaleLine()
      // 全屏控件
      var fullScreen = new FullScreen()
      // 鼠标控件
      var mousePositionControl = new MousePosition({

        coordinateFormat: createStringXY(4),
        projection: 'EPSG:4326',
        target: "mouse-position"

      })
      this.map = new Map({
        target: "map",
        controls: defaultControls({
          zoom: true
        }).extend([scaleLineControl, fullScreen, mousePositionControl]),
        layers: [
          new TileLayer({
            source: new XYZ({
              // url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
              url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
              // url: "http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i380072576!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0"

            })
          })
        ],
        view: new View({
          center: fromLonLat([108.522097, 37.272848]),
          zoom: 4.7,
          maxZoom: 10,
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
          name: coordinates[i].name,
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
      this.pointLayer.setZIndex(1)

    },
    // 设置icon样式
    getIcon (name, type) {
      let src = ""
      let text = ''
      type == "1"
        ? (src = require("../../public/icon-ys.png"))
        : (src = require("../../public/icon-ty.png"))
      let _that = this

      var styleIcon = new Style({
        stroke: new Stroke({
          color: '#fff',
          width: 2
        }),
        fill: new Fill({
          color: '#00f'
        }),
        // 设置图片效果
        image: new Icon({
          // color: '#0f0',

          scale: 0.5,
          src: src,
          anchor: [1, 1]
        }),
        text: new Text({
          text: '',
          font: 'normal 10px 微软雅黑',    //文字样式
          fill: new Fill({       //文本填充样式（即文字颜色)
            color: '#fff'

          }),

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
          // fill: new Fill({ color: "#4e98f444" }),
          stroke: new Stroke({
            width: 0.7,
            color: "#80C0F2"
          })
        })
      )
      this.areaLayer.getSource().addFeatures([areaFeature]);
    },
    /**
         * 创建一个 Overlay 叠加从对象用作显示弹窗
         * 思路：
         * 1. 点击地图上的位置
         * 2. 获取经纬度的坐标
         * 3. 调用 ol 内置的方法 ol.Overlay 实现弹出
         */
    addPopup () {
      console.log(this.showMarkClick)



      // 使用变量存储弹窗所需的 DOM 对象
      var container = document.getElementById("popup");
      var closer = document.getElementById("popup-closer");
      var content = document.getElementById("popup-content");

      // 创建一个弹窗 Overlay 对象
      this.overlay = new Overlay({
        element: container, //绑定 Overlay 对象和 DOM 对象的
        autoPan: true, // 定义弹出窗口在边缘点击时候可能不完整 设置自动平移效果
        autoPanAnimation: {
          duration: 250 //自动平移效果的动画时间 9毫秒
        }
      });
      // 将弹窗添加到 map 地图中
      this.map.addOverlay(this.overlay);
      let _that = this;
      /**
       * 添加单击响应函数来处理弹窗动作
       */
      this.map.on("click", function (evt) {
        // "EPSG:3857", "EPSG:4326" 转换
        let coordinate = transform(
          evt.coordinate,
          "EPSG:3857",
          "EPSG:4326"
        );
        // 点击尺 （这里是尺(米)，并不是经纬度）;
        let hdms = toStringHDMS(toLonLat(evt.coordinate)); // 转换为经纬度显示
        content.innerHTML = `
                <p>你点击了这里：</p>
                <p>经纬度：<p><code> ${hdms}  </code> <p>
                <p>坐标：</p>X：${coordinate[0]} &nbsp;&nbsp; Y: ${coordinate[1]}`;
        _that.overlay.setPosition(evt.coordinate); //把 overlay 显示到指定的 x,y坐标
        _that.showPopup = true

      });
      /**
       * 为弹窗添加一个响应关闭的函数
       */
      closer.onclick = function () {
        _that.overlay.setPosition(undefined);
        closer.blur();
        return false;

      }
    },
    markclick () {

      var markclick = document.getElementById("markclick");
      this.popup = new Overlay({
        element: markclick, //绑定 Overlay 对象和 DOM 对象的
        autoPan: true, // 定义弹出窗口在边缘点击时候可能不完整 设置自动平移效果
        positioning: 'bottom-center',
        stopEvent: false,
        // offset: [0, 0],
        autoPanAnimation: {
          duration: 250 //自动平移效果的动画时间 9毫秒
        }
      });
      this.map.addOverlay(this.popup);
      let _that = this


      _that.map.on('pointermove', function (evt) {


        var feature = _that.map.forEachFeatureAtPixel(evt.pixel,
          function (feature) {
            return feature;
          })

        _that.map.getTargetElement().style.cursor = _that.map.hasFeatureAtPixel(evt.pixel)
          ? "pointer"
          : "";

        if (feature) {
          let coordinates = feature.getGeometry().getCoordinates();
          // console.log(feature.get('name'))
          _that.popup.setPosition(coordinates);
          // let hdms = toStringHDMS(toLonLat(evt.coordinate));
          if (feature.get('name')) {
            markclick.innerHTML = `  ${feature.get('name')}  `
            _that.map.getTargetElement().style.cursor = "pointer"

            _that.showMarkClick = true
          } else {
            _that.showMarkClick = false
            _that.map.getTargetElement().style.cursor = ""
          }
          // _that.popup.setPosition(evt.coordinate); //把 overlay 显示到指定的 x,y坐标

        } else {
          _that.showMarkClick = false
        }

      });

    }
  }

}

</script>
<style  scoped>
#map {
  overflow: hidden;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
#mouse-position {
  position: absolute;
  bottom: 5px;
  right: 10px;
  overflow: hidden;
  padding: 0;
  margin: 0;
  width: 400px;
  height: 30px;

  color: #cccccc;
}
#main {
  position: relative;
  overflow: hidden;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}
.ol-popup {
  position: absolute;
  background-color: white;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
}
.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: ' ';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.popup-content {
  width: 400px;
}
.ol-popup-closer:after {
  content: '✖';
}
.ol-markclick {
  position: relative;
  background-color: white;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  padding: 5px;

  height: 20px;
  border-radius: 2px;
  border: 1px solid #cccccc;
  bottom: 10px;
}
</style>