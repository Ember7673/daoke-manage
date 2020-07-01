<template>
  <div class="login">
    <div class="loginContent">
      <h5>医疗会议后台管理系统</h5>
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        class="demo-ruleForm"
        hide-required-asterisk
      >
        <el-form-item prop="account">
          <el-input v-model="loginForm.account" placeholder="请输入手机号">
            <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :type="passw"
            v-model="loginForm.password"
            placeholder="请输入登录密码"
          >
            <i slot="suffix" :class="icon" @click="showPass"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button round @click="onLogin">登录</el-button>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/login";
import { uuid, setCookie } from "@/utils/index";
export default {
  data() {
    return {
      passw: "password",
      //用于更换Input中的图标
      icon: "el-input__icon el-icon-view",
      loginForm: {
        account: "",
        password: ""
      },
      loginRules: {
        account: [
          {
           required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入登录密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    showPass() {
      //点击图标是密码隐藏或显示
      if (this.passw == "text") {
        this.passw = "password";
        //更换图标
        this.icon = "el-input__icon el-icon-view";
      } else {
        this.passw = "text";
        this.icon = "el-input__icon el-icon-key";
      }
    },
    onLogin() {
      this.$refs["loginForm"].validate(async valid => {
        if (valid) {
          const reqid = uuid();
          await login({
            ...this.loginForm,
            reqid
          }).then(res => {
            console.log(res)
            if (res.data.status === 0) {
              this.$message.success("登录成功！");
              setCookie("loginType", 1);
              this.$router.push("/");
            } else {
              this.$message.error("用户不存在！");
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 700px;
  position: relative;
  background-image: url(../../assets/images/login.jpg);
  padding-top: 200px;
  .loginContent {
    background: #fff;
    width: 500px;
    height: 400px;
    margin: 0 auto;
    border: 1px solid #333;
    padding: 20px;
  }
  h5 {
    text-align: center;
    font-size: 30px;
  }
  .demo-ruleForm {
    padding: 0 30px;
  }
  .el-button {
    position: absolute;
    margin-top: 30px;
    left: 50%;
    transform: translateX(-50%);
    // margin: 0 auto;
    width: 250px;
    border-color: #409eff;
    color: #409eff;
  }
}
</style>
