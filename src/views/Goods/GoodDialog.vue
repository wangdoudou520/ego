<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="70%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="类目选择">
          <el-button type="primary" @click="classSelect">类目选择</el-button>
          <span>{{ ruleForm.category }}</span>
        </el-form-item>
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input v-model="ruleForm.num"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点" prop="sellPoint">
          <el-input v-model="ruleForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="image">
          <el-button type="primary" @click="deliverImg">上传图片</el-button>
          <img
            :src="showImgPic"
            alt=""
            style="width: 140px; vertical-align: middle; margin-left: 20px"
          />
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <GoodEditor @getWangData="getWangData" ref="refEditor" />
        </el-form-item>
      </el-form>
      <!-- 参数列表 -->
      <div v-if="ruleForm.category">
        <h2 style="margin-bottom:10px">商品参数配置信息</h2>
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
              <el-input v-model="item.value"></el-input>
            </div>
            <!-- 第二层 -->
            <el-form-item
              v-for="(ele, i) in item.children"
              :label="ele.title"
              :key="i"
            >
              <div class="list">
                <el-input v-model="ele.value"></el-input>
              </div>
            </el-form-item>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="clearForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 内弹框---类目选择 -->
    <el-dialog
      width="40%"
      title="类目选择"
      :visible.sync="innerVisible"
      append-to-body
    >
      <GoodTree @showNode="showNode"  @returnData="returnData"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 内弹框---上传图片 -->
    <el-dialog
      width="40%"
      title="上传图片"
      :visible.sync="imgInnerVisible"
      append-to-body
    >
      <GoodUpload @showImg="showImg"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="imgSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GoodTree from "./GoodTree.vue";
import GoodUpload from "./GoodUpload.vue";
import GoodEditor from "./GoodEditor.vue";
export default {
  components: {
    GoodTree,
    GoodUpload,
    GoodEditor,
  },
  props: {
    title: {
      type: String,
      default: "添加商品",
    },
    fromInfo: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  watch: {
    fromInfo(val) {
      this.$nextTick(()=>{
        this.ruleForm = val;
        this.$refs.refEditor.editor.txt.html(val.descs)
        this.$api.getParamsReturnShow({
          cid:this.ruleForm.cid
        }).then(res=>{
          console.log(res);
          this.dynamicValidateForm.groups=JSON.parse(res.result[0].paramData)
        })
      })
      
    },
    
  },

 
  data() {
    return {
      //外弹框
      dialogVisible: false,
      //内弹框---类目选择
      innerVisible: false,
      //内弹框---上传图片
      imgInnerVisible: false,
      //选中的名字
      treeData: "",
      //渲染在页面上的数据
      selectorName: "",
      showImgPic: "",
       dynamicValidateForm:{
        groups:[
         
        ]
      },
      ruleForm: {
        category: "",
        cid: "",
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        desc: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        num: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
          { min: 1, message: "至少一件商品", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    classSelect() {
      this.innerVisible = true;
    },
    showNode(val) {
      this.treeData = val;
    },
    //点击确定 使选中的文字在页面显示
    submit() {
      this.innerVisible = false;
      this.ruleForm.category = this.treeData.name;
      this.ruleForm.cid = this.treeData.cid;
    },
    //点击上传图片显示弹框
    deliverImg() {
      this.imgInnerVisible = true;
    },
    //显示图片
    showImg(img) {
      console.log(img);
      this.ruleForm.image = img;
    },
    imgSubmit() {
      this.imgInnerVisible = false;
      this.showImgPic = this.ruleForm.image;
    },
    //获取文本输入框中的值
    getWangData(val) {
      this.ruleForm.desc = val;
    },
    //回显数据
    returnData(val){
     console.log('hui',val);
     if(val){
       this.dynamicValidateForm.groups=JSON.parse(val[0].paramData)
     }
    },
    clearForm() {
      //隐藏弹框
      this.dialogVisible = false;
      //清空表单
      this.ruleForm = {
        category: "",
        cid: "",
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        image: "",
        desc: "",
      };
      //单独清空富文本
      this.$refs.refEditor.editor.txt.clear();

    },
    //提交最终表单
    submitForm() {
      if(this.title=='添加商品'){
        let { title, cid, category, sellPoint, price, num, desc, image } =
        this.ruleForm;
         this.$api
        .getShopAdd({
          title,
          cid,
          category,
          sellPoint,
          price,
          num,
          desc,
          image,
        
        })
        .then((res) => {
          console.log("表单数据", res);
          if (res.status == 200) {
            this.$message({
              message: "恭喜你，这是一条成功消息",
              type: "success",
            });
            //清空
             this.clearForm()
            //刷新商品列表
            this.$parent.getPage(1);
          } else {
            this.$message.error("添加信息失败");
          }
        });

      }else{
        console.log('编辑信息');
        let {title, cid, category, sellPoint, price, num, desc, image,id} =this.ruleForm
      this.$api.getShopModify({
        title, cid, category, sellPoint, price, num, desc, image,id
      }).then(res=>{
        console.log(res.data);
        this.clearForm();
        this.$parent.getPage(1)
       
      })

      this.$api.getParamsReturnShow({
        cid
      }).then(res=>{
        console.log(res);
      })
        
      }
     


    },

  },
};
</script>

<style>
</style>