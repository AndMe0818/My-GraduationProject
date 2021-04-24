<template>
  <div class="login">
    <div class="login-box">
      <div class="avatar-box">
        <img src="../../assets/img/ball11.png" alt="" />
        <p>热血体育场</p>
      </div>
      <div class="form">
        <el-form
          label-position="right"
          :model="loginForm"
          :rules="loginFormRules"
          ref="loginFormRef"
        >
          <el-form-item prop="username">
            <el-input
              prefix-icon="el-icon-user"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              show-password
              prefix-icon="iconfont icon-3702mima"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="btns">
          <el-button @click="login" type="primary">登录</el-button>
          <el-button @click="resetForm" type="info">重置</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      loginFormRules: {
        username: [
          { required: true, message: '请用户名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  created() {},
  methods: {
    login() {
      this.$router.push('/home')
    },
    resetForm() {
      this.$refs.loginFormRef.resetFields()
    },
  },
}
</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom right, rgb(196, 197, 200), rgb(77, 172, 231));
}
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 375px;
  height: 400px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 6px 7px 15px #333333;
}
.avatar-box {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -20%);
  font-size: 22px;
  font-weight: 700;
}
.avatar-box p {
  text-align: center;
}
.avatar-box img {
  box-shadow: 3px 3px 15px 0px #333333;
  width: 110px;
  height: 110px;
  background-color: tomato;
  border-radius: 50%;
}
.form {
  position: absolute;
  bottom: 50px;
  width: 100%;
  padding: 0 10px;
}
.btns {
  display: flex;
  justify-content: space-around;
}
</style>