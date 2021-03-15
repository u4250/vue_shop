<template>
  <el-container>
    <el-header>
      <div>
        <img src="../assets/admin.png" alt="" style="height:60px;width:60px;border-radius:550%">
        <span>金林</span>
      </div>
      <el-button @click="logout">退出</el-button>
      </el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>
<script>
export default {
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items:center ;
    >div{
      display: flex;
      align-items: center;
      span{
        margin-left: 15px;
      }
    }
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .el-container {
    height: 100%;
  }

  // .el-container:nth-child(5) .el-aside,
  // .el-container:nth-child(6) .el-aside {
  //   line-height: 260px;
  // }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
