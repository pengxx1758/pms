<template>
  <div class="container">
    <div class="contentBlock">
      <div class="contentHeader">
        <div class="btnBlock">
          <slot name="btnBlock"></slot>
        </div>
        <div class="searchBlock">
          <slot name="searchBlock"></slot>
        </div>
      </div>
      <div class="content">
        <div class="formBlock">
          <slot name="form"></slot>
        </div>
        <slot></slot>
        <div class="pagesBlock">
          <slot name="page"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ModuleContent",
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.container {
  margin: 25px 25px 0;
  .contentBlock {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    .contentHeader {
      margin: 16px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 32px;
      .btnBlock {
        flex: 2;
      }
      .searchBlock {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .content {
      padding: 0 32px 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .formBlock {
        width: 450px;
      }
      .pagesBlock {
        display: flex;
        align-self: flex-end;
        padding: 16px 32px 0 0;
      }
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>