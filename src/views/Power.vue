
<script setup>
import IconUSDT from '@/components/icons/IconUSDT.vue'
import IconBNB from '@/components/icons/IconBNB.vue'
import IconCPU from '@/components/icons/IconCPU.vue'
import IconLogo from '@/components/icons/IconLogo.vue'
import { ref, computed, onMounted, watch } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useStorage } from '@vueuse/core'
// import { useI18n } from 'vue-i18n'
import { useRouteQuery } from '@vueuse/router'
import { useGlobalState } from "@/store";
import { useDebounceFn, computedAsync } from '@vueuse/core'
import { ElMessage, ElNotification } from "element-plus";
import { Pointer } from '@element-plus/icons-vue'
import defiABI from "@/abis/defiABI.json";
import usdtABI from "@/abis/usdtABI.json";
import spaceXABI from "@/abis/spaceABI.json";
import lpABI from "@/abis/lpABI.json";
import cakeLpABI from "@/abis/cakeLpABI.json";
// const { t } = useI18n()
const addSpaceX = ref(0) // 
const tabsActive = ref(1) // tabs显示idex
const myUSDTNumber = ref(0) // 添加的usdt数量
const myUSDTNumber2 = ref(0) // 组合添加的usdt数量


const state = useGlobalState();
let web3 = ref();
let myAddress = ref(""); //我的地址
let infoData = ref(""); //我的地址
let myETHBalance = ref('0'); // EHT余额
const addBnbNum = ref(0); // 添加的数量

let myUSDTBalance = ref(""); // USDT余额
let DeFiContract = ref(""); // 合约实例
let usdtContract = ref(""); // usdt合约实例
let SpaceXContract = ref(""); // SpaceX合约实例
let lpPairContract = ref(""); // lp流动性合约实例
let mySpaceXBalance = ref(""); // SpaceX余额
let LPContract = ref(""); // LP合约实例
// 0x76a569aBA8E6909e9350A36389D0a061e1264193
const invites = useRouteQuery('invs')
const refLinks = ref('')
const myLpBalance = ref(0) // 流动性总余额
const myLpTotleBalance = ref(0) // 我的流动性余额
const myAddCpuPower = ref(0) // 加入添加的算力
const myAddCpuPower2 = ref(0) // 组合加入添加的算力
const gasPrice = ref(0) // 当前gas价格
const gasLimit = ref(0) // gas最高限制费用


// 监听LP添加usdt的变化，更新SpaceX的值
watch(myUSDTNumber, (newValue) => {
  if (!newValue || newValue == 0) myAddCpuPower.value = 0
  myAddCpuPower.value = newValue * 2.5
});

watch(myAddCpuPower, (newValue) => {
  if (!newValue || newValue == 0) myUSDTNumber.value = 0
  myUSDTNumber.value = newValue / 2.5
});

// 监听tabs2添加usdt的变化，更新SpaceX的值
watch(myUSDTNumber2, (newValue) => {
  if (!newValue || newValue == 0) myAddCpuPower2.value = 0
  if (newValue == 0) return addSpaceX.value = 0
  myAddCpuPower2.value = Math.floor((newValue * 8.334) * 100) / 100
  // getPriceFun((Number(newValue)/ 0.3 * 0.5833))
  getPriceFun((Number(newValue) * 1.94444))

});

// watch(myAddCpuPower2, (newValue) => {
//   if(!newValue || newValue == 0) myUSDTNumber2.value = 0
//   myUSDTNumber2.value = (newValue / 83.334)
// });


const AddLpUsdtNumber = ref(0) // 添加流动性usdt数量
let spaceCoinPrice = ref(0); // SpaceX实时价格（1USDT）
let LPSpaceX = ref(0); // SpaceX实时价格（1USDT）


// 监听LP添加usdt的变化，更新SpaceX的值
watch(AddLpUsdtNumber, (newValue) => {
  LPSpaceX.value = Number(newValue) * spaceCoinPrice.value
});

// // 监听LP添加SpaceX的变化，更新usdt的值
watch(LPSpaceX, (newValue) => {
  AddLpUsdtNumber.value = Number(newValue) / spaceCoinPrice.value
});



if (typeof (invites.value) == "undefined") {
  refLinks.value = '0xDA02d522d8cd60de0a2F9773f80b16Fc9ED99bdd'
} else {
  refLinks.value = invites.value
}
console.log('当前邀请链接为：', refLinks.value);
const changeTabs = (idx) => {
  tabsActive.value = idx
}

