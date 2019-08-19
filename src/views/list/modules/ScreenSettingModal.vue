<template>
  <a-modal :width="800" :visible="visible" title="界面设置" @ok="handleSubmit" @cancel="visible = false">
    <a-row :style="{margin: '0px'}">
      <a-col span="12">
        <a-row>
          <a-col>
            <a-divider orientation="left">温度上下限</a-divider>
            <a-row style="margin-bottom: 5px">
              <a-col>
                上限(10~40°C):  <a-input-number v-decorator="['temp_upper_limit']" :min="10" :max="40" :defaultValue="30"/>
              </a-col>
            </a-row>
            <a-row style="margin-bottom: 5px">
              <a-col>
                下限(-35~0°C):  <a-input-number v-decorator="['temp_lower_limit']" :min="-35" :max="0" :defaultValue="0"/>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-divider orientation="left">轿厢实时位置动画方向</a-divider>
            <a-row>
              <a-col :span="24">
                <a-radio-group defaultValue="closed" buttonStyle="solid" @afterChange="onDirectionAfterChange">
                  <a-radio-button value="opened">顺时针</a-radio-button>
                  <a-radio-button value="closed">逆时针</a-radio-button>
                </a-radio-group>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-col>
      <a-col span="2">
      </a-col>
      <a-col span="10">
        <a-divider orientation="left">电池参数</a-divider>
        <a-row style="margin-bottom: 5px">
          <a-col>
            电池满格电压(V):  <a-input-number v-decorator="['full_grid_voltage']" :min="0" :max="12" :defaultValue="12"/>
          </a-col>
        </a-row>
        <a-row style="margin-bottom: 5px">
          <a-col>
            电池耗尽电压(V):  <a-input-number v-decorator="['depletion_voltage']" :min="0" :max="12" :defaultValue="8.2"/>
          </a-col>
        </a-row>
        <a-row style="margin-bottom: 5px">
          <a-col>
            电池低压预警(%):  <a-input-number v-decorator="['early_warning']" :min="0" :max="100" :defaultValue="30"/>
          </a-col>
        </a-row>
        <a-row style="margin-bottom: 5px">
          <a-col>
            电池低压报警(%):  <a-input-number v-decorator="['low_voltage_alarm']" :min="0" :max="100" :defaultValue="20"/>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
import ARow from 'ant-design-vue/es/grid/Row'
import ACol from 'ant-design-vue/es/grid/Col'
import ATag from 'ant-design-vue/es/tag/Tag'

export default {
  components: { ATag, ACol, ARow },
  name: 'CarSettingModal',
  data () {
    return {
      visible: false
    }
  },
  methods: {
    onDirectionAfterChange (e) {

    },
    show () {
      this.visible = true
    },

    handleSubmit () {
      this.visible = true
    }
  }
}
</script>
<style>
  #components-table-demo-size h4 {
    margin-bottom: 16px;
  }

</style>e
