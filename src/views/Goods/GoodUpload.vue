<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="url"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

<script>
import http from '../../api/config'
  export default {
    data() {
      return {
         url:http.host+http.uploadImg
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
      },
      handlePreview(file) {
      },
      handleSuccess(response){
        console.log(response);
        let img=http.host+'/'+response.url.slice(7);
        this.$emit('showImg',img)
      }
    }
  }
</script>

<style>
</style>