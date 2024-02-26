// store.js
import { computed, ref } from 'vue'
import { createGlobalState, useStorage } from '@vueuse/core'

export const useGlobalState = createGlobalState(
  () => {
    // state
    const count = ref(0)
    const web3 = ref(0)
    const myAddress = ref(null)
    // const myAddress = ref('0x10e2Bc7e2eDAbc4C23Bea8435c1CD52ef94d6184')
    // const myAddress = ref('0xBD9ffACE71324b43C59854A8DCA4e78cd5373e5F')
    // const myAddress = ref('0xc126dfe4A539CAe4962Cb2fB0389847E4A550E37')

    const myETHBalance = ref(0)
    const ipoToWeiQuote = ref(0)
    const myUSDTBalance = ref(0)
    const infoData = ref({
        usdtCoin: '0', // wbnb地址
        bbaCoin: '0', // bba币地址
        inivet: '0', // 我的上级地址 
        lostUser: '', // 最后一名入场玩家
        deadNum: '', // 最后一名入场时间
        userOver12: '', // 玩家领取了多少12小时截至的分配收益
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
        levle: '0', // 级别
        bnbNum: '0', // 合约剩余BNB余额
        t12Length: '0', // 12BNB长度
        NO1: '0', // 第一名地址
        tmcp: '0', // 第一名直推算力 （需要除以3得到BNB）
        // teamAward: '0', // 直推团队可领取收益  ✅

        // 1、fomo池资金多少（以BNB为计量单位）；
        // 2、排列出日直推超过12个BNB的地址；
        // 3、展示网投静态投资第一名地址并展示BNB数量

        // team2Award: '0', // 15代团队可领取收益 ✅
    })
    const userSY = ref(null)
    const TMCP = ref(0)
    const FomoBalance = ref(0)
    const userLevel = ref('0')
    const inviteLink = ref('0x76a569aBA8E6909e9350A36389D0a061e1264193')
    // const contractAddress=ref('0xA9d2eD72f8fF25145904C1E4B976bDA2d8552A6B')// Defi合约地址
    // const contractAddress=ref('0x5D82eaeea1233417e31A20fE562dc0A9f81A09AB')// Defi合约地址
    const contractAddress=ref('0x63044C2375Ced86Eae01e489b01ec7f78146AdAA')// Defi合约地址

    // const Router_ADDRESS=ref('0x10ED43C718714eb63d5aA57B78B54704E256024E') // 主网薄饼V2路由合约地址
    const Router_ADDRESS=ref('0x6dcDf4494db3eA9eda10109899A4FDDB93B4217a') //  测试路由合约地址
    // https://testnet.bscscan.com/address/0xB6BA90af76D139AB3170c7df0139636dB6120F7e#code

    const Factory_ADDRESS=ref('0x6C7130Ba50800A56cbA0415a85734e8115caB68A') // 工厂合约地址
    // https://testnet.bscscan.com/address/0x7e71d9E2235E4C90cCcDBED00e43ab44f3094A44#code

    const WOKT_ADDRESS=ref('') // WOKT合约地址
    // https://testnet.bscscan.com/address/0x4c6289890009d7358e522d8BA97287a29F1988bB#code

    const TOKEN_ADDRESS=ref('0x28d787157a4AFc6b58b846f2f178420435ED6587') // IPO代币地址
    const userPeopleMoney = ref(0)
    const BbaCoinBlance = ref(0)
    const BbaContract = ref(null)
    const UsdtContract = ref(null)
    const DeFiContract = ref(null)
    const RouterContract = ref(null)
    const gasPrice = ref(null)
    const gasGWeiPrice = ref(null)
    const Team12BNB = ref([])
    const countdown = ref() // 12小时倒计时
    const fomoBalance = ref() // fomo池余额
    
    // 首先搭建OKT测试网的SWAP 
    // 路由地址 0xBA6b07C1cDE52cC51ff7357ECc43A47f9581a291
    // 工厂地址 0xcBc23fD0a109F225D262BB1F5ee032da107e3CF0
    // WOKT地址 0x221c4A420fDF65a1837000dcb7Ff950AF2bb2829
    // 这个搭建出来有买卖功能即可
    // 路由合约ABI和工作合于ABI和WOKT的和BSC主网博饼的一模一样，直接去博饼复制合约即可
    // getters
    const doubleCount = computed(() => count.value * 2)

    // actions
    function increment() {
      count.value++
    }
    function updateFomoBalance(val) {
      fomoBalance.value = val
    }
    function updateUserPeopleMoney(val) {
      userPeopleMoney.value = val
    }
    function updateCountDown(val) {
      countdown.value = val
    }
    function updateUserSY(val) {
      userSY.value = val
    }
    function updateTMCP(val) {
      TMCP.value = val
    }
    function updateFomoBalance(val) {
      FomoBalance.value = val
    }
    function updateTeam12BNB(val) {
      Team12BNB.value = val
    }
    function updateGasPrice(val) {
      gasPrice.value = val
    }
    function updateGasGWeiPrice(val) {
      gasGWeiPrice.value = val
    }
    function updateWbe3(val) {
      web3.value = val
    }
    function updateBBACoin(val) {
      TOKEN_ADDRESS.value = val
    }
    function updateWOKTCoin(val) {
      WOKT_ADDRESS.value = val
    }
    function updateMyETHBalance(val) {
      myETHBalance.value = Number(val)
    }
    function updateMyUSDTBalance(val) {
      myUSDTBalance.value = Number(val)
    }
    function updateInfoData(val) {
      infoData.value = val
    }
    function updateBbaContract(val) {
      BbaContract.value = val
    }
    function updateUsdtContract(val) {
      UsdtContract.value = val
    }
    function updateDeFiContract(val) {
      DeFiContract.value = val
    }
    function updateRouterContract(val) {
      RouterContract.value = val
    }
    function updateMyAddress(val) {
      myAddress.value = val
    }    
    function updateInviteLink(val) {
      if(val) inviteLink.value = val
    }
    function updateBbaCoinBlance(val) {
      if(val) BbaCoinBlance.value = val
    }
    function updateIpoToWeiQuote(val) {
      if(val) ipoToWeiQuote.value = val
    }

    return { 
      web3,
      count,
      userSY,
      Team12BNB,
      gasPrice,
      gasGWeiPrice,
      doubleCount,
      myAddress,
      infoData,
      countdown,
      ipoToWeiQuote,
      TMCP,
      FomoBalance,
      fomoBalance,
      userLevel,
      inviteLink,
      myETHBalance,
      myUSDTBalance,
      BbaCoinBlance,
      BbaContract,
      UsdtContract,
      DeFiContract,
      contractAddress,
      Router_ADDRESS,
      TOKEN_ADDRESS,
      Factory_ADDRESS,
      WOKT_ADDRESS,
      userPeopleMoney,
      updateUserPeopleMoney,
      updateFomoBalance,
      updateIpoToWeiQuote,
      updateBBACoin,
      updateWOKTCoin,
      increment,
      updateCountDown,
      updateUserSY,
      updateTMCP,
      updateFomoBalance,
      updateWbe3,
      updateTeam12BNB,
      updateGasPrice,
      updateGasGWeiPrice,
      updateBbaContract,
      updateUsdtContract,
      updateDeFiContract,
      updateRouterContract,
      updateMyETHBalance,
      updateMyUSDTBalance,
      updateInfoData,
      updateMyAddress,
      updateBbaCoinBlance,
      updateInviteLink
     }
  }
)


/*
  我的领取上限 - 未领取
  swap 加池子和撤池子。
*/