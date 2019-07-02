<template>
  <div>
    <!-- <header></header> -->
    <form-content>
      <template v-slot:title>物业管理中心-登录</template>
      <el-form :model="loginRuleForm" :rules="loginRules" ref="loginRuleForm">
        <el-form-item label prop="userName">
          <el-input
            placeholder="手机号码"
            prefix-icon="el-myicon-user"
            v-model="loginRuleForm.userName"
          ></el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input
            placeholder="密码"
            prefix-icon="el-myicon-password"
            v-model="loginRuleForm.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-radio-group v-model="identity">
          <el-radio :label="1" border size="medium">租户</el-radio>
          <el-radio :label="2" border size="medium">住户</el-radio>
        </el-radio-group>
        <el-form-item>
          <el-button type="text" @click="toRegister">注册租户账号</el-button>
          <el-button style="float:right;" type="text" @click="toChangePass">忘记密码？</el-button>
        </el-form-item>
      </el-form>
      <template v-slot:content_btn_block>
        <el-button class="login_btn" type="success" @click="login(loginRuleForm)">登录</el-button>
        <el-button class="login_btn" type="primary" @click="toApply">申请成为住户</el-button>
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
  name: "login",
  data() {
    return {
      identity: "",
      loginRuleForm: {
        userName: "",
        password: ""
      },
      loginRules: {
        userName: [
          { required: true, message: "手机号不能为空" },
          { pattern: /^1[34578]\d{9}$/, message: "请输入正确的手机格式" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
          // { min: 6, message: "长度至少为6个字符", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    FormContent
  },
  methods: {
    toRegister() {
      router.push("/user/register");
    },
    toApply() {
      router.push("/user/apply");
    },
    toChangePass() {
      router.push("/user/forgotpwd");
    },
    // 登录逻辑
    login(formData) {
      this.$refs["loginRuleForm"].validate(valid => {
        if (valid) {
          if (this.identity == "") {
            this.$message.warning("请选择登录角色");
            return;
          }
          if (this.identity == 1) {
            // 管理员登录
            this.$http
              .post("/server/users/login", {
                data: formData
              })
              .then(res => {
                console.log(res);
                if (res.data.status == "1") {
                  let userInfo = res.data.result;
                  if (userInfo.u_role == 1) {
                    // 子管理员登录
                    if (userInfo.u_login == 1) {
                      // 有登录权限,存储用户登录数据
                      this.$storage.set("user", {
                        userId: userInfo.u_id,
                        roleId: userInfo.u_role,
                        systemId: userInfo.u_system_id,
                        systemStatus: userInfo.s_status
                      });
                      // 登录成功 跳转到主页
                      this.$message.success(res.data.msg);
                      router.push("/sys");
                    }else{
                      // 无登录权限
                      this.$message.warning('该账号没有登录权限');
                    }
                  } else {
                    // 超级管理员登录
                    // localStorage存储用户登录数据
                      this.$storage.set("user", {
                        userId: userInfo.u_id,
                        roleId: userInfo.u_role,
                        systemId: userInfo.u_system_id,
                        systemStatus: userInfo.s_status
                      });

                    // 用户是否已购买系统验证
                    if (userInfo.u_system_id == null) {
                      this.$message.error("当前用户未购买系统");
                      router.push("/user/systembuy");
                    } else {
                      // 登录成功 跳转到主页
                      this.$message.success(res.data.msg);
                      router.push("/sys");
                    }
                  }
                } else {
                  this.$message.error(res.data.msg);
                }
              });
          } else {
            // 住户登录
            this.$http
              .post("/server/household/login", {
                data: formData
              })
              .then(res => {
                // console.log(res);
                if (res.data.status == "1") {
                  this.$message({
                    type: "success",
                    message: res.data.msg
                  });
                  let userInfo = res.data.result;
                  // 住户是否通过审核
                  if (userInfo.hu_login == 0) {
                    this.$message.warning("该住户账号未通过审核");
                  } else {
                    // localStorage存储用户登录数据
                    this.$storage.set("user", {
                      roleId: 2,
                      userId: userInfo.hu_id,
                      communityId: userInfo.hu_community_id, // 住户所属小区
                      systemId: userInfo.c_system_id, // 住户所属系统
                      systemStatus: userInfo.s_status // 所属系统状态
                    });
                    // 登录成功 跳转到主页
                    router.push("/sys");
                  }
                } else {
                  this.$message.error(res.data.msg);
                }
              });
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login_btn {
  width: 100%;
}
.content_btn_block {
  .el-button {
    margin: 0 0 10px 0;
  }
}
</style>