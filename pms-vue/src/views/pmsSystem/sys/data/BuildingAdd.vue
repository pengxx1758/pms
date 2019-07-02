<template>
  <div>
    <module-title>
      <template slot="bread">
        <el-breadcrumb-item>数据中心</el-breadcrumb-item>
        <el-breadcrumb-item>楼盘管理</el-breadcrumb-item>
      </template>
      添加楼盘
    </module-title>
    <module-content>
      <template slot="form">
        <el-form
          label-position="right"
          ref="addBuildingForm"
          :model="addBuildingForm"
          :rules="addBuildingRules"
          label-width="100px"
        >
          <el-form-item label="所属小区:" prop="bCommunity" required>
            <el-select v-model="addBuildingForm.bCommunity" placeholder="请输入小区名称" :disabled="communityable">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!-- <el-input placeholder="请输入小区名称" v-model="addBuildingForm.bCommunity"></el-input> -->
          </el-form-item>
          <el-form-item label="楼盘名称:" prop="bName" required>
            <el-input placeholder="请输入楼盘名称" v-model="addBuildingForm.bName"></el-input>
          </el-form-item>
          <el-form-item label="单元数量:" prop="bUnitNum" required>
            <el-input-number v-model="addBuildingForm.bUnitNum" controls-position="right" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item label="楼盘层数:" prop="bLayerNum" required>
            <el-input-number v-model="addBuildingForm.bLayerNum" controls-position="right" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item label="房屋数量:" prop="bHouseNum">
            <el-input-number v-model="addBuildingForm.bHouseNum" controls-position="right" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="楼盘类型:" prop="bStyle">
            <el-input placeholder="例如：高层/多层" v-model="addBuildingForm.bStyle"></el-input>
          </el-form-item>
          <el-form-item label="楼盘说明:" prop="bDescription">
            <el-input
              type="textarea"
              autosize
              placeholder="说明楼盘的结构，朝向等信息,100个字符以内"
              v-model="addBuildingForm.bDescription"
            ></el-input>
          </el-form-item>
          <el-form-item label="备 注:" prop="cRemarks">
            <el-input
              type="textarea"
              autosize
              placeholder="100个字符以内"
              v-model="addBuildingForm.cRemarks"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="addBuildingSubmit">保存</el-button>
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
import router from "@/router";
export default {
  name: "building-add",
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

      // 编辑楼盘获取数据
      let bId = this.$route.params.id;
      if (bId) {
        this.$http
          .get("/server/building/getById", {
            params: {
              bId: bId
            }
          })
          .then(res => {
            let data = res.data[0];
            this.updateName = data.b_name;
            this.addBuildingForm = {
              bId: bId,
              bCommunity: data.b_community_id,
              bName: data.b_name,
              bUnitNum: data.b_unit,
              bLayerNum: data.b_layer,
              bHouseNum: data.b_house_number,
              bStyle: data.b_style,
              bDescription: data.b_description,
              bRemaeks: data.b_remarks
            };
            this.communityable = true;
          });
      }
    }, 20);
  },
  data() {
    var validatebName = (rule, value, callback) => {
      // 更新时保存更新前的小区名称，用来过滤重复验证
      if (this.updateName == value) {
        callback();
      }
      this.$http
        .get("/server/building/check", {
          params: {
            bName: value,
            bcId: this.addBuildingForm.bCommunity
          }
        })
        .then(res => {
          if (res.data.status == "1") {
            callback(new Error(res.data.msg));
          } else {
            callback();
          }
        })
        .catch(err => {
          callback("服务器错误");
        });
    };
    return {
      communityable: false,
      options: [],
      value: "",
      updateName: "-1",
      addBuildingForm: {
        bCommunity: "",
        bName: "",
        bUnitNum: 1,
        bLayerNum: 1,
        bHouseNum: 0,
        bStyle: "",
        bDescription: "",
        bRemaeks: ""
      },
      addBuildingRules: {
        bCommunity: [{ required: true, message: "所属小区不可为空" }],
        bName: [
          { required: true, message: "楼盘名称不可为空" },
          { validator: validatebName, trigger: "blur" }
        ]
      }
    };
  },
  components: {
    ModuleTitle,
    ModuleContent
  },
  methods: {
    goBack() {
      router.push("/sys/data/building");
    },
    addBuildingSubmit() {
      this.$refs["addBuildingForm"].validate(valid => {
        if (valid) {
          if (this.addBuildingForm.bId) {
            // 更新楼盘
            this.$http.post('/server/building/updateAll',{
              data: this.addBuildingForm
            }).then(res => {
              if (res.data.status == "1") {
                  this.$message({
                    type: "success",
                    message: res.data.msg
                  });
                  this.updateName = this.addBuildingForm.bName;
              }else{
                this.$message.error(res.data.msg) 
              }
            })
          } else {
            // 添加楼盘
            this.$http
              .post("/server/building/add", {
                data: this.addBuildingForm
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
    }
  }
};
</script>
<style lang="scss" scoped>
.el-select {
  width: 100%;
}
.el-input-number {
  width: 120px;
}
</style>