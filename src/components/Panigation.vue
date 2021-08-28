<template>
  <div>
    <el-pagination 
    background
    layout="total,prev, pager, next,jumper" 
    :page-size="pageSize"
    :total="Total"
     @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
    props:{
        pageSize:{
            // type:[Number,String],  //不能写String
            type:Number,
            default:10,
        },
        Total:{
            type:Number,
            default:100,
        }
    },
    methods:{
        handleCurrentChange(val){
           this.$emit('changePage',val)
        }
    }
};
</script>

<style>
</style>