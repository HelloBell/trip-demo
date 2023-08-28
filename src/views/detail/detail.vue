<template>
  <div class="detail top-page">
    <van-nav-bar title="房屋管理" left-text="旅途" left-arrow @click-left="onClickLeft"> </van-nav-bar>
    <div class="main" v-if="mainPart">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <detail-infos :top-infos="mainPart.topModule"></detail-infos>
      <detail-facility :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"></detail-facility>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useDetailStore from '@/stores/modules/detail.js'
import { storeToRefs } from 'pinia'

import DetailSwipe from './cpns/detail_01-swipe.vue'
import DetailInfos from './cpns/detail_02-infos.vue'
import DetailFacility from './cpns/detail_03-facility.vue'

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

<style lang="less" scoped>
.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>
