// store.js
import { computed, ref } from 'vue'
import { createGlobalState, useStorage } from '@vueuse/core'

export const useGlobalState = createGlobalState(
  () => {
    // state
    const count = ref(0)
    const myAddress = ref(null)
    const myETHBalance = ref(0)
    const infoData = ref({
        usdtCoin: '0', // wbnb地址
        bbaCoin: '0', // bba币地址
        inivet: '0', // 我的上级地址 
        lostUser: '', // 最后一名入场玩家
        deadNum: '', // 最后一名入场时间
        usdtOver12: '', // 玩家领取了多少12小时截至的分配收益
        allOver12: '',  // 全网共分配了多少12小时未领取收益
        allStakeCp: '0', // 全网算力 
        userCp: '0', // 个人算力 
        tmCp: '0', // 直推团队算力 
        teamCp2: '0', // 15代团队算力 
        userAward: '0', // 个人可领取收益
        teamLength: '0', // 直推人数
        team2Length: '0', // 15代人数
        overAward: '0', // 已经领取了多少收益 
        overTeam: '0', // 直推已经领取了多少收益
        overTeam2: '0', // 15代已经领取了多少收益
        levle: '0' // 级别
        // teamAward: '0', // 直推团队可领取收益  ✅
        // team2Award: '0', // 15代团队可领取收益 ✅
    })
    const userLevel = ref('0')
    const contractAddress=ref('0x0E02dE0c9ffFB602c10fcbec38944aA97991fbE6')//合约地址

    // getters
    const doubleCount = computed(() => count.value * 2)

    // actions
    function increment() {
      count.value++
    }
    function updateInfoData(val) {
      infoData.value = val
    }
    function updateMyAddress(val) {
      myAddress.value = val
    }

    return { 
        count,
        doubleCount,
        myAddress,
        infoData,
        userLevel,
        contractAddress,
        increment,
        updateInfoData,
        updateMyAddress
     }
  }
)