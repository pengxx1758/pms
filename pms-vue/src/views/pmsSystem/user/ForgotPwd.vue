<template>
  <div>
    <!-- <header></header> -->
    <form-content>
      <template v-slot:title>物业管理中心-找回密码</template>
      <el-form :model="findPwdRuleForm" :rules="findPwdRules" ref="findPwdRuleForm">
        <el-form-item>
          <el-radio-group v-model="role">
            <el-radio :label="1" border>租户</el-radio>
            <el-radio :label="2" border>住户</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label prop="userName">
          <el-input
            prefix-icon="el-myicon-user"
            placeholder="请输入注册时填写的手机号码"
            v-model="findPwdRuleForm.userName"
            ref="userName"
          ></el-input>
        </el-form-item>
        <el-form-item label prop="checkNumber">
          <el-input placeholder="请输入验证码" type="text" v-model="findPwdRuleForm.checkNumber">
            <el-button
              ref="check"
              slot="append"
              @click="getChechNumber(findPwdRuleForm.userName)"
              :disabled="sendSmsFlag"
            >获取验证码</el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <template v-slot:content_btn_block>
        <el-button class="btn" type="success" @click="toResetPwd(findPwdRuleForm)">下一步</el-button>
      </template>

      <template slot="other">
        <div>
          返回
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
  name: "ForgotPwd",
  data() {
    var validatehPhone = (rule, value, callback) => {
      console.log(11);
      if(this.role == ""){
        this.$message.warning('请先选择角色');
        callback('请先选择角色');
      }
      if(this.role==1){
        this.$http
        .get("/server/users/check", {
          params: {
            phone: value
          }
        })
        .then(res => {
          if (res.data.status == "1") {
            callback();
          }else{
            callback(new Error('该账户未注册'))
          }
        });
        // 租户修改
      }else{
        // 住户修改
        this.$http
        .get("/server/household/check", {
          params: {
            phone: value
          }
        })
        .then(res => {
          if (res.data.status == "1") {
            callback();
          } else {
            callback(new Error('该账户未注册'))
          }
        });
      }
      
    };
    return {
      role: "",
      findPwdRuleForm: {
        username: "",
        checkNumber: ""
      },
      findPwdRules: {
        userName: [
          { required: true, message: "手机号不能为空" },
          { pattern: /^1[34578]\d{9}$/, message: "请输入正确的手机格式" },
          { validator: validatehPhone, trigger: "blur" }
        ],
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
    toResetPwd(formData) {
      this.$refs["findPwdRuleForm"].validate(valid => {
        if (valid) {
          if (this.role == "") {
            this.$message.warning("请选择角色");
            return;
          }
          // 加入验证码验证
          if (
            formData.checkNumber == this.VerificationCode &&
            formData.userName == this.acceptTelephone
          ) {
            this.$message({
              type: "success",
              message: "验证成功，请重置密码"
            });
            // 将通过验证的手机号码传递给子路由（通过name传递）
            router.push({
              name: "findpwd",
              params: {
                role: this.role,
                phone: formData.uerName
              }
            });
          } else {
            this.$message.error("请输入正确的手机号码或验证码");
          }
        }
      });
    },

    // 检查发送验证码请求的条件
    checkTel(formName) {
      let flag = this.$refs[formName].validateState;
      if (flag == "success") {
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
                message: res.data.msg
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
.btn {
  width: 100%;
}
</style>