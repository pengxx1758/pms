<template>
  <div>
    <module-title>
      <template slot="bread">
        <el-breadcrumb-item>内部管理</el-breadcrumb-item>
        <el-breadcrumb-item>员工管理</el-breadcrumb-item>
      </template>
      员工列表
    </module-title>

    <module-content>
      <template slot="btnBlock">
        <el-button type="success" @click="toAddStaff">
          <i class="el-icon-plus"></i> 添加员工
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
      >
        <el-table-column prop="c_name" label="所属小区" width="120" sortable></el-table-column>
        <el-table-column prop="s_name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="s_phone" label="手机号" width="180"></el-table-column>
        <el-table-column prop="s_wechat" label="微信号" width="200"></el-table-column>
        <el-table-column prop="s_email" label="邮箱" width="200"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="mini" @click="queryStaff(scope.row.s_id)">详情</el-button> -->
            <el-button type="text" size="mini" @click="editStaff(scope.row.s_id)">编辑</el-button>
            <el-button type="text" size="mini" @click="delStaff(scope.row)">删除</el-button>
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
    <el-dialog title="员工信息" :visible.sync="StaffFormVisible">
      <el-form ref="staffForm" :model="staffForm" :rules="staffFormRules" label-width="120px">
        <el-form-item label="所属小区:" prop="sCommunity" required>
          <el-select v-model="staffForm.sCommunity" placeholder="请输入小区名称">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓 名:" prop="sName" required>
          <el-input placeholder="请输入员工姓名" v-model="staffForm.sName"></el-input>
        </el-form-item>
        <el-form-item label="手 机:" prop="sPhone" required>
          <el-input placeholder="请输入员工手机" v-model="staffForm.sPhone"></el-input>
        </el-form-item>
        <el-form-item label="微信号:" prop="sWechat">
          <el-input placeholder="请输入员工微信号" v-model="staffForm.sWechat"></el-input>
        </el-form-item>
        <el-form-item label="邮 箱:" prop="sEmail">
          <el-input placeholder="请输入员工邮箱" v-model="staffForm.sEmail"></el-input>
        </el-form-item>
        <el-form-item label="备 注:" prop="sRemarks">
          <el-input type="textarea" autosize placeholder="100个字符以内" v-model="staffForm.sRemarks"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="StaffFormVisible = false">取 消</el-button>
        <el-button type="success" @click="addStaffSubmit">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ModuleTitle from "components/base/ModuleTitle";
import ModuleContent from "components/base/ModuleContent";
import router from "@/router";
export default {
  name: "Staff",
  mounted() {
    setTimeout(() => {
      // 获取小区下拉列表数据
      this.$http
        .get("/server/community/getIdandName", {
          params: {
            sId: this.$storage.get('user').systemId
          }
        })
        .then(res => {
          this.getOptions(res.data.result || []);
        });

      this.getData();
    }, 20);
  },
  data() {
    return {
      tableLoading: false,
      tableData: [],
      // 默认显示第几页
      currentPage: 1,
      // 默认每页显示的条数（可修改）
      PageSize: 5,

      //弹出框控制
      StaffFormVisible: false,

      options: [],
      // 员工表单
      staffForm: {
        sCommunity: "",
        sName: "",
        sPhone: "",
        sWechat: "",
        sEmail: "",
        sRemarks: ""
      },
      staffFormRules: {
        sCommunity: [{ required: true, message: "所属小区不可为空" }],
        sName: [{ required: true, message: "姓名不可为空" }],
        sPhone: [
          { required: true, message: "手机不可为空" },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$/,
            message: "请输入正确的手机号格式"
          }
        ],
        sEmail: [
          {
            pattern: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
            message: "请输入正确的邮箱格式"
          }
        ],
        sRemarks: [
          { max: 100, message: "长度最多为100个字符", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    ModuleTitle,
    ModuleContent
  },
  methods: {
    toAddStaff() {
      // 初始化表单
      this.staffForm = {
        sCommunity: "",
        sName: "",
        sPhone: "",
        sWechat: "",
        sEmail: "",
        sRemarks: ""
      };
      this.StaffFormVisible = true;
    },
    handleCurrentChange(val) {
      // 同步当前页
      this.currentPage = val;
    },
    editStaff(id) {
      this.$http
        .get("/server/staff/getById", {
          params: {
            sId: id
          }
        })
        .then(res => {
          let data = res.data.result[0];
          this.staffForm = {
            sId: id,
            sCommunity: data.s_community_id,
            sName: data.s_name,
            sPhone: data.s_phone,
            sWechat: data.s_wechat,
            sEmail: data.s_email,
            sRemarks: data.s_remarks
          };
          this.StaffFormVisible = true;
        });
    },
    delStaff(rowData) {
      this.$confirm(`确定删除员工${rowData.s_name}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("/server/staff/delById", {
              sId: rowData.s_id
            })
            .then(res => {
              if (res.data.status == "1") {
                this.$message({
                  type: "success",
                  message: res.data.msg
                });
              } else {
                this.$message.error(res.data.msg);
              }
              this.getData();
            });
        })
        .catch(() => {});
    },
    addStaffSubmit() {
      this.$refs["staffForm"].validate(valid => {
        if (valid) {
          if (this.staffForm.sId) {
            // 修改信息
            this.$http
              .post("/server/staff/updateAll", {
                data: this.staffForm
              })
              .then(res => {
                if (res.data.status == "1") {
                  this.$message({
                    type: "success",
                    message: res.data.msg
                  });
                } else {
                  this.$message.error(res.data.msg);
                }
                this.getData();
                this.StaffFormVisible = false;
              });
          } else {
            // 添加信息
            this.$http
              .post("/server/staff/add", {
                data: this.staffForm
              })
              .then(res => {
                if (res.data.status == "1") {
                  this.$message({
                    type: "success",
                    message: res.data.msg
                  });
                } else {
                  this.$message.error(res.data.msg);
                }
              });
            this.getData();
            this.StaffFormVisible = false;
          }
        }
      });
    },
    getOptions(data) {
      let obj = {};
      data.forEach(ele => {
        obj = {
          value: ele.c_id,
          label: ele.c_name
        };
        this.options.push(obj);
      });
    },
    getData() {
      this.tableLoading = true;
      this.$http
        .get("/server/staff/getAll", {
          params: {
            sId: this.$storage.get('user').systemId
          }
        })
        .then(res => {
          this.tableData = res.data.result || [];
          this.tableLoading = false;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-input {
  width: 80%;
}
</style>