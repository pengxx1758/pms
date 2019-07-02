<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button type="primary" @click="getRandom">获取随机值</el-button>

    <hr>
    图片上传测试
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <hr>
    storage测试<br>
    <el-button type="primary" @click="setStorage">设置</el-button>
    <el-button type="primary" @click="getStorage">获取</el-button>
    <el-button type="primary" @click="removeStorage">移除</el-button>
    
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      imageUrl: ""
    };
  },
  methods: {
    getRandom() {
      let code = "";
      for (let i = 0; i < 4; i++) {
        let r = 1 + Math.random() * 9;
        console.log(r);
        code += Math.floor(r);
      }
      console.log(code);
      return code;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(file);
      console.log(this.imageUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    setStorage(){
      this.$storage.set('user',{
        testId: 1,
        testData: 'awsl'
      })
      console.log(11);
    },
    getStorage(){
      console.log(this.$storage.get('user','无'));
      // console.log(this.$storage.getAll());
    },
    removeStorage(){
      this.$storage.remove('test');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.avatar-uploader .el-upload {
  border: 1px dashed #919191;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
