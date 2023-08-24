<template>
  <div class="detail top-page">
    <van-nav-bar title="房屋管理" left-text="旅途" left-arrow @click-left="onClickLeft"> </van-nav-bar>
    <div class="main" v-if="mainPart">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useDetailStore from '@/stores/modules/detail.js'
import { storeToRefs } from 'pinia'

import DetailSwipe from './cpns/detail-swipe.vue'

const router = useRouter()
const route = useRoute()
const houseId = route.params.id

const detailStore = useDetailStore()
detailStore.fetchDetailInfosData(houseId)
const { detailInfos } = storeToRefs(detailStore)
const mainPart = computed(() => detailInfos.value.mainPart)

const onClickLeft = () => {
  router.back()
}
</script>

<style lang="less" scoped></style>
