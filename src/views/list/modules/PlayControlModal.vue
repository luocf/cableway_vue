<template>
  <a-modal
    :width="800"
    :visible="visible"
    title="播放控制"
    cancelText="关闭"
    @ok="closeDialog"
    @cancel="closeDialog">
    <a-row>
      <a-col :span="12">
        <a-layout-content :style="{width:'380px'}">
          <a-row :style="{padding:'5px'}">
            <a-col :span="16">
              选择全部轿厢:
              <a-checkbox v-decorator="['all']" :checked="checked" @change="onChange"/>
            </a-col>
            <a-col :span="8">
              循环播放:
              <a-checkbox v-decorator="['recyle']"/>
            </a-col>
          </a-row>
          <a-row :style="{padding:'5px'}">
            <a-col>
              指定轿厢编号:
              <a-input-number
                v-decorator="['spe']"
                :min="1"
                :max="100"
                :disabled="disabled"
                :defaultValue="1"
                :style="{width:'60px'}"/>
            </a-col>
          </a-row>
          <a-row :style="{padding:'5px'}">
            <a-divider orientation="left">播放控制</a-divider>
          </a-row>
          <a-row type="flex" justify="center">
            <a-col :span="6">
              <a-button type="primary" ghost style="{align-items: center}" v-decorator="['vodplay']" @click="vodplay">点播</a-button>
            </a-col>
            <a-col :span="8">
              <a-button type="primary" ghost v-decorator="['locationplay']" @click="locationplay">定位播放</a-button>
            </a-col>
            <a-col :span="6">
              <a-button type="primary" ghost v-decorator="['broadcastplay']" @click="broadcastplay">广播</a-button>
            </a-col>

          </a-row>
          <a-row>
            <a-col>
              <a-divider orientation="left">音量控制</a-divider>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="20">
              <a-slider
                v-decorator="['volume']"
                v-model="volume"
                :defaultValue="10"
                :min="0"
                :max="30"
                @afterChange="onVolumeAfterChange"/>
            </a-col>
            <a-col :span="4">
              <a-tag color="#87d068" style="margin: 10px">{{ volume }}</a-tag>
            </a-col>
          </a-row>
          <a-row>
            <a-col>
              <a-divider orientation="left">照明控制</a-divider>
            </a-col>
          </a-row>
          <a-row type="flex" justify="center">
            <a-col :span="12">
              <a-radio-group defaultValue="closed" buttonStyle="solid" @afterChange="onLightAfterChange">
                <a-radio-button value="opened">开灯</a-radio-button>
                <a-radio-button value="closed">关灯</a-radio-button>
              </a-radio-group>
            </a-col>
          </a-row>
        </a-layout-content>

      </a-col>
      <a-col :span="12">
        <a-layout-content :style="{width:'380px',minHeight: '200px'}">
          <a-table
            :columns="columns"
            :dataSource="data"
            :rowKey="record => record.id"
            size="small"
            :pagination="false"
            :selections="true"
            :scroll="{ y: 300 }"/>
        </a-layout-content>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
import ARow from 'ant-design-vue/es/grid/Row'
import ACol from 'ant-design-vue/es/grid/Col'
import ATag from 'ant-design-vue/es/tag/Tag'
const columns = [{
  title: '序号',
  dataIndex: 'id'
},
{
  title: '音频名称',
  dataIndex: 'audio_name'
}]
const data = [{
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

export default {
  components: { ATag, ACol, ARow },
  name: 'PlayControlModal',
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      data,
      columns,
      visible: false,
      checked: true,
      disabled: true,
      volume: 10,
      controlMode: 0, // 0:点播 1:定位播放 2：广播 3：音量控制 4：灯控制
      form: this.$form.createForm(this)
    }
  },
  methods: {
    closeDialog () {
      this.visible = false
    },
    show () {
      this.visible = true
    },
    onChange (e) {
      this.checked = e.target.checked
      this.disabled = this.checked
    },

    vodplay (e) {

    },
    locationplay (e) {

    },
    broadcastplay (e) {

    },
    onVolumeAfterChange (e) {
      //
    },
    onLightAfterChange (e) {
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
  #components-table-demo-size h4 { margin-bottom: 16px; }
</style>e
