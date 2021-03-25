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
export default {
  data () {
    return {
      alldata: []
    }
  },
  created () {
    this.today = this.getList()
    this.activePath = window.sessionStorage.getItem('activePath')
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
//   .clearfix:before,
//   .clearfix:after {
//     display: table;
//     content: "";
//   }
//   .clearfix:after {
//     clear: both
//   }

  .clearfix {
      background:#eef1f6;
      color:#606266;
      width:100%;
     line-height: 45px;
     text-align:center
  }
</style>
