<template>
  <div>
    <module-title>
      <template slot="bread">
        <el-breadcrumb-item>数据中心</el-breadcrumb-item>
        <el-breadcrumb-item>车位管理</el-breadcrumb-item>
      </template>
      添加车位
    </module-title>
    <module-content>
      <template slot="form">
        <el-form
          label-position="right"
          ref="addParkForm"
          :model="addParkForm"
          :rules="addParkRules"
          label-width="100px"
        >
          <el-form-item label="所属小区:" prop="pCommunity" required>
            <el-select v-model="addParkForm.pCommunity" placeholder="请输入小区名称" @change="communityChange">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车位号:" prop="pNumber" required>
            <el-input placeholder="请输入车位号" v-model="addParkForm.pNumber"></el-input>
          </el-form-item>
          <el-form-item label="车库面积:" prop="pArea">
            <el-input v-model="addParkForm.pArea" oninput="value=value.replace(/[^0-9.]/g,'')">
              <template slot="append">平方米</template>
            </el-input>
          </el-form-item>
          <el-form-item label="车位类型:" prop="pStyle" required>
            <el-select v-model="addParkForm.pStyle" placeholder="请选择车位类型">
              <el-option
                v-for="item in styleOpts"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车位状态:" prop="pStatus" v-if="addParkForm.pStyle == '产权车位'">
            <el-select v-model="addParkForm.pStatus" placeholder="请选择车位状态">
              <el-option
                v-for="item in statusOpts"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <template v-if="addParkForm.pStatus == '已售'">
            <el-form-item label="产权人:" prop="pBuyer">
              <el-input placeholder="请输入产权人姓名" v-model="addParkForm.pBuyer"></el-input>
            </el-form-item>
            <el-form-item label="车牌号:" prop="pCarNumber">
              <el-input placeholder="请输入车位所属车辆的车牌号" v-model="addParkForm.pCarNumber"></el-input>
            </el-form-item>
            <el-form-item label="联系方式:" prop="pBuyerPhone">
              <el-input placeholder="请输入产权人手机" v-model="addParkForm.pBuyerPhone"></el-input>
            </el-form-item>
          </template>
          <el-form-item label="备 注:" prop="pRemaeks">
            <el-input
              type="textarea"
              autosize
              placeholder="100个字符以内"
              v-model="addParkForm.pRemaeks"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="addParkSubmit">保存</el-button>
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
  name: "ParkAdd",
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

      // 编辑模式
      let pId = this.$route.params.pId;
      if (pId) {
        this.$http
          .get("/server/park/getById", {
            params: {
              pId: pId
            }
          })
          .then(res => {
            let data= res.data.result[0];
            this.updatepParkNum = data.p_number;
            this.updateCommunity = data.p_community_id;
            this.addParkForm = {
              pId: pId,
              pCommunity: data.p_community_id,
              pNumber: data.p_number,
              pArea: data.p_area,
              pStyle: data.p_style,
              pStatus: data.p_status,
              pBuyer: data.p_buyer,
              pCarNumber: data.p_car_number,
              pBuyerPhone: data.p_buyer_phone,
              pRemarks: data.p_remarck
            };
          });
      }
    }, 20);
  },
  data() {
    var validateParkNum = (rule, value, callback) => {
      // 更新时保存更新前的小区名称和车位号，用来过滤重复验证
      if (this.updatepParkNum == value && this.updateCommunity == this.addParkForm.pCommunity) {
        callback();
      }
      if (this.addParkForm.pCommunity !== "") {
        this.$http
          .get("/server/park/check", {
            params: {
              pNumber: value,
              cId: this.addParkForm.pCommunity
            }
          })
          .then(res => {
            if (res.data.status == "1") {
              callback(new Error(res.data.msg));
            } else {
              callback();
            }
          });
      } else {
        callback();
      }
    };
    return {
      options: [],
      styleOpts: [
        {
          value: "公共车位",
          label: "公共车位"
        },
        {
          value: "产权车位",
          label: "产权车位"
        },
        {
          value: "人防车位",
          label: "人防车位"
        }
      ],
      statusOpts: [
        {
          value: "已售",
          label: "已售"
        },
        {
          value: "待售",
          label: "待售"
        }
      ],
      addParkForm: {
        pCommunity: "",
        pNumber: "",
        pArea: 0,
        pStyle: "",
        pStatus: "",
        pBuyer: "",
        pCarNumber: "",
        pBuyerPhone: "",
        pRemarks: ""
      },
      addParkRules: {
        bCommunity: [{ required: true, message: "所属小区不可为空" }],
        pNumber: [
          { required: true, message: "车位号不可为空" },
          { validator: validateParkNum, trigger: "blur" }
        ],
        pStyle: [{ required: true, message: "车位类型不可为空" }],
        pBuyer: [{ required: true, message: "产权人不可为空" }],
        pCarNumber: [
          { required: true, message: "车牌号不可为空" },
          {
            pattern: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
            message: "请输入正确的车牌号格式"
          }
        ],
        pBuyerPhone: [
          { required: true, message: "联系方式不可为空" },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$/,
            message: "请输入正确的手机号格式"
          }
        ],
        pRemarks:[{ max: 100, message: "长度最多为100个字符", trigger: "blur" }]
      },
      updatepParkNum: "-1",
      updateCommunity: "-1"

    };
  },
  components: {
    ModuleTitle,
    ModuleContent
  },
  methods: {
    goBack() {
      router.push("/sys/data/park");
    },
    addParkSubmit() {
      this.$refs["addParkForm"].validate(valid => {
        if (valid) {
          if (this.addParkForm.pId) {
            // 修改信息
            this.$http.post('/server/park/updateAll',{
              data: this.addParkForm
            }).then(res=>{
              if (res.data.status == "1") {
                  this.$message({
                    type: "success",
                    message: res.data.msg
                  });
                  this.updatepParkNum = this.addParkForm.pNumber;
                  this.updateCommunity = this.addParkForm.pCommunity;
                } else {
                  this.$message.error(res.data.msg);
                }
            })
          } else {
            // 添加信息
            this.$http
              .post("/server/park/add", {
                data: this.addParkForm
              })
              .then(res => {
                console.log(res);
                if (res.data.status == "1") {
                  this.$message({
                    type: "success",
                    message: res.data.msg
                  });
                  this.goBack();
                } else {
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
    },
    communityChange(val){
      if(this.updateCommunity == '-1'){
        return;
      }else{
        this.$refs['addParkForm'].validateField('pNumber');
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>