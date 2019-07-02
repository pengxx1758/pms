<template>
  <div>
    <div class="menuBlock">
      <el-menu
        router
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        :default-active="defaultActive"
        v-if="this.$storage.get('user').roleId !== 2"
      >
        <el-menu-item class="logo" index="/sys">
          <img src="\..\..\static\logo.png">
          <span slot="title">物业管理中心</span>
        </el-menu-item>
        <el-menu-item index="/sys/main">
          <i class="el-myicon-main"></i>
          <span slot="title">信息汇总</span>
        </el-menu-item>
        <el-submenu index="/sys/data">
          <template slot="title">
            <i class="el-myicon-data"></i>
            <span>数据中心</span>
          </template>
          <el-menu-item index="/sys/data/community" :disabled="!permssionForm.community">
            <span slot="title">小区管理</span>
          </el-menu-item>
          <el-menu-item index="/sys/data/building" :disabled="!permssionForm.building">
            <span slot="title">楼盘管理</span>
          </el-menu-item>
          <el-menu-item index="/sys/data/household" :disabled="!permssionForm.household">
            <span slot="title">住户管理</span>
          </el-menu-item>
          <el-menu-item index="/sys/data/park" :disabled="!permssionForm.park">
            <span slot="title">车位管理</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="/sys/fee">
          <template slot="title">
            <i class="el-myicon-shoufei"></i>
            <span>财务管理</span>
          </template>
          <el-menu-item index="/sys/fee/fee-subject" :disabled="!permssionForm.feeSub">
            <span slot="title">收费科目</span>
          </el-menu-item>
          <el-menu-item index="/sys/fee/fee-pay" :disabled="!permssionForm.feePay">
            <span slot="title">收费单管理</span>
          </el-menu-item>
          <el-menu-item index="/sys/fee/fee-tip" :disabled="!permssionForm.feeTip">
            <span slot="title">欠费提醒</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="/sys/organ">
          <template slot="title">
            <i class="el-myicon-yuangong"></i>
            <span>内部管理</span>
          </template>
          <el-menu-item index="/sys/organ/staff" :disabled="!permssionForm.staff">
            <span slot="title">员工管理</span>
          </el-menu-item>
          <el-menu-item index="/sys/organ/position" :disabled="!permssionForm.position">
            <span slot="title">职位管理</span>
          </el-menu-item>
          <!-- <el-menu-item index="/sys/organ/">
            <span slot="title">权限管理</span>
          </el-menu-item>-->
        </el-submenu>
        <el-submenu index="/sys/customer">
          <template slot="title">
            <i class="el-myicon-user"></i>
            <span>客服管理</span>
          </template>
          <el-menu-item index="/sys/customer/maintain" :disabled="!permssionForm.maintain">
            <span slot="title">维修申请管理</span>
          </el-menu-item>
          <el-menu-item index="/sys/customer/complaint" :disabled="!permssionForm.complaint">
            <span slot="title">投诉管理</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
      <el-menu
        router
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        :default-active="defaultActive"
        v-else
      >
        <el-menu-item class="logo" index="/sys">
          <img src="\..\..\static\logo.png">
          <span slot="title">物业管理中心</span>
        </el-menu-item>
        <el-menu-item index="/sys/main">
          <i class="el-myicon-main"></i>
          <span slot="title">信息汇总</span>
        </el-menu-item>
        <el-menu-item index="/sys/fee/fee-pay">
          <i class="el-myicon-shoufei"></i>
          <span slot="title">付费管理</span>
        </el-menu-item>
        <el-submenu index="/sys/customer">
          <template slot="title">
            <i class="el-myicon-user"></i>
            <span>客服管理</span>
          </template>
          <el-menu-item index="/sys/customer/maintain">
            <span slot="title">维修申请管理</span>
          </el-menu-item>
          <el-menu-item index="/sys/customer/complaint">
            <span slot="title">投诉管理</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

    <div class="headerContainer" :class="{'menu-open':!isCollapse,'menu-close':isCollapse}">
      <div class="sys-header">
        <div class="h-left">
          <el-button
            icon="el-icon-d-arrow-left"
            @click="isCollapse = !isCollapse"
            v-if="!isCollapse"
          ></el-button>
          <el-button
            icon="el-icon-d-arrow-right"
            @click="isCollapse = !isCollapse"
            v-if="isCollapse"
          ></el-button>
        </div>
        <div class="h-right">
          <span class="question">
            <i class="el-icon-question"></i>
          </span>
          <span class="bell">
            <i class="el-icon-bell"></i>
          </span>
          <span class="user">
            <el-dropdown>
              <span class="el-dropdown-link">
                <img src="\..\..\static\user.jpg" alt>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-myicon-user" @click.native="toUserInfo">账户资料</el-dropdown-item>
                <el-dropdown-item icon="el-myicon-loginout" @click.native="Logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </div>
    </div>
    <div class="content" :class="{'menu-open':!isCollapse,'menu-close':isCollapse}">
      <router-view></router-view>
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import Footer from "components/base/Footer";
import router from "@/router";
export default {
  name: "SysMain",
  mounted() {
    setTimeout(() => {
      this.defaultActive = location.pathname;
      // 租户是否购买了系统以及系统是否过期验证
      let user = this.$storage.get("user", null);
      if (user) {
        // 管理员身份
        if (user.roleId == 0 || user.roleId == 1) {
          // 系统过期
          if (user.systemStatus !== 1) {
            this.$message.error("当前系统已过期");
            router.push("/user/systembuy");
          }
        }
      } else {
        this.$message.error("用户未登录");
        router.push("/user");
      }

      this.getMenu();

    }, 20);
  },
  data() {
    return {
      isCollapse: true,
      defaultActive: "",
      // 管理员权限表单
      permssionForm: {
        community: true,
        building: true,
        household: true,
        park: true,
        feePay: true,
        feeSub: true,
        feeTip: true,
        staff: true,
        position: true,
        maintain: true,
        complaint: true
      }
    };
  },
  components: {
    Footer
  },
  methods: {
    toUserInfo() {
      router.push("/sys/user-info");
    },
    Logout() {
      // 登出

      // 1.发请求修改用户状态

      // 2.清cookie,用router拦截掉未登录用户
      this.$storage.remove("user");
      router.push("/user");
    },
    getMenu() {
      let roleId = this.$storage.get("user").roleId;
      if (roleId == 1) {
        // 子管理员通过权限
        this.$http
          .get("/server/position/getPermssionByuId", {
            params: {
              uId: this.$storage.get("user").userId
            }
          })
          .then(res => {
            let perInfo = res.data.result;
            this.permssionForm = {
              community: perInfo.pos_community,
              building: perInfo.pos_building,
              household: perInfo.pos_household,
              park: perInfo.pos_park,
              feePay: perInfo.pos_feepay,
              feeSub: perInfo.pos_feesub,
              feeTip: perInfo.pos_feetip,
              staff: perInfo.pos_staff,
              position: perInfo.pos_position,
              maintain: perInfo.pos_maintain,
              complaint: perInfo.pos_complaint
            };
            this.permissionFormat();
          });
      }
    },
    permissionFormat() {
      for (let i in this.permssionForm) {
        if (this.permssionForm[i] === 1) {
          this.permssionForm[i] = true;
        } else if (this.permssionForm[i] === 0) {
          this.permssionForm[i] = false;
        } else {
          if (this.permssionForm[i] == true) {
            this.permssionForm[i] = 1;
          } else if (this.permssionForm[i] == false) {
            this.permssionForm[i] = 0;
          }
        }
      }
    },
    
  }
};
</script>
<style lang="scss" scoped>
$menuOpenWidth: 200px;
$menuCloseWidth: 64px;

