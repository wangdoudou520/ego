<template>
  <div>
    <el-tree
     :data="data"
      :expand-on-click-node="false"
      :render-content="renderContent"
      :props="props"
      lazy
      :load="loadNode"
      node-key="pid"
      @node-click="handleNodeClick"
    >
    </el-tree>
  </div>
</template>

<script>

export default {
  data() {
    return {
       props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
      data: [],
    };
  },

  methods: {
    //增加
    append(data) {
     
    },

    //删除
    remove(node, data) {
     
    },
    //修改
    change() {},
    //获取数据
    handleNodeClick(data){
     console.log(data);
    },
    //懒加载 
    loadNode(node, resolve) {
        if (node.level === 0) {
          this.$api.getAdvertTreeList().then(res=>{
              console.log(res);
               return resolve(res.result);
          })
        }
        if (node.level >= 1){
          this.$api.getAdvertTreeList({
              id:node.data.pid
          }).then(res=>{
             if (res.status === 200) {
              return resolve(res.result);
            } else {
              return resolve([]);
            }
          })
        }
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              增加
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.change(node, data)}
            >
              修改
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      );
    },
  },
};
</script>

<style>
</style>