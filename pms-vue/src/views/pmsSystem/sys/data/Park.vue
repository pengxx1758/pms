<template>
  <div>
    <module-title>
      <template slot="bread">
        <el-breadcrumb-item>数据中心</el-breadcrumb-item>
        <el-breadcrumb-item>车位管理</el-breadcrumb-item>
      </template>
      车位列表
    </module-title>

    <module-content>
      <template slot="btnBlock">
        <el-button type="success" @click="toAddPark">
          <i class="el-icon-plus"></i> 添加车位
        </el-button>
        <el-button type="danger">删除</el-button>
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
        <el-table-column prop="p_id" label="车位编号" width="120"></el-table-column>
        <el-table-column prop="c_name" label="所属小区" sortable width="180"></el-table-column>
        <el-table-column prop="p_number" label="车位号" width="120"></el-table-column>
        <el-table-column prop="p_style" label="车位类型" sortable width="150"></el-table-column>
        <el-table-column prop="p_status" label="车位状态" sortable width="120"></el-table-column>
        <el-table-column prop="p_area" label="车位面积" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="queryPark(scope.row.p_id)">编辑</el-button>
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
  name: "park",
  mounted() {
    setTimeout(() => {
      this.getData();
    }, 20);
  },
  data() {
    return {
      tableLoading: false,
      tableData: [
        {
          p_id: 1,
          c_name: "测试小区",
          p_number: "001",
          p_style: "公共车位",
          p_status: "已出租",
          p_area: 10
        }
      ],
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
    toAddPark() {
      router.push("/sys/data/park-edit");
    },
    handleCurrentChange(val) {
      // 同步当前页
      this.currentPage = val;
    },
    queryPark(id) {
      router.push({
        name: "park-edit",
        params: {
          pId: id
        }
      });
    },
    getData() {
      this.tableLoading = true;
      this.$http
        .get("/server/park/getAll", {
          params: {
            sId: this.$storage.get('user').systemId
          }
        })
        .then(res => {
          this.tableData = res.data.result || [];
          this.tableLoading = false;
        })
        .catch(err => {
          this.tableLoading = false;
          this.$message.error("数据获取失败");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>