<template>
  <mu-container>
    <mu-row>
      <mu-col span="12">
        <div class="grid-cell">
          <img src="../assets/icon/login_logo.png" alt>
          <p>网易云音乐</p>
        </div>
      </mu-col>
    </mu-row>
    <mu-flex class="flex-wrapper" justify-content="center">
      <mu-flex class="flex-demo" justify-content="center" fill>
        <mu-form ref="form" :model="validateForm" class="mu-demo-form">
          <mu-form-item prop="phone" :rules="phoneRules" class="phone">
            <mu-text-field
              v-model="validateForm.phone"
              prop="phone"
              placeholder="请输入手机号"
              class="input"
            ></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="password" :rules="passwordRules" class="password">
            <mu-text-field
              type="password"
              v-model="validateForm.password"
              prop="password"
              placeholder="请输入密码"
              class="input"
            ></mu-text-field>
          </mu-form-item>
          <mu-form-item>
            <mu-button color="#d43c33" @click="submit" type="submit" full-width>登录</mu-button>
          </mu-form-item>
        </mu-form>
      </mu-flex>
    </mu-flex>
  </mu-container>
</template>
<script>
import { localapi, proapi } from '../config/env'
import { getLogin } from '../service/getData'

export default {
  name: 'login',
  data() {
    return {
      phoneRules: [
        { validate: (val) => !!val, message: '必须填写手机号' },
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码' },
      ],
      validateForm: {
        phone: '',
        password: '',
        isAgree: false
      },
    }
  },
  methods: {
    submit() {
      getLogin(this.validateForm.phone, this.validateForm.password).then(res => {
        this.$router.push({ path: '/home' })
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.container {
  .grid-cell {
    text-align: center;
    margin-top: 60px;
    img {
      width: 60px;
      height: 60px;
    }
    p {
      font-size: 18px;
      color: #d43c33;
      font-weight: bold;
    }
  }
  .mu-form {
    margin: 0 32px;
    .phone {
      margin-top: 46px;
      .input {
        height: 62px;
        ::placeholder {
          font-size: 14px;
          color: #cccccc;
        }
      }
    }
    .password {
      margin-top: 16px;
      .input {
        height: 62px;
        ::placeholder {
          font-size: 14px;
          color: #cccccc;
        }
      }
    }

    .mu-form-item-content {
      button {
        height: 50px;
        border-radius: 100px;
        box-shadow: none;
        font-size: 16px;
      }
    }
    .mu-form-item .mu-button {
      margin: 0;
      margin-top: 30px;
    }
  }
}
</style>
