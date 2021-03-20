<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >增加订单</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <el-table stripe :data="userList" border>
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column label="状态">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini">
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
            <el-tooltip
              class="item"
              effect="dark"
              content="分配权限"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="username" label="地址"> </el-table-column> -->
      </el-table>
    </el-card>
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="addDialogClosed"
    >
      <!-- 内容主体 -->
      <el-form :model="addUserForm" ref="addUserFormRef" label-width="100px">
        <el-form-item label="下单人" prop="username">
          <el-input v-model="Form.username"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="radio">
          <el-radio v-model="Form.radio" label="调试">调试</el-radio>
          <el-radio v-model="Form.radio" label="配置环境">配置环境</el-radio>
          <el-radio v-model="Form.radio" label="写程序">写程序</el-radio>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="Form.price"></el-input>
        </el-form-item>
        <el-form-item label="付钱" prop="has">
          <el-radio v-model="Form.has" label=1>是</el-radio>
          <el-radio v-model="Form.has" label=0>否</el-radio>
        </el-form-item>
        <el-form-item label="截至日期" prop="value1">
             <el-date-picker
      v-model="Form.value1"
      type="date"
      placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd">
    </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0,
      addDialogVisible: false,
      Form: {
        username: '',
        radio: '调试',
        has: 0,
        value1: '',
        price: 10,
        timestamp: new Date(),
        status: 0
      }

    }
  },
  created () {
    // this.getUserList()
  },
  methods: {
    addDialogClosed () {
      this.$refs.addUserFormRef.resetFields()
    },
    async getUserList () {
      const { data: res } = await this.$http.post('add', {
        params: this.queryInfo
      })
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('用户列表获取失败')
      }
      this.userList = res.data.users
      this.total = res.data.total
    },
    async addUser () {
      const { data: res } = await this.$http.post('add', this.Form)
      if (res.meta.status !== 201) {
        this.$message.error('添加用户失败！')
      }
      this.$message.success('添加用户成功！')
      // 隐藏添加用户对话框
      this.addDialogVisible = false
      // this.getUserList()
    }
  }
}
</script>
<style lang="less" scoped>
</style>
