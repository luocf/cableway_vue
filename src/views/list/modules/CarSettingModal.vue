<template>
  <a-modal :width="800" :visible="visible" title="轿厢设置" @ok="handleSubmit" @cancel="visible = false">
    <a-row :style="{margin: '0px'}">
      <a-col :span="14">
        <a-row>
          <a-col :span="12">
            <a-divider orientation="left">播音参数</a-divider>
            <a-row>
              <a-col>
                默认音量(0~30): <a-divider type="vertical" style="background: rgba(0,0,0,0)"/><a-input-number v-decorator="['volumeDefault']" :min="0" :max="30" :defaultValue="20"/>
              </a-col>
            </a-row>
            <a-row>
              <a-col>
                背景音乐:<a-input v-decorator="['BackgroundMusic']"/>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="1"/>
          <a-col :span="11">
            <a-divider orientation="left">灯光设置</a-divider>
            <a-row>
              <a-col>
                <a-radio-group @change="onLightChange" v-model="lightvalue">
                  <a-radio :style="radioStyle" :value="1">常规</a-radio>
                  <a-radio :style="radioStyle" :value="2">渐变</a-radio>
                  <a-radio :style="radioStyle" :value="3">流水</a-radio>
                </a-radio-group>
              </a-col>
            </a-row>
            <a-row>
              <a-col>
                变换速度（0～60):<a-input-number
                  v-decorator="['lightSpeed']"
                  :min="0"
                  :max="60"
                  :defaultValue="10"
                  :style="{width:'80px'}"/>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-divider orientation="left">播放列表(双击区段、方向、音频搁哪可更改内容)</a-divider>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-table
              :columns="playlistcolumns"
              :dataSource="playlistdata"
              :rowKey="record => record.id"
              size="small"
              :pagination="false"
              :selections="true"
              :scroll="{ y: 150 }">

              <template slot="section" slot-scope="text">
                {{ text }}

              </template>
              <template slot="position" slot-scope="text">
                {{ text + 'm' }}

              </template>
              <template slot="direction" slot-scope="text, record, index">
                <a-icon v-if="record.direction==1" type="caret-up" />
                <a-icon v-else type="caret-down" />
              </template>
              <template slot="audio" slot-scope="text">
                {{ text }}
              </template>
            </a-table>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="10" :style="{padding:'25px'}">
        <a-table
          :columns="columns"
          :dataSource="data"
          :rowKey="record => record.id"
          size="small"
          :pagination="false"
          :selections="true"
          :scroll="{ y: 320 }"/>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
import ARow from 'ant-design-vue/es/grid/Row'
import ACol from 'ant-design-vue/es/grid/Col'
import ATag from 'ant-design-vue/es/tag/Tag'
const columns = [
  {
    title: '序号',
    dataIndex: 'id'
  },
  {
    title: '音频名称',
    dataIndex: 'audio_name'
  }]
const data = [
  {
    id: '1',
    audio_name: 'New York No. 1 Lake Park'
  }, {
    id: '2',
    audio_name: 'London No. 1 Lake Park'
  }, {
    id: '3',

    audio_name: 'Sidney No. 1 Lake Park'
  },
  {
    id: '4',

    audio_name: 'New York No. 1 Lake Park'
  }, {
    id: '5',

    audio_name: 'London No. 1 Lake Park'
  }, {
    id: '6',

    audio_name: 'Sidney No. 1 Lake Park'
  },
  {
    id: '7',

    audio_name: 'New York No. 1 Lake Park'
  }, {
    id: '8',

    audio_name: 'London No. 1 Lake Park'
  }, {
    id: '9',

    audio_name: 'Sidney No. 1 Lake Park'
  }, {
    id: '10',

    audio_name: 'New York No. 1 Lake Park'
  }, {
    id: '15',

    audio_name: 'London No. 1 Lake Park'
  }, {
    id: '11',

    audio_name: 'Sidney No. 1 Lake Park'
  },
  {
    id: '12',

    audio_name: 'New York No. 1 Lake Park'
  }, {
    id: '13',

    audio_name: 'London No. 1 Lake Park'
  }, {
    id: '14',

    audio_name: 'Sidney No. 1 Lake Park'
  }]
const playlistcolumns = [
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
    title: '方向',
    dataIndex: 'direction',
    width: '60px',
    scopedSlots: { customRender: 'direction' }

  },
  {
    title: '音频序号',
    dataIndex: 'audio_name',
    scopedSlots: { customRender: 'audio' }
  }]
const playlistdata = [
  {
    id: '1',
    section: '1',
    position: '50',
    direction: '0',
    audio_name: 'New York No. 1 Lake Park'
  }, {
    id: '2',
    section: '1',
    position: '150',
    direction: '0',
    audio_name: 'London No. 1 Lake Park'
  }, {
    id: '3',
    section: '1',
    position: '250',
    direction: '0',
    audio_name: 'Sidney No. 1 Lake Park'
  },
  {
    id: '4',
    section: '1',
    position: '350',
    direction: '0',
    audio_name: 'New York No. 1 Lake Park'
  },
  {
    id: '5',
    section: '1',
    position: '50',
    direction: '1',
    audio_name: 'London No. 1 Lake Park'
  },
  {
    id: '6',
    section: '1',
    position: '150',
    direction: '1',
    audio_name: 'Sidney No. 1 Lake Park'
  }
]
export default {
  components: { ATag, ACol, ARow },
  name: 'CarSettingModal',
  data () {
    return {
      data,
      columns,
      playlistdata,
      playlistcolumns,
      lightvalue: 1,
      visible: false,
      checked: true,
      radioStyle: {
        display: 'inline',
        height: '30px',
        lineHeight: '30px'
      }
    }
  },
  methods: {
    show () {
      this.visible = true
    },
    onChange (e) {
      this.checked = e.target.checked
      this.disabled = this.checked
    },
    onLightChange (e) {
      //
    },

    handleSubmit () {
      this.visible = true

      /* validateFields((errors, values) => {
         if (!errors) {
         console.log('values', values)
         }
         }) */
    }
  }
}
</script>
<style>
  #components-table-demo-size h4 {
    margin-bottom: 16px;
  }

</style>e
