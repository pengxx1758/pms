<template>
  <div>
    <module-title>
      <template slot="bread">
        <el-breadcrumb-item>数据中心</el-breadcrumb-item>
        <el-breadcrumb-item>小区管理</el-breadcrumb-item>
      </template>
      小区列表
      <template slot="other">说明</template>
    </module-title>

    <module-content> 
      <template slot="btnBlock">
        <el-button type="success" @click="toAddComunity">
          <i class="el-icon-plus"></i> 添加小区
        </el-button> <span class="font">可购买 <span class="cfont">{{cNum}}</span> 个小区</span>
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
        <el-table-column prop="c_name" label="小区名称" width="120"></el-table-column>
        <el-table-column prop="c_region" label="所在地区" width="180"></el-table-column>
        <el-table-column prop="c_place" label="详细地址" width="350"></el-table-column>
        <el-table-column prop="c_charger" label="负责人" width="100"></el-table-column>
        <el-table-column prop="c_phone" label="联系电话" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="queryCommunity(scope.row.c_id)">编辑</el-button>
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
import { CodeToText } from "element-china-area-data";
import router from "@/router";
export default {
  name: "community",
  mounted() {
    setTimeout(() => {
      this.tableLoading = true;
      this.$http
        .get("/server/community/list", {
          params: {
            sId: this.$storage.get('user').systemId
          }
        })
        .then(res => {
          this.tableData = res.data.result || [];
          this.formatRegion();
          this.tableLoading = false;
        }).catch(err=> {
          this.tableLoading = false;
        });

        this.getSystemInfo();
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
      cNum: 0
    };
  },
  components: {
    ModuleTitle,
    ModuleContent
  },
  methods: {
    toAddComunity() {
      if(this.tableData.length>=this.cNum){
        this.$message.warning('系统小区不足，请前往购买');
      }else{
        router.push("/sys/data/community-edit");
      }
    },
    queryCommunity(id) {
      console.log(id);
      router.push({
        name: "community-edit",
        params: {
          id: id
        }
      });
    },
    handleCurrentChange(val) {
      // 同步当前页
      this.currentPage = val;
    },
    formatRegion() {
      this.tableData.forEach(ele => {
        let template = ele.c_region.split(",");
        ele.c_region = "";
        template.forEach((temEle, index) => {
          ele.c_region += CodeToText[temEle];
        });
      });
    },
    getSystemInfo(){
      this.$http
        .get("/server/system/getById", {
          params: {
            sId: this.$storage.get('user').systemId
          }
        })
        .then(res => {
          this.cNum = res.data.result.sc_number;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.font{
  font-size: 14px;
  color: #999;
}
.cfont{
  color: #ff7300;
}
</style>