let toFixed8 = (val) => {
  if (val == 0) return val
  return Number((Math.floor(val * 100000) / 100000)).toFixed(5)
}
const MaxBalance = () =>{
  addBnbNum.value = myETHBalance.value
}

onMounted(() => {

  // Web3浏览器检测
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
  }

  web3.value = new Web3(window.ethereum);
  // 连接钱包账户切换后触发的事件
  ethereum.on("accountsChanged", function (accounts) {
    console.log("连接钱包账户切换后触发的事件", accounts[0]); //一旦切换账号这里就会执行
    myAddress.value = accounts[0];
    joinWeb3();
  });
  // 正确处理链更改之后的业务流程可能很复杂。官方建议链更改只有重新加载页面
  ethereum.on("chainChanged", (chainId) => {
    console.log("chainId", chainId);
    window.location.reload();
  });
  // 断开连接监听事件
  ethereum.on("disconnect", async function (result, error) {
    console.log("断开连接", result);
    console.log("error", error);
  });
  connections();
  setInterval(() => {
    joinWeb3()
  }, 30000);
});

const connections = () => {
  //链接小狐狸钱包
  window.ethereum
    .request({ method: "eth_requestAccounts" })
    .then((res) => {
      console.log(res, "当前钱包地址");
      myAddress.value = res[0];
      state.updateMyAddress(res[0]);
      joinWeb3();
    })
    .catch((err) => {
      console.log(err);
      if (err.code == 4001) {
        console.log("用户拒绝连接");
      }
    });
};
const joinWeb3 = async () => {
  // 请求用户授权 解决web3js无法直接唤起Meta Mask获取用户身份
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  // // 授权获取账户
  // 返回指定地址账户的余额
  let balance = await web3.value.eth.getBalance(accounts[0]);
  myAddress.value = accounts[0];
  state.updateMyAddress(accounts[0]);
  try {
    // 创建合约实例
    DeFiContract.value = new web3.value.eth.Contract(defiABI, state.contractAddress.value);
    // 获取合约中返回的信息
    infoData.value = await DeFiContract.value.methods.getInfo(myAddress.value).call();
    // 设置info值
    state.updateInfoData(infoData.value);
    
    // // 创建usdt合约实例
    // usdtContract.value = new web3.value.eth.Contract(usdtABI, state.infoData.value.usdtCoin);
    // 获取钱包eth余额
    myETHBalance.value = web3.value.utils.fromWei(balance, "ether");
    console.log('myETHBalance', myETHBalance.value);
    // // 获取usdt余额
    // let usdtBalance = await usdtContract.value.methods.balanceOf(myAddress.value).call();
    // myUSDTBalance.value = web3.value.utils.fromWei(usdtBalance, "ether");
    // console.log('usdtBalance',myUSDTBalance.value);
    // // 创建spacex合约实例
    // SpaceXContract.value = new web3.value.eth.Contract(spaceXABI, state.infoData.value.spaceCoin);
    // // 获取spacex余额
    // let SpaceXBalance = await SpaceXContract.value.methods.balanceOf(myAddress.value).call();
    // mySpaceXBalance.value = web3.value.utils.fromWei(SpaceXBalance, "ether");
    // console.log('mySpaceXBalance',mySpaceXBalance.value);
    // // 获取当前质押等级
    // state.userLevel.value = await DeFiContract.value.methods.getUserLevel(myAddress.value).call();
    // if(state.infoData.value.inivet != '0x0000000000000000000000000000000000000000'){
    //   refLinks.value = state.infoData.value.inivet
    // }

    // // 获取LP实时价格 getPrice
    // const SpaceXPrice = await DeFiContract.value.methods.getPrice(state.infoData.value.spaceCoin).call();
    // spaceCoinPrice.value = web3.value.utils.fromWei(SpaceXPrice, "ether");
    // console.log('实时价格为：' ,spaceCoinPrice.value);
    // // 获取_pair() LP的地址然后使用BALANCEOF函数拿到LP数量即可
    // const lp_pair = await SpaceXContract.value.methods._pair().call();
    // // 创建查询流动性组合合约实例
    // lpPairContract.value = new web3.value.eth.Contract(cakeLpABI, lp_pair);
    // const my_lp_balanceOf  = await lpPairContract.value.methods.balanceOf(myAddress.value).call();
    // const lp_balanceOf = await SpaceXContract.value.methods.balanceOf(lp_pair).call();
    // myLpBalance.value = web3.value.utils.fromWei(my_lp_balanceOf, "ether");
    // myLpTotleBalance.value = web3.value.utils.fromWei(lp_balanceOf, "ether");
    // // console.log('LP 流动性地址为：',lp_pair);
    // // console.log('LP 流动性总数量：',myLpTotleBalance.value);
    // // console.log('我的LP 流动性数量：',myLpBalance.value);
    // // 创建 增删流动性 实例
    // LPContract.value = new web3.value.eth.Contract(lpABI, state.LPAddress.value);


    // // 获取当前gas价格
    gasPrice.value = await web3.value.eth.getGasPrice();
    // // 设置gas费用
    // gasLimit.value = 9000000; // 设置gas限制
    // const gasCost = gasLimit.value * gasPrice.value;
    // console.log('计算后的gas价格', gasCost/1000000000000000000);
  } catch (e) {
    ElMessage.warning(e.message);
    console.log(e);
  }
};
const stakeFun = () =>{
  if(!myAddress.value || myAddress.value === '0x00000000000000000000000000000000deadbeef'){
    return joinWeb3()
  }
  // myETHBalance addBnbNum
  if(addBnbNum.value < 0.5) return ElMessage.error('Minimum addition of 0.5 BNB');
  if(myETHBalance.value < 0.5) return ElMessage.error('The account balance is insufficient, please add more');
  if(addBnbNum.value > myETHBalance.value) return ElMessage.error('The account balance is insufficient, please add more');
  if(refLinks.value == 'undefined' || !refLinks.value) return ElMessage.warning('The invitation link address cannot be empty, please obtain the invitation link again.') 

  const callValue = web3.value.utils.toWei(addBnbNum.value.toString());
  console.log('购买的数量',callValue);
  console.log('邀请链接----',refLinks.value);
  console.log('from---',myAddress.value);

  DeFiContract.value.methods.stake(refLinks.value)
    .send({
      from: myAddress.value,
      value: callValue
    })
    .on('transactionHash', (hash)=>{
      console.log(hash);
      ElMessage.success('交易已发送')
      console.log("Transaction sent");
    })
    .once('receipt', res => {
      ElMessage.success(t('TransactionSuccess'))
      console.log("交易已确认");
      addBnbNum.value = 0
      joinWeb3();
    })
    .catch((error) => {
      console.error('Approval failed:', error);
      if(error.code == '-32603' || error.message == 'transaction underpriced'){
        ElMessage.error('gas不足！');
      }
    });
}
</script>
<template>
  <div class="contact">
    <Header />
    <section class="hero-section hero-breadcumnd">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-xxl-7 col-lg-7 wow fadeInUp" data-wow-delay="0.2s">
            <div class="breadcumnd-content">
              <h1>IPO Power</h1>
              <ul class="breadcrumb-light">
                <li><a href="#">Home </a></li>
                <li><i class="fas fa-long-arrow-right"></i></li>
                <li>Pages</li>
                <li><i class="fas fa-long-arrow-right"></i></li>
                <li>IPO Power</li>
              </ul>
            </div>
          </div>
          <div class="col-xxl-6 col-lg-5"></div>
        </div>
      </div>
      <div class="banner-shape1">
        <img src="@/assets/img/banner/b-shape1.png" alt="b-shape" />
      </div>
      <div class="banner-shape4">
        <img src="@/assets/img/banner/drop.png" alt="b-shape" />
      </div>
    </section>
    <section class="contact-section pt-120 pb-120">
      <div class="container">
        <div class="section-header section-center wow fadeInDown" data-wow-delay="0.3s">
          <h2 class="section-title">Join Mining</h2>
          <p>
            Join us now and embark on your journey of computing mining!
          </p>
        </div>
        <div class="tabs_warp">
          <div class="tabs_item" :class="{active : tabsActive == 1}" @click="changeTabs(1)">Miner</div>
          <div class="tabs_item" :class="{active : tabsActive == 2}" @click="changeTabs(2)">Liquidity</div>
        </div>
        <div
          class="row justify-content-between align-items-center max-w-2xl m-auto flex flex-col items-center justify-center">
          <div class="col-lg-12" style="padding: 0;">
            <div class="add_power rounded-lg px-3 py-3 pb-1 pt-6 h-sm:p-2 h-sm:pt-2">
              <div v-if="tabsActive == 1" class="wallet_info">
                <div class="wallet_item">
                  <div class="wallet_item_top">
                    <div>
                      <span>Stake BNB</span>
                    </div>
                    <div class="flex">
                      <span>Balance: {{ myETHBalance }}
                        <span class="font-semibold">BNB</span>
                      </span>
                      <span class="max_btn" @click="MaxBalance()">Max</span>
                    </div>
                  </div>
                  <div class="wallet_item_mid relative">
                    <div
                      class="wallet_item_logo absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none px-3 py-3">
                      <IconBNB style="width: 2rem;height: 2rem;" />
                    </div>
                    <input class="text-right" id="ethAmountToStake" name="ethAmountToStake" placeholder="0.00"
                      type="number" v-model="addBnbNum">
                  </div>
                  <div class="wallet_item_footer"></div>
                </div>
                <div class="wallet_item">
                  <div class="wallet_item_top">
                    <div>
                      <span>My computing power</span>
                    </div>
                    <div class="flex">
                    </div>
                  </div>
                  <div class="wallet_item_mid relative">
                    <div
                      class="wallet_item_logo absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none px-3 py-3">
                      <IconCPU style="width: 2rem;height: 2rem;" />
                    </div>
                    <div class="calculation text-right">{{ state.infoData.value.userCp }}</div>
                  </div>
                  <div class="wallet_item_footer"></div>
                </div>
                <div class="rounded-md shadow mt-5 mb-5 h-sm:mt-2">
                  <div v-if="state.myAddress" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-md text-white action-button md:py-5 md:text-xl md:px-10" @click="stakeFun()">
                    Start Mining
                  </div>
                  <div
                    v-else
                    class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-md text-white action-button md:py-5 md:text-xl md:px-10">
                    Connect Wallet
                  </div>
                </div>
              </div>
              <div v-if="tabsActive == 2" class="wallet_info">
                <div class="wallet_item">
                  <div class="wallet_item_top">
                    <div>
                      <span>Stake BNB</span>
                    </div>
                    <div class="flex">
                      <span>Balance: {{ myETHBalance }}
                        <span class="font-semibold">BNB</span>
                      </span>
                      <span class="max_btn">Max</span>
                    </div>
                  </div>
                  <div class="wallet_item_mid relative">
                    <div
                      class="wallet_item_logo absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none px-3 py-3">
                      <IconBNB style="width: 2rem;height: 2rem;" />
                    </div>
                    <input class="text-right" id="ethAmountToStake" name="ethAmountToStake" placeholder="0.00"
                      type="number">
                  </div>
                  <div class="wallet_item_footer"></div>
                </div>
                <div class="wallet_item">
                  <div class="wallet_item_top">
                    <div>
                      <span>Stake IPO</span>
                    </div>
                    <div class="flex">
                      <span>Balance: 0.00
                        <span class="font-semibold">IPO</span>
                      </span>
                      <span class="max_btn">Max</span>
                    </div>
                  </div>
                  <div class="wallet_item_mid relative">
                    <div
                      class="wallet_item_logo absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none px-3 py-3">
                      <IconLogo style="width: 2rem;height: 2rem;" />
                    </div>
                    <div class="calculation">0.00000</div>
                    <div class="absolute inset-y-0 right-2 flex items-center justify-end px-1 z-10 w-72">
                      <span class="text-xl">
                        <span class="text-2xl relative pr-1 -top-[1px]">≈</span>
                        $0.00 USD</span>
                    </div>
                  </div>
                  <div class="wallet_item_footer"></div>
                </div>
                <dl class="divide-y divide-slate-100 divide-opacity-25 p-3 text-xs sm:text-sm h-sm:p-2 h-sm:text-xs">
                  <div class="py-2 flex items-center justify-between">
                    <dt class="font-medium">Routing</dt>
                    <dd class="font-base flex items-center"><!---->
                      <div
                        class="bg-pink-100 text-pink-800 inline-flex items-baseline px-2 py-0.5 rounded-full mr-1 text-xs font-medium h-sm:text-xxs">
                        Protocol</div>
                      <div data-v-5784ed69="" class="inline-block"
                        style="border: 12px solid transparent; margin: -12px; --c81fc0a4: 9999;">
                        <div data-v-5784ed69=""><svg data-v-5784ed69-s="" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                            data-slot="icon" class="h-5 w-5 cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z">
                            </path>
                          </svg></div>
                        <div data-v-5784ed69="" class="popper" style="display: none;">
                          <p data-v-5784ed69-s="">Determines whether you are using the protocol's deposit pool or being
                            routed through secondary markets.</p>
                          <p data-v-5784ed69-s="" class="my-2"> Note that there is a 0.05% deposit fee when minting rETH
                            through the protocol. This fee prevents attacks around rate updates. This fee is socialised
                            across all rETH holders. </p>
                          <div data-v-20b7fd4a="" data-v-5784ed69="" id="arrow" data-popper-arrow=""></div>
                        </div>
                      </div>
                    </dd>
                  </div>
                  <div class="py-2 flex items-center justify-between">
                    <dt class="font-medium flex">Exchange Rate</dt>
                    <dd class="font-base flex items-center justify-between"><span class="pr-1">1 rETH = 1.09336 ETH</span>
                      <div data-v-5784ed69="" class="inline-block"
                        style="border: 12px solid transparent; margin: -12px; --c81fc0a4: 9999;">
                        <div data-v-5784ed69=""><svg data-v-5784ed69-s="" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                            data-slot="icon" class="h-5 w-5 cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z">
                            </path>
                          </svg></div>
                        <div data-v-5784ed69="" class="popper" style="display: none;">
                          <p data-v-5784ed69-s="">rETH's exchange rate continuously accrues value vs ETH. As you receive
                            rewards, your amount of rETH will not change.</p>
                          <p data-v-5784ed69-s="" class="my-2">When you unstake it will be worth more ETH than what you
                            paid.</p>
                          <p data-v-5784ed69-s="" class="my-2">A market <span data-v-5784ed69-s=""
                              class="font-bold">discount</span> means the price given is less than the redeemable
                            (assuming liquidity) rETH exchange rate.</p>
                          <p data-v-5784ed69-s="" class="my-2">A market <span data-v-5784ed69-s=""
                              class="font-bold">premium</span> means the price given is greater than the redeemable
                            (assuming liquidity) rETH exchange rate.</p>
                          <div data-v-20b7fd4a="" data-v-5784ed69="" id="arrow" data-popper-arrow=""></div>
                        </div>
                      </div>
                    </dd>
                  </div>
                  <div class="py-2 flex items-center justify-between">
                    <dt class="font-medium">Average Return</dt>
                    <dd class="font-base flex items-center"><span class="font-bold text-theme-highlight pr-1"><span
                          class="relative -top-[1px] text-md leading-none">≈</span> 3.25%</span><span
                        class="pr-1">APR</span>
                      <div data-v-5784ed69="" class="inline-block"
                        style="border: 12px solid transparent; margin: -12px; --c81fc0a4: 9999;">
                        <div data-v-5784ed69=""><svg data-v-5784ed69-s="" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                            data-slot="icon" class="h-5 w-5 cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round"
                              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z">
                            </path>
                          </svg></div>
                        <div data-v-5784ed69="" class="popper" style="display: none;">Based on 7 day average<div
                            data-v-20b7fd4a="" data-v-5784ed69="" id="arrow" data-popper-arrow=""></div>
                        </div>
                      </div>
                    </dd>
                  </div>
                  <div class="py-2 flex items-center justify-between pb-0 divide-none">
                    <dt class="font-medium">Transaction Cost</dt>
                    <dd class="font-base">0.01 ETH (<span class="relative -top-[1px] text-md leading-none">≈</span> $21.79
                      <span class="font-semibold">USD</span>)</dd>
                  </div>
                  <div class="py-2 flex items-center justify-between pb-0 border-none">
                    <dt class="font-medium"></dt>
                    <dd class="font-base"> @ <span class="font-semibold">19</span> gwei <!----><span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 h-sm:text-xxs">Low</span>
                    </dd>
                  </div>
                </dl>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
    <section class="faq-section section-bg-two pb-120 pt-120">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="section-header section-center wow fadeInDown"
              style="visibility: visible; animation-name: fadeInDown">
              <h2>Frequently Asked Questions</h2>
              <p>
                Aenean venenatis libero odio,id efficitur elit tempus fringilla.
                Fusce et rutrum tortor. Mauris ut enim nulla. Vestibulum a
                pellentesque eros.
              </p>
            </div>
            <div class="main-faq">
              <div class="faq-left-wrapper">
                <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <div class="accordion-header" id="headingOne">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        <span>Are you open for new projects? </span><span class="icon"><img
                            src="@/assets/img/faq/plus.png" alt="arrow-img" /></span><span class="plus"><img
                            src="@/assets/img/faq/d.png" alt="arrow-img" /></span>
                      </button>
                      <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                          <p>
                            Aenean venenatis libero odio,id efficitur elit
                            tempus fringilla. Fusce et rutrum tortor. Mauris ut
                            enim nulla. Vestibulum a pellentesque eros.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div class="accordion-header" id="headingTwo">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <span>Do you currently have career openings?</span><span class="icon"><img
                            src="@/assets/img/faq/plus.png" alt="arrow-img" /></span><span class="plus"><img
                            src="@/assets/img/faq/d.png" alt="arrow-img" /></span>
                      </button>
                      <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                          <p>
                            All successful bidders can confirm their winning bid
                            by checking the “Techbid”. In addition,all
                            successful bidders will receive an email notifying
                            them of their winning bid after the auction closes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div class="accordion-header" id="headingThree">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        <span>How long has the agency been running for?</span><span class="icon"><img
                            src="@/assets/img/faq/plus.png" alt="arrow-img" /></span><span class="plus"><img
                            src="@/assets/img/faq/d.png" alt="arrow-img" /></span>
                      </button>
                      <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                          <p>
                            All successful bidders can confirm their winning bid
                            by checking the “Techbid”. In addition,all
                            successful bidders will receive an email notifying
                            them of their winning bid after the auction closes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div class="accordion-header" id="headingThree4">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThree4" aria-expanded="false" aria-controls="collapseThree">
                        <span>Do you offer discounts for nonprofit companies?</span><span class="icon"><img
                            src="@/assets/img/faq/plus.png" alt="arrow-img" /></span><span class="plus"><img
                            src="@/assets/img/faq/d.png" alt="arrow-img" /></span>
                      </button>
                      <div id="collapseThree4" class="accordion-collapse collapse" aria-labelledby="headingThree4"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                          <p>
                            All successful bidders can confirm their winning bid
                            by checking the “Techbid”. In addition,all
                            successful bidders will receive an email notifying
                            them of their winning bid after the auction closes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<style lang="less">
