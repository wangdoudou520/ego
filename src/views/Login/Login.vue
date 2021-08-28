<template>
  <div>
    <el-row style="margin-top: 20px">
      <el-col :span="19" :offset="1">
        <el-form
          :model="loginForm"
          status-icon
          :rules="rules"
          ref="loginForm"
          label-width="100px"
        >
          <el-form-item label="账号" prop="username">
            <el-input
              type="text"
              v-model="loginForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import jwt from 'jwt-decode'
import {mapMutations} from 'vuex'
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {//登录表单数据
        username: "",
        password: "",
      },
      rules: {//验证规则
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },

  methods: {
    ...mapMutations('LoginModule',['setInfo']),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
           this.$api.getLogin({
             username:this.loginForm.username,
             password:this.loginForm.password
           }).then(res=>{
            //  console.log(res.data.data);//token
            let obj= {
              user:jwt(res.data.data).username,
              token:res.data.data
            }
             //存储到vux
             this.setInfo(obj)
             //存储到本地
             localStorage.setItem('userinfo',JSON.stringify(obj));
             //返回到首页
             this.$router.push('/')
           })
      
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
</style>