$headerHight: 56px;
$headerHoverColor: #e6f7ff;

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: $menuOpenWidth;
  min-height: 100%;
}
.menuBlock {
  overflow: auto;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background-color: #fff;
  box-shadow: 1px 0 6px rgba(0, 21, 41, 0.25);
  .logo {
    color: #47c479;
    font-size: 16px;
    font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
    font-weight: 700;
  }
  &::not(.logo) {
    background-color: #999;
  }
}
.headerContainer {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 11;
  box-sizing: border-box;
  transition: all 0.2s ease 0s;
  .sys-header {
    background-color: #fff;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1px 4px rgba(122, 122, 122, 0.18);
    height: $headerHight;
    line-height: $headerHight;
    padding-right: 20px;
    .h-left {
      margin-left: 20px;
    }
    .h-right {
      display: flex;
      height: 100%;
      justify-content: flex-end;
      align-items: center;
      span {
        display: inline-block;
        height: 100%;
      }
      .bell,
      .question,
      .user {
        display: flex;
        align-items: center;
        font-size: 22px;
        cursor: pointer;
        padding: 0 12px;
        &:hover {
          background-color: $headerHoverColor;
        }
      }
      .el-dropdown {
        display: flex;
      }
      .el-dropdown-link {
        cursor: pointer;
        height: $headerHight;
        display: flex;
        align-items: center;
        &:hover {
          background-color: $headerHoverColor;
        }
        img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
        }
      }
    }
  }
}

.content {
  margin-top: $headerHight;
  height: 100%;
  margin-left: 5px;
  background-color: #f0f2f5;
  transition: all 0.2s ease 0s;
}

.menu-open {
  padding-left: $menuOpenWidth;
}
.menu-close {
  padding-left: $menuCloseWidth;
}
.el-menu-item.is-active {
  color: #fff;
  background-color: #47c479;
}
.el-menu-item,
.el-submenu__title {
  i {
    padding-right: 10px;
    font-size: 24px;
  }
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  color: #606266;
}
</style>