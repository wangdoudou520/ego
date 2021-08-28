<template>
  <div>
    <!-- 1.搜索框 -->
    <div class="header">
      <el-input
        v-model="search"
        placeholder="请输入内容"
        @change="getSearchInfo"
      ></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary" @click="showDialog">添加</el-button>
    </div>

    <!-- 2.表格数据 -->
    <el-table :data="tableData" ref="multipleTable" @select="selectShop">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="商品ID" width="100"> </el-table-column>
      <el-table-column
        prop="title"
        label="商品名称"
        width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="100">
      </el-table-column>
      <el-table-column prop="num" label="商品数量" width="100">
      </el-table-column>
      <el-table-column prop="category" label="规格类目"> </el-table-column>
      <el-table-column prop="image" label="商品图片" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="descs" label="商品描述" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="selectDelect">批量删除</el-button>
      <el-button @click="toggleSelection([tableData[1], tableData[2]])"
        >切换第二、第三行的选中状态</el-button
      >
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <!-- 3.表格分页 -->
    <div class="panigation">
      <Panigation
        :pageSize="pageSize"
        :Total="Total"
        @changePage="changePage"
      />
    </div>

    <!-- 弹框 -->
    <GoodDialog ref="myref" :title="title" :fromInfo="fromInfo" />
  </div>
</template>

<script>
import Panigation from "../../components/Panigation.vue";
import GoodDialog from "./GoodDialog.vue";
export default {
  components: {
    Panigation,
    GoodDialog,
  },
  data() {
    return {
      tableData: [], //表格数据 {name,xxx,}
      pageSize: 10,
      Total: 100,
      search: "",
      selectArr: [],
      currentPage: "",
      fromInfo: {},
      title: "添加商品",
    };
  },
  methods: {
    handleEdit(index, row) {
      this.$refs.myref.dialogVisible = true;
      this.title = "编辑商品";
      this.fromInfo = { ...row };
    },
    handleDelete(index,row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .getShopDelete({
              id: row.id,
            })
            .then((res) => {
              console.log(res);
              if (res.data.status == 200) {
                //更新视图
                this.getPage(this.currentPage);
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              } else {
                this.$message.error("删除失败咯");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    changePage(val) {
      this.getPage(val);
      this.currentPage = val;
    },
    //显示弹框
    showDialog() {
      console.log("显示弹框");
      this.$refs.myref.dialogVisible = true;
    },

    //获取查询信息
    getSearchInfo() {
      if (this.search) {
        this.$api
          .getSearchInfo({
            search: this.search,
          })
          .then((res) => {
            if (res.data.status === 200) {
              (this.tableData = res.data.result),
                (this.pageSize = 8),
                (this.Total = res.data.result.length);
            } else {
              (this.tableData = []), (this.pageSize = 1), (this.Total = 0);
            }
          });
      } else {
        //当搜索框数据为空时  请求第一页数据
        this.getPage(1);
      }
    },

    //请求数据方法
    getPage(page) {
      this.$api
        .getTableData({
          page,
        })
        .then((res) => {
          if (res.status == 200) {
            this.tableData = res.data;
            this.pageSize = res.pageSize;
            this.Total = res.total;
          }
        });
    },
    //取消选择和第二行选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //选择删除的id
    selectShop(selection, row) {
      console.log("selection", selection);
      console.log("row", row);
      this.selectArr.push(row.id);
    },
    //批量删除
    selectDelect() {
      console.log(this.selectArr);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api
            .getBatchDelete({
              idArr: this.selectArr,
            })
            .then((res) => {
              if (res.status == 200) {
                this.getPage(this.currentPage);
              } else {
                this.$message({
                  showClose: true,
                  message: "删除失败",
                  type: "error",
                });
              }
            });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },

  created() {
    this.getPage(1);
  },
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
.panigation {
  text-align: center;
  margin-top: 20px;
}
</style>