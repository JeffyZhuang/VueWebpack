<template>
  <!--背景图-->
  <div class="note" :style="note">
    <!--login框，表单+tab标签页的组合-->
    <div class="loginFrame">
      <!--表单组件放在外面，标签栏在里面-->
      <el-form
        ref="AccountForm"
        :model="AccountForm"
        status-icon
        :rules="rules"
        class="demo-ruleForm login-container"
      >
        <div class="sub-title">登录</div>
        <div class="formGroup">
          <el-form-item label="账号" prop="userName">
            <el-input
              type="text"
              v-model="AccountForm.userName"
              auto-complete="off"
              placeholder="请输入您的账号"
              class="form-control"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" class="form-inline">
            <el-input
              type="password"
              v-model="AccountForm.password"
              auto-complete="off"
              placeholder="请输入密码"
              class="form-control"
            ></el-input>
          </el-form-item>
        </div>
        <div class="remFor">
          <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
          <a
            href="'https://blog.csdn.net/Vanadis_outlook/article/details/72823024.html'"
            class="forget"
          >忘记密码？</a>
        </div>

        <div class="formButton">
          <el-form-item style="width:100%;">
            <el-button
              type="primary"
              style="width:40%;"
              @click="resetForm('AccountForm')"
              icon="el-icon-circle-close-outline"
            >重置</el-button>
            <el-button
              type="primary"
              style="width:45%;"
              @click="submitLogin('AccountForm')"
              icon="el-icon-upload"
            >登录</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      logining: false,
      note: {
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
        backgroundImage: "url(" + require("../assets/backgroup.jpg") + ")",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat"
      },
      AccountForm: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          { validator: validateUserName, trigger: "blur" }
          //{ validator: validaePass }
        ],
        password: [
          { validator: validatePassword, trigger: "blur" }
          //{ validator: validaePass2 }
        ]
      },
      checked: false
    };
  },
  methods: {
    submitLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http({
            method: "post",
            url: "/api/zzh/login",
            data: {
              userName: this.AccountForm.userName,
              password: this.AccountForm.password
            }
          })
            .then(response => {
              if (response.data.code === 0) {
                //将token设置到session当中
                var session = window.sessionStorage;
                var token = JSON.stringify(response.data.data.Authorization);
                session.setItem("Authorization", token);
                this.$router.push("/helloWorld");
              } else {
                this.$message({
                  message: "登陆失败，请检查用户名账号密码",
                  type: "error"
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //清空表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

 
<style>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 15px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label {
  width: 70px;
  text-align: left;
}

.form-control {
  width: 270px;
  flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
}
.remember {
  width: 200px;
  padding-left: 25px;
  text-align: left;
}
.forget {
  width: 500px;
  text-align: right;
  font-size: 14px;
  font-family: PingFang SC;
}
.remFor {
  margin-bottom: 10px;
  padding-bottom: 10px;
}
.tabsUser {
  display: inline-block;
  margin-left: 0px;
  margin-right: 0px;
  text-align: center;
  font-size: 25px;
}
.sub-title {
  color: #909399;
  font-family: PingFang SC;
  text-align: center;
  font-size: 24px;
  padding-bottom: 17px;
}
.formButton {
  padding-left: 25px;
}
.el-form-item__error {
  margin-left: 77px;
}
</style>