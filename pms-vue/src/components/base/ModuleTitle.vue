<template>
  <div class="titleBlock">
    <div class="navBread">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/sys' }">首页</el-breadcrumb-item>
        <slot name="bread"></slot>   
      </el-breadcrumb>
    </div>
    <div class="nav-title">
        <slot></slot>  
    </div>
    <div class="other">
        <slot name="other"></slot>  
    </div>
  </div>
</template>
<script>
export default {
  name: "ModuleTitle",
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.titleBlock {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 16px 32px 0;   
  .navBread {
    margin-bottom: 16px;
  }
  .nav-title {
    font-size: 20px;
    margin-bottom: 16px;
  }
  .other {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    margin-bottom: 16px;
  }
}
</style>