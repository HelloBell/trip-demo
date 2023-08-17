<template>
  <van-index-bar :index-list="indexList">
    <van-index-anchor index="热门" />
    <div class="list">
      <template v-for="(city, index) in groupData.hotCities">
        <div class="city" @click="cityClick(city)">{{ city.cityName }}</div>
      </template>
    </div>

    <template v-for="(group, index) in groupData.cities" :key="index">
      <van-index-anchor :index="group.group" />
      <template v-for="(city, indez) in group.cities" :key="indez">
        <van-cell :title="city.cityName" />
      </template>
    </template>
  </van-index-bar>
</template>

<script setup>
import useCityStore from '@/stores/modules/city'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({})
  }
})
// 动态的 索引indexBar
const indexList = computed(() => {
  const list = props.groupData.cities.map(item => item.group)
  list.unshift('#')
  return list
})

// 每个城市的点击 cityClick
const cityStore = useCityStore()
const router = useRouter()
const cityClick = city => {
  // 通过 store 保存当前选中的 city 方便外层请求数据
  cityStore.currentCity = city
  router.back()
}

console.log(props.groupData)
</script>

<style lang="less" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
  padding-right: 25px;

  .city {
    width: 70px;
    height: 28px;
    border-radius: 14px;
    font-size: 12px;
    color: #000;
    text-align: center;
    line-height: 28px;
    background-color: #fff4ec;
    margin: 6px 0;
  }
}
</style>
