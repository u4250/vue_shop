<template>
<el-row :gutter="20">
  <el-col :span="16">
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
  </el-col>
  <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
</el-row>
</template>
<script>
export default {
  // data () {
  //   return {

  //   }
  // },
  // created () {
  //   // this.getUsers()
  // },
  // methods () {
  //   // getUsers(){
  //   //     this.$http.get
  //   // }
  // }

}
</script>
<style lang="less" scoped>

</style>
