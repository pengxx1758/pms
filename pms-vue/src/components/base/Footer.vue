<template>
  <div>
    <el-footer>
      <div class="foot_wrap">
        <div class="copy_right">@copyright pxx 2019 GDOU 毕业设计</div>
      </div>
    </el-footer>
  </div>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
  method() {}
};
</script>
<style lang="scss" scoped>
footer{
  height: auto !important;
}
.foot_wrap {
  text-align: center;
  padding: 16px;
  .copy_right {
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
  }
}
</style>