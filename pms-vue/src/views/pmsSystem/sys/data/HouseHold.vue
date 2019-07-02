<template>
  <div>
    <module-title>
      <template slot="bread">
        <el-breadcrumb-item>数据中心</el-breadcrumb-item>
        <el-breadcrumb-item>住户管理</el-breadcrumb-item>
      </template>
      住户列表
    </module-title>

    <module-content>
      <template slot="btnBlock">
        <el-button type="success" @click="toAddHouseHold">
          <i class="el-icon-plus"></i> 添加住户
        </el-button>
        <!-- <el-button type="danger">删除</el-button> -->
      </template>
      <template slot="searchBlock">
        <el-input placeholder="请输入关键字" @input="searchChange">
          <el-button type="success" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </template>
      <el-tabs @tab-click="handleTabClick" type="border-card" style="width:100%">
        <el-tab-pane label="待审核">
          <el-table
            :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
            style="width: 100%"
            v-loading="tableLoading1"
          >
            <el-table-column prop="h_phone" label="手机" width="140"></el-table-column>
            <el-table-column prop="h_name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="c_name" sortable label="小区" width="140"></el-table-column>
            <el-table-column prop="b_name" label="楼盘" width="140"></el-table-column>
            <el-table-column prop="h_doorplate" label="门牌号" width="80"></el-table-column>
            <el-table-column prop="h_identity" label="住户身份" width="120"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="queryHousehold(scope.row.h_id)">审核管理</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagesBlock">
            <el-pagination
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :total="this.tableData.length"
              :page-size="this.PageSize"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已审核">
          <el-table
            :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
            style="width: 100%"
            v-loading="tableLoading2"
          >
            <el-table-column prop="h_phone" label="手机" width="140"></el-table-column>
            <el-table-column prop="h_name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="c_name" sortable label="小区" width="140"></el-table-column>
            <el-table-column prop="b_name" label="楼盘" width="140"></el-table-column>
            <el-table-column prop="h_doorplate" label="门牌号" width="80"></el-table-column>
            <el-table-column prop="h_identity" label="住户身份" width="120"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="queryHousehold(scope.row.h_id)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
         <div class="pagesBlock">
            <el-pagination
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :total="this.tableData.length"
              :page-size="this.PageSize"
            ></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </module-content>
  </div>
</template>
<script>
export default {
  name: "HouseHold",
  mounted() {
    setTimeout(() => {
      this.getUncheckData();
    }, 20);
  },
  data() {
    return {
      tableLoading1: false,
      tableLoading2: false,
      tableData: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      //   totalCount: 1,
      // 默认每页显示的条数（可修改）
      PageSize: 5
    };
  },
  components: {
    ModuleTitle,
    ModuleContent
  },
  methods: {
    toAddHouseHold() {
      router.push("/sys/data/household-edit");
    },
    queryHousehold(id) {
      router.push({
        name: "household-edit",
        params: {
          hId: id
        }
      });
    },
    handleCurrentChange(val) {
      // 同步当前页
      this.currentPage = val;
    },
    getCheckedData() {
      this.tableLoading2 = true;
      this.$http
        .get("/server/household/getAll", {
          params: {
            sId: this.$storage.get("user").systemId,
            hState: 1
          }
        })
        .then(res => {
          this.tableData = res.data.result || [];
          this.tableLoading2 = false;
        })
        .catch(err => {
          this.tableLoading2 = false;
          this.$message.error("数据获取失败");
        });
    },
    getUncheckData() {
      this.tableLoading1 = true;
      this.$http
        .get("/server/household/getAll", {
          params: {
            sId: this.$storage.get("user").systemId,
            hState: 0
          }
        })
        .then(res => {
          this.tableData = res.data.result || [];
          this.tableLoading1 = false;
        })
        .catch(err => {
          this.tableLoading1 = false;
          this.$message.error("数据获取失败");
        });
    },
    searchChange(val) {
      console.log(
        this.tableData.filter(data => !val || data.h_phone.includes(val))
      );
    },
    handleTabClick(tab) {
      let choice = tab.index;
      if (choice == 0) {
        this.getUncheckData();
      } else if (choice == 1) {
        this.getCheckedData();
      }
    }
  }
};
import ModuleTitle from "components/base/ModuleTitle";
import ModuleContent from "components/base/ModuleContent";
import router from "@/router";
</script>
<style lang="scss" scoped>
.pagesBlock{
  display: flex;
  justify-content: flex-end;
}
</style>