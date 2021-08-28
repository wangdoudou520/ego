<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div v-if="dialogVisible">
        <GoodTree @showNode="showNode" />
      </div>
      <!-- 内弹框 -->
      <el-dialog
        width="45%"
        title="内层 Dialog"
        :visible.sync="innerVisible"
        append-to-body
      >
        <p>当前选中的商品：{{ treeData.name }}</p>
        <el-button @click="addDomain">新增规格列表</el-button>
        <hr />
        <el-form
          :model="dynamicValidateForm"
          ref="dynamicValidateForm"
          label-width="100px"
          class="demo-dynamic"
        >
          <!-- 第一层 -->
          <el-form-item
            v-for="(item, index) in dynamicValidateForm.groups"
            :label="item.title"
            :key="index"
          >
            <div class="list">
              <el-input v-model="item.title"></el-input>
              <el-button @click.prevent="addChildDomain(index)"
                >添加子组</el-button
              >
              <el-button @click.prevent="removeDomain(index)">删除组</el-button>
            </div>
            <!-- 第二层 -->
            <el-form-item
              v-for="(ele, i) in item.children"
              :label="ele.title"
              :key="i"
            >
              <div class="list">
                <el-input v-model="ele.title"></el-input>
                <el-button @click.prevent="removeChildDomain(i)"
                  >删除组</el-button
                >
              </div>
            </el-form-item>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm('dynamicValidateForm')"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :disabled="isShow" @click="showInnerDialog"
          >确定并添加分组</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GoodTree from "../Goods/GoodTree.vue";
export default {
  components: {
    GoodTree,
  },
  props: {
    fromData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  watch: {
    fromData(val) {
      this.dynamicValidateForm.groups = JSON.parse(val.paramData);
      this.treeData.name = val.specsName;
      this.treeData.cid = val.itemCatId;
      this.treeData.id=val.id
    },
  },
  data() {
    return {
      //控制外弹框显示
      dialogVisible: false,
      isShow: true, //控制确定按钮受否禁用
      innerVisible: false, //控制内层弹框
      treeData: {},
      title: "商品规格参数配置", //第一层弹框标题
      //内层弹框动态添加表单数据
      dynamicValidateForm: {
        groups: [
          // {
          //   value: "",
          //   title: "",
          //   children: [
          //     {
          //       value: "",
          //       title: "",
          //     },
          //   ],
          // },
          // {
          //   value: "",
          //   title: "",
          //   children: [],
          // },
        ],
      },
    };
  },
  methods: {
    handleClose(done) {
      done();
      this.dynamicValidateForm.groups=[]
      this.isShow = true;
    },
    //tree点击信息
    showNode(val) {
      this.isShow = false;
      this.treeData = val;
    },
    //显示内弹框
    showInnerDialog() {
      this.innerVisible = true;
    },
    //内层添加动态表单方法 itemCatId, content,specsName
    submitForm() {
      console.log("列表数据", this.dynamicValidateForm);
      if (this.title == "商品规格参数配置") {
        let itemCatId = this.treeData.cid;
        let specsName = this.treeData.name;

        this.$api
          .getParamsAdd({
            itemCatId,
            specsName,
            content: JSON.stringify(this.dynamicValidateForm.groups),
          })
          .then((res) => {
            //退出页面
            this.innerVisible = false;
            this.dialogVisible = false;
            //请求数据
            this.$parent.getData(1);
            //清空表单
            this.dynamicValidateForm.groups = [];
            //取消按钮
            this.isShow = true;
          });
      }else{
       // cid content id  specsName
       let specsName=this.treeData.name;
       let {cid,id}=this.treeData;
       this.$api.getModifyParams({
         specsName,
         cid,
         id,
         content:JSON.stringify(this.dynamicValidateForm.groups)
       }).then(res=>{
         if(res.status===200){
           //取消弹框
           this.innerVisible=false;
           this.dialogVisible=false;
           //请求参数
           this.$parent.getData(1);
           //清空列表
           this.dynamicValidateForm.groups=[]
         }else{
           this.$message.error('sorry,修改失败咯');
         }
       })

      }
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dynamicValidateForm.groups=[]
    },
    //删除第一层组件
    removeDomain(index) {
      this.dynamicValidateForm.groups.splice(index, 1);
    },
    //添加第一层组件
    addDomain() {
      this.dynamicValidateForm.groups.push({
        value: "",
        title: "",
        children: [],
      });
    },
    //添加子组件
    addChildDomain(index) {
      this.dynamicValidateForm.groups[index].children.push({
        value: "",
        title: "",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  button {
    margin-left: 10px;
  }
}
</style>