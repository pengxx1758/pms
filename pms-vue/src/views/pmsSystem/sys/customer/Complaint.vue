<template>
  <div>
    <module-title>
      <template slot="bread">
        <el-breadcrumb-item>客服管理</el-breadcrumb-item>
        <el-breadcrumb-item>投诉管理</el-breadcrumb-item>
      </template>
      投诉管理
    </module-title>
    <module-content>
      <div class="mainBlock">
        <el-tabs tab-position="left" @tab-click="tabChange">
          <el-tab-pane class="tabBlock" label="待处理">
            <div class="tabHeder">
              <div class="btnBlock">
                <el-button type="success" v-if="roleId == 2" @click="addComplaintVisiable = true">
                  <i class="el-icon-plus"></i> 意见投诉
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
              <el-table-column prop="cp_type" label="类型" width="120"></el-table-column>
              <el-table-column prop="cp_way" label="方式" width="120"></el-table-column>
              <el-table-column prop="cp_person" label="投诉人" width="140"></el-table-column>
              <el-table-column prop="cp_phone" label="联系方式" width="140"></el-table-column>
              <el-table-column prop="cp_start_date" label="投诉日期" width="200"></el-table-column>
              <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="queryaComplaint(scope.row.cp_id)">详情</el-button>
                  <el-button
                    type="text"
                    size="mini"
                    v-if="roleId !== 2"
                    @click="complaintCharge(scope.row.cp_id)"
                  >投诉处理</el-button>
                  <el-button
                    type="text"
                    size="mini"
                    v-if="roleId == 2"
                    @click="delComplaint(scope.row.cp_id,0)"
                  >删除</el-button>
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
          <el-tab-pane class="tabBlock" label="已处理">
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
              <el-table-column prop="cp_type" label="类型" width="120"></el-table-column>
              <el-table-column prop="cp_way" label="方式" width="120"></el-table-column>
              <el-table-column prop="cp_person" label="投诉人" width="140"></el-table-column>
              <el-table-column prop="cp_phone" label="联系方式" width="140"></el-table-column>
              <el-table-column prop="cp_start_date" label="投诉日期" width="200"></el-table-column>
              <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="queryaComplaint(scope.row.cp_id)">详情</el-button>
                  <el-button
                    type="text"
                    size="mini"
                    v-if="roleId !== 2"
                    @click="delComplaint(scope.row.cp_id,1)"
                  >删除记录</el-button>
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

    <el-dialog title="投诉详情" :visible.sync="complaintVisiable">
      <el-form :model="complaintForm" label-width="100px">
        <div class="complaintTitle">投诉人信息</div>
        <el-form-item label="投诉类别:" prop="cpType">
          <el-input v-model="complaintForm.cpType" readonly></el-input>
        </el-form-item>
        <el-form-item label="投诉方式:" prop="cpWay">
          <el-input v-model="complaintForm.cpWay" readonly></el-input>
        </el-form-item>
        <el-form-item label="投诉人:" prop="cpPerson">
          <el-input v-model="complaintForm.cpPerson" readonly></el-input>
        </el-form-item>
        <el-form-item label="投诉人住址:" prop="cpAddress">
          <el-input v-model="complaintForm.cpAddress" readonly></el-input>
        </el-form-item>
        <el-form-item label="投诉日期:" prop="cpStartDate">
          <el-input v-model="complaintForm.cpStartDate" readonly></el-input>
        </el-form-item>
        <el-form-item label="联系方式:" prop="cpPhone">
          <el-input v-model="complaintForm.cpPhone" readonly></el-input>
        </el-form-item>
        <el-form-item label="投诉内容" prop="cpContent">
          <el-input type="textarea" v-model="complaintForm.cpContent" readonly></el-input>
        </el-form-item>

        <div class="complaintTitle">投诉处理信息</div>
        <el-form-item label="负责人:" prop="cpCharger">
          <el-input v-model="complaintForm.cpCharger" readonly></el-input>
        </el-form-item>
        <el-form-item label="验收日期:" prop="cpEndDate">
          <el-input v-model="complaintForm.cpEndDate" readonly></el-input>
        </el-form-item>
        <el-form-item label="处理意见:" prop="cpOpinion">
          <el-input type="textarea" v-model="complaintForm.cpOpinion" readonly></el-input>
        </el-form-item>
        <el-form-item label="处理详情:" prop="cpDetail">
          <el-input type="textarea" v-model="complaintForm.cpDetail" readonly></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="complaintVisiable = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="投诉处理" :visible.sync="addComplaintChargeVisiable">
      <el-form
        ref="addComplaintChargeForm"
        :model="addComplaintChargeForm"
        :rules="addComplaintChargeFormRules"
        label-width="100px"
      >
        <el-form-item label="负责人:" prop="cpCharger">
          <el-input placeholder="请输入验收人姓名" v-model="addComplaintChargeForm.cpCharger"></el-input>
        </el-form-item>
        <el-form-item label="验收日期:" prop="cpEndDate">
          <el-date-picker
            v-model="addComplaintChargeForm.cpEndDate"
            type="date"
            placeholder="请选择处理日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="处理意见:" prop="cpOpinion">
          <el-input
            type="textarea"
            placeholder="请输入处理意见，100字符以内"
            v-model="addComplaintChargeForm.cpOpinion"
          ></el-input>
        </el-form-item>
        <el-form-item label="处理详情:" prop="cpDetail">
          <el-input
            type="textarea"
            placeholder="请输入处理过程，100字符以内"
            v-model="addComplaintChargeForm.cpDetail"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addComplaintChargeVisiable = false">取 消</el-button>
        <el-button type="success" @click="complaintChargeFormSubmit">验 收</el-button>
      </div>
    </el-dialog>

    <el-dialog title="意见投诉" :visible.sync="addComplaintVisiable">
      <el-form
        ref="addComplaintForm"
        :model="addComplaintForm"
        :rules="addComplaintFormRules"
        label-width="100px"
      >
        <el-form-item label="投诉类别:" prop="cpType">
          <el-select v-model="addComplaintForm.cpType" placeholder="请选择投诉类别">
            <el-option
              v-for="item in cpTypeOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="投诉方式:" prop="cpWay">
          <el-select v-model="addComplaintForm.cpWay" placeholder="请选择投诉方式">
            <el-option
              v-for="item in cpWayOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="投诉人:" prop="cpPerson">
          <el-input placeholder="请输入投诉人姓名" v-model="addComplaintForm.cpPerson"></el-input>
        </el-form-item>
        <el-form-item label="住址:" prop="cpAddress">
          <el-input v-model="addComplaintForm.cpAddress" readonly></el-input>
        </el-form-item>
        <el-form-item label="联系方式:" prop="cpPhone">
          <el-input placeholder="请输入投诉人手机号码" v-model="addComplaintForm.cpPhone"></el-input>
        </el-form-item>
        <el-form-item label="投诉内容" prop="cpContent">
          <el-input
            type="textarea"
            placeholder="请输入投诉的具体内容，100字符以内"
            v-model="addComplaintForm.cpContent"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addComplaintVisiable = false">取 消</el-button>
        <el-button type="success" @click="addComplaintFormSubmit">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ModuleTitle from "components/base/ModuleTitle";
