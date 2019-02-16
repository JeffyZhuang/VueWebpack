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
        <div class="sub-title">注册</div>
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
          <el-form-item label="确认密码" prop="checkPass" class="form-inline">
            <el-input
              type="password"
              v-model="AccountForm.checkPass"
              autocomplete="off"
              placeholder="请再次输入密码"
              class="form-control"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" class="form-inline">
            <el-input
              type="text"
              v-model="AccountForm.email"
              autocomplete="off"
              placeholder="请输入邮箱"
              class="form-control"
            ></el-input>
          </el-form-item>
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
              @click="submitRegister('AccountForm')"
              icon="el-icon-upload"
            >注册</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    var validateUserName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var checkPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else if (value != this.AccountForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入邮箱"));
      } else {
        callback();
      }
    };
    return {
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
        password: "",
        checkPass: "",
        email: ""
      },
      rules: {
        userName: [
          { required: true, validator: validateUserName, trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePassword, trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: checkPassword, trigger: "blur" }
        ],
        email: [
          { required: true, validator: validateEmail, trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      },
      checked: false
    };
  },
  methods: {
    //提交注册
    submitRegister(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http({
            method: "post",
            url: "/api/zzh/register",
            data: {
              userName: this.AccountForm.userName,
              password: this.AccountForm.password,
              email:this.AccountForm.email
            }
          })
            .then(response => {
              debugger;
              if (response.data.code === 0) {
                
                this.$router.push("/");
              } else {
                this.$message({
                  message: response.data.data,
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
  color: #676a6e;
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
.el-form-item__label {
  padding-right: 3px;
}
</style>