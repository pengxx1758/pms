<template>
  <div>
    <module-title>
      <template slot="bread">
        <el-breadcrumb-item>数据中心</el-breadcrumb-item>
        <el-breadcrumb-item>楼盘管理</el-breadcrumb-item>
      </template>
      楼盘列表
    </module-title>

    <module-content>
      <template slot="btnBlock">
        <el-button type="success" @click="toAddBuilding">
          <i class="el-icon-plus"></i> 添加楼盘
        </el-button>
        <!-- <el-button type="danger">删除</el-button> -->
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
        <el-table-column prop="c_name" label="所属小区" width="140"></el-table-column>
        <el-table-column prop="b_name" label="楼盘名称" width="140"></el-table-column>
        <el-table-column prop="b_unit" label="单元数" width="100"></el-table-column>
        <el-table-column prop="b_layer" label="楼层数" width="100"></el-table-column>
        <el-table-column prop="b_house_number" label="房屋数" width="100"></el-table-column>
        <el-table-column prop="b_style" label="房屋类型" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="queryBuilding(scope.row.b_id)">编辑</el-button>
            <el-button type="text" size="mini" @click="delBuilding(scope.row.b_id)">删除</el-button>
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
  name: "building",
  mounted() {
    this.getData();
  },
  data() {
    return {
      tableLoading: false,
      tableData: [{}],
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
    toAddBuilding() {
      router.push("/sys/data/building-edit");
    },
    handleCurrentChange(val) {
      // 同步当前页
      this.currentPage = val;
    },
    queryBuilding(id) {
      router.push({
        name: "building-edit",
        params: {
          id: id
        }
      });
    },
    delBuilding(id){
      this.$confirm(`确定删除楼盘吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("/server/building/delBuilding", {
              bId: id
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
    getData() {
      this.tableLoading = true;
      this.$http
        .get("/server/building/getAll", {
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
        });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>