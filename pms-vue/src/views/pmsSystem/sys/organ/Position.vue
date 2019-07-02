<template>
  <div>
    <module-title>
      <template slot="bread">
        <el-breadcrumb-item>内部管理</el-breadcrumb-item>
        <el-breadcrumb-item>职位管理</el-breadcrumb-item>
      </template>
      职位列表
    </module-title>

    <module-content>
      <template slot="btnBlock">
        <el-button type="success" @click="toAddposition">
          <i class="el-icon-plus"></i> 添加职位
        </el-button>
      </template>
      <template slot="searchBlock">
        <el-input placeholder="请输入内容">
          <el-button type="success" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </template>

      <el-table
        :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
        style="width: 100%"
        v-loading="tableLoding"
      >
        <el-table-column prop="pos_name" label="职位" width="120"></el-table-column>
        <el-table-column prop="c_name" label="所属小区" width="180"></el-table-column>
        <el-table-column prop="s_name" label="对应员工" width="140"></el-table-column>
        <el-table-column prop="s_phone" label="联系方式" width="150"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="queryPosition(scope.row.pos_id)">编辑</el-button>
            <el-button type="text" size="mini" @click="permissionCtrl(scope.row.pos_id)">权限管理</el-button>
            <el-button type="text" size="mini" @click="delPosition(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <template slot="page">
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :total="this.tableData.length"
          :page-size="this.PageSize"
        ></el-pagination>
      </template>
    </module-content>
    <el-dialog title="权限控制" :visible.sync="permissionVisible">
      <el-form :model="permssionForm">
        <div class="permissionTitle">总控制</div>
        <el-row>
          <el-col :span="6">
            <el-form-item label="登录许可">
              <el-switch active-color="#13ce66" v-model="permssionForm.login"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="permissionTitle">数据中心</div>
        <el-row>
          <el-col :span="6">
            <el-form-item label="小区管理">
              <el-switch active-color="#13ce66" v-model="permssionForm.community"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="楼盘管理">
              <el-switch active-color="#13ce66" v-model="permssionForm.building"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="住户管理">
              <el-switch active-color="#13ce66" v-model="permssionForm.household"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车位管理">
              <el-switch active-color="#13ce66" v-model="permssionForm.park"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="permissionTitle">财务管理</div>
        <el-row>
          <el-col :span="6">
            <el-form-item label="收费单管理">
              <el-switch active-color="#13ce66" v-model="permssionForm.feePay"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收费科目管理">
              <el-switch active-color="#13ce66" v-model="permssionForm.feeSub"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="欠费提醒">
              <el-switch active-color="#13ce66" v-model="permssionForm.feeTip"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="permissionTitle">内部管理</div>
        <el-row>
          <el-col :span="6">
            <el-form-item label="员工管理">
              <el-switch active-color="#13ce66" v-model="permssionForm.staff"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="职位管理">
              <el-switch active-color="#13ce66" v-model="permssionForm.position"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="permissionTitle">客服管理</div>
        <el-row>
          <el-col :span="6">
            <el-form-item label="维修申请管理">
              <el-switch active-color="#13ce66" v-model="permssionForm.maintain"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="住户投诉管理">
              <el-switch active-color="#13ce66" v-model="permssionForm.complaint"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="permissionVisible = false">取 消</el-button>
        <el-button type="success" @click="permssionSubmit">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="职位信息" :visible.sync="positionVisible">
      <el-form
        ref="positionForm"
        :model="positionForm"
        :rules="positionFormRule"
        label-width="100px"
      >
        <el-form-item label="所属小区:" prop="communityId" required>
          <el-select
            v-model="positionForm.communityId"
            placeholder="请选择职位所属小区"
            @change="HandleOptChange"
          >
            <el-option
              v-for="item in communityOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位名称:" prop="posName" required>
          <el-input placeholder="请输入职位名称" v-model="positionForm.posName"></el-input>
        </el-form-item>
        <el-form-item label="对应员工:" prop="sId" required>
          <el-select v-model="positionForm.sId" placeholder="请选择拥有员工" @change="staffChanged">
            <el-option
              v-for="item in staffOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工手机:" prop="sPhone">
          <el-input v-model="positionForm.sPhone" readonly v-loading="phoneLoading"></el-input>
        </el-form-item>
        <el-form-item label="登录密码:" prop="posPwd">
          <el-input placeholder="请输入登录密码" type="password" v-model="positionForm.posPwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="checkPwd">
          <el-input placeholder="请再次输入密码" type="password" v-model="positionForm.checkPwd"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="positionVisible = false">取 消</el-button>
        <el-button type="success" @click="addStaffFormSubmit">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="职位信息" :visible.sync="queryPositionVisible">
      <el-form ref="queryPositionForm" :model="queryPositionForm" label-width="100px">
        <el-form-item label="所属小区:" prop="c_name" required>
          <el-input v-model="queryPositionForm.c_name" readonly></el-input>
        </el-form-item>
        <el-form-item label="职位名称:" prop="pos_name" required>
          <el-input placeholder="请输入职位名称" v-model="queryPositionForm.pos_name" readonly></el-input>
        </el-form-item>
        <el-form-item label="对应员工:" prop="s_name" required>
          <el-input placeholder="请输入职位名称" v-model="queryPositionForm.s_name" readonly></el-input>
        </el-form-item>
        <el-form-item label="员工手机:" prop="s_phone">
          <el-input v-model="queryPositionForm.s_phone" readonly v-loading="phoneLoading"></el-input>
        </el-form-item>
        <!-- <el-form-item label="登录密码:" prop="u_password">
          <el-input placeholder="请输入登录密码" readonly v-model="queryPositionForm.u_password"></el-input>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="queryPositionVisible = false">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ModuleTitle from "components/base/ModuleTitle";
