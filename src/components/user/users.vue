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
      <el-table stripe :data="userList" border style="font-size: 15px" v-loading="loading"
        >>
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="name" label="下单人" align="center" width="100px">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="下单时间"
          :formatter="dateFormat"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="price" label="价格" align="center" width="80px">
        </el-table-column>
        <el-table-column prop="type" label="类型" align="center" width="80px">
        </el-table-column>
        <!-- <el-table-column prop="has" label="是否付钱" :formatter="sFormat" align="center"> </el-table-column> -->
        <el-table-column
          prop="end_time"
          label="截至日期"
          :formatter="dateFormat"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="备注"
          prop="status"
          :formatter="sFormat"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.has==0"
              type='warning'
              effect="dark"
              closable
              @close="handleClose('has',1)"
            >
              {{ scope.row.status ? "已完成" : "未完成" }}
            </el-tag>
            <el-tag v-if="scope.row.has==0"
              type='warning'
              effect="dark"
              closable
              @close="handleClose('status',1)"
            >
              {{ scope.row.status ? "已付款" : "未付款" }}
            </el-tag>
              <!-- <el-tag
              :type="scope.row.status==3? 'info' : 'danger'"
              effect="dark"
              @click="handleClose('status',3)"
            >
              {{ scope.row.status ? "订单已取消" : "取消订单" }}
            </el-tag> -->
            <el-button  type="danger" size="small" :disabled="scope.row.status==3" @click="handleClose('status',3)"> {{scope.row.status?'订单已取消':'取消订单'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
         <!-- 分页区域 -->
      <el-pagination
      background
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-size="queryInfo.pageSize"
        hide-on-single-page
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
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
          <el-radio v-model="Form.has" label="1">是</el-radio>
          <el-radio v-model="Form.has" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="截至日期" prop="value1">
          <el-date-picker
            v-model="Form.value1"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
export default {
  data () {
    return {
      queryInfo: {
        query: '',
        pageNum: 1,
        pageSize: 10
      },
      userList: [],
      total: 0,
      loading: false,
      addDialogVisible: false,
      Form: {
        username: '',
        radio: '调试',
        has: '0',
        value1: '',
        price: 10,
        timestamp: new Date(),
        status: 0
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    dateFormat (row, column, cellValue, index) {
      console.log(cellValue)
      const date = new Date(cellValue)
      return (
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1) +
        '-' +
        date.getDate() +
        ' ' +
        date.getHours() +
        ':' +
        date.getMinutes() +
        ':' +
        date.getSeconds()
      )
    },
    sFormat (cellValue) {
      return cellValue ? '否' : '是'
    },
    addDialogClosed () {
      this.$refs.addUserFormRef.resetFields()
    },
    async getUserList () {
      this.loading = true
      const { data: res } = await this.$http.get('data', {
        params: this.queryInfo
      })
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('用户列表获取失败')
      }
      this.userList = res.data.orders.data
      this.total = res.data.total
      this.loading = false
    },
    handleClose (type, s) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleCurrentChange (newSize) {
      this.queryInfo.pageNum = newSize
      this.getUserList()
    },
    async addUser () {
      const { data: res } = await this.$http.post('add', this.Form)
      if (res.meta.status !== 200) {
        this.$message.error('添加用户失败！')
      }
      this.$message.success('添加用户成功！')
      // 隐藏添加用户对话框
      this.addDialogVisible = false
      this.getUserList()
    }
  }
}
</script>
<style lang="less" scoped>
.el-tag
{
  margin-left: 10px;
}
.el-button{
  margin-left: 10px;
}
</style>
