<template>
  <div>
    <module-title>
      <template slot="bread">
        <el-breadcrumb-item>账户中心</el-breadcrumb-item>
        <el-breadcrumb-item>账户资料</el-breadcrumb-item>
      </template>
      账户资料
    </module-title>
    <module-content>
      <template slot="btnBlock">
        <div class="title">
          <span>账户信息</span>
        </div>
      </template>
      <div class="item">
        <div class="label">头像:</div>
        <div class="info">
          <img src="\..\..\static\user.jpg" alt>
        </div>
        <div class="btnBlock">
          <el-button type="text">编辑</el-button>
        </div>
      </div>
      <div class="item">
        <div class="label">姓名:</div>
        <div class="info">{{name}}</div>
        <div class="btnBlock">
          <el-button type="text">编辑</el-button>
        </div>
      </div>
      <div class="item">
        <div class="label">身份:</div>
        <div class="info" v-if="this.$storage.get('user').roleId ==  0">超级管理员</div>
        <div class="info" v-else-if="this.$storage.get('user').roleId ==  1">子管理员</div>
        <div class="info" v-else>住户</div>
      </div>
    </module-content>
    <module-content>
      <template slot="btnBlock">
        <div class="title">
          <span>账户安全</span>
        </div>
      </template>
      <div class="item">
        <div class="label">手机号:</div>
        <div class="info">{{phone}}</div>
      </div>
      <div class="item">
        <div class="label">邮箱:</div>
        <div class="info">{{email}}</div>
      </div>
      <div class="item">
        <div class="label">QQ号:</div>
        <div class="info">{{qqNumber}}</div>
      </div>
      <div class="item">
        <div class="label">微信:</div>
        <div class="info">{{wechat}}</div>
      </div>
      <div class="item">
        <div class="label">登录密码:</div>
        <div class="info">********</div>
        <div class="btnBlock">
          <el-button type="text">修改密码</el-button>
        </div>
      </div>
    </module-content>
  </div>
</template>
<script>
import ModuleTitle from "components/base/ModuleTitle";
import ModuleContent from "components/base/ModuleContent";
import router from "@/router";
export default {
  name: "userInfo",
  mounted() {
    if (this.$storage.get("user").roleId == 2) {
      this.$http
        .get("/server/household/getById", {
          params: {
            hId: this.$storage.get("user").userId
          }
        })
        .then(res => {
          let userInfo = res.data.result[0];
          this.phone = userInfo.h_phone;
          this.name = userInfo.h_name;
          this.qqNumber = userInfo.h_qq || "暂无";
          this.email = userInfo.h_email || "暂无";
          this.wechat = userInfo.h_wechat || "暂无";
        });
    } else {
      this.$http
        .get("/server/users/getById", {
          params: {
            uId: this.$storage.get("user").userId
          }
        })
        .then(res => {
          console.log(res);
          let userInfo = res.data.result;
          console.log(userInfo);
          this.phone = userInfo.u_phone;
          this.name = userInfo.u_name;
          this.qqNumber = userInfo.u_qq || "暂无";
          this.email = userInfo.u_email || "暂无";
          this.wechat = userInfo.u_wechat || "暂无";
        });
    }
  },
  data() {
    return {
      phone: "",
      name: "",
      qqNumber: "",
      email: "",
      wechat: ""
    };
  },
  components: {
    ModuleTitle,
    ModuleContent
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 24px;
  font-weight: 300;
}
.item {
  padding: 12px 0;
  align-self: flex-start;
  display: flex;
  flex-direction: row;
  align-items: center;
  .label {
    width: 80px;
    text-align: right;
  }
  .info {
    padding-left: 20px;
    width: 200px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .btnBlock {
  }
}
</style>