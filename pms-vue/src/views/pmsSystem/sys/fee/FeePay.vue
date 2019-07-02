<template>
  <div>
    <module-title>
      <template slot="bread">
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>收费管理</el-breadcrumb-item>
      </template>
      收费列表
    </module-title>

    <module-content>
      <div class="mainBlock">
        <el-tabs tab-position="left" @tab-click="tabChange">
          <el-tab-pane class="tabBlock" label="待付款">
            <div class="tabHeder">
              <div class="btnBlock">
                <el-button type="success" v-if="roleId !== 2" @click="addFeeVisiable = true">
                  <i class="el-icon-plus"></i>添加收费单
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
              v-loading="tableLoding"
            >
              <el-table-column prop="f_order_number" label="单号" width="220"></el-table-column>
              <el-table-column prop="h_name" label="付款人" width="100"></el-table-column>
              <el-table-column prop="f_charger" label="经办人" width="100"></el-table-column>
              <el-table-column prop="f_delay_rate" label="滞纳率" width="120">
                <template slot-scope="scope">{{scope.row.f_delay_rate}}%</template>
              </el-table-column>
              <el-table-column prop="f_end_date" label="生成日期" width="120">
                <template
                  slot-scope="scope"
                >{{new Date(scope.row.f_create_date).toLocaleDateString()}}</template>
              </el-table-column>
              <el-table-column prop="f_end_date" label="收款日期" width="120">
                <template slot-scope="scope">{{new Date(scope.row.f_end_date).toLocaleDateString()}}</template>
              </el-table-column>
              <el-table-column prop="f_total_money" label="金额" width="140"></el-table-column>
              <el-table-column fixed="right" label="操作" align="center" width="100">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="queryaFeeItem(scope.row.f_id)">明细</el-button>
                  <el-button type="text" size="mini" @click="payFee(scope.row.f_id)">付款</el-button>
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
          <el-tab-pane class="tabBlock" label="已付款">
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
              <el-table-column prop="f_order_number" label="单号" width="220"></el-table-column>
              <el-table-column prop="h_name" label="付款人" width="100"></el-table-column>
              <el-table-column prop="f_charger" label="经办人" width="100"></el-table-column>
              <el-table-column prop="f_delay_rate" label="滞纳率" width="120">
                <template slot-scope="scope">{{scope.row.f_delay_rate}}%</template>
              </el-table-column>
              <el-table-column prop="f_end_date" label="生成日期" width="120">
                <template
                  slot-scope="scope"
                >{{new Date(scope.row.f_create_date).toLocaleDateString()}}</template>
              </el-table-column>
              <el-table-column prop="f_end_date" label="收款日期" width="120">
                <template slot-scope="scope">{{new Date(scope.row.f_end_date).toLocaleDateString()}}</template>
              </el-table-column>
              <el-table-column prop="f_total_money" label="金额" width="140"></el-table-column>
              <el-table-column fixed="right" label="操作" align="center" width="100">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="queryaFeeItem(scope.row.f_id)">明细</el-button>
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

    <el-dialog title="新建收费单" :visible.sync="addFeeVisiable">
      <el-form ref="addFeeForm" :model="addFeeForm" :rules="addFeeFormRule" label-width="100px">
        <el-form-item label="所属楼盘:">
          <el-cascader
            :options="CBOpt"
            @change="CBOptChange"
            v-model="defaultOpt"
            placeholder="请选择住户所属的楼盘"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="付款人:" prop="fHouserId" required>
          <el-select v-model="addFeeForm.fHouserId" placeholder="请选择收费单收款人">
            <el-option
              v-for="item in houserOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收款日期:" prop="fEndDate" required>
          <el-date-picker
            v-model="addFeeForm.fEndDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择收费单的收款日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="滞纳率:" prop="fDelayRate" required>
          <el-input
            style="width:40%"
            placeholder="逾期滞纳率"
            oninput="value=value.replace(/[^0-9.]/g,'')"
            v-model="addFeeForm.fDelayRate"
          >
            <template slot="append">%</template>
          </el-input>
          <el-tooltip
            class="item"
            effect="dark"
            content="逾期一周将按滞纳金率在本金的基础上多加一笔滞纳金费用"
            placement="right"
          >
            <i class="el-icon-question"></i>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="经办人:" prop="fCharger" required>
          <el-input placeholder="请输入经办人姓名" v-model="addFeeForm.fCharger"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFeeVisiable = false">取 消</el-button>
        <el-button type="success" @click="toAddFeeItems">添加收费项目</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="收费单内容"
      :visible.sync="feeItemsVisible"
      append-to-body
      :before-close="handleFeeItemsClose"
    >
      <el-button type="success" @click="addFeeItemVisiable= true" v-if="!queryFlag">添加收费标准</el-button>
      <el-table :data="feeItemData" v-loading="feeItemLoading">
        <el-table-column property="fi_name" label="科目名称" width="220"></el-table-column>
        <el-table-column property="fi_number" label="数量" width="120" align="center">
          <template slot-scope="scope">{{scope.row.fi_number==0? "-": scope.row.fi_number }}</template>
        </el-table-column>
        <el-table-column property="fi_money" label="金额" align="center"></el-table-column>
        <el-table-column property="fi_money" label="操作" align="center" v-if="!queryFlag">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="delFeeItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        金额:
        <span class="money">￥{{feeTotal}}</span>
      </div>
      <div slot="footer" class="dialog-footer" v-if="!queryFlag">
        <el-button @click="feeItemsVisible = false">取 消</el-button>
        <el-button type="success" @click="addFeeItemsSubmit">创建收费单</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-if="queryFlag">
        <el-button @click="feeItemsVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog width="40%" title="添加子项" :visible.sync="addFeeItemVisiable" append-to-body>
      <el-form
        ref="addFeeItemForm"
        :model="addFeeItemForm"
        :rules="addFeeItemFormRule"
        label-width="100px"
      >
        <el-form-item label="科目类型:" prop="fsType">
          <el-select v-model="addFeeItemForm.fsType" placeholder="请选择收费科目类型" @change="feeSubChange">
            <el-option
              v-for="item in feeSubTypeOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收费科目:" prop="fsName">
          <el-select
            placeholder="请选择收费科目类型"
            v-model="addFeeItemForm.fsName"
            @change="feeItemChange"
          >
            <el-option
              v-for="item in feeOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单价:" prop="fsPrice" v-if="this.addFeeItemForm.fsType == '计量类'">
          <el-input v-model="addFeeItemForm.fsPrice" readonly></el-input>
        </el-form-item>
        <el-form-item label="数量:" prop="fsNum" v-if="this.addFeeItemForm.fsType == '计量类'">
          <el-input placeholder="请输入计费数量" v-model="addFeeItemForm.fsNum" @input="fsNumChange"></el-input>
        </el-form-item>
        <el-form-item label="金额:" prop="fsMoney">
          <el-input placeholder="请输入金额" v-model="addFeeItemForm.fsMoney"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addFeeItemVisiable = false">取 消</el-button>
        <el-button type="success" @click="addFeeItemSubmit">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ModuleTitle from "components/base/ModuleTitle";
