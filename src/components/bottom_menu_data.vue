<template>
  <div id="menu">
    <el-tabs @tab-click="addEcharts" :tab-position="tabPosition" type="border-card" style="height: 318px">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-s-data"></i> 实况</span>
        <Live />
      </el-tab-pane>

      <el-tab-pane>
        <!-- @click="add()"  -->
        <span slot="label"><i class="el-icon-s-marketing"></i> 预测</span>

        <Forecast />
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-s-order"></i> 机场</span>
        <div id="title">
          机场名称：{{ nowAirport[0].name }} (
          <span v-if="nowAirport[0].demo === '1'">{{ nowAirport[0].four }}</span>
          <span v-if="nowAirport[0].demo != '1'">通航机场</span>
          ) [ 坐标：<i class="el-icon-location" />{{ 'N' + nowAirport[0].lat.toFixed(4) + '°' }} {{ 'E' + nowAirport[0].lon.toFixed(4) + '°' }}]
        </div>
        <div id="ty" v-if="this.$store.state.nowAirport[0].demo === '2'" style="background: rgb(247 227 216)">
          <div class="airports">
            <table>
              <tr>
                <td>机场名称</td>
                <td>{{ this.$store.state.nowAirport[0].name }}</td>
              </tr>
              <tr>
                <td>机场分类</td>
                <td>{{ this.$store.state.nowAirport[0].机场分类 }}</td>
              </tr>
              <tr>
                <td>机场运行时间</td>
                <td>{{ this.$store.state.nowAirport[0].机场运行时间 }}</td>
              </tr>
              <tr>
                <td>允许飞行种类</td>
                <td>{{ this.$store.state.nowAirport[0].允许飞行种类 }}</td>
              </tr>
              <tr>
                <td>机场标高</td>
                <td>{{ this.$store.state.nowAirport[0].机场标高标高位置的大地水准面高差 }}</td>
              </tr>
              <tr>
                <td>基准温度</td>
                <td>{{ this.$store.state.nowAirport[0].基准温度 }}</td>
              </tr>
              <tr>
                <td>磁差</td>
                <td>{{ this.$store.state.nowAirport[0].磁差 }}</td>
              </tr>
              <tr>
                <td>驻场企业</td>
                <td>{{ this.$store.state.nowAirport[0].驻场企业 }}</td>
              </tr>
              <tr>
                <td>常驻航空器</td>
                <td>{{ this.$store.state.nowAirport[0].常驻航空器 }}</td>
              </tr>
              <tr>
                <td>机场联系方式</td>
                <td>{{ this.$store.state.nowAirport[0].机场联系方式 }}</td>
              </tr>
            </table>
          </div>
        </div>
        <div id="ys" v-if="this.$store.state.nowAirport[0].demo === '1'">
          <div id="taf">
            <el-table :data="taf" height="250" stripe style="width: 100%">
              <el-table-column prop="content" label="机场预报报文"> </el-table-column>
            </el-table>
          </div>
          <div id="metar">
            <el-table :data="metar" height="250" stripe style="width: 100%">
              <el-table-column prop="content" label="机场实况报文"> </el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>


import { mapState, mapActions } from 'vuex'
import Forecast from './Forecast'
import Live from './Live'
export default {


  data () {
    return {
      tabPosition: 'left',

    }
  },
  computed: {
    ...mapState(['nowAirport', 'metar', 'taf']),

  },
  components: {
    Forecast, Live
  },
  mounted () {

  },
  methods: {

    addEcharts () {
      this.$store.commit('addEcharts', 'echarts1')
      this.$store.commit('addEcharts', 'echarts2')

      console.log('eeeeeeecccccccccccc')
    }

  }

}
</script>
<style scoped>
div {
  font-size: 14px;
}
#menu {
  width: 100%;
}
el-tabs {
  height: 350px;
}
table {
  font-size: 14px;
}
table tr :nth-child(1) {
  width: 120px;
  border-bottom: 1px solid #b0b1b9;
  padding-left: 15px;
  text-align: left;
  border-right: 1px solid #b0b1b9;
}
table :hover {
  background-color: #faecdf;
}
table tr :nth-child(2) {
  width: 380px;
  border-bottom: 1px solid #b0b1b9;
  padding-left: 15px;
  text-align: left;
}
li {
  list-style: none;
}

/deep/ .el-tabs__content {
  padding: 10px 0 10px 10px;
  left: -10px;
}

.airports::-webkit-scrollbar-track {
  background-color: #f5f7fa;
}

.airports::-webkit-scrollbar {
  width: 8px;
}

.airports::-webkit-scrollbar-thumb {
  background-color: #dfe4ed;
  border-radius: 8px;
}
#title {
  border-bottom: 1px solid #dfe4ed;
}
#ty,
#ys {
  width: 100%;
  height: 280px;
}
.airports {
  color: black;
  width: 500px;
  height: 280px;
  overflow: auto;
  position: absolute;
  right: 0;
  padding: 10px;
  border-left: 2px solid #b0b1b9;
  box-sizing: border-box;
}
#metar,
#taf {
  width: 50%;
  float: left;
  height: 280px;
  background: #dfe4ed;

  box-sizing: border-box;
}
#metar {
  border-left: 5px solid #fff;
}
#taf {
  border-right: 5px solid #fff;
}

/deep/.el-table td,
.el-table th {
  padding: 10px 0;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
}
/deep/.el-table td {
  background: #dfe4ed;
  font-size: 13px;
}
/deep/.el-table th > .cell {
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  vertical-align: middle;
  padding-left: 6px;
  padding-right: 10px;
  width: 100%;
}
/deep/.el-table .cell {
  line-height: 14px;
}
/deep/.el-table thead {
  color: #696b6f;
  font-weight: 500;
}
/deep/.el-table {
  width: 100%;
  height: 277px !important;
}
</style>