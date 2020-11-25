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
import { Style, Icon } from 'ol/style'
import { Vector as LayerVec } from 'ol/layer'

export default {
  name: 'OlMap',
  mounted () {
    this.vectorTileLayer()
  },

  methods: {
    vectorTileLayer () {
      //渲染地图
      var layers = [
        // new TileLayer({
        //   source: new OSM()
        // }),
        // new TileLayer({
        //   extent: [-13884991, 2870341, -7455066, 6338219],
        //   source: new TileArcGISRest({
        //     url: 'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer'
        //   })
        // }),
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
      var lnglats = [
        [116.963, 36.623],
        [120.980, 36.620]

      ]

      //创建图标特性
      var iconFeature = new Array()
      for (var i = 0; i < lnglats.length; i++) {
        iconFeature.push(new Feature({
          geometry: new Point(lnglats[i])
        }))
      }
      // 创建矢量容器
      var vectorSource = new SourceVec({
        features: iconFeature
      })
      console.log(iconFeature)
      //创建图标样式
      var iconStyle = new Style({
        image: new Icon({
          opacity: 0.75,
          src: "https://fplcaac.com/img/icon-ys.png"
          // src: "https://fplcaac.com/img/icon-tyzs.png"
          // src: "https://fplcaac.com/img/icon-ty.png"
          // src: "https://fplcaac.com/img/icon_zdz.png"
        })
      })
      //创建矢量层
      var vectorLayer = new LayerVec({
        source: vectorSource,
        style: iconStyle
      });
      //添加进map
      map.addLayer(vectorLayer);
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