<template>
  <div class="radarCharts" ref="main"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },

  created() {},

  mounted() {
    this.initRadar()
  },

  methods: {
    initRadar() {
      var myChart = echarts.init(this.$refs.main)
      // 绘制图表
      myChart.setOption({
        title: {
          text: '人员绩效表'
        },
        // legend: {
        //   data: ['张三', '李四']
        // },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '考勤', max: 100 },
            { name: '助人', max: 100 },
            { name: 'bug', max: 100 },
            { name: '分享', max: 100 },
            { name: '管理', max: 100 },
            { name: '技术', max: 100 }
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [100, 100, 100, 100, 100, 100],
                name: '张三'
              },
              {
                value: [50, 50, 50, 50, 50, 50],
                name: '李四'
              }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.radarCharts {
  padding: 30px;
  width: 500px;
  height: 500px;
}
</style>
