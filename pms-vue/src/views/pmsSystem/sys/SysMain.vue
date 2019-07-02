<template>
  <div class="layoutBlock">
    <div class="userBlock">
          <div class="user-img">
            <img src="\..\..\static\user.jpg" alt>
          </div>
          <div class="user-content">
            <p>欢迎使用pxx物业管理系统</p>
            <div>你的所属系统到期时间为:{{this.systemEndTime}} <el-button type="text" v-if="this.$storage.get('user').roleId !== 2" @click="tobuySystem" >系统续费</el-button> </div>
          </div>
    </div>
  </div>
</template>
<script>
import router from "@/router";
export default {
  name: "SysMain",
  mounted() {
    setTimeout(() => {
      let sId = this.$storage.get('user').systemId
      if(sId !== null){
        this.getSystemInfo(sId);
      }
    }, 20);
  },
  data() {
    return {
      systemEndTime: ""
    };
  },
  methods: {
    
    tobuySystem(){
      router.push('/user/systembuy')
    },
    getSystemInfo(id){
      this.$http
        .get("/server/system/getById", {
          params: {
            sId: id
          }
        })
        .then(res => {
          console.log(res);

          let data = res.data.result;
          
          this.systemEndTime = new Date(data.s_endtime).toLocaleDateString();
          
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.layoutBlock{
}
.userBlock {
  background-color: #fff;
  padding: 40px 0 20px 20px;
  display: flex;
  align-items: center;
  .user-img img {
    cursor: pointer;
    width: 72px;
    height: 72px;
    border-radius: 50%;
  }
  .user-content {
    margin-left: 40px;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>