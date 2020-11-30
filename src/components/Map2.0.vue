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
    var baseMapLayer = new ol.layer.Tile({
      source: new ol.source.OSM()
    });
    var map = new ol.Map({
      target: 'map-canvas',
      layers: [baseMapLayer],
      view: new ol.View()
    });
    var markers = [];

    markers.push(new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([12.483713800000032, 41.901777])
      ),
      name: '492,00'
    }));


    markers.push(new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([12.5048055, 41.8968191])
      ),
      name: '289,50'
    }));


    markers.push(new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([12.48060190000001, 41.9077133])
      ),
      name: '1606,50'
    }));


    markers.push(new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([12.498839999999973, 41.9000227])
      ),
      name: '324,00'
    }));

    var colors = ['red', 'green', 'blue', 'black'];
    var iconStyles = [];

    colors.forEach(function (color) {
      iconStyles.push(new ol.style.Style({
        image: new ol.style.Circle({
          radius: 6,
          stroke: new ol.style.Stroke({
            color: '#fff'
          }),
          fill: new ol.style.Fill({
            color: color
          })
        })
      }))
    });

    var labelStyle = new ol.style.Style({
      text: new ol.style.Text({
        font: '12px Calibri,sans-serif',
        overflow: true,
        fill: new ol.style.Fill({
          color: '#000'
        }),
        stroke: new ol.style.Stroke({
          color: '#fff',
          width: 3
        }),
        textBaseline: 'bottom',
        offsetY: -8
      })
    });

    var vectorSource = new ol.source.Vector({
      features: markers
    });
    var markerVectorLayer = new ol.layer.Vector({
      source: vectorSource,
      style: function (feature) {
        var name = feature.get('name');
        var iconStyle = iconStyles[parseInt(name) % colors.length];
        labelStyle.getText().setText(name);
        return [iconStyle, labelStyle];
      }
    });

    map.addLayer(markerVectorLayer);
    map.getView().fit(vectorSource.getExtent(), map.getSize());

  },




}
</script>
<style  scoped>
#map {
  height: 900px;
  width: 100%;
}
</style>