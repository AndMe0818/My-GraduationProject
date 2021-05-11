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
          <el-form-item prop="email">
            <el-input
              prefix-icon="el-icon-user"
              v-model="loginForm.email"
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
    var checkEmail = (rule, value, cb) => {
      let regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      if (regEmail.test(value)) {
        // 合法的用户名
        return cb()
      }
      cb(new Error('请输入符合规则的邮箱'))
    }
    var checkPwd = (rule, value, cb) => {
      let regPwd = /^\w+$/g
      if (regPwd.test(value)) {
        if (value.length < 6 || value.length > 12) {
          cb(new Error('请输入符合规则的密码长度，6-12位数字、字母或字符！'))
        }
        return cb()
      }
      cb(new Error('请输入符合规则的密码，6-12位数字、字母或字符！'))
    }
    return {
      // 登录表单
      loginForm: {
        email: '1102928566@qq.com',
        password: '123456',
      },
      loginFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            validator: checkPwd,
            trigger: 'blur',
          },
        ],
      },
    }
  },
  created() {},
  methods: {
    login() {
      this.$refs.loginFormRef.validate((vaild) => {
        if (!vaild) return
        this.$http({
          url: '/api/login/admin',
          method: 'post',
          data: this.loginForm,
        }).then((res) => {
          console.log(res)
          if (res.meta.status !== 200) {
            return this.$message.warning('登录失败请检查后登录')
          }
          // 1.登录成功后 服务器返回了一个token  保存在客户端的sessionstoryage中
          // 1.1 项目中除了登录意外的其他api接口 都必须在登录之后才能访问
          // 1.2 token 只又在当前网站打开期间才生效，所以才储存在 sessionstorage中
          // 2.通过路由拦截完成
          window.sessionStorage.setItem('user', res.data.user)
          // window.sessionStorage.setItem('Id', res.data.id)
          this.$router.push('/home')
        })
      })
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
  background-image: linear-gradient(
    to bottom right,
    rgb(196, 197, 200),
    rgb(77, 172, 231)
  );
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