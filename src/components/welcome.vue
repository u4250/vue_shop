<template>
<div>
<el-badge :value="alldata['today'][0]" class="item2">
  <el-button>今日订单</el-button>
</el-badge>
<el-badge :value="alldata['today'][1]" class="item2">
  <el-button>今日收入</el-button>
</el-badge>
<el-badge :value="alldata['mon'][0]" class="item2" type="primary">
  <el-button>本月订单</el-button>
</el-badge>
<el-badge :value="alldata['mon'][1]" class="item2" type="primary">
  <el-button>本月收入</el-button>
</el-badge>
<el-badge :value="alldata['all'][0]" class="item2" type="warning">
  <el-button>订单总数</el-button>
</el-badge>
<el-badge :value="alldata['all'][1]" class="item2" type="warning">
  <el-button>全部收入</el-button>
</el-badge>
<div id="myChart"></div>
</div>
    <!-- <el-row :gutter="12">
  <el-col :span="8">
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>相关数据</span>
  </div>
  <div class="text item">今日订单:{{alldata['today'][0]}}</div>
  <div class="text item">今日收入:{{alldata['today'][1]}}</div>
    <div class="text item">本月订单:{{alldata['mon'][0]}}</div>
  <div class="text item">本月收入:{{alldata['mon'][1]}}</div>
    <div class="text item">总订单数:{{alldata['all'][0]}}</div>
  <div class="text item">总收入:{{alldata['all'][1]}}</div>
</el-card>
 </el-col> -->
  <!-- <el-col :span="8">
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>本月数据</span>
  </div>
  <div class="text item">订单:{{alldata['mon'][0]}}</div>
  <div class="text item">收入:{{alldata['mon'][1]}}</div>
</el-card>
 </el-col> -->
      <!-- </el-row> -->

</template>

<script>
const echarts = require('echarts/lib/echarts')
// 引入折线图等组件
require('echarts/lib/chart/line')
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/grid')
require('echarts/lib/component/legend')

export default {
  data () {
    return {
      alldata: [],
      // 注意：数据现在是写死的，可以请求接口之后重新赋值，生成动态折线图
      xArray_temper: [
        '2019-02-25',
        '2019-03-04',
        '2019-03-18',
        '2019-03-26',
        '2019-04-16',
        '2019-04-26',
        '2019-05-04'
      ],
      yArray_temper: [1, -2, 2, 5, 3, 2, 0]
    }
  },
  created () {
    this.today = this.getList()
    this.activePath = window.sessionStorage.getItem('activePath')
    var _this = this
    setTimeout(function () {
      // 这里没有动态数据，所以用计时器进行了模拟
      // 实际情况应该在获取数据之后调用，且必须保证图表元素已经挂载到页面中去了
      _this.drawLine()
    }, 500)
  },
  methods: {
    async getList () {
      const { data: res } = await this.$http.get('indata', {
      })
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('用户列表获取失败')
      }
      this.alldata = res.data
      console.log(this.alldata)
    },
    drawLine () {
      var _this = this
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('myChart'))

      // 屏幕尺寸变化时，重新调整图表元素大小
      const sizeFun = function () {
        myChart.resize()
      }
      window.addEventListener('resize', sizeFun)

      // 绘制图表
      myChart.setOption({
        grid: {
          bottom: '10%',
          right: '8%',
          left: '15%',
          top: '20%'
        },
        // 图例
        tooltip: {
          show: true,
          trigger: 'axis',
          backgroundColor: '#821afe',
          formatter: '{b}<br/>{a} : {c}℃'
        },
        // x轴相关设置
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: _this.xArray_temper,
          splitLine: {
            // 隐藏网格线
            show: false
          },
          //  改变x轴颜色
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          //  改变x轴字体颜色和大小
          axisLabel: {
            interval: 2, // x轴间隔多少显示刻度
            // formatter: '{value} m³ ', //  给y轴添加单位
            showMinLabel: true,
            showMaxLabel: true,
            textStyle: {
              color: '#fff',
              fontSize: 12,
              // 为了字体生效必须设置的
              rich: {}
            }
            // margin: 0,
          },
          scale: true,
          splitNumber: 2,
          show: false
        },
        // y轴相关设置
        yAxis: {
          type: 'value',
          min: 'dataMin', // 最小值
          max: 'dataMax', // 最大值
          axisLabel: {
            formatter: '{value}'
          },
          splitLine: {
            // 隐藏、显示网格线
            show: true,
            lineStyle: {
              color: ['rgba(255,255,255,0.1)'],
              width: 1,
              type: 'dashed'
            }
          },
          //  改变x轴颜色
          axisLine: {
            lineStyle: {
              color: 'transparent'
            }
          },
          splitNumber: 3
        },
        series: [
          {
            name: '温度',
            type: 'line',
            // 取消折点圆圈
            symbol: 'none',
            // 取平滑曲线
            smooth: true,
            animation: false,
            // 折线数据
            data: _this.yArray_temper,
            // 折线颜色
            lineStyle: {
              normal: {
                color: '#fff',
                width: 2
              }
            },
            areaStyle: {},
            itemStyle: {
              normal: {
                // 面积颜色渐变
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: 'rgba(255,255,255,0.6)' },
                  { offset: 1, color: 'rgba(255,255,255,0)' }
                ])
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style scoped lang="less">
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #2876cf;
  }
  .bg-purple-light {
    background: red;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 100px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
    border-bottom:1px dashed #000;
    text-align: justify;

  }
.item2 {
  margin-top: 10px;
  margin-right: 40px;
}
#myChart {
  width: 100%;
  height: 300px;
  background-color: skyblue;
}

  .clearfix {
      background:#eef1f6;
      color:#606266;
      width:100%;
     line-height: 45px;
     text-align:center
  }
</style>
