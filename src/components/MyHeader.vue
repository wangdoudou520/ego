<template>
  <div class="header">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="rgb(48, 65, 86)"
      text-color="#fff"
      active-text-color="rgb(64, 158, 255)"
      router
      :collapse="isCollapse"
    >
      <el-menu-item>
        <span slot="title">易购后台管理系统</span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">{{$t("home.product")}}</span>
      </el-menu-item>
      <el-menu-item index="/params">
        <i class="el-icon-s-tools"></i>
        <span slot="title">{{$t("home.specifications")}}</span>
      </el-menu-item>
      <el-menu-item index="/advert">
        <i class="el-icon-document"></i>
        <span slot="title">{{$t("home.advert")}}</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-user-solid"></i>
        <span slot="title">{{$t("home.user")}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  // width: 200px;
  background: rgb(48, 65, 86);
   .el-menu {
    border-right: 0;
    .is-active {
      //选中的el-menu-item
      background: #333 !important;
    }
    .el-menu-item:hover,
    .el-menu-item:focus {
      background: #1f2d3d !important;
      color: rgb(64, 158, 255);
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>