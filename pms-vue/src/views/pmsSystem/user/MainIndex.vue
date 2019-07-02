<template>
    <div>
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from 'components/base/Header'
import Footer from 'components/base/Footer'
export default {
  name: "PmsIndex",
  data () {
    return {
    };
  },
  components:{
    Header,
    Footer
  },
  method(){}
}
</script>
<style lang="scss" scoped>
</style>