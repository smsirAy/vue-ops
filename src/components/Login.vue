<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 登陆logo -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>

      <!-- 表单登陆 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.username"></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="el-icon-s-goods" v-model="loginForm.password"></el-input>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登陆</el-button>
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
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置按钮
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    // 登陆按钮
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          return
        }
        const { data: resp } = await this.$http.get('/user_login/1', this.loginForm)
        if (resp.meta.status !== 200) {
          return this.$message.error('登陆失败！')
        } else {
          this.$message.success('登陆成功！')
          // 1.将登录成功的token保存到客户端的sessionStorage中
          //  1.1 项目中除了登录之外的API接口，必须在登录之后才能访问
          //  1.2 token 只应当在当前网站打开期间生效，所以将token保存在sessionStorage中
          console.log(resp.token)
          window.sessionStorage.setItem('token', resp.token)
          this.$router.push('/home')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  //设置登陆背景图片
  height: 100%;
  background-image: url('../assets/img/login.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.login_box {
  //设置登陆框样式
  width: 450px;
  height: 300px;
  background-color: white;
  box-shadow: 10px 10px 5px #888888;
  border: 1px solid #eeeeee;
  border-radius: 25px; //设置圆边
  position: absolute; //绝对定位
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 1px solid #eee;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -40%); //盒子位移
    background-color: white;
    box-shadow: 10px 10px 5px #dddd;
    img {
      width: 100%;
      height: 100%;
      background-color: #eee;
      border-radius: 50%;
    }
  }
  .login_form {
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .btns {
    //按钮居中对齐
    display: flex;
    justify-content: center;
  }
}
</style>
