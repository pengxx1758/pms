<template>
  <el-container>
    <el-main>
      <div class="content_top">
        <p class="title">
          <slot name="title"></slot>
        </p>
      </div>
      <div class="content_main">
        <slot></slot>
        <div class="content_btn_block">
          <slot name="content_btn_block"></slot>
        </div>
        <div class="other">
          <slot name="other"></slot>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: "FormContent",
  data() {
    return {};
  },
  method() {}
};
</script>
<style lang="scss" scoped>
.el-container {
  background: url("/../../static/login-bg.svg") no-repeat center 30px;
  background-size: 100%;
  background-color: #f0f2f5;
  .el-main {
    margin: 90px auto;

    flex: none;
    width: 800px;
    background-color: #fff;
    .content_top {
      text-align: center;
      .title {
        height: 44px;
        line-height: 44px;
        font-size: 33px;
        font-weight: 500;
      }
    }
    .content_main {
      margin: 0 auto;
      padding: 0 10px;
      width: 300px;
      margin-bottom: 50px;
      .content_btn_block {
        width: 100%;
      }
      .other {
        text-align: center;
        font-size: 14px;
      }
    }
  }
}
</style>