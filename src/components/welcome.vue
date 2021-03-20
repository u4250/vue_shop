<template>
    <el-row :gutter="12">
  <el-col :span="8">
<el-card >
  <div slot="header" class="clearfix">
    <span>今日数据</span>
    <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card>
 </el-col>
  <el-col :span="8">
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>今日数据</span>
    <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card>
 </el-col>
  <el-col :span="8">
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>今日数据</span>
    <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card>
 </el-col>
      </el-row>
</template>

<script>
export default {
  created () {
    this.activePath = window.sessionStorage.getItem('activePath')
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
