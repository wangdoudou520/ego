<template>
  <div class="box">
    <MyHeader :isCollapse="isCollapse" />
    <div class="main-content">
      <div class="top-header">
        <div class="left">
          <i
            class="iconfont"
            :class="{
              'icon-right-indent': !isCollapse,
              'icon-left-indent': isCollapse,
            }"
            @click="isCollapse = !isCollapse"
          ></i>
        </div>
        <div class="userinfo">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="zn">中文</el-dropdown-item>
              <el-dropdown-item command="en">English</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>hello {{ userInfo.user }}</span>
          <i class="iconfont icon-tuichu" @click="exit"></i>
        </div>
      </div>
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "../../components/MyHeader.vue";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  components: {
    MyHeader,
  },
  computed: {
    ...mapState("LoginModule", ["userInfo"]),
  },
  methods: {
    ...mapMutations("LoginModule", ["deleteInfo"]),
    exit() {
      //清空本地
      localStorage.removeItem("userinfo");
      //清空vuex
      this.deleteInfo();
      //刷新
      window.location.reload();
    },
     //下拉
     handleCommand(command) {
        // console.log('语言',command);
        // console.log(this.$i18n.locale);
        this.$i18n.locale=command
      }
  },
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  height: 100%;
  .main-content {
    flex: 1;
    .top-header {
      background: #1e78bf;
      height: 50px;
      line-height: 50px;
      color: #fff;
      display: flex;
      .left {
        flex: 1;
      }
      .iconfont {
        font-size: 24px;
        color: #fff;
        padding-left: 10px;
      }
      .userinfo {
        color: #fff;
        vertical-align: middle;
        padding-right: 20px;
        .el-dropdown-link {
          cursor: pointer;
          color: #fff;
          margin-right: 10px;
        }
        .el-icon-arrow-down {
          font-size: 12px;
        }
      }
    }
    .container {
      margin: 20px;
    }
  }
}
</style>