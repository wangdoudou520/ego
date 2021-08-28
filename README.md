## 易购管理后台系统
电商后台管理界面  进行商品发布 更新 修改 等。 订单追踪等等。 

## 安装依赖
1. vue - vue-router vuex 
2. vue add element 
3. npm i axios -S 
4. npm i jwt-decode -S (解析jsonwebtoken)



## 后台系统 （了解）
1. 学习阶段选择模拟接口：node.js 
2. 公司后台技术：java  
3. 安装依赖：
    npm i express cors mysql -S 


## 项目初始化
1. 删除无用组件
2. css初始化
3. iconfont引入  (1.导入网址@import url() 2.打开iconfont网址复制创建本地文件 3.下载到本地引入 )
4. 路由基本配置 页面布局 

## 登录配置
1. element-tabs标签页
2. form表单 
3. 存储登录信息 vuex 本地存储 
4. token解析：jwt-decode   
   1. 语法：npm i jwt-decode -S 
   2. 解析： jwt(token内容)


## 商品列表界面
1. 表格数据 el-table
2. 封装分页功能 公共的组件 paganation 
3. 搜索框 el-input @change=''
4. 弹框：Dialog 
5. 数结构 Tree (懒加载)



## 上传图片
1. upload 图片上传
2. 注意：上传图片操作 给后台服务接口 不能跨域的 
3. 后台配置
   1. 后台安装 multer 模块   同时引入fs模块
   2. router.js入口文件导入模块
       const fs=require('fs')
        const multer=require('multer')
   3. 上传图片 不能跨域  需要配置cors 
   4. 想要访问不是本地src中的图片 服务器中所上传的图片 需要在瑟server--index中配置静态托管
      //静态文件托管 ----  访问：http:localhost:3434/图片.jpg
      app.use(express.static('upload'))

## 富文本编译器
1. 百度编辑 
2. wangEdiotor（推荐）

## wangEditor 
1. 官网：https://www.wangeditor.com/
2.  安装：npm i wangeditor --save
3.  导入：import E from "wangeditor"
4.  创建生命周期函数使用
     data(){
        return{
            editor:''
        }
    }
    mounted(){
        this.editor = new E("#div1")
        this.editor.create()
    } 


## 延迟加载
    this.$nextTick(()=>{
        //延迟语句
        
    })

##  知识点
1. untils里面request中网络请求 分别写了get,post  可以直接使用
   直接使用get  get(url,params)  正常get请求应该是  
   axios.get(url,{
       params
   })
   直接使用post post(url,params)  正常post请求应该是
   axios.post(url,params)

2. 父亲控制子组件的属性 可以传参props  this.$children  还可以this.refs
   如Good 和  GoodDialog

3. 数据监测  
watch:{
  formInfo(val){
    console.log(val)
  }
}
watch中读不到DOM 因为watch执行顺序在DOM前面