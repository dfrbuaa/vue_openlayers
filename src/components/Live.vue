<template>
  <div>
    <div id="now">
      机场名称：{{ nowAirport[0].name }} (
      <span v-if="nowAirport[0].demo === '1'">{{ nowAirport[0].four }}</span>
      <span v-if="nowAirport[0].demo != '1'">通航机场</span>
      ) [ 坐标：<i class="el-icon-location" />{{ 'N' + nowAirport[0].lat.toFixed(4) + '°' }} {{ 'E' + nowAirport[0].lon.toFixed(4) + '°' }}]
    </div>
    <div class="ff" id="now">
      <div id="now1">
        <div></div>
        <table id="table1" style="width: 100%" class="myTable">
          <tr>
            <td colspan="1" v-for="(item, i) in hourDataList" :key="i">{{ item.temperature_time }}</td>
          </tr>

          <tr>
            <td colspan="1" v-for="(item, i) in hourDataList" :key="i"><img :src="item.weather_pic" alt="" /></td>
          </tr>
          <tr>
            <td colspan="1" v-for="(item, i) in hourDataList" :key="i">{{ item.weather }}</td>
          </tr>

          <tr>
            <td colspan="1" v-for="(item, i) in hourDataList" :key="i">{{ item.temperature }}°</td>
          </tr>

          <tr>
            <td colspan="1" v-for="(item, i) in hourDataList" :key="i">
              {{ item.sd }}
            </td>
          </tr>
          <tr>
            <td colspan="1" v-for="(item, i) in hourDataList" :key="i">
              {{ item.rain }}
            </td>
          </tr>
          <tr>
            <td colspan="1" v-for="(item, i) in hourDataList" :key="i">
              {{ item.wind_power }}
            </td>
          </tr>
          <tr>
            <td colspan="1" v-for="(item, i) in hourDataList" :key="i">
              {{ item.wind_direction }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div id="head" class="ff">
      <div>时间 <i class="el-icon-time" /></div>
      <div>天气</div>
      <div>温度℃</div>

      <div>湿度<i>%</i></div>
      <div>降水<i>mm</i></div>

      <div>风力<i></i></div>
      <div>风向<i class="el-icon-s-flag"></i></div>
    </div>
    <div class="ff" id="right">
      <div id="f1" class="f">
        <div>{{ this.$store.state.time1 }}(今天)</div>
        <div class="middle">日出|日落：{{ this.f1.sun_begin_end }}</div>
        <div class="day">
          <div class="left">
            <img :src="`${this.f1.day_weather_pic}`" alt="" />
            <div>{{ this.f1.day_weather }}</div>
          </div>
          <div class="right">
            <table>
              <tr>
                <td>温度:</td>
                <td>{{ this.f1.day_air_temperature }}℃</td>
              </tr>
              <tr>
                <td>风力:</td>
                <td>{{ this.f1.day_wind_power }}</td>
              </tr>
              <tr>
                <td>风向:</td>
                <td>{{ this.f1.day_wind_direction }}</td>
              </tr>
              <tr>
                <td>降水:</td>
                <td>{{ this.f1.jiangshui }}</td>
              </tr>
            </table>
          </div>
        </div>

        <div class="night">
          <div class="left">
            <img :src="`${this.f1.night_weather_pic}`" alt="" />
            <div>{{ this.f1.night_weather }}</div>
          </div>
          <div class="right">
            <table>
              <tr>
                <td>温度:</td>
                <td>{{ this.f1.night_air_temperature }}℃</td>
              </tr>
              <tr>
                <td>风力:</td>
                <td>{{ this.f1.night_wind_power }}</td>
              </tr>
              <tr>
                <td>风向:</td>
                <td>{{ this.f1.night_wind_direction }}</td>
              </tr>
              <tr>
                <td>降水:</td>
                <td>{{ this.f1.jiangshui }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div id="f2">
        <div>{{ this.$store.state.time[0] }}</div>
        <div class="middle">日出|日落：{{ this.f2.sun_begin_end }}</div>
        <div class="day">
          <div class="left">
            <img :src="`${this.f2.day_weather_pic}`" alt="" />
            <div>{{ this.f2.day_weather }}</div>
          </div>
          <div class="right">
            <table>
              <tr>
                <td>温度:</td>
                <td>{{ this.f2.day_air_temperature }}℃</td>
              </tr>
              <tr>
                <td>风力:</td>
                <td>{{ this.f2.day_wind_power }}</td>
              </tr>
              <tr>
                <td>风向:</td>
                <td>{{ this.f2.day_wind_direction }}</td>
              </tr>
              <tr>
                <td>降水:</td>
                <td>{{ this.f2.jiangshui }}</td>
              </tr>
            </table>
          </div>
        </div>

        <div class="night">
          <div class="left">
            <img :src="`${this.f2.night_weather_pic}`" alt="" />
            <div>{{ this.f2.night_weather }}</div>
          </div>
          <div class="right">
            <table>
              <tr>
                <td>温度:</td>
                <td>{{ this.f2.night_air_temperature }}℃</td>
              </tr>
              <tr>
                <td>风力:</td>
                <td>{{ this.f2.night_wind_power }}</td>
              </tr>
              <tr>
                <td>风向:</td>
                <td>{{ this.f2.night_wind_direction }}</td>
              </tr>
              <tr>
                <td>降水:</td>
                <td>{{ this.f2.jiangshui }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div id="f3">
        <div>{{ this.$store.state.time[1] }}</div>
        <div class="middle">日出|日落：{{ this.f3.sun_begin_end }}</div>
        <div class="day">
          <div class="left">
            <img :src="`${this.f3.day_weather_pic}`" alt="" />
            <div>{{ this.f3.day_weather }}</div>
          </div>
          <div class="right">
            <table>
              <tr>
                <td>温度:</td>
                <td>{{ this.f3.day_air_temperature }}℃</td>
              </tr>
              <tr>
                <td>风力:</td>
                <td>{{ this.f3.day_wind_power }}</td>
              </tr>
              <tr>
                <td>风向:</td>
                <td>{{ this.f3.day_wind_direction }}</td>
              </tr>
              <tr>
                <td>降水:</td>
                <td>{{ this.f3.jiangshui }}</td>
              </tr>
            </table>
          </div>
        </div>

        <div class="night">
          <div class="left">
            <img :src="`${this.f3.night_weather_pic}`" alt="" />
            <div>{{ this.f3.night_weather }}</div>
          </div>
          <div class="right">
            <table>
              <tr>
                <td>温度:</td>
                <td>{{ this.f3.night_air_temperature }}℃</td>
              </tr>
              <tr>
                <td>风力:</td>
                <td>{{ this.f3.night_wind_power }}</td>
              </tr>
              <tr>
                <td>风向:</td>
                <td>{{ this.f3.night_wind_direction }}</td>
              </tr>
              <tr>
                <td>降水:</td>
                <td>{{ this.f3.jiangshui }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div id="issue">
        <div><i class="el-icon-message-solid"></i> 预警</div>
        <div id="issueContent" v-if="alarmList">
          <div class="signal" :style="{ background: this.alarmColor }">
            {{ this.alarmList.signalLevel }}<i>({{ this.alarmList.signalType }})</i>
          </div>

          <div class="issueTime">{{ this.alarmList.issueTime }}</div>
          -----------------------------------------------
          <div class="content">{{ this.alarmList.issueContent }}</div>
        </div>
        <div id="issueContent1" v-if="!alarmList">暂无</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['nowAirport', 'hourDataList', 'f1', 'f2', 'f3', 'alarmList', 'alarmColor']),

  }


}
</script>

<style scoped>
.ff {
  float: left;
  height: 280px;
}
#now {
  width: 100%;
}
#now1 {
  border-top: 1px solid rgb(223 228 237);
  height: 280px;
  margin: 0 900px 0 80px;
  min-width: 830px;
}
#head {
  margin-left: -100%;
  width: 80px;
  background-color: rgb(245 247 250);
  border-right: 1px solid rgb(223 228 237);
}
#head > div {
  text-align: right;

  padding: 5px 4px 4px 4px;
}
#head > :nth-child(2) {
  padding: 49px 4px 4px 4px !important;
}
#right {
  margin-left: -900px;
  width: 900px;
  height: 280px;
}
#right > div {
  float: left;
  height: 280px;
  width: 200px;
  border-right: 1px solid #dfe4ed;
  border-top: 1px solid #dfe4ed;
  box-sizing: border-box;
}
#right > div > :nth-child(1) {
  background: #fff;
  width: 200px;
}
#today {
  position: absolute;
  top: 11px;
  height: 20px;
  right: 750px;
}

