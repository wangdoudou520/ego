<template>
  <div>
    <!-- 搜索框 -->
    <div class="header">
      <el-input
        v-model="search"
        placeholder="请输入内容"
        @change="getSearchInfo"
      ></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary"  @click="showDialog">添加</el-button>
    </div>
    <!-- 表单数据 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="itemCatId" label="规格参数ID" width="120"></el-table-column>
      <el-table-column prop="id" label="类目ID" width="120"> </el-table-column>
      <el-table-column prop="specsName" label="规格名称" width="120"> </el-table-column>
      <el-table-column prop="paramData" label="规格参数" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="panigation">
    <Panigation  :pageSize="pageSize" :Total="total" @changePage="changePage"/>
    </div>
    <!-- 内弹框 -->
    <ParamsDialog ref="mydialog" :fromData="fromData"/>
  </div>
</template>

<script>
import Panigation from '../../components/Panigation.vue'
import ParamsDialog from './ParamsDialog.vue'
export default {
  components:{
    Panigation,
    ParamsDialog
  },
  data(){
    return {
      tableData:[],//表单数据
      search:'',//搜索框数据
      pageSize:10,//分页--页数
      total:100,//分页--总数
      fromData:{},//选中列表数据
     
    }
  },
  methods:{
    //编辑
    handleEdit(index,row){
      console.log(row);
      //显示外弹框
      this.$refs.mydialog.dialogVisible=true,
      setTimeout(()=>{
        this.$refs.mydialog.innerVisible=true
      },10)
      this.$refs.mydialog.title='编辑商品规格参数配置'
      //设置选中列表数据
      this.fromData={...row}
    },
    //删除
    handleDelete(index,row){
      console.log('delete',row);
      this.$api.getDeleteParams({
        id:row.id
      }).then(res=>{
        console.log(res);
        this.getData(1)
      })
    },
    //改变分页
    changePage(val){
     this.getData(val)
    },
    //点击显示弹框
    showDialog(){
      this.$refs.mydialog.dialogVisible=true
    },
    //获取列表数据--网络请求
    getData(page){
      this.$api.getParamsData({
        page
      }).then(res=>{
        this.tableData=res.data;
        this.pageSize=res.pageSize;
        this.total=res.total
      })
    },
    //搜索框模糊查询
    getSearchInfo(){
      console.log(this.search);
      if(this.search){
        this.$api.getParamsSearchInfo({
        search:this.search
      }).then(res=>{
        console.log(res);
        if(res.status===200){
           this.tableData=res.result;
           this.pageSize=8,
           this.total=res.result.length;
        }else{
          this.tableData=[];
           this.pageSize=1,
           this.total=0;
        }
      })
      }else{
        this.getData(1)
      }
    },

  },
  created(){
    this.getData(1)
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  margin-bottom: 30px;
  button {
    margin-left: 20px;
  }
}
.panigation{
  margin-top: 20px;
  text-align: center;
}
</style>