@import url('@/assets/css/base.css');
.divide-y{
  color: var(--theme-color);
}
.font-semibold {
  font-weight: 600;
}

.add_power {
  background-color: var(--white-color);
  box-shadow: 0 5px 15.52px 0.48px rgba(0, 0, 0, 0.27);
  position: relative;
}

.wallet_item {
  color: var(--theme-color);
  margin-bottom: 20px;
}

.wallet_item_top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 6px;
}

.max_btn {
  cursor: pointer;
  font-size: .75rem;
  line-height: 1rem;
  font-weight: 500;
  padding: 4px 8px;
  margin-left: 4px;
  border-radius: 9999px;
  color: var(--white-color);
  background: var(--button-color);
}

#ethAmountToStake {
  box-shadow: none;
  display: block;
  width: 100%;
  font-size: 1.5rem;
  border-radius: 0.375rem;
  padding: 1rem 0.75rem 1rem 3.5rem;
  background-color: #f5f4ff;
  border: 1px solid #fff0;
  color: var(--theme-color);

  &:focus {
    outline: none;
    border: 1px solid var(--border);
  }
}

.calculation {
  display: block;
  width: 100%;
  border-radius: 0.375rem;
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity));
  padding: 1rem 0.75rem 1rem 3.5rem;
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.calculation {
  border-style: none;
  background-color: rgb(254 202 202 / var(--tw-bg-opacity));
  --tw-bg-opacity: .25;
}

.calculation {
  font-size: 1.5rem;
  line-height: 1.75rem;
}

.action-button {
  border-radius: 10px;
  background: var(--button-color);
}

.tabs_warp {
  width: 268px;
  height: 44px;
  background-color: #0c4bbc;
  border-radius: 22px;
  position: relative;
  display: flex;
  justify-content: space-around;
  -webkit-box-align: center;
  align-items: center;
  user-select: none;
  padding: 3px;
  margin: 0px auto 24px;
}

.tabs_item {
  z-index: 2;
  margin: 0px;
  border-radius: 22px;
  line-height: 1.6em;
  text-decoration: none;
  flex: 1 1 0%;
  text-align: center;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  height: 100%;
  color: #fff;
  cursor: pointer;

  &.active {
    opacity: 1;
    color: var(--border);
    background: #fff;
  }
}</style>
