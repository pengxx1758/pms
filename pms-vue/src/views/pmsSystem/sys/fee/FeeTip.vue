<template>
  <div>
    <module-title>
      <template slot="bread">
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>欠费管理</el-breadcrumb-item>
      </template>
      收费列表
    </module-title>

    <module-content>
      <template slot="btnBlock">
        <!-- <el-button type="success" >
          <i class="el-icon-plus"></i> 添加小区
        </el-button> -->
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
                  <el-button type="text" size="mini" @click="queryaFeeItem(scope.row.f_id)">发送提醒</el-button>
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
  </div>
</template>
<script>
import ModuleTitle from "components/base/ModuleTitle";
import ModuleContent from "components/base/ModuleContent";
import router from "@/router";
export default {
  name: "FeeTip",
  data () {
    return {
      tableLoading: false,
      tableData: [],
      // 默认显示第几页
      currentPage: 1,
      // 默认每页显示的条数（可修改）
      PageSize: 5
    };
  },
  components:{
    ModuleTitle,
    ModuleContent
  },
  methods: {
     handleCurrentChange(val) {
      // 同步当前页
      this.currentPage = val;
    },
    queryaFeeItem(id) {
      this.feeItemsVisible = true;
      this.getFeeItem(id);
      this.queryFlag = true;
    },
  }
}
</script>
<style lang="scss" scoped>
</style>