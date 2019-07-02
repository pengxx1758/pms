<template>
  <div class="wrapper">
    <div class="headerBlock">
      <div class="title">系统订购</div>
      <div class="btnVlock">
        <el-button type="success" @click="Logout">退出登录</el-button>
      </div>
    </div>
    <div class="contentBlock">
      <div class="content">
        <div class="formBlock">
          <el-form label-position="right" ref="systemForm" :model="systemForm" label-width="100px">
            <div class="item">
              <div class="label">手机号:</div>
              <div class="info">13333333333</div>
            </div>
            <div class="item">
              <div class="label">购买数量:</div>
              <div class="info">
                <el-input-number v-model="systemForm.buyNum" :min="0"></el-input-number>
              </div>
            </div>
            <div class="item">
              <div class="label">购买时长(月):</div>
              <div class="info">
                <el-radio-group v-model="systemForm.buyTime" @change="handleChange">
                  <el-radio-button label="0"></el-radio-button>
                  <el-radio-button label="1"></el-radio-button>
                  <el-radio-button label="2"></el-radio-button>
                  <el-radio-button label="3"></el-radio-button>
                  <el-radio-button label="6"></el-radio-button>
                  <el-radio-button label="12"></el-radio-button>
                  <el-radio-button label="24"></el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div class="item">
              <div class="label">到期时间(购买前):</div>
              <div class="info">{{this.systemForm.endTime}}</div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="content">
        <div class="formBlock">
          <div class="item">
            <div class="label special">订单详情:</div>
          </div>
          <div class="item">
            <div class="label">新增小区</div>
            <div class="info">
              <span class="font">{{this.systemForm.buyNum}}</span> 个
            </div>
          </div>
          <div class="item">
            <div class="label">已有小区:</div>
            <div class="info">
              <span class="font">{{cNum}}</span>个（含新增小区）
            </div>
          </div>
          <div class="item">
            <div class="label">到期时间:</div>
            <div class="info">{{endDate}}</div>
          </div>
          <div class="item">
            <div class="label">实付款:</div>
            <div class="info">
              <span class="paymoney">￥ {{total}}</span>
            </div>
          </div>
          <el-button type="success" @click="systemFormSubmit">立即购买</el-button>
          <el-button v-if="this.$storage.get('user').systemId !== null" @click="goBack">返 回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ModuleContent from "components/base/ModuleContent";
