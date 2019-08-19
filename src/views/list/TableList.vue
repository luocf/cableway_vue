<template xmlns:v-line-clamp="http://www.w3.org/1999/xhtml">
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout>
      <a-layout-content :style="{ margin: '0px 0px', padding: '0px', background: '#fff', minHeight: '280px' }">
        <div class="control">
          <div class="controlstatus">

            <a-tag>通讯:{{ showOnlineNums() }}</a-tag>
            <a-radio-group name="radioGroup" :defaultValue="1" @change="onControlChanged">
              <a-radio :value="1">全开</a-radio>
              <a-radio :value="2">全关</a-radio>
            </a-radio-group>
            <a-tag>在线人数:{{ showOnlineNums() }}</a-tag>
            <a-tag> {{ currentDateTime }}</a-tag>
          </div>
          <div class="controlbtn">
            <a-button type="primary" ghost style="margin-right: 10px" @click="PlayControl">播放控制</a-button>
            <a-button type="primary" ghost style="margin-right: 10px" @click="CarSetting">轿厢设置</a-button>
            <a-button type="primary" ghost style="margin-right: 10px" @click="ScreenSetting">界面设置</a-button>
            <!--<a-button type="primary" ghost style="margin-right: 10px" @click="AdvanceSetting">高级设置</a-button>-->
          </div>
        </div>

        <a-table
          :scroll="{ y: 450 }"
          :pagination="false"
          :columns="columns"
          :dataSource="data"
          size="small" >
          <template slot="name" slot-scope="text">
            <a href="javascript:;">{{ text }}</a>
          </template>
          <template slot="open">
            <a-checkbox @change="onChange" defaultChecked></a-checkbox>
          </template>

          <template slot="car_id" slot-scope="text, record, index">
            {{ text }}
          </template>

          <template slot="section" slot-scope="text">
            {{ text }}

          </template>
          <template slot="position" slot-scope="text">
            {{ text + 'm' }}

          </template>
          <template slot="speed" slot-scope="text">
            {{ text + 'm/s' }}

          </template>
          <template slot="battery" slot-scope="text">
            <a-progress :percent="30" :showInfo="false" size="small" style="width:120px;"/>
            {{ text + 'V' }}

          </template>
          <template slot="current" slot-scope="text">
            {{ text + 'mA' }}

          </template>
          <template slot="power_waste" slot-scope="text">
            {{ text + 'W' }}

          </template>
          <template slot="temp" slot-scope="text">
            {{ text + '°C' }}

          </template>
          <template slot="inner_light" slot-scope="text, record">
            <a-checkbox @change="onInnerLightChange(record,$event)" :checked="text"></a-checkbox>
          </template>
          <template slot="outer_light" slot-scope="text, record">
            <a-checkbox @change="onOuterLightChange(record,$event)" :checked="text"></a-checkbox>
          </template>
          <template slot="volume" slot-scope="text">
            {{ text }}

          </template>
          <template slot="playmode" slot-scope="text">
            {{ text }}

          </template>
          <template slot="soundtrack" slot-scope="text">
            {{ text }}

          </template>
          <template slot="audio" slot-scope="text">
            <ellipsis :length="18" tooltip>{{ text }}</ellipsis>
          </template>
        </a-table>
        <play-control-modal ref="playmodal" @ok="handleOk"/>
        <car-setting-modal ref="carsettingmodal" @ok="handleOk"/>
        <screen-setting-modal ref="screensettingmodal" @ok="handleOk"/>
      </a-layout-content>
    </a-layout>
    <a-layout-sider
      :trigger="null"
      v-model="collapsed"
    >
      <div style="background: #ececec;width:100%;height:100%">
        <div class="side_vertical_line" style="top:40px;left: 20px"></div>
        <div class="side_vertical_line" style="top:40px;left: 60px"></div>

        <div class="side_horizontal_line" style="top:30px;left: 20px"></div>
        <div class="side_horizontal_line" style="top:545px;left: 20px"></div>
        <div id="RealTimePositionCars">

        </div>
        <div class="side_title" style="top: 5px">上站</div>
        <div class="side_title" style="top: 535px">下站</div>
      </div>
    </a-layout-sider>
  </a-layout>
