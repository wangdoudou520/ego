<template>
  <div>
    <el-tree :props="props" :load="loadNode" lazy @node-click="handleNodeClick"> </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
    };
  },

  methods: {
      handleNodeClick(data){
         this.$emit('showNode',data)
         this.$api.getParamsReturnShow({
           cid:data.cid
         }).then(res=>{
           console.log(res);
           this.$emit('returnData',res.result)
         })
      },
      loadNode(node, resolve) { //懒加载事件load事件
        if (node.level === 0) {
           this.$api.getSelectCategory().then(res=>{
               if(res.status==200){
                return resolve(res.result);
               }
           })
        }else{
            this.$api.getSelectCategory({
                id:node.data.cid
            }).then(res=>{
               if(res.status==200){
                return resolve(res.result);
               }else{
                   return resolve([])
               }
           })
        }
       
      }
    }
};
</script>

<style>
</style>