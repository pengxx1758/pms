<template>
  <div>
    <module-title>
      <template slot="bread">
        <el-breadcrumb-item>客服管理</el-breadcrumb-item>
        <el-breadcrumb-item>维修管理</el-breadcrumb-item>
      </template>
      维修管理
    </module-title>
    <module-content>
      <div class="mainBlock">
        <el-tabs tab-position="left" @tab-click="tabChange">
          <el-tab-pane class="tabBlock" label="待审核">
            <div class="tabHeder">
              <div class="btnBlock">
                <el-button
                  type="success"
                  v-if="this.roleId == 2"
                  @click="addApplicationVisiable = true"
                >
                  <i class="el-icon-plus"></i> 维修申请
                </el-button>
              </div>
              <div class="searchBlock">
                <el-input placeholder="请输入内容">
                  <el-button type="success" slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
            </div>

            <el-table
              :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              style="width: 100%"
            >
              <el-table-column prop="m_type" label="类别" width="120"></el-table-column>
              <el-table-column prop="m_person" label="申请人" width="120"></el-table-column>
              <el-table-column prop="m_phone" label="联系方式" width="140"></el-table-column>
              <el-table-column prop="m_start_date" label="申请日期" width="140"></el-table-column>
              <el-table-column prop="m_description" label="维修描述" width="200"></el-table-column>
              <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="queryApplication(scope.row.m_id)">详情</el-button>
                  <el-button
                    type="text"
                    size="mini"
                    v-if="roleId !==2"
                    @click="checkHandle(scope.row.m_id)"
                  >审核管理</el-button>
                  <el-button
                    type="text"
                    size="mini"
                    v-if="roleId ==2"
                    @click="delApplication(scope.row.m_id,0)"
                  >撤销申请</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagesBlock">
              <el-pagination
                layout="prev, pager, next"
                @current-change="handleCheckCurrentChange"
                :current-page="currentPage"
                :total="this.tableData.length"
                :page-size="this.pageSize"
              ></el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane class="tabBlock" label="待验收">
            <div class="tabHeder">
              <div class="btnBlock"></div>
              <div class="searchBlock">
                <el-input placeholder="请输入内容">
                  <el-button type="success" slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
            </div>

            <el-table
              :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              style="width: 100%"
            >
              <el-table-column prop="m_type" label="类别" width="120"></el-table-column>
              <el-table-column prop="m_person" label="申请人" width="120"></el-table-column>
              <el-table-column prop="m_phone" label="联系方式" width="140"></el-table-column>
              <el-table-column prop="m_start_date" label="申请日期" width="140"></el-table-column>
              <el-table-column prop="m_description" label="维修描述" width="200"></el-table-column>
              <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="queryApplication(scope.row.m_id)">详情</el-button>
                  <el-button
                    type="text"
                    size="mini"
                    v-if="roleId !==2"
                    @click="acceptanceHandle(scope.row.m_id)"
                  >验收管理</el-button>
                  <!-- <el-button
                    type="text"
                    size="mini"
                    v-if="roleId !==2"
                    @click="delApplication(scope.row.m_id,1)"
                  >撤销申请</el-button> -->
                </template>
              </el-table-column>
            </el-table>
            <div class="pagesBlock">
              <el-pagination
                layout="prev, pager, next"
                @current-change="handleCheckCurrentChange"
                :current-page="currentPage"
                :total="this.tableData.length"
                :page-size="this.pageSize"
              ></el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane class="tabBlock" label="已完成">
            <div class="tabHeder">
              <div class="btnBlock"></div>
              <div class="searchBlock">
                <el-input placeholder="请输入内容">
                  <el-button type="success" slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
            </div>

            <el-table
              :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              style="width: 100%"
            >
              <el-table-column prop="m_type" label="类别" width="120"></el-table-column>
              <el-table-column prop="m_person" label="申请人" width="120"></el-table-column>
              <el-table-column prop="m_phone" label="联系方式" width="140"></el-table-column>
              <el-table-column prop="m_start_date" label="申请日期" width="140"></el-table-column>
              <el-table-column prop="m_description" label="维修描述" width="200"></el-table-column>
              <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="queryApplication(scope.row.m_id)">详情</el-button>
                  <!-- <el-button type="text" size="mini" @click="delApplication(scope.row.m_id)">删除记录</el-button> -->
                </template>
              </el-table-column>
            </el-table>
            <div class="pagesBlock">
              <el-pagination
                layout="prev, pager, next"
                @current-change="handleCheckCurrentChange"
                :current-page="currentPage"
                :total="this.tableData.length"
                :page-size="this.pageSize"
              ></el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </module-content>
    <el-dialog title="申请信息" :visible.sync="addApplicationVisiable">
      <el-form
        ref="addApplicationForm"
        :model="addApplicationForm"
        :rules="addApplicationFormRules"
        label-width="100px"
      >
        <el-form-item label="类 别:" prop="mtype" required>
          <el-select v-model="addApplicationForm.mtype" placeholder="请选择维修类别">
            <el-option
              v-for="item in mTypeOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请人:" prop="mPerson" required>
          <el-input placeholder="请输入申请人姓名" v-model="addApplicationForm.mPerson"></el-input>
        </el-form-item>
        <el-form-item label="申请住址:" prop="mAddress">
          <el-input v-model="addApplicationForm.mAddress" readonly></el-input>
        </el-form-item>
        <el-form-item label="联系方式:" prop="mPhone" required>
          <el-input placeholder="请输入申请人手机号码" v-model="addApplicationForm.mPhone"></el-input>
        </el-form-item>
        <el-form-item label="申请描述:" prop="mDesc">
          <el-input
            type="textarea"
            placeholder="请输入申请维修的具体情况，100字符以内"
            v-model="addApplicationForm.mDesc"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addApplicationVisiable = false">取 消</el-button>
        <el-button type="success" @click="addApplicationFormSubmit">申 请</el-button>
      </div>
    </el-dialog>

    <el-dialog title="维修申请详情" :visible.sync="ApplicationDetailVisiable">
      <el-form :model="queryApplicationForm" label-width="100px">
        <div class="permissionTitle">申请信息</div>
        <el-form-item label="类 别:" prop="mtype" read>
          <el-input v-model="queryApplicationForm.mtype" readonly></el-input>
        </el-form-item>
        <el-form-item label="申请人:" prop="mPerson" read>
          <el-input v-model="queryApplicationForm.mPerson" readonly></el-input>
        </el-form-item>
        <el-form-item label="申请住址:" prop="mAddress" read>
          <el-input v-model="queryApplicationForm.mAddress" readonly></el-input>
        </el-form-item>
        <el-form-item label="联系方式:" prop="mPhone" read>
          <el-input v-model="queryApplicationForm.mPhone" readonly></el-input>
        </el-form-item>
        <el-form-item label="申请日期:" prop="mStartDate" read>
          <el-input v-model="queryApplicationForm.mStartDate" readonly></el-input>
        </el-form-item>
        <el-form-item label="申请描述:" prop="mDesc">
          <el-input
            type="textarea"
            placeholder="请输入申请维修的具体情况，100字符以内"
            v-model="queryApplicationForm.mDesc"
            readonly
          ></el-input>
        </el-form-item>
        <div class="permissionTitle">审核信息</div>
        <el-form-item label="审核人:" prop="mCharger" read>
          <el-input v-model="queryApplicationForm.mCharger" readonly></el-input>
        </el-form-item>
        <el-form-item label="物业方意见:" prop="mOpinion">
          <el-input type="textarea" v-model="queryApplicationForm.mOpinion" readonly></el-input>
        </el-form-item>
        <el-form-item label="处理方法:" prop="mMethod">
          <el-input type="textarea" v-model="queryApplicationForm.mMethod" readonly></el-input>
        </el-form-item>
        <div class="permissionTitle">验收信息</div>
        <el-form-item label="验收人:" prop="mMaintainer">
          <el-input v-model="queryApplicationForm.mMaintainer" readonly></el-input>
        </el-form-item>
        <el-form-item label="申请日期:" prop="mEndDate" read>
          <el-input v-model="queryApplicationForm.mEndDate" readonly></el-input>
        </el-form-item>
        <el-form-item label="验收结果:" prop="mResult">
          <el-input type="textarea" v-model="queryApplicationForm.mResult" readonly></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="ApplicationDetailVisiable = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="审核信息" :visible.sync="addCkeckVisiable">
      <el-form
        ref="addCheckForm"
        :model="addCheckForm"
        :rules="addCheckFormRules"
        label-width="100px"
      >
        <el-form-item label="审核人:" prop="mCharger" required>
          <el-input placeholder="请输入审核人姓名" v-model="addCheckForm.mCharger"></el-input>
        </el-form-item>
        <el-form-item label="物业方意见:" prop="mOpinion">
          <el-input type="textarea" placeholder="请输入处理意见，100字符以内" v-model="addCheckForm.mOpinion"></el-input>
        </el-form-item>
        <el-form-item label="处理方法:" prop="mMethod">
          <el-input type="textarea" placeholder="请输入处理方法，100字符以内" v-model="addCheckForm.mMethod"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCkeckVisiable = false">取 消</el-button>
        <el-button type="success" @click="addCheckFormSubmit">审核通过</el-button>
      </div>
    </el-dialog>

    <el-dialog title="验收信息" :visible.sync="addAcceptanceVisiable">
      <el-form
        ref="addAcceptanceForm"
        :model="addAcceptanceForm"
        :rules="addAcceptanceFormRules"
        label-width="100px"
      >
        <el-form-item label="验收人:" prop="mMaintainer" required>
          <el-input placeholder="请输入验收人姓名" v-model="addAcceptanceForm.mMaintainer"></el-input>
        </el-form-item>
        <el-form-item label="验收日期:" prop="mEndDate" required>
          <el-date-picker v-model="addAcceptanceForm.mEndDate" type="date" placeholder="请选择验收日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="验收结果:" prop="mResult" required>
          <el-input
            type="textarea"
            placeholder="请输入验收结果，100字符以内"
            v-model="addAcceptanceForm.mResult"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAcceptanceVisiable = false">取 消</el-button>
        <el-button type="success" @click="addAcceptanceSubmit">验 收</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ModuleTitle from "components/base/ModuleTitle";