</template>

<script>
import $ from 'jquery'
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import CreateForm from './modules/CreateForm'
import { getRoleList, getServiceList } from '@/api/manage'
import ACheckbox from 'ant-design-vue/es/checkbox/Checkbox'
import { getCurrentDate } from '@/api/date'
import ALayoutSider from 'ant-design-vue/es/layout/Sider'
import ATag from 'ant-design-vue/es/tag/Tag'
import * as animationData from '@/assets/lottie/8348-bulbul.json'
import PlayControlModal from './modules/PlayControlModal'
import CarSettingModal from './modules/CarSettingModal'
import ScreenSettingModal from './modules/ScreenSettingModal'

const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'processing',
    text: '运行中'
  },
  2: {
    status: 'success',
    text: '已上线'
  },
  3: {
    status: 'error',
    text: '异常'
  }
}

export default {
  name: 'TableList',
  components: {
    ATag,
    ALayoutSider,
    ACheckbox,
    STable,
    Ellipsis,
    CreateForm,
    PlayControlModal,
    CarSettingModal,
    ScreenSettingModal
  },
  data () {
    return {
      collapsed: true,
      currentDateUpdateTimer: null,
      currentDateTime: '',
      checkedList: [],
      checkAll: true,
      mdl: {},
      advanced: false,
      // 查询参数
      queryParam: {},
      data: [],
      // 表头
      columns: [
        {
          title: '开启',
          width: '60px',
          dataIndex: 'open_status',
          scopedSlots: { customRender: 'open' }
        },
        {
          title: '轿厢',
          width: '60px',
          dataIndex: 'car_id',
          scopedSlots: { customRender: 'car_id' }
        },
        {
          title: '区段',
          width: '60px',
          dataIndex: 'section',
          scopedSlots: { customRender: 'section' }
        },
        {
          title: '位置',
          width: '60px',
          dataIndex: 'position',
          scopedSlots: { customRender: 'position' }
        },
        {
          title: '速度',
          width: '60px',
          dataIndex: 'speed',
          scopedSlots: { customRender: 'speed' }
        },
        {
          title: '电池电量',
          dataIndex: 'battery_level',
          width: '180px',
          scopedSlots: { customRender: 'battery' }
        },
        {
          title: '电流',
          width: '60px',
          dataIndex: 'current',
          scopedSlots: { customRender: 'current' }
        },
        {
          title: '功耗',
          width: '60px',
          dataIndex: 'power_waste',
          scopedSlots: { customRender: 'power_waste' }
        },
        {
          title: '温度',
          width: '60px',
          dataIndex: 'temp',
          scopedSlots: { customRender: 'temp' }
        },
        {
          title: '内灯',
          width: '60px',
          dataIndex: 'inner_light',
          scopedSlots: { customRender: 'inner_light' }
        },
        {
          title: '外灯',
          width: '60px',
          dataIndex: 'outer_light',
          scopedSlots: { customRender: 'outer_light' }
        },
        {
          title: '音量',
          width: '60px',
          dataIndex: 'volume',
          scopedSlots: { customRender: 'volume' }
        },
        {
          title: '播放模式',
          width: '100px',
          dataIndex: 'playmode',
          scopedSlots: { customRender: 'playmode' }
        },
        {
          title: '音轨',
          width: '100px',
          dataIndex: 'soundtrack',
          scopedSlots: { customRender: 'soundtrack' }
        },
        {
          title: '当前音频',
          dataIndex: 'audio',
          width: '150px',
          scopedSlots: { customRender: 'audio' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getServiceList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      }
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  created () {
	    getRoleList().then(res => {
		    // console.log('workplace -> call getRoleList()', res)
	    })
	    getServiceList().then(res => {
		    // console.log('workplace -> call getServiceList()', res)
	    })
  },
  mounted () {
    this.requestFrame()
    this.startAnima()
    this.currentDateUpdateTimer = setInterval(this.requestFrame, 1000)
  },
  beforeDestroy () {
    clearInterval(this.currentDateUpdateTimer)
  },
  methods: {
    requestData () {
      let content = ''
      const cablewaycars = []
      for (let i = 1; i < 20; i++) {
        cablewaycars.push({
          key: i,
          car_id: i,
          section: 1,
          direction: i > 10 ? 0 : 1,
          position: i > 10 ? ((i - 10) + 1) * 40 : 545 - (i + 1) * 40,
          speed: 16.5,
          battery_level: 10.2,
          current: 10,
          power_waste: 15,
          temp: 30,
          inner_light: false,
          outer_light: true,
          volume: 20,
          playmode: '定位播放',
          soundtrack: '汉语',
          audio: '背景音乐钢琴曲、背景音乐钢琴曲'
        })
      }
      $('#RealTimePositionCars').html('')
      for (const index in cablewaycars) {
        const data_item = cablewaycars[index]
        const direction = parseInt(data_item.direction)// 0:上行 1:下行
        const left = direction == 0 ? 45 : 5
        const top = parseInt(data_item.position)// TODO  需要根据position转换为轨道上的位置
        content += '<div class="side_car_box" id="side_car_box' + data_item.car_id + '" style="left:' + left + 'px;top:' + top + 'px;">' + data_item.car_id + '</div>'
      }
      $('#RealTimePositionCars').html(content)
      this.data = cablewaycars
      // this.startAnima();
    },
    startAnima () {
      for (const index in this.data) {
        const data_item = this.data[index]
        const direction = parseInt(data_item.direction)// 0:上行 1:下行
        const top = direction == 0 ? 30 : 545
        const position = parseInt(data_item.position)
        const time = parseInt((545 - position) / (545 / 300000))// 距离/速度
        console.log('time:' + time + ',position:' + position)
        $('#side_car_box' + data_item.car_id).animate({ top: top + 'px' }, time)
      }
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    handleAnimation (anim) {
      this.anim = anim
    },
    onControlChanged (e) {
    },
    showOnlineNums () {
      return 2
    },
    requestFrame () {
      this.requestData()
      this.currentDateTime = getCurrentDate()
    },
    onInnerLightChange (record, e) {
      console.log(`checked = ${e.target.checked}`)
      record.inner_light = e.target.checked
    },
    onOuterLightChange (record, e) {
      console.log(`checked = ${e.target.checked}`)
      record.outer_light = e.target.checked
    },
    onChange (e) {
      console.log(`checked = ${e.target.checked}`)
      // 业务逻辑
    },
    onAllChange (checked) {
      console.log(`a-switch to ${checked}`)
      this.checkAll = checked
    },
    PlayControl () {
      this.$refs.playmodal.show()
    },

    CarSetting () {
      this.$refs.carsettingmodal.show()
    },

    ScreenSetting () {
      this.$refs.screensettingmodal.show()
    },
    AdvanceSetting () {

    }
  }
}
</script>
<style>
  th.column-money,
  td.column-money {
    text-align: right !important;
  }

  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 5px;
    cursor: pointer;
    transition: color .3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .side_title {
    width: 70px;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    border-radius: 4px;
    text-align: center;
    background: #2db7f5;
    position: absolute;
    margin: 6px;
  }

  #components-layout-demo-custom-trigger .side_vertical_line {
    height: 500px;
    background: #dadcdd;
    position: absolute;
    width: 2px;
  }

  #components-layout-demo-custom-trigger .control {
    position: relative;
    height: 50px;
    line-height: 50px;
    padding: 10px;
    background: rgba(189, 189, 189, 0.15);
  }

  #components-layout-demo-custom-trigger .controlstatus {
    position: absolute;
    left: 0px;
    top: 0px;
    height: 50px;
    line-height: 50px;
  }

  #components-layout-demo-custom-trigger .controlbtn {
    position: absolute;
    top: 0px;
    height: 50px;
    line-height: 50px;
    right: 0px;
  }

  #components-layout-demo-custom-trigger .side_car_box {
    height: 20px;
    width: 30px;
    text-align: center;
    font-size: 14px;
    color: #ffffff;
    background: #080808;
    position: absolute;
  }

  #components-layout-demo-custom-trigger .side_horizontal_line {
    width: 40px;
    background: #dadcdd;
    position: absolute;
    height: 2px;
  }
</style>
