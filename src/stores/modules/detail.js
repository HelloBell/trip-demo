import { defineStore } from 'pinia'
import { getDetailInfos } from '@/services'

const useDetailStore = defineStore('detail', {
  state: () => ({
    detailInfos: {}
  }),
  actions: {
    async fetchDetailInfosData(houseId) {
      const res = await getDetailInfos(houseId)
      this.detailInfos = res.data
    }
  }
})

export default useDetailStore