import ModuleContent from "components/base/ModuleContent";
import router from "@/router";
export default {
  name: "Position",
  mounted() {
    setTimeout(() => {
      // 获取小区下拉列表数据
      this.$http
        .get("/server/community/getIdandName", {
          params: {
            sId: this.$storage.get("user").systemId
          }
        })
        .then(res => {
          this.getOptions(res.data.result || [], this.communityOpts);
        });

      this.getData();
    }, 20);
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.positionForm.checkPwd !== "") {
          this.$refs.positionForm.validateField("checkPwd");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.positionForm.posPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatephone = (rule, value, callback) => {
      this.$http
        .get("/server/position/hasPhone", {
          params: {
            phone: value,
            sId: this.$storage.get("user").systemId
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
      tableData: [],
      posId: -1,
      // 默认显示第几页
      currentPage: 1,
      tableLoding: false,
      // 默认每页显示的条数（可修改）
      PageSize: 5,
      permissionVisible: false,
      positionVisible: false,
      queryPositionVisible: false,
      formLabelWidth: "150px",
      // 权限表单
      permssionForm: {
        login: 0,
        community: 1,
        building: 0,
        household: 1,
        park: 1,
        feePay: 1,
        feeSub: 0,
        feeTip: 1,
        staff: 1,
        position: 0,
        maintain: 0,
        complaint: 0
      },

      communityOpts: [],
      staffOpts: [],
      phoneLoading: false,
      // 职位表单
      positionForm: {
        communityId: "",
        posName: "",
        sId: "",
        systemId: this.$storage.get("user").systemId,
        sPhone: "",
        posPwd: "",
        checkPwd: ""
      },
      positionFormRule: {
        communityId: [{ required: true, message: "所属小区不可为空" }],
        posName: [{ required: true, message: "职位名称不可为空" }],
        sId: [{ required: true, message: "对应员工不可为空" }],
        sPhone: [{ validator: validatephone, trigger: "change" }],
        posPwd: [
          { validator: validatePass, trigger: "blur" },
          { min: 6, message: "长度至少为6个字符", trigger: "blur" }
        ],
        checkPwd: [{ validator: validatePass2, trigger: "blur" }]
      },
      queryPositionForm: {
        c_name: "",
        pos_name: "",
        s_name: "",
        s_phone: "",
        u_password: ""
      }
    };
  },
  components: {
    ModuleTitle,
    ModuleContent
  },
  methods: {
    toAddStaff() {},
    handleCurrentChange(val) {
      // 同步当前页
      this.currentPage = val;
    },
    toAddposition() {
      // 初始化
      (this.positionForm = {
        communityId: "",
        posName: "",
        sId: "",
        systemId: this.$storage.get("user").systemId,
        sPhone: "",
        posPwd: "",
        checkPwd: ""
      }),
        (this.positionVisible = true);
    },

    queryPosition(id) {
      this.$http
        .get("/server/position/getDetailById", {
          params: {
            posId: id
          }
        })
        .then(res => {
          if (res.data.status == "1") {
            this.queryPositionForm = res.data.result;
            this.queryPositionVisible = true;
          }
        });
    },
    permissionCtrl(id) {
      this.posId = id;
      this.$http
        .get("/server/position/getPermssion", {
          params: {
            posId: id
          }
        })
        .then(res => {
          let perInfo = res.data.result;
          this.permssionForm = {
            login: perInfo.u_login,
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
          this.permissionVisible = true;
        });
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
    // 权限表单提交
    permssionSubmit() {
      this.permissionFormat();
      this.$http
        .post("/server/position/updatePermssion", {
          data: this.permssionForm,
          posId: this.posId
        })
        .then(res => {
          if (res.data.status == "1") {
            this.$message.success(res.data.msg);
            this.permissionVisible = false;
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    staffChanged(val) {
      // 去请求获取员工id对应的手机号码
      this.phoneLoading = true;
      this.$http
        .get("/server/staff/getById", {
          params: {
            sId: val
          }
        })
        .then(res => {
          this.positionForm.sPhone = res.data.result.s_phone;
          this.phoneLoading = false;
        });
      // this.phoneLoading = true;
      // setTimeout(_ => {

      // }, 200);
    },
    addStaffFormSubmit() {
      this.$refs["positionForm"].validate(valid => {
        if (valid) {
          this.$http
            .post("/server/position/addManager", {
              data: this.positionForm
            })
            .then(res => {
              if ((res.data.status = "1")) {
                let uId = res.data.result.insertId;
                this.addPosition(uId);
              } else {
                this.$message.error(res.data.msg);
              }
            });
        }
      });
    },
    getOptions(data, arr) {
      let obj = {};
      data.forEach(ele => {
        obj = {
          value: ele.c_id,
          label: ele.c_name
        };
        arr.push(obj);
      });
    },
    getStaffOpt(data, arr) {
      let obj = {};
      data.forEach(ele => {
        obj = {
          value: ele.s_id,
          label: ele.s_name
        };
        arr.push(obj);
      });
    },
    HandleOptChange(val) {
      this.positionForm.sId = "";
      this.positionForm.sPhone = "";
      this.$http
        .get("/server/position/getStaff", {
          params: {
            cId: val
          }
        })
        .then(res => {
          this.staffOpts = [];
          this.getStaffOpt(res.data.result || [], this.staffOpts);
        });
    },
    addPosition(id) {
      this.$http
        .post("/server/position/addPos", {
          data: this.positionForm,
          uId: id
        })
        .then(res => {
          if ((res.data.status = "1")) {
            this.$message.success(res.data.msg);
            this.positionVisible = false;
            this.getData();
            // this.addPosition = {
            //   communityId: "",
            //   posName: "",
            //   sId: "",
            //   systemId: this.$storage.get("user").systemId,
            //   sPhone: "",
            //   posPwd: "",
            //   checkPwd: ""
            // };
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    getData() {
      this.tableLoding = true;
      this.$http
        .get("/server/position/getById", {
          params: {
            sId: this.$storage.get("user").systemId
          }
        })
        .then(res => {
          this.tableData = res.data.result || [];
        });
      this.tableLoding = false;
    },
    delPosition(data) {
      this.$confirm("此操作将永久删除职位信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          this.$http
            .post("/server/position/delPosition", {
              posId: data.pos_id,
              uId: data.pos_user_id
            })
            .then(res => {
              if (res.data.status = "1") {
                this.$message.success(res.data.msg);
                this.getData();
              } else {
                this.$message.error(res.data.msg);
              }
            }); 
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.permissionTitle {
  font-size: 20px;
  color: #333;
}
.el-input {
  width: 60%;
}
</style>