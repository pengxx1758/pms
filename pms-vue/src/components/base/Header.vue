<template>
  <div>
    <el-header>
      <div class="logo" @click="toIndex">
        <img src="\..\..\static\logo.png" alt>
        <div class="title">XX物业管理系统</div>
      </div>
      <div class="menu">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
        >
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">产品</el-menu-item>
          <el-menu-item index="3">价格</el-menu-item>
          <el-menu-item index="4">帮助</el-menu-item>
        </el-menu>
      </div>
    </el-header>
  </div>
</template>
<script>
import router from '@/router'
export default {
  name: "Header",
  data() {
    return {
    };
  },
  methods:{
    toIndex(){
      router.push('/');
    }
  }
};
</script>
<style lang="scss" scoped>
$menu-item-font: 18px;
$--color-primary: #47c479;
.el-header {
  padding: 0 88px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
  .logo {
    cursor: pointer;
    height: 100%;
    // box-sizing: border-box;
    display: flex;
    
    img{
      width: 55px;
      height: 55px;
      margin-right: 8px;
    }
    .title{
      display: inline-block;
      color:#0ca74a;
      font-size: 20px;
      line-height: 59px;
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
  }
  .menu {
    height: 100%;
    box-sizing: border-box;
    .el-menu-item{
      font-size: $menu-item-font;
    }
    .el-menu--horizontal{
      .el-menu-item.is-active{
        border-bottom: 2px solid #47c479;
      }
    }
  }
}
</style>