<template>
  <div>
    <form-content>
      <template v-slot:title>物业管理中心-重置密码</template>
      <el-form :model="resetPwdRuleForm" :rules="resetPwdRule" ref="resetPwdRuleForm">
        <el-form-item label prop="password">
          <el-input
            prefix-icon="el-myicon-password"
            type="password"
            placeholder="新密码长度不能少于6位"
            v-model="resetPwdRuleForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item label prop="checkPass">
          <el-input
            prefix-icon="el-myicon-password"
            type="password"
            placeholder="确认密码"
            v-model="resetPwdRuleForm.checkPass"
          ></el-input>
        </el-form-item>
      </el-form>
      <template v-slot:content_btn_block>
        <el-button class="btn" type="success" @click="resetPwdSubmitForm(resetPwdRuleForm)">完 成</el-button>
      </template>
    </form-content>
  </div>
</template>
<script>
import FormContent from "components/login&resgister/FormContent";
import router from "@/router";
export default {
  name: "FindPwd",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.resetPwdRuleForm.checkPass !== "") {
          this.$refs.resetPwdRuleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.resetPwdRuleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      resetPwdRuleForm: {
        password: "",
        checkPass: ""
      },
      resetPwdRule: {
        password: [
          { validator: validatePass, trigger: "blur" },
          { min: 6, message: "长度至少为6个字符", trigger: "blur" }
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  components: {
    FormContent
  },
  methods: {
    resetPwdSubmitForm(formData) {
      this.$refs["resetPwdRuleForm"].validate(valid => {
        if (valid) {
          if (this.$route.params.role == 1) {
            // 租户修改密码
            this.$http
              .post("/server/users/changePwd", {
                phone: this.$route.params.userName,
                password: formData.password
              })
              .then(res => {
                if (res.data.status == "0") {
                  this.$message({
                    type: "success",
                    message: res.data.msg
                  });
                  router.push("/user");
                } else {
                  this.$message.console.error(res.data.msg);
                }
              });
          } else {
            // 住户修改密码
            console.log(222);
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.btn {
  width: 100%;
}
</style>