<template>
  <div>
    <module-title>
      <template slot="bread">
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>收费科目管理</el-breadcrumb-item>
      </template>
      收费科目列表
    </module-title>

    <module-content>
      <template slot="btnBlock">
        <el-button type="success" @click="addFeeSubVisiable = true">
          <i class="el-icon-plus"></i> 添加收费科目
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
        v-loading="tableLoading"
      >
        <el-table-column prop="fs_type" label="科目类型" width="150" sortable ></el-table-column>
        <el-table-column prop="fs_name" label="科目名称" width="350"></el-table-column>
        <el-table-column prop="fs_price" label="单价" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="delFeeSub(scope.row.fs_id)">删除</el-button>
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

    <el-dialog title="收费科目信息" :visible.sync="addFeeSubVisiable">
      <el-form
        ref="addFeeSubForm"
        :model="addFeeSubForm"
        :rules="addFeeSubFormRule"
        label-width="100px"
      >
        <el-form-item label="科目类型:" prop="fsType" required>
          <el-select v-model="addFeeSubForm.fsType" placeholder="请选择收费科目类型" @change="HandleChange">
            <el-option
              v-for="item in feeTypeOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科目名称:" prop="fsName" required>
          <el-input placeholder="请输入科目名称" v-model="addFeeSubForm.fsName"></el-input>
        </el-form-item>
        <el-form-item label="单价:" prop="fsPrice" v-if="this.addFeeSubForm.fsType == '计量类'" required>
          <el-input placeholder="请输入收费单价" v-model="addFeeSubForm.fsPrice"></el-input>
        </el-form-item>
        <!-- <el-form-item label="数量:" prop="fsNum" v-if="this.addFeeSubForm.fsType == '计量类'" required>
          <el-input placeholder="请输入计费数量" v-model="addFeeSubForm.fsNum"></el-input>
        </el-form-item>-->
        <!-- <el-form-item label="金额:" prop="fsMoney" v-if="this.addFeeSubForm.fsType == '固定类'" required>
          <el-input placeholder="请输入固定的金额数" v-model="addFeeSubForm.fsMoney"></el-input>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFeeSubVisiable = false">取 消</el-button>
        <el-button type="success" @click="addFeeSubSubmit">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ModuleTitle from "components/base/ModuleTitle";
import ModuleContent from "components/base/ModuleContent";
import router from "@/router";
export default {
  name: "FeeSub",
  mounted() {
    setTimeout(() => {
      this.getData();
    }, 20);
  },
  data() {
    return {
      addFeeSubVisiable: false,
      tableLoading: false,
      tableData: [],
      // 默认显示第几页
      currentPage: 1,
      // 默认每页显示的条数（可修改）
      PageSize: 5,
      feeTypeOpts: [
        {
          label: "固定类",
          value: "固定类"
        },
        {
          label: "计量类",
          value: "计量类"
        }
      ],

      addFeeSubForm: {
        fsName: "",
        fsType: "",
        fsPrice: 0
      },
      addFeeSubFormRule: {
        fsName: [{ required: true, message: "收费科目不可为空" }],
        fsType: [{ required: true, message: "收费类型不可为空" }],
        fsPrice: [{ required: true, message: "收费单价不可为空" }],
        fsNum: [{ required: true, message: "收费数量不可为空" }],
        fsMoney: [{ required: true, message: "金额不可为空" }]
      }
    };
  },
  components: {
    ModuleTitle,
    ModuleContent
  },
  methods: {
    handleCurrentChange(val) {
      // 同步当前页
      this.currentPage = val;
    },
    HandleChange(val) {},
    addFeeSubSubmit() {
      this.$refs["addFeeSubForm"].validate(valid => {
        if (valid) {
          this.$http
            .post("/server/feesub/add", {
              data: this.addFeeSubForm,
              sId: this.$storage.get("user").systemId
            })
            .then(res => {
              if (res.data.status == "1") {
                this.$message.success(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
              this.addFeeSubForm = {
                fsName: "",
                fsType: "",
                fsPrice: 0
              };
              this.addFeeSubVisiable = false;
              this.getData();
            });
        }
      });
    },
    delFeeSub(id) {
      this.$confirm("此操作将永久删除收费科目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          this.$http
            .post("/server/feesub/delFeeSub", {
              fsId: id
            })
            .then(res => {
              if (res.data.status == "1") {
                this.$message.success(res.data.msg);
                this.getData();
              } else {
                this.$message.error(res.data.msg);
              }
            });
        })
        .catch(() => {});
    },
    getData() {
      this.tableLoading = true;
      this.$http
        .get("/server/feesub/getAll", {
          params: {
            sId: this.$storage.get("user").systemId
          }
        })
        .then(res => {
          if (res.data.status == "1") {
            this.tableData = res.data.result || [];
            this.tableLoading = false;
          } else {
            this.tableLoading = false;
          }
        })
        .catch(err => {
          this.tableLoading = false;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-input {
  width: 60%;
}
</style>