import ModuleContent from "components/base/ModuleContent";
import router from "@/router";
export default {
  name: "Fee",
  mounted() {
    setTimeout(() => {
      this.roleId = this.$storage.get("user").roleId;
      if (this.roleId == 2) {
        this.getHouserData(0);
      } else {
        this.getSysData(0);
      }
      this.getCBOpt();
    }, 20);
  },
  data() {
    return {
      fId: -1, // 收费单id保存
      addFeeVisiable: false,
      feeItemsVisible: false,
      addFeeItemVisiable: false,
      tableData: [],
      tableLoding: false,
      feeItemData: [],
      feeItemLoading: false,
      queryFlag: false,
      roleId: -1,
      // 默认显示第几页
      currentPage: 1,
      // 默认每页显示的条数（可修改）
      pageSize: 5,
      CBOpt: [],
      defaultOpt: [],
      houserOpts: [],
      feeSubTypeOpt: [
        {
          label: "固定类",
          value: "固定类"
        },
        {
          label: "计量类",
          value: "计量类"
        }
      ],
      feeOpt: [],
      addFeeForm: {
        fOrderNum: "",
        fHouserId: "",
        fCreateDate: new Date().toLocaleDateString(),
        fEndDate: "",
        fDelayRate: "",
        state: -1, // 未生效的账单
        fCharger: ""
      },
      addFeeFormRule: {
        fHouserId: [{ required: true, message: "付款人不可为空" }],
        fEndDate: [{ required: true, message: "收款日期不可为空" }],
        fDelayRate: [{ required: true, message: "逾期滞纳率不可为空" }],
        fCharger: [{ required: true, message: "经办人不可为空" }]
      },
      // 添加子项表单
      addFeeItemForm: {
        fsType: "",
        fsName: "",
        fsNum: 0,
        fsMoney: ""
      },
      addFeeItemFormRule: {
        fsName: [{ required: true, message: "科目名称不可为空" }],
        fsNum: [{ required: true, message: "计费数量不可为空" }],
        fsMoney: [{ required: true, message: "单项金额不可为空" }]
      }
    };
  },
  computed: {
    feeTotal() {
      let total = 0;
      this.feeItemData.forEach(ele => {
        total += ele.fi_money;
      });
      return total;
    }
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
    tabChange(tab) {
      let choice = tab.index;
      if (this.roleId == 2) {
        this.getHouserData(choice);
      } else {
        this.getSysData(choice);
      }
    },
    // 获取小区下拉列表数据
    getCBOpt() {
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
    // 格式化小区了楼盘下拉列表
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
      this.CBOpt = result;
    },
    // 获取小区楼盘下拉列表
    CBOptChange(val) {
      let bId = val[1];
      this.addFeeForm.fHouserId = "";
      // 获取指定楼盘下所有住户
      this.$http
        .get("/server/household/getAllbybId", {
          params: {
            bId: bId
          }
        })
        .then(res => {
          this.houserOpts = [];
          this.getHouseOpts(res.data.result || [], this.houserOpts);
        });
    },
    feeSubChange(val) {
      this.feeOpt = [];
      this.addFeeItemForm.fsName = "";
      this.$http
        .get("/server/feesub/getAllbyType", {
          params: {
            sId: this.$storage.get("user").systemId,
            fsType: val
          }
        })
        .then(res => {
          this.getFeeOpts(res.data.result || [], this.feeOpt);
        });
    },
    // 格式化收费科目下拉列表
    getFeeOpts(data, arr) {
      let obj = {};
      data.forEach(ele => {
        obj = {
          value: ele.fs_name,
          label: ele.fs_name,
          price: ele.fs_price
        };
        arr.push(obj);
      });
    },
    feeItemChange(val) {
      if (this.addFeeItemForm.fsType == "固定类") {
        return;
      }
      this.feeOpt.forEach(ele => {
        if (ele.value == val) {
          this.addFeeItemForm.fsPrice = ele.price;
          return;
        }
      });
    },
    fsNumChange(val) {
      if (this.addFeeItemForm.fsType == "固定类") {
        return;
      }
      this.addFeeItemForm.fsMoney = this.addFeeItemForm.fsPrice * val;
    },
    // 格式化楼盘下所有住户列表
    getHouseOpts(data, arr) {
      let obj = {};
      data.forEach(ele => {
        obj = {
          value: ele.h_id,
          label: ele.h_name
        };
        arr.push(obj);
      });
    },
    // 获取表格信息
    getSysData(state) {
      this.tableData = [];
      this.tableLoding = true;
      this.$http
        .get("/server/fee/getAllSysFee", {
          params: {
            sId: this.$storage.get("user").systemId,
            state: state
          }
        })
        .then(res => {
          this.tableData = res.data.result || [];
          this.tableLoding = false;
        })
        .catch(err => {
          this.tableLoding = false;
        });
    },

    getHouserData(state) {
      this.tableLoding = true;
      this.$http
        .get("/server/fee/getAllHouserFee", {
          params: {
            hId: this.$storage.get("user").userId,
            state: state
          }
        })
        .then(res => {
          this.tableData = res.data.result || [];
          this.tableLoding = false;
        })
        .catch(err => {
          this.tableLoding = false;
        });
    },

    // 生成唯一订单号
    getOrderNum() {
      let uuid =
        this.formatDateTime() +
        Math.random()
          .toString()
          .substring(2, 12);
      return uuid;
    },
    formatDateTime() {
      var date = new Date();
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      return y + m + d + h + minute + second;
    },

    // 生成收费单基础信息 跳转到收费单子项框
    toAddFeeItems() {
      this.$refs["addFeeForm"].validate(valid => {
        if (valid) {
          this.addFeeForm.fOrderNum = this.getOrderNum();
          this.$http
            .post("/server/fee/add", {
              data: this.addFeeForm,
              sId: this.$storage.get("user").systemId
            })
            .then(res => {
              if (res.data.status == "1") {
                this.fId = res.data.result.insertId;
                this.addFeeForm = {
                  fOrderNum: "",
                  fHouserId: "",
                  fCreateDate: new Date().toLocaleDateString(),
                  fEndDate: "",
                  fDelayRate: "",
                  state: -1, // 未生效的账单
                  fCharger: ""
                };
                this.feeItemData = [];
                this.feeItemsVisible = true;
              } else {
                this.$message.error(res.data.msg);
                this.addFeeVisiable = false;
              }
            });
        }
      });
    },
    // 往生成的收费单中插入所有子项
    addFeeItemsSubmit() {
      // 更新总额 和 状态
      this.$http
        .post("/server/fee/updateFee", {
          fId: this.fId,
          totalMoney: this.feeTotal,
          state: 0
        })
        .then(res => {
          if (res.data.status == "1") {
            this.$message.success(res.data.msg);
          } else {
            this.$message.error(res.data.msg);
          }
        });
      this.feeItemsVisible = false;
      this.addFeeVisiable = false;
      this.fId = -1;
    },
    // 添加收费标准
    addFeeItemSubmit() {
      this.$refs["addFeeItemForm"].validate(valid => {
        if (valid) {
          this.$http
            .post("/server/fee/addFeeItem", {
              fId: this.fId,
              data: this.addFeeItemForm
            })
            .then(res => {
              if (res.data.status == "1") {
                this.$message.success(res.data.msg);
              } else {
                this.$message.error(res.data.msg);
              }
              this.addFeeItemForm = {
                fsType: "",
                fsName: "",
                fsNum: 0,
                fsMoney: ""
              };
              this.addFeeItemVisiable = false;
              this.getFeeItem(this.fId);
            });
        }
      });
    },
    // 获取收费单所有的收费小项
    getFeeItem(id) {
      this.$http
        .get("/server/fee/getAllFeeItem", {
          params: {
            fId: id
          }
        })
        .then(res => {
          this.feeItemLoading = true;
          if (res.data.status == "1") {
            this.feeItemData = res.data.result;
            this.feeItemLoading = false;
          }
        });
    },
    // 删除收费标准
    delFeeItem(data) {
      this.$http
        .post("/server/fee/delFeeItem", {
          fiId: data.fi_id
        })
        .then(res => {
          if (res.data.status == "1") {
            this.getFeeItem(data.fi_fee_id);
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    // 查询明细
    queryaFeeItem(id) {
      this.feeItemsVisible = true;
      this.getFeeItem(id);
      this.queryFlag = true;
    },
    // 查询明细关闭前
    handleFeeItemsClose() {
      this.feeItemsVisible = false;
      setTimeout(() => {
        this.queryFlag = false;
      }, 80);
    },

    // 付款操作
    payFee(id) {
      this.$confirm("收费单模板,未完成", "支付", {
        confirmButtonText: "支付",
        type: "success"
      })
        .then(() => {
          this.$http
            .post("/server/fee/updateFeeState", {
              fId: id,
              state: 1
            })
            .then(res => {
              if (res.data.status == "1") {
                this.$message.success(res.data.msg);
                this.getSysData(0);
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
.item {
  margin: 4px;
}
.money {
  color: #ff7300;
  font-size: 22px;
}
</style>