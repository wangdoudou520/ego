<template>
  <div class="container">
    <!-- 侧边tree -->
      <AdvertTree/>
    <!-- 内容 -->
    <AdervertContent/>
  </div>
</template>

<script>
import AdvertTree from './AdvertTree.vue'
import AdervertContent from './AdervertContent.vue'
export default {
  components:{AdvertTree,AdervertContent}

}
</script>

<style lang="scss" scoped>
.container{
  display: flex;
}

</style>