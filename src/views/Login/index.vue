<template>
  <div class="tab">
       <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户登录" name="first" :offset="3">
         <Login/>
      </el-tab-pane>
      <el-tab-pane label="用户注册" name="second">
        <Register/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Login from './Login.vue'
import Register from './Register.vue'
  export default {
    data() {
      return {
        activeName: "first",
      };
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      },  
    },
    components:{
      Login,
      Register
    }
  };
</script>

<style lang="scss" scoped>
.tab{
  width: 500px;
  height: 400px;
  margin: 100px auto;
  border: 1px solid teal;
  // background: #999;
  .el-tabs--top .el-tabs__item.is-top:nth-child(2), .el-tabs--top .el-tabs__item.is-bottom:nth-child(2), .el-tabs--bottom .el-tabs__item.is-top:nth-child(2), .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2) {
   padding-left: 20px !important;
}
}
</style>