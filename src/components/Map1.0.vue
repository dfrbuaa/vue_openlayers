<template>
  <div>
    <div id="map"></div>
  </div>
</template>
<script>
import 'ol/ol.css'
import View from 'ol/View'
import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile'
import { OSM, TileArcGISRest, XYZ } from 'ol/source';
import { Vector as SourceVec } from 'ol/source'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import { Style, Icon, Text } from 'ol/style'
import { Vector as LayerVec } from 'ol/layer'
import airports from '../assets/airports.json'
export default {
  name: 'OlMap',
  data () {
    // var airports = JSON.parse(airports)
    return {
      airports: airports,
      lnglats: [],
      lnglats_ys: [],
      lnglats_ty: [],
      lnglats_tyzs: [],
    }
  },
  mounted () {
    // console.log(airports)
    this.vectorTileLayer()
  },
  methods: {
    vectorTileLayer () {
      //渲染地图
      var layers = [
        new TileLayer({
          source: new XYZ({
            url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
          }),
          title: '高德影像'
        })
      ]
      var map = new Map({
        layers: layers,
        target: 'map',
        view: new View({
          projection: "EPSG:4326",
          center: [116, 37],
          zoom: 5
        })
      })
      for (var j in this.airports) {
        if (this.airports[j].demo == "1") {
          this.lnglats_ys.push([this.airports[j].lon, this.airports[j].lat])
        }
        if (this.airports[j].demo == "2") {
          this.lnglats_ty.push([this.airports[j].lon, this.airports[j].lat])
        }
        if (this.airports[j].demo == "3") {
          this.lnglats_tyzs.push([this.airports[j].lon, this.airports[j].lat])
        }
      }
      //创建图标特性
      var iconFeature1 = new Array()
      for (var i = 0; i < this.lnglats_ys.length; i++) {
        iconFeature1.push(new Feature({
          geometry: new Point(this.lnglats_ys[i])
        }))
      }
      var iconFeature2 = new Array()
      for (var i = 0; i < this.lnglats_ty.length; i++) {
        iconFeature2.push(new Feature({
          geometry: new Point(this.lnglats_ty[i])
        }))
      }
      var iconFeature3 = new Array()
      for (var i = 0; i < this.lnglats_tyzs.length; i++) {
        iconFeature3.push(new Feature({
          geometry: new Point(this.lnglats_tyzs[i])
        }))
      }
      // 创建矢量容器
      var vectorSource1 = new SourceVec({
        features: iconFeature1
      })
      var vectorSource2 = new SourceVec({
        features: iconFeature2
      })
      var vectorSource3 = new SourceVec({
        features: iconFeature3
      })
      //创建图标样式
      var iconStyle1 = new Style({
        image: new Icon({
          opacity: 0.75,
          src: "https://fplcaac.com/img/icon-ys.png",
        }),
        text: new Text({
          text: 'aaa'
        })
      })
      var iconStyle2 = new Style({
        image: new Icon({
          opacity: 0.75,
          src: "https://fplcaac.com/img/icon-tyzs.png"
          // src: "https://fplcaac.com/img/icon-ty.png"
          // src: "https://fplcaac.com/img/icon_zdz.png"
          // src: "https://fplcaac.com/img/icon_jcbw.png"
        })
      })
      var iconStyle3 = new Style({
        image: new Icon({
          opacity: 0.75,
          src: "https://fplcaac.com/img/icon-ty.png"
          // src: "https://fplcaac.com/img/icon_zdz.png"
          // src: "https://fplcaac.com/img/icon_jcbw.png"
        })
      })
      //创建矢量层
      var vectorLayer1 = new LayerVec({
        source: vectorSource1,
        style: iconStyle1
      })
      var vectorLayer2 = new LayerVec({
        source: vectorSource2,
        style: iconStyle2
      })
      var vectorLayer3 = new LayerVec({
        source: vectorSource3,
        style: iconStyle3
      })
      //添加进map
      map.addLayer(vectorLayer1)
      map.addLayer(vectorLayer2)
      map.addLayer(vectorLayer3)
    }
  }
}
</script>
<style  scoped>
#map {
  height: 900px;
  width: 100%;
}
</style>