import ModuleContent from "components/base/ModuleContent";
import router from "@/router";
export default {
  name: "Maintain",
  mounted() {
    setTimeout(() => {
      this.roleId = this.$storage.get("user").roleId;
      if (this.roleId == 2) {
        this.getHouserData(0);
        this.getAddress(this.$storage.get("user").userId);
      } else {
        this.getSysData(0);
      }
    }, 20);
  },
  data() {
    return {
      roleId: -1,
      address: "",
      tableData: [],
      // 默认显示第几页
      currentPage: 1,
      // 默认每页显示的条数（可修改）
      pageSize: 5,

      // #申请添加对话框
      mTypeOpts: [
        {
          value: "电路",
          label: "电路"
        },
        {
          value: "家具",
          label: "家具"
        },
        {
          value: "电器",
          label: "电器"
        },
        {
          value: "排水",
          label: "排水"
        },
        {
          value: "照明",
          label: "照明"
        },
        {
          value: "网络",
          label: "网络"
        }
      ],
      addApplicationVisiable: false,
      addApplicationForm: {
        mtype: "",
        mPerson: "",
        mPhone: "",
        mAddress: "",
        mStartDate: new Date().toLocaleDateString(),
        mDesc: ""
      },
      addApplicationFormRules: {
        mtype: [{ required: true, message: "维修类型不可为空" }],
        mPerson: [{ required: true, message: "申请人不可为空" }],
        mPhone: [
          { required: true, message: "联系方式不可为空" },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$/,
            message: "请输入正确的手机号格式"
          }
        ],
        mDesc: [{ max: 100, message: "长度最多为100个字符", trigger: "blur" }]
      },
      // #申请添加对话框

      // #查看对话框
      ApplicationDetailVisiable: false,
      queryApplicationForm: {
        mtype: "",
        mPerson: "",
        mAddress: "",
        mPhone: "",
        mStartDate: "",
        mDesc: "",

        mCharger: "",
        mOpinion: "",
        mMethod: "",

        mEndDate: "",
        mMaintainer: "",
        mResult: ""
      },
      // #查看对话框
      // #添加审核信息对话框
      addCkeckVisiable: false,
      addCheckForm: {
        mId: "",
        mCharger: "",
        mOpinion: "",
        mMethod: ""
      },
      addCheckFormRules: {
        mCharger: [{ required: true, message: "审核人不可为空" }],
        mOpinion: [
          { max: 100, message: "长度最多为100个字符", trigger: "blur" }
        ],
        mMethod: [{ max: 100, message: "长度最多为100个字符", trigger: "blur" }]
      },
      // #添加审核信息对话框

      // #添加验收信息对话框
      addAcceptanceVisiable: false,
      addAcceptanceForm: {
        mId: "",
        mMaintainer: "",
        mEndDate: new Date().toLocaleDateString(),
        mResult: ""
      },
      addAcceptanceFormRules: {
        mMaintainer: [{ required: true, message: "验收人不可为空" }],
        mEndDate: [{ required: true, message: "验收日期不可为空" }],
        mResult: [{ max: 100, message: "长度最多为100个字符", trigger: "blur" }]
      }
      // #添加验收信息对话框
    };
  },
  components: {
    ModuleTitle,
    ModuleContent
  },
  methods: {
    handleCheckCurrentChange(val) {
      // 同步当前页
      this.currentPage = val;
    },
    // 切换选项卡
    tabChange(tab) {
      let choice = tab.index;
      if (this.roleId == 2) {
        this.getHouserData(choice);
      } else {
        this.getSysData(choice);
      }
    },
    // 添加维修申请表单提交
    addApplicationFormSubmit() {
      this.$refs["addApplicationForm"].validate(valid => {
        if (valid) {
          this.$http
            .post("/server/maintain/add", {
              data: this.addApplicationForm,
              huId: this.$storage.get("user").userId,
              sId: this.$storage.get("user").systemId
            })
            .then(res => {
              if (res.data.status == "1") {
                this.$message.success(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
              this.addApplicationVisiable = false;
              this.getHouserData(0);
              // 初始化申请表单
              this.addApplicationForm = {
                mtype: "",
                mPerson: "",
                mPhone: "",
                mAddress: this.address,
                mStartDate: new Date().toLocaleDateString(),
                mDesc: ""
              };
            });
        }
      });
    },
    // 查看未审核维修申请表单
    queryApplication(id) {
      this.ApplicationDetailVisiable = true;
      this.$http
        .get("/server/maintain/getDetailById", {
          params: {
            mId: id
          }
        })
        .then(res => {
          console.log(res);
          let info = res.data.result;
          this.queryApplicationForm = {
            mtype: info.m_type,
            mPerson: info.m_person,
            mPhone: info.m_phone,
            mAddress: info.m_address,
            mStartDate: new Date(info.m_start_date).toLocaleDateString(),
            mDesc: info.m_description,

            mCharger: info.m_charger,
            mOpinion: info.m_opinion,
            mMethod: info.m_method,

            mEndDate: info.m_end_date
              ? new Date(info.m_end_date).toLocaleDateString()
              : "",
            mMaintainer: info.m_maintainer,
            mResult: info.m_result
          };
        });
    },
    // 插入审核信息对话框激活
    checkHandle(id) {
      this.addCkeckVisiable = true;
      this.addCheckForm.mId = id;
    },
    // 提交审核表单
    addCheckFormSubmit() {
      this.$refs["addCheckForm"].validate(valid => {
        if (valid) {
          this.$http
            .post("/server/maintain/checkMaintain", {
              data: this.addCheckForm
            })
            .then(res => {
              if (res.data.status == "1") {
                this.$message.success(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
              this.addCkeckVisiable = false;
              this.getSysData(0);
            });
        }
      });
    },

    // 插入验收信息对话框激活
    acceptanceHandle(id) {
      this.addAcceptanceVisiable = true;
      this.addAcceptanceForm.mId = id;
    },
    // 验收审核表单
    addAcceptanceSubmit() {
      this.$refs["addAcceptanceForm"].validate(valid => {
        if (valid) {
          this.$http
            .post("/server/maintain/acceptMaintain", {
              data: this.addAcceptanceForm
            })
            .then(res => {
              if (res.data.status == "1") {
                this.$message.success(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
              this.addAcceptanceVisiable = false;
              this.getSysData(1);
            });
        }
      });
    },
    // 撤销申请
    delApplication(id, tab) {
      this.$confirm("此操作将永久删除维修申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          this.$http
            .post("/server/maintain/cancelMaintain", {
              mId: id
            })
            .then(res => {
              console.log(res);
              if (res.data.status == "1") {
                this.$message.success(res.data.msg);
                this.getSysData(tab);
              } else {
                this.$message.error(res.data.msg);
              }
            });
        })
        .catch(() => {});
    },
    getHouserData(state) {
      this.tableData = [];
      this.$http
        .get("/server/maintain/getHouserList", {
          params: {
            huId: this.$storage.get("user").userId,
            state: state
          }
        })
        .then(res => {
          if (res.data.status == "1") {
            // this.$message.success(res.data.msg);
            this.tableData = res.data.result;
            this.tableData.forEach(ele => {
              ele.m_start_date = new Date(
                ele.m_start_date
              ).toLocaleDateString();
            });
          }
        });
    },
    getSysData(state) {
      this.tableData = [];
      this.$http
        .get("/server/maintain/getSysList", {
          params: {
            sId: this.$storage.get("user").systemId,
            state: state
          }
        })
        .then(res => {
          if (res.data.status == "1") {
            // this.$message.success(res.data.msg);
            this.tableData = res.data.result;
            this.tableData.forEach(ele => {
              ele.m_start_date = new Date(
                ele.m_start_date
              ).toLocaleDateString();
            });
          }
        });
    },
    getAddress(id) {
      this.$http
        .get("/server/maintain/getAddress", {
          params: {
            hId: id
          }
        })
        .then(res => {
          let data = res.data.result;
          for (let item in data) {
            this.address += "/" + data[item];
          }
          this.address = this.address.substring(1);
          this.addApplicationForm.mAddress = this.address;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.mainBlock {
  width: 100%;
  align-self: flex-start;
}
.tabBlock {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .tabHeder {
    display: flex;
    margin-bottom: 12px;
    .btnBlock {
      flex: 2;
    }
    .searchBlock {
      flex: 1;
    }
  }
  .pagesBlock {
    display: flex;
    align-self: flex-end;
    padding: 16px 32px 0 0;
  }
}
.el-dialog .el-input {
  width: 60%;
}
.permissionTitle {
  font-size: 20px;
  color: #333;
  margin-bottom: 12px;
  border-bottom: 1px dashed #999;
}
</style>