table {
  width: 100%;
}
div {
  font-size: 14px;
}
.day,
.night {
  height: 130px;
  box-sizing: border-box;
}

.day {
  background: #edf8fd;
}
.night {
  background: #bdd9ea;
}
.day > .left,
.day > .right {
  float: left;

  height: 130px;
}
.day > .left,
.night > .left {
  width: 70px;
  padding: 5px;
  box-sizing: border-box;
}

.day > .right,
.night > .right {
  width: 129px;
  padding: 5px 0px;
  box-sizing: border-box;
}

.night > .left,
.night > .right {
  float: left;

  height: 130px;
}
.middle {
  height: 20px;
  width: 199px;
  background: #fff;
}
.left > img {
  width: 60px;
}
.left > div {
  text-align: center;
}
table > tr > td {
  min-width: 35px;
}
#now > div > :nth-child(1),
#right > div > :nth-child(1) {
  position: absolute;
  top: 10px;
}
#issue {
  width: 300px !important;
}
#issueContent,
#issueContent1 {
  padding: 0px 5px;
  background: rgb(245 247 250);
  height: 280px;
}

#table1 > tr > td > img {
  width: 30px;
}
#table1 > tr > td {
  text-align: center;
  border-left: 1px solid rgb(223 228 237);
  padding: 3px 4px 4px 4px;
}
#table1 > tr > :nth-child(1) {
  border-left: 0px solid rgb(223 228 237) !important;
}
</style>