<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >

      <div class="form-container">
        <div class="title-container">
          <img src="@/assets/common/logo.png" alt="">
        </div>
        <el-form-item prop="loginName">
          <span class="el-icon-mobile-phone" />
          <el-input v-model="loginForm.loginName" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item prop="password">
          <span class="el-icon-lock" />
          <el-input
            ref="pwd"
            v-model="loginForm.password"
            placeholder="请输入密码"
            :type="passwordType"
          />
          <span class="svg-container" @click="showPassword">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye':'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item prop="code">
          <span class="icon-svg-container">
            <svg>
              <use xlink:href="#icon-yanzheng" />
            </svg>

          </span>
          <el-input v-model="loginForm.code" placeholder="请输入验证码" maxlength="4" />
          <span class="auth-container" @click="getVerificationCode">
            <img :src="codeUrl" alt="">
          </span>
        </el-form-item>
        <el-button type="primary" style="" class="login-btn" :loading="loading" @click="login">登录</el-button>

      </div>
    </el-form>
  </div>
</template>

<script>
import { getVerificationCodeAPI } from '@/api/login'

export default {
  name: 'Login',
  data() {
    return {
      codeUrl: '',
      loading: false,
      loginForm: {
        loginName: 'admin',
        password: 'admin',
        code: '',
        clientToken: '',
        loginType: 0
      },
      rules: {
        loginName: [
          { required: true,
            trigger: 'blur',
            message: '请输入用户名'
          }

        ],
        password: [
          { required: true,
            trigger: 'blur',
            message: '请输入密码'
          }

        ],
        code: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入验证码'
          },
          {
            min: 4,
            pattern: /[a-z0-9]{4}/,
            trigger: 'blur',
            message: '验证码格式不对'
          }
        ]

      },
      passwordType: 'password'
    }
  },
  created() {
    this.getVerificationCode()
  },
  methods: {
    showPassword() {
      this.passwordType = this.passwordType === 'password' ? '' : 'password'
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },
    async getVerificationCode() {
      const num = Math.random()
      this.loginForm.clientToken = num
      const { request: { responseURL }} = await getVerificationCodeAPI(num)

      this.codeUrl = responseURL
    },
    async  login() {
      try {
        await this.$refs.loginForm.validate()
        this.loading = true
        await this.$store.dispatch('user/LoginAction', this.loginForm)
        console.log(this.$store.state.user.token)
        if (this.$store.state.user.token) {
          this.$router.push('/')
        } else {
          this.$message.error('验证码错误')
        }
      } finally {
        this.loading = false
      }
    }

  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#fff;
$light_gray:#fff;
$cursor: #999;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;

  }
}

/* reset element-ui css */
.login-container {
  background: url('~@/assets/common/background.png') ;
  background-size: cover;
  .form-container {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 50%;
    margin: -194px 0 0 -259px;
    padding: 76px 35px 0;
    // width: 520px;
    height: 387px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    .login-btn {
    width:100%;
    height: 50px;
    margin-bottom:30px;
    opacity: 0.91;
    background: linear-gradient(262deg,#2e50e1,#6878f0);
        text-shadow: 0 7px 22px #cfcfcf;
        border-radius: 8px;
    }
    }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
color:#999;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    width: 420px;
    height: 50px;
    padding: 0 0px 5px 15px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    color: #454545;
    span {
      font-size: 16px;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {

    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    margin: 0;
  }

  .auth-container {
    position: absolute;
    right: 0px;
    display: inline-block;
    width: 129px;
    height: 50px;
    border-radius: 5px;
    img {
     width: 129px;
    }
  }
.icon-svg-container {
 svg {
   width: 16px;
  height: 16px;
 }
}
  .title-container {
    position: absolute;
    top: -12%;
    left: 40%;
    width: 96px;
    img {
      width: 100%;}

  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
