<template>
  <div>
    <!-- <header></header> -->
    <form-content>
      <template v-slot:title>物业管理中心-账号注册</template>
      <el-form :model="registerRuleForm" :rules="RegisterRules" ref="registerRuleForm">
        <el-form-item label prop="userName">
          <el-input
            prefix-icon="el-myicon-user"
            placeholder="请填写手机号码"
            v-model="registerRuleForm.userName"
            ref="userName"
            autofocus
          ></el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input
            prefix-icon="el-myicon-password"
            type="password"
            placeholder="密码长度不能少于6位"
            v-model="registerRuleForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item label prop="checkPass">
          <el-input
            prefix-icon="el-myicon-password"
            type="password"
            placeholder="确认密码"
            v-model="registerRuleForm.checkPass"
          ></el-input>
        </el-form-item>
        <el-form-item label prop="checkNumber">
          <el-input placeholder="请输入验证码" type="text" v-model="registerRuleForm.checkNumber">
            <el-button
              ref="check"
              slot="append"
              @click="getChechNumber(registerRuleForm.userName)"
              :disabled="sendSmsFlag"
            >获取验证码</el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <template v-slot:content_btn_block>
        <el-button
          class="register_btn"
          type="success"
          @click="registerSubmitForm(registerRuleForm)"
        >免费注册</el-button>
      </template>
      <template slot="other">
        <div>
          已有账号？去
          <el-button type="text" @click="toLogin">登录</el-button>
        </div>
      </template>
    </form-content>
    <!-- <footer></footer> -->
  </div>
</template>
<script>
// import Header from "components/base/Header";
import FormContent from "components/login&resgister/FormContent";
// import Footer from "components/base/Footer";
import router from "@/router";
export default {
  name: "Register",
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerRuleForm.checkPass !== "") {
          this.$refs.registerRuleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerRuleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateUserName = (rule, value, callback) => {
      this.$http
        .get("/server/users/check", {
          params: {
            phone: value
          }
        })
        .then(res => {
          if (res.data.status == "1") {
            callback(new Error(res.data.msg));
          }else{
            callback()
          }
        });
    };
    return {
      registerRuleForm: {
        userName: "",
        password: "",
        checkPass: "",
        checkNumber: "",
        userRole: 0
      },
      RegisterRules: {
        userName: [
          { required: true, message: "手机号不能为空" },
          { pattern: /^1[34578]\d{9}$/, message: "请输入正确的手机格式" },
          { validator: validateUserName, trigger: "blur" }
        ],
        password: [
          { validator: validatePass, trigger: "blur" },
          { min: 6, message: "长度至少为6个字符", trigger: "blur" }
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        checkNumber: [{ required: true, message: "验证码不能为空" }]
      },

      // 发送短信使能
      sendSmsFlag: false,
      // 短信验证码定时器
      timer: null,
      // 倒计时秒数
      second: 60,

      // 用户输入的手机和收到的验证码
      acceptTelephone: 0,
      VerificationCode: 0
    };
  },
  components: {
    FormContent
  },
  methods: {
    toLogin() {
      router.push("/user/login");
    },
    // 提交注册表单
    registerSubmitForm(formData) {
      // console.log(formData);
      // this.$http
      //   .post("/server/users/registerSubmit", {
      //     data: formData
      //   })
      //   .then(res => {
      //     console.log(res);
      //     if (res.data.status == "1") {
      //       this.$message({
      //         type: "success",
      //         message: res.data.msg
      //       });
      //       this.toLogin();
      //     } else {
      //       this.$message.error(res.data.msg);
      //     }
      //   });
      this.$refs["registerRuleForm"].validate(valid => {
        if (valid) {
          // 加入验证码验证
          if (
            formData.checkNumber == this.VerificationCode &&
            formData.userName == this.acceptTelephone
          ) {
            this.$http
              .post("/server/users/registerSubmit", {
                data: formData
              })
              .then(res => {
                console.log(res);
                if (res.data.status == "1") {
                  this.$message({
                    type: "success",
                    message: res.data.msg
                  });
                 this.toLogin();
                } else {
                  this.$message.error(res.data.msg);
                }
              });
          }else{
            this.$message.error('手机号码或验证码错误');
          }
        }
      });
    },
    // 检查发送验证码请求的条件
    checkTel(formName) {
      let flag = this.$refs[formName].validateState;
      if (flag !== "error") {
        return true;
      }
      return false;
    },
    // 设置定时器倒计时
    setTimer() {
      clearInterval(this.timer);
      this.sendSmsFlag = true;
      let checkElement = event.target;
      this.timer = setInterval(_ => {
        checkElement.innerText = "再次发送(" + this.second + "秒)";
        if (this.second < 1) {
          clearInterval(this.timer);
          this.timer = null;
          this.sendSmsFlag = false;
          checkElement.innerText = "获得验证码";
          this.second = 5;
        } else {
          this.second--;
          checkElement.innerText = "再次发送(" + this.second + "秒)";
        }
      }, 1000);
    },
    getChechNumber(phone) {
      if (this.checkTel("userName")) {
        this.setTimer();
        this.$http
          .post("/server/api/sendSms", {
            phone: phone
          })
          .then(res => {
            console.log(res);
            if (res.data.status == "1") {
              this.$message({
                type: "success",
                message: res.data.msg + "，请注意查看手机获取验证码"
              });
              // 保存发送验证请求的手机号码
              this.acceptTelephone = res.data.recPhone;
              // 保存验证码
              this.VerificationCode = res.data.checkCode;
              console.log(this.acceptTelephone,this.VerificationCode);

            }else{
              this.$message.error(res.data.msg);
            }
          });
      } else {
        this.$message.error("请输入正确手机号码");
        return;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.register_btn {
  width: 100%;
}
</style>