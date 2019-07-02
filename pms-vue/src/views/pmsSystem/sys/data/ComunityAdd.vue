<template>
  <div>
    <module-title>
      <template slot="bread">
        <el-breadcrumb-item>数据中心</el-breadcrumb-item>
        <el-breadcrumb-item>小区管理</el-breadcrumb-item>
      </template>
      添加小区
    </module-title>
    <module-content>
      <template slot="form">
        <el-form
          label-position="right"
          ref="addCommunityForm"
          :model="addCommunityForm"
          :rules="addCommunityRules"
          label-width="100px"
        >
          <el-form-item label="小区名称:" prop="cName" required>
            <el-input :disabled="cNameDisable" placeholder="请输入小区名称" v-model="addCommunityForm.cName"></el-input>
          </el-form-item>
          <el-form-item label="所在地区:" prop="cRegion" required>
            <el-cascader
              placeholder="请选择所在地区"
              :options="options"
              v-model="addCommunityForm.cRegion"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址:" prop="cPlace" required>
            <el-input placeholder="请输入详细地址" v-model="addCommunityForm.cPlace"></el-input>
          </el-form-item>
          <el-form-item label="负责人:" prop="cCharger">
            <el-input placeholder="请输入负责人姓名" v-model="addCommunityForm.cCharger"></el-input>
          </el-form-item>
          <el-form-item label="客服电话:" prop="cPhone">
            <el-input placeholder="请输入客服电话" v-model="addCommunityForm.cPhone"></el-input>
          </el-form-item>
          <el-form-item label="占地面积:" prop="cArea">
            <el-input
              placeholder="0.00"
              v-model="addCommunityForm.cArea"
              oninput="value=value.replace(/[^0-9.]/g,'')"
            >
              <template slot="append">平方米</template>
            </el-input>
          </el-form-item>
          <el-form-item label="建筑面积:" prop="cBuildingArea">
            <el-input
              placeholder="0.00"
              v-model="addCommunityForm.cBuildingArea"
              oninput="value=value.replace(/[^0-9.]/g,'')"
            >
              <template slot="append">平方米</template>
            </el-input>
          </el-form-item>
          <el-form-item label="公共面积:" prop="cPublicArea">
            <el-input
              placeholder="0.00"
              v-model="addCommunityForm.cPublicArea"
              oninput="value=value.replace(/[^0-9.]/g,'')"
            >
              <template slot="append">平方米</template>
            </el-input>
          </el-form-item>
          <el-form-item label="绿化面积:" prop="cGreening">
            <el-input
              placeholder="0.00"
              v-model="addCommunityForm.cGreening"
              oninput="value=value.replace(/[^0-9.]/g,'')"
            >
              <template slot="append">平方米</template>
            </el-input>
          </el-form-item>
          <el-form-item label="车库面积:" prop="cGarageArea">
            <el-input
              placeholder="0.00"
              v-model="addCommunityForm.cGarageArea"
              oninput="value=value.replace(/[^0-9.]/g,'')"
            >
              <template slot="append">平方米</template>
            </el-input>
          </el-form-item>
          <el-form-item label="备 注:" prop="cRemarks">
            <el-input
              type="textarea"
              autosize
              placeholder="100个字符以内"
              v-model="addCommunityForm.cRemarks"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="success" @click="addCommunitySubmit">保存</el-button>
            <el-button @click="goBack">返回</el-button>
          </el-form-item>
        </el-form>
      </template>
    </module-content>
  </div>
</template>
<script>
import ModuleTitle from "components/base/ModuleTitle";
import ModuleContent from "components/base/ModuleContent";
import { regionData } from "element-china-area-data";
import router from "@/router";
export default {
  name: "AddComunity",
  mounted() {
    let cId = this.$route.params.id;
    if (cId) {
      this.$http
        .get("/server/community/detail", {
          params: {
            cId: cId
          }
        })
        .then(res => {
          let data = res.data.result[0];
          this.updateName = data.c_name;
          this.addCommunityForm = {
            cId: data.c_id,
            cName: data.c_name,
            cRegion: data.c_region.split(","),
            cPlace: data.c_place,
            cCharger: data.c_charger,
            cPhone: data.c_phone,
            // 以下是建筑面积信息
            cArea: data.c_area,
            cBuildingArea: data.c_buildingArea || "0.00",
            cPublicArea: data.c_publicArea || "0.00",
            cGreening: data.c_greening || "0.00",
            cGarageArea: data.c_garageArea || "0.00",
            cRemarks: data.c_remarks
          };
          this.cNameDisable = true;
        });
    }
  },
  data() {
    var validatecName = (rule, value, callback) => {
      // 更新时保存更新前的小区名称，用来过滤重复验证
      if (this.updateName == value) {
        callback();
      }
      this.$http
        .get("/server/community/check", {
          params: {
            cName: value,
            systemId: this.$storage.get('user').systemId
          }
        })
        .then(res => {
          if (res.data.status == "1") {
            callback(new Error(res.data.msg));
          }else{
            callback();
          }
        });
    };
    return {
      options: regionData,
      region: [],
      cNameDisable: false,
      addCommunityForm: {
        cName: "",
        cRegion: [],
        cPlace: "",
        cCharger: "",
        cPhone: "",
        // 以下是建筑面积信息
        cArea: 0.00,
        cBuildingArea: 0.00,
        cPublicArea: 0.00,
        cGreening: 0.00,
        cGarageArea: 0.00,
        cRemarks: ""
      },
      addCommunityRules: {
        cName: [
          { required: true, message: "小区名称不可为空" },
          { validator: validatecName, trigger: "blur" }
        ],
        cRegion: [{ required: true, message: "地区不可为空" }],
        cPlace: [{ required: true, message: "详细地址不可为空" }],
        cPhone:[{ pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$/, message: "请输入正确的手机号格式" }],
        cRemarks: [
          { max: 100, message: "长度最多为100个字符", trigger: "blur" }
        ]
      },
      updateName: "-1"
    };
  },
  components: {
    ModuleTitle,
    ModuleContent
  },
  methods: {
    goBack() {
      router.push("/sys/data/community");
      // router.go(-1);
    },
    addCommunitySubmit() {
      this.$refs["addCommunityForm"].validate(valid => {
        if (valid) {
          if (this.addCommunityForm.cId) {
            // 修改信息
            this.$http
              .post("/server/community/updateAll", {
                data: this.addCommunityForm
              })
              .then(res => {
                console.log(res);
                if (res.data.status == "1") {
                  this.$message({
                    type: "success",
                    message: res.data.msg
                  });
                  this.updateName = this.addCommunityForm.cName;
                }else{
                  this.$message.error(res.data.msg);
                }
              });
          } else {
            //添加信息
            this.$http
              .post("/server/community/add", {
                data: this.addCommunityForm,
                systemId: this.$storage.get('user').systemId 
              })
              .then(res => {
                if (res.data.status == "1") {
                  this.$message({
                    type: "success",
                    message: res.data.msg
                  });
                  this.goBack();
                }else{
                  this.$message.error(res.data.msg);
                }
              });
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-cascader {
  width: 100%;
}
</style>