import router from "@/router";
export default {
  name: "SystemBuy",
  mounted() {
    setTimeout(() => {
      this.getInfo();
    }, 20);
  },
  data() {
    return {
      new_sId: -1,
      endDate: "",
      buyMonthNum: 0, // 购买月
      price: 100, // 单价  100￥/月/小区
      systemForm: {
        phone: "",
        buyNum: 1,
        buyTime: 0,
        endTime: "",
        communityNum: 1
      }
    };
  },
  computed: {
    cNum() {
      return this.systemForm.buyNum + this.systemForm.communityNum;
    },
    total() {
      if (this.systemForm.buyNum == 0) {
        // 单单延长月数
        return this.cNum * this.price * this.systemForm.buyTime;
      } else if (this.buyTime == 0) {
        // 单单增加小区数
        return this.price * this.systemForm.buyNum * this.monthDiff; // 单价*新增的小区数*相差的月数
      } else {
        // 即新增小区 也延长月数
        return (
          // 新增小区相差月数的金额 + 本来拥有小区的延长月数金额
          this.price * this.systemForm.buyNum * this.monthDiff +
          (this.cNum - this.systemForm.buyNum) *
            this.price *
            this.systemForm.buyTime
        );
      }
    },
    monthDiff() {
      let currentDate = new Date().toLocaleDateString();
      let endtime = new Date(this.endDate).toLocaleDateString();
      let days = this.getDays(currentDate, endtime);
      return Math.round(days / 30);
    }
  },
  components: {
    ModuleContent
  },
  methods: {
    Logout() {
      // 登出

      // 1.发请求修改用户状态

      // 2.清cookie,用router拦截掉未登录用户
      this.$storage.remove("user");
      router.push("/user");
    },
    getInfo() {
      this.$http
        .get("/server/users/getSystemInfo", {
          params: {
            uId: this.$storage.get("user").userId
          }
        })
        .then(res => {
          let data = res.data.result;
          let endDate = new Date();
          if (data.s_endtime !== null) {
            endDate = new Date(data.s_endtime);
          }
          // endDate.setMonth(endDate.getMonth() + 1);
          this.endDate = endDate.toLocaleDateString();
          this.systemForm = {
            phone: data.u_phone,
            buyNum: 0,
            buyTime: 0,
            endTime: data.s_endtime
              ? new Date(data.s_endtime).toLocaleDateString()
              : new Date().toLocaleDateString(),
            communityNum: data.sc_number || 1
          };
        });
    },
    handleChange(val) {
      this.buyNum = parseInt(val);
      let date = new Date(this.systemForm.endTime);
      date.setMonth(date.getMonth() + parseInt(val));
      this.endDate = date.toLocaleDateString();
    },
    systemFormSubmit() {
      if (this.$storage.get("user").systemId == null) {
        // 添加
        this.$http
          .post("/server/system/add", {
            endtime: this.endDate,
            communityNum: this.cNum
          })
          .then(res => {
            if (res.data.status == "1") {
              // this.new_sId = res.data.result.insertId;
              // 支付(待写)完成 将支付的系统Id添加到user表中
              this.$http
                .post("/server/system/updateUser", {
                  sId: res.data.result.insertId,
                  uId: this.$storage.get("user").userId
                })
                .then(res => {
                  if (res.data.status == "1") {
                    this.$message({
                      type: "success",
                      message: res.data.msg
                    });
                    this.$storage.remove("user");
                    router.push("/user");
                  } else {
                    this.$message.error(res.data.msg);
                    this.$storage.remove("user");
                    router.push("/user");
                  }
                });
            }
          });
      } else {
        // 已购买系统
        if (this.total == 0) {
          let msg = "请选择购买参数";
          this.$message.info(msg);
          return;
        }
        this.$confirm("正在支付....", "支付", {
          confirmButtonText: "确定",
          type: "success"
        })
          .then(() => {
            let status = this.endDate > new Date().toLocaleDateString() ? 1 : 0;
            // 修改 过期修改
            console.log(status);
            this.$http
              .post("/server/system/updateSysInfo", {
                endDate: this.endDate,
                state: status,
                communityNum: this.cNum,
                sId: this.$storage.get('user').systemId
              })
              .then(res => {
                console.log(res);
                if (res.data.status == "1") {
                  this.$message.success(res.data.msg);
                  this.$storage.remove("user");
                  router.push("/user");
                } else {
                  this.$message.error(res.data.msg);
                }
              });
          })
          .catch(() => {});
      }
    },
    getDays(strDateStart, strDateEnd) {
      let strSeparator = "/"; //日期分隔符
      let oDate1;
      let oDate2;
      let iDays;
      oDate1 = strDateStart.split(strSeparator);
      oDate2 = strDateEnd.split(strSeparator);
      let strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
      let strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
      iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
      return iDays;
    },
    goBack() {
      router.push("/sys");
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 16px 0 0 0;
  background-color: #e8e8e8;
  display: flex;
  flex-direction: column;
  .headerBlock {
    background-color: #fff;
    padding: 0 12px;
    height: 64px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e8e8e8;
    .title {
      font-size: 18px;
    }
  }
  .contentBlock {
    .content {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      border: 1px solid #e8e8e8;
      padding: 20px 12px;
      background-color: #fff;
      .formBlock {
        padding-left: 180px;
        .item {
          padding: 12px 0;
          align-self: flex-start;
          display: flex;
          flex-direction: row;
          align-items: center;
          .label {
            text-align: right;
          }
          .special {
            color: #666;
            font-size: 0.8rem;
          }
          .info {
            padding-left: 20px;
            .font {
              color: #ff7300;
            }
            .paymoney {
              color: #ff7300;
              font-size: 22px;
            }
          }
        }
      }
    }
  }
}
</style>