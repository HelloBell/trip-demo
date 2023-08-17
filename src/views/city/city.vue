<template>
  <div class="city top-page">
    <div class="top">
      <!-- 搜索框 -->
      <van-search v-model="searchValue" shape="round" placeholder="城市/区域/位置" show-action @cancel="cancelClick" />

      <!-- tab切换 -->
      <van-tabs v-model:active="tabActive" color="#ff9854" line-height="3">
        <template v-for="(value, key, index) in allCities">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <template v-for="(value, key, index) in allCities">
        <!-- 通过 van-tab 的name属性绑定的tabActive -->
        <city-group v-show="tabActive === key" :group-data="value"></city-group>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import useCityStore from '@/stores/modules/city'
import { getCityAll } from '@/services'

import CityGroup from './cpns/city-group.vue'

const router = useRouter()

const searchValue = ref('')
const cancelClick = () => {
  router.back()
}

// tab的切换
const tabActive = ref()

// 网络请求
// const allCity = ref({})
// getCityAll().then(res => {
//   allCity.value = res.data
//   console.log(res.data)
// })

// 从 store 中获取数据
const cityStore = useCityStore()
console.log(cityStore)
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)
</script>

<style lang="less" scoped>
.city {
  .top {
    position: relative;
    z-index: 9;
  }

  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>
