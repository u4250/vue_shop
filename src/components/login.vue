<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" />
      </div>
      <!-- 登录区域 -->
      <el-form
        ref="loginFormRef"
        class="login_form"
        label-width="80px"
        :model="loginForm"
        :rules="loginFormRules"
      >
        <el-form-item label="登录名" prop="username">
          <el-input
            placeholder="请输入账号"
            prefix-icon="el-icon-user"
            v-model="loginForm.username"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
          >
          </el-input>
        </el-form-item>

        <el-form-item class="btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 10,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields() // 重置函数
    },
    login () { // 表单预验证
      this.$refs.loginFormRef.validate((valid) => {
        console.log(valid)
        if (!valid) return
        this.$http.post('login', this.loginForm).then((res) => {
          console.log(res)
          if (res.data.meta.status !== 200) { return this.$message.error('登陆失败') }
          this.$message.success('登录成功')
          window.sessionStorage.setItem('token', res.data.data.token)
          this.$router.push('/home')
        })
      })
    }

  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btn {
  display: flex;
  justify-content: flex-end;
}
</style>