import ModuleContent from "components/base/ModuleContent";
import router from "@/router";
export default {
  name: "Complaint",
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
      tableData: [],
      roleId: -1,
      address: "",
      // 默认显示第几页
      currentPage: 1,
      // 默认每页显示的条数（可修改）
      pageSize: 5,

      // #查询投诉详情对话框
      complaintVisiable: false,
      complaintForm: {
        cpType: "",
        cpWay: "",
        cpPerson: "",
        cpAddress: "",
        cpPhone: "",
        cpStartDate: "",
        cpContent: "",

        cpCharger: "",
        cpEndDate: "",
        cpOpinion: "",
        cpDetail: ""
      },
      complaintFormRules: {},
      // #查询投诉详情对话框

      // #意见投诉添加对话框
      cpTypeOpts: [
        {
          value: "管理投诉",
          label: "管理投诉"
        },
        {
          value: "工程投诉",
          label: "工程投诉"
        },
        {
          value: "收费投诉",
          label: "收费投诉"
        },
        {
          value: "突发事件投诉",
          label: "突发事件投诉"
        }
      ],
      cpWayOpts: [
        {
          value: "协商和解",
          label: "协商和解"
        },
        {
          value: "请求调解",
          label: "请求调解"
        },
        {
          value: "相关部分申诉",
          label: "相关部分申诉"
        }
      ],
      addComplaintVisiable: false,
      addComplaintForm: {
        cpType: "",
        cpWay: "",
        cpPerson: "",
        cpAddress: "",
        cpPhone: "",
        cpContent: "",
        cpStartDate: new Date().toLocaleDateString()
      },
      addComplaintFormRules: {
        cpType: [{ required: true, message: "投诉类别不可为空" }],
        cpWay: [{ required: true, message: "投诉方式不可为空" }],
        cpPerson: [{ required: true, message: "投诉人不可为空" }],
        cpPhone: [
          { required: true, message: "联系方式不可为空" },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$/,
            message: "请输入正确的手机号格式"
          }
        ],
        cpContent: [
          { max: 100, message: "长度最多为100个字符", trigger: "blur" }
        ]
      },
      // #意见投诉添加对话框

      // #投诉处理对话框
      addComplaintChargeVisiable: false,
      addComplaintChargeForm: {
        cpId: "",
        cpCharger: "",
        cpEndDate: new Date().toLocaleDateString(),
        cpOpinion: "",
        cpDetail: ""
      },
      addComplaintChargeFormRules: {
        cpCharger: [{ required: true, message: "处理负责人不可为空" }],
        cpEndDate: [{ required: true, message: "处理日期不可为空" }],
        cpOpinion: [
          { max: 100, message: "长度最多为100个字符", trigger: "blur" }
        ],
        cpDetail: [
          { max: 100, message: "长度最多为100个字符", trigger: "blur" }
        ]
      }
      // #投诉处理对话框
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
    //选项卡切换
    tabChange(tab) {
      let choice = tab.index;
      if (this.roleId == 2) {
        this.getHouserData(choice);
      } else {
        this.getSysData(choice);
      }
    },
    // 查看投诉详情
    queryaComplaint(id) {
      this.complaintVisiable = true;
      this.$http
        .get("/server/complaint/getDetailById", {
          params: {
            cpId: id
          }
        })
        .then(res => {
          let info = res.data.result;
          this.complaintForm = {
            cpType: info.cp_type,
            cpWay: info.cp_way,
            cpPerson: info.cp_person,
            cpAddress: info.cp_address,
            cpStartDate: new Date(info.cp_start_date).toLocaleDateString(),
            cpPhone: info.cp_phone,
            cpContent: info.cp_content,

            cpCharger: info.cp_charger,
            cpEndDate: info.cp_end_date
              ? new Date(info.cp_end_date).toLocaleDateString()
              : "",
            cpOpinion: info.cp_opinion,
            cpDetail: info.cp_detail
          };
        });
    },
    // 添加投诉表单提交
    addComplaintFormSubmit() {
      this.$refs["addComplaintForm"].validate(valid => {
        if (valid) {
          this.$http
            .post("/server/complaint/add", {
              data: this.addComplaintForm,
              huId: this.$storage.get("user").userId,
              sId: this.$storage.get("user").systemId
            })
            .then(res => {
              if (res.data.status == "1") {
                this.$message.success(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
              this.addComplaintVisiable = false;
              this.getHouserData(0);
              this.addComplaintForm = {
                cpType: "",
                cpWay: "",
                cpPerson: "",
                cpAddress: this.address,
                cpPhone: "",
                cpContent: "",
                cpStartDate: new Date().toLocaleDateString()
              };
            });
        }
      });
    },
    // 投诉处理激活
    complaintCharge(id) {
      this.addComplaintChargeVisiable = true;
      this.addComplaintChargeForm.cpId = id;
    },
    // 提交投诉处理添加表单
    complaintChargeFormSubmit() {
      this.$refs["addComplaintChargeForm"].validate(valid => {
        if (valid) {
          this.$http
            .post("/server/complaint/dealComplaint", {
              data: this.addComplaintChargeForm
            })
            .then(res => {
              if (res.data.status == "1") {
                this.$message.success(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
              this.addComplaintChargeVisiable = false;
              this.getSysData(0);
            });
        }
      });
    },
    delComplaint(id, tab) {
      this.$confirm("此操作将永久删除投诉记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          this.$http
            .post("/server/complaint/cancelComplaint", {
              cpId: id
            })
            .then(res => {
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
        .get("/server/complaint/getHouserList", {
          params: {
            huId: this.$storage.get("user").userId,
            state: state
          }
        })
        .then(res => {
          if (res.data.status == "1") {
            this.tableData = res.data.result;
            this.tableData.forEach(ele => {
              ele.cp_start_date = new Date(
                ele.cp_start_date
              ).toLocaleDateString();
            });
          }
        });
    },
    getSysData(state) {
      this.tableData = [];
      this.$http
        .get("/server/complaint/getSysList", {
          params: {
            sId: this.$storage.get("user").systemId,
            state: state
          }
        })
        .then(res => {
          if (res.data.status == "1") {
            this.tableData = res.data.result;
            this.tableData.forEach(ele => {
              ele.cp_start_date = new Date(
                ele.cp_start_date
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
          this.addComplaintForm.cpAddress = this.address;
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
.complaintTitle {
  font-size: 20px;
  color: #333;
  margin-bottom: 12px;
  border-bottom: 1px dashed #999;
}
</style>