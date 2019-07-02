<template>
  <div>
    <Header></Header>
    <div class="content">
      <div class="text">
        <p class="title">智慧社区 简单管理</p>
        <p class="desc">
          简易的社区物业管理系统，提供基本社区信息管理，基础的收费管理，物业内部组织结构管理等基础物业管理功能，帮助建设和谐、高效的智慧型社区管理服务体系。
        </p>
        <div class="btnBlock">
          <button class="login-btn" @click="toLogin">立即体验</button>
        </div>
      </div>
      <div class="banner">
        <div class="img-placeholder"></div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "components/base/Header";
import Footer from "components/base/Footer";
import router from "@/router"
export default {
  name: "SaasIndex",
  data() {
    return {};
  },
  methods: {
    toLogin(){
      router.push('/user')
    }
  },
  components: {
    Header,
    Footer
  }
};
</script>
<style lang="scss" scoped>
.content {
  margin-top: 1px;
  padding: 0 88px;
  box-sizing: border-box;
  background-image: url("../../../static/banner-bg.png");
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  .text {
    flex: 1;
    height: 450px;
    .title{
      color: #fff;
      font-size: 42px;
    }
    .desc{
      color: #fff;
      font-size: 20px;
      margin-bottom: 50px;
    }
    .btnBlock{
      .login-btn{
        font-size: 18px;
        cursor: pointer;
        padding: 12px 50px;
        display: inline-block;
        outline: 0;
        border: none;
        text-align: center;
        vertical-align: middle;
        border-radius: 5px;
        background-color: #fff;
        color: #0ca74a;
      }
    }
  }
  .banner {
    flex: 1;
    .img-placeholder {
      height: 450px;
      background: url("../../../static/banner.png") center no-repeat;
    }
  }
}
</style>