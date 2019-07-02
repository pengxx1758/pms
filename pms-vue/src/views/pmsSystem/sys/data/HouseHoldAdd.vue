<template>
  <div>
    <module-title>
      <template slot="bread">
        <el-breadcrumb-item>数据中心</el-breadcrumb-item>
        <el-breadcrumb-item>住户管理</el-breadcrumb-item>
      </template>
      添加住户
    </module-title>
    <module-content>
      <template slot="btnBlock">
        <div class="title">
          <span>基本信息</span>
        </div>
      </template>
      <div class="Block">
        <el-form
          label-position="top"
          ref="addHouseHoldForm1"
          :model="addHouseHoldForm"
          :rules="addHouseHoldRules"
          label-width="100px"
        >
          <el-row>
            <el-col :span="8">
              <div>
                <el-form-item label="所属楼盘:" prop="buildingId" required>
                  <el-cascader
                    :disabled="formable"
                    :options="buildOpts"
                    @change="buildOptsChange"
                    v-model="defaultOpt"
                    placeholder="请选择住户所属的楼盘"
                  ></el-cascader>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="门牌号:" prop="hDoorplate" required>
                  <el-input
                    :disabled="formable"
                    placeholder="请输入门牌号"
                    v-model="addHouseHoldForm.hDoorplate"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="姓名:" prop="hName" required>
                  <el-input
                    :disabled="formable"
                    placeholder="请输入住户姓名"
                    v-model="addHouseHoldForm.hName"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="性别:" required>
                  <el-radio :disabled="formable" v-model="addHouseHoldForm.hGender" label="男">男</el-radio>
                  <el-radio :disabled="formable" v-model="addHouseHoldForm.hGender" label="女">女</el-radio>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="手机号码:" prop="hPhone" required>
                  <el-input
                    :disabled="formable"
                    placeholder="请输入住户手机号码"
                    v-model="addHouseHoldForm.hPhone"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="住户身份" prop="hIdentity" required>
                  <el-select
                    :disabled="formable"
                    v-model="addHouseHoldForm.hIdentity"
                    placeholder="请选择住户身份"
                  >
                    <el-option
                      v-for="item in identityOpts"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="身份证号:" prop="hIdCard">
                  <el-input
                    :disabled="formable"
                    placeholder="请输入住户身份证号"
                    v-model="addHouseHoldForm.hIdCard"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="出生日期:" prop="hBirth">
                  <el-date-picker
                    :disabled="formable"
                    v-model="addHouseHoldForm.hBirth"
                    value-format="yyyy-MM-dd"
                    type="date"
                    @change="getDate"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="业主卡号:" prop="hCard">
                  <el-input
                    :disabled="formable"
                    placeholder="请输入常用银行卡号"
                    v-model="addHouseHoldForm.hCard"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="单位名称:" prop="hWorking">
                  <el-input
                    :disabled="formable"
                    placeholder="请输入单位名称"
                    v-model="addHouseHoldForm.hWorking"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="入住时间:" prop="hRoomTime">
                  <el-date-picker
                    :disabled="formable"
                    v-model="addHouseHoldForm.hRoomTime"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="入住原因:" prop="hRoomReason">
                  <el-input
                    :disabled="formable"
                    placeholder="请输入入住原因"
                    v-model="addHouseHoldForm.hRoomReason"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </module-content>
    <module-content>
      <template slot="btnBlock">
        <div class="title">
          <span>联系信息</span>
        </div>
      </template>
      <div class="Block">
        <el-form
          label-position="top"
          ref="addHouseHoldForm2"
          :model="addHouseHoldForm"
          :rules="addHouseHoldRules"
          label-width="100px"
        >
          <el-row>
            <el-col :span="8">
              <div>
                <el-form-item label="QQ 号:" prop="hQQ">
                  <el-input
                    :disabled="formable"
                    placeholder="请输入住户QQ号码"
                    v-model="addHouseHoldForm.hQQ"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="微信号:" prop="hWechat">
                  <el-input
                    :disabled="formable"
                    placeholder="请输入住户微信号"
                    v-model="addHouseHoldForm.hWechat"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="邮箱:" prop="hEmail">
                  <el-input
                    :disabled="formable"
                    placeholder="请输入住户邮箱"
                    v-model="addHouseHoldForm.hEmail"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="家庭电话:" prop="hHousePhone">
                  <el-input
                    :disabled="formable"
                    placeholder="格式：区号-直播号码-分机号"
                    v-model="addHouseHoldForm.hHousePhone"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="紧急联系人:" prop="hEmergencyPerson">
                  <el-input
                    :disabled="formable"
                    placeholder="请输入紧急联系人姓名"
                    v-model="addHouseHoldForm.hEmergencyPerson"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div>
                <el-form-item label="紧急联系人电话:" prop="hEmergencyPhone">
                  <el-input
                    :disabled="formable"
                    placeholder="请输入紧急联系人电话"
                    v-model="addHouseHoldForm.hEmergencyPhone"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </module-content>
    <div class="formBtnBlock">
      
      <template v-if="this.addHouseHoldForm.hState == '0'">
        <el-button size="medium" type="success" @click="checkHouser">审核通过</el-button>
        <el-button size="medium" type="danger" @click="delHouser">不通过</el-button>
      </template>
      <el-button
        size="medium"
        type="success"
        v-else
        @click="AddhouseHoldSubmit"
      >保存</el-button>
      <el-button size="medium" @click="goBack">返回</el-button>
    </div>
  </div>
</template>
<script>
import ModuleTitle from "components/base/ModuleTitle";
import ModuleContent from "components/base/ModuleContent";
import router from "@/router";
export default {
  name: "HouseHoldAdd",
  mounted() {
    setTimeout(() => {
      // 获取系统小区楼盘列表
      this.getOpt();
      // 编辑模式
      let hId = this.$route.params.hId;
      if (hId) {
        this.$http
          .get("/server/household/getById", {
            params: {
              hId: hId
            }
          })
          .then(res => {
            let data = res.data.result[0];
            if (res.data.status == "1") {
              // 处理楼盘选项value
              this.buildOpts.forEach(ele => {
                ele.children.forEach(cEle => {
                  if (cEle.value == data.h_building_id) {
                    this.defaultOpt.push(ele.value);
                    this.defaultOpt.push(cEle.value);
                  }
                });
              });
              this.addHouseHoldForm = {
                hId: hId,
                hState: data.h_state,
                buildingId: data.h_building_id,
                hDoorplate: data.h_doorplate,
                hName: data.h_name,
                hGender: data.h_gender,
                hPhone: data.h_phone,
                hIdentity: data.h_identity,
                hIdCard: data.h_idcard,
                hBirth: data.h_birth,
                hCard: data.h_card,
                hWorking: data.h_working,
                hRoomTime: data.h_room_time,
                hRoomReason: data.h_room_reason,
                hQQ: data.h_qq,
                hWechat: data.h_wechat,
                hEmail: data.h_email,
                hHousePhone: data.h_house_phone,
                hEmergencyPerson: data.h_emergency_person,
                hEmergencyPhone: data.h_emergency_phone
              };
              if (this.addHouseHoldForm.hState == 0) {
                //未审核 禁止修改
                this.formable = true;
              }
            }
          });
      }
    }, 20);
  },
  data() {
    var validatehPhone = (rule, value, callback) => {
      this.$http
        .get("/server/household/check", {
          params: {
            phone: value
          }
        })
        .then(res => {
          if (res.data.status == "1") {
            callback(new Error(res.data.msg));
          } else {
            callback();
          }
        });
    };
    return {
      cId: -1,
      formable: false,
      buildOpts: [],
      defaultOpt: [],
      identityOpts: [
        {
          value: "业主本人",
          label: "业主本人"
        },
        {
          value: "亲属",
          label: "亲属"
        },
        {
          value: "租客",
          label: "租客"
        }
      ],
      addHouseHoldForm: {
        buildingId: "",
        hDoorplate: "",
        hName: "",
        hGender: "男",
        hPhone: "",
        hIdentity: "",
        hIdCard: "",
        hBirth: null,
        hCard: "",
        hWorking: "",
        hRoomTime: null,
        hRoomReason: "",
        hQQ: "",
        hWechat: "",
        hEmail: "",
        hHousePhone: "",
        hEmergencyPerson: "",
        hEmergencyPhone: "",
        hState: 1 // 这里添加为管理员手动添加 为“已审核”的住户
      },
      addHouseHoldRules: {
        buildingId: [{ required: true, message: "所属楼盘不可为空" }],
        hDoorplate: [{ required: true, message: "门派号不可为空" }],
        hName: [{ required: true, message: "住户姓名不可为空" }],
        hGender: [{ required: true, message: "住户性别不可为空" }],
        hPhone: [
          { required: true, message: "住户手机号码不可为空" },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$/,
            message: "请输入正确的手机号码格式"
          },
          { validator: validatehPhone, trigger: "blur" }
        ],
        hIdentity: [{ required: true, message: "住户身份不可为空" }],
        hIdCard: [
          {
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: "请输入正确的身份证格式"
          }
        ],
        hCard: [
          {
            pattern: /^([1-9]{1})(\d{14}|\d{18})$/,
            message: "请输入正确的银行卡号格式"
          }
        ],
        hRoomReason: [{ max: 100, message: "字数在100个字符以内" }],
        hQQ: [{ pattern: /^[1-9]\d{4,9}$/, message: "请输入正确的QQ号格式" }],
        hEmail: [
          {
            pattern: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
            message: "请输入正确的邮箱格式"
          }
        ],
        hHousePhone: [
          {
            pattern: /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/,
            message: "请输入正确的固定电话格式"
          }
        ],
        hEmergencyPhone: [
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$/,
            message: "请输入正确的手机号格式"
          }
        ]
      }
    };
  },
  components: {
    ModuleTitle,
    ModuleContent
  },
  methods: {
    goBack() {
      router.push("/sys/data/household");
      // router.go(-1);
    },
    buildOptsChange(val) {
      this.cId = val[0];
      this.addHouseHoldForm.buildingId = val[1];
    },
    AddhouseHoldSubmit() {
      this.$refs["addHouseHoldForm1"].validate(valid1 => {
        if (valid1) {
          this.$refs["addHouseHoldForm2"].validate(valid2 => {
            if (valid2) {
              if (this.addHouseHoldForm.hId) {
                // 修改信息
                this.$http
                  .post("/server/household/updateAll", {
                    data: this.addHouseHoldForm
                  })
                  .then(res => {
                    console.log(res);
                    if (res.data.status == "1") {
                      this.$message({
                        type: "success",
                        message: res.data.msg
                      });
                    } else {
                      this.$message.error(res.data.msg);
                    }
                  });
              } else {
                // 添加信息
                console.log(this.addHouseHoldForm);
                this.$http
                  .post("/server/household/add", {
                    data: this.addHouseHoldForm
                  })
                  .then(res => {
                    console.log(res);
                    if (res.data.status == "1") {
                      // 添加完为审核住户后 继续添加没有登录权限的
                      this.addHouseUser(res.data.result.insertId);
                    } else {
                      this.$message.error(res.data.msg);
                    }
                  });
              }
            }
          });
        }
      });
    },
    getOpt() {
      this.$http
        .get("/server/building/getCBList", {
          params: {
            sId: this.$storage.get("user").systemId
          }
        })
        .then(res => {
          this.formatOpt(res.data.result || []);
        });
    },
    formatOpt(data) {
      let result = [];
      let obj = {};
      data.forEach(ele => {
        obj = {
          value: ele.c_id,
          label: ele.c_name,
          children: []
        };
        let flag = result.some(fEle => {
          if (fEle.value == ele.c_id) {
            return true;
          }
        });
        if (!flag) {
          result.push(obj);
        }
      });
      data.forEach(ele => {
        obj = {
          value: ele.b_id,
          label: ele.b_name
        };
        for (let i = 0; i < result.length; i++) {
          if (result[i].value == ele.c_id) {
            result[i].children.push(obj);
          }
        }
      });
      this.buildOpts = result;
    },
    getDate(val) {
      console.log(this.addHouseHoldForm.hGender);
    },
    addHouseUser(hId) {
      this.$http
        .post("/server/household/addUser", {
          huId: hId,
          phone: this.addHouseHoldForm.hPhone,
          cId: this.cId,
          state: 1
        })
        .then(res => {
          console.log(res);
          if (res.data.status == "1") {
            this.$message({
              type: "success",
              message: res.data.msg
            });
            this.goBack();
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    checkHouser() {
      // 审核通过
      this.$http
        .post("/server/household/checkHouser", {
          hId: this.addHouseHoldForm.hId
        })
        .then(res => {
          console.log(res);
          if (res.data.status == "1") {
            this.$message.success(res.data.msg);
            this.goBack();
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    delHouser() {
      console.log(22);
    }
  }
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 24px;
  font-weight: 300;
}
.Block {
  width: 100%;
}
.el-input {
  width: 80%;
}
.formBtnBlock {
  height: 48px;
  line-height: 48px;
  text-align: right;
  background-color: #fff;
  position: fixed;
  padding-right: 24px;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 888;
  box-shadow: 0 1px 8px rgba(122, 122, 122, 0.18);
}
</style>