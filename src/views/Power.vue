
<script setup>
import IconUSDT from '@/components/icons/IconUSDT.vue'
import IconBNB from '@/components/icons/IconBNB.vue'
import IconCPU from '@/components/icons/IconCPU.vue'
import IconLogo from '@/components/icons/IconLogo.vue'
import Swap from '@/components/Swap.vue'
import { ref, computed, onMounted, watch } from "vue";
import { RouterLink, RouterView } from "vue-router";
// import { useI18n } from 'vue-i18n'
import { useRouteQuery } from '@vueuse/router'
import { useGlobalState } from "@/store";
import { useDebounceFn, computedAsync, useStorage } from '@vueuse/core'
import { ElMessage, ElNotification } from "element-plus";
import { Pointer } from '@element-plus/icons-vue'
import defiABI from "@/abis/defiABI.json";
// const { t } = useI18n()

let UserUSDTBalance = computed(()=>{ 
  if(!state.myUSDTBalance.value){
    return 0
  }else{
    return Number((Math.floor(state.myUSDTBalance.value * 100000) / 100000)).toFixed(5)
  }
})
const addSpaceX = ref(0) // 
const tabsActive = ref(1) // tabs显示idex
const myUSDTNumber = ref(0) // 添加的usdt数量
const myUSDTNumber2 = ref(0) // 组合添加的usdt数量
const headerChild = ref();

const state = useGlobalState();
let web3 = ref();
let myAddress = ref(""); //我的地址
let infoData = ref(""); //我的地址
let myETHBalance = ref('0'); // EHT余额
const addUsdtNum = ref(0); // 添加的数量

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



console.log('当前邀请链接为：', state.inviteLink.value);
let fromWeiFun = (val)=>{ 
  if(val == 0) return val
  return (val / 1000000000000000000)
}

// const handleInput = (event => {
//   const regex = /0*([1-9]\d*|0\.\d+)/; // 正则表达式，匹配以0.开头的小数
//   const newValue = event.target.value;

//   if (regex.test(newValue) || newValue === '') {
//     addUsdtNum.value = newValue.replace(regex, '$1'); // 将新的值赋给响应式的变量
//   }
// })


const changeTabs = (idx) => {
  tabsActive.value = idx
}
const MaxBalance = () =>{
  addUsdtNum.value = state.myUSDTBalance.value
}
const stakeFun = async() =>{
  if(!state.myAddress.value || state.myAddress.value === '0x00000000000000000000000000000000deadbeef'){
    return headerChild.value.joinWeb3();
  }
  // myETHBalance addUsdtNum
  /* 临时去除最低0.5的校验 */ 
  if(addUsdtNum.value < 100) return ElMessage.error('Minimum addition of 100 USDT');
  if(addUsdtNum.value > 10000) return ElMessage.error('Max addition of 10000 USDT');
  // if(state.myETHBalance.value < 0.5) return ElMessage.error('The account balance is insufficient, please add more');

  if(addUsdtNum.value > state.myUSDTBalance.value) return ElMessage.error('The account balance is insufficient, please add more');
  // if(state.inviteLink.value == 'undefined' || !state.inviteLink.value) return ElMessage.warning('The invitation link address cannot be empty, please obtain the invitation link again.') 
  const callValue = state.web3.value.utils.toWei(addUsdtNum.value.toString());
  // 判断是否授权
  let allowanceOfCurrentAccount = await state.UsdtContract.value.methods.allowance(state.myAddress.value, state.contractAddress.value).call();
  console.log('被授权的数量：',allowanceOfCurrentAccount);
  console.log('购买的数量',callValue);
  if(allowanceOfCurrentAccount == 0 || Number(allowanceOfCurrentAccount) < Number(callValue)){
    console.log('执行授权语句');
    return approveUSDT()
  }else{
    console.log('邀请链接----',state.inviteLink.value);
    console.log('from---',state.myAddress.value);
    console.log('Defi合约地址---',state.contractAddress.value);
    if(!state.inviteLink.value || state.inviteLink.value == 'undefined') return ElMessage.error('邀请链接不能为空！');
    state.DeFiContract.value.methods.stake(state.inviteLink.value, callValue)
      .send({
        from: state.myAddress.value,
      })
      .on('transactionHash', (hash)=>{
        console.log(hash);
        ElMessage.success('交易已发送')
        console.log("Transaction sent");
      })
      .once('receipt', res => {
        ElMessage.success(t('TransactionSuccess'))
        console.log("交易已确认");
        addUsdtNum.value = 0
        headerChild.value.joinWeb3();
      })
      .catch((error) => {
        console.error('Approval failed:', error);
        if(error.code == '4001'){
          ElMessage.warning('用户拒绝了请求！');
        }
        if(error.code == '-32603' || error.message == 'transaction underpriced'){
          ElMessage.error('gas不足！');
        }
      });
  }
}
const approveUSDT = ()=>{
  let stringValue = state.web3.value.utils.toWei("100000000000", "ether"); // 默认授权额度
  // 创建代币合约实例
  state.UsdtContract.value.methods.approve(state.contractAddress.value, stringValue).send({
    from: state.myAddress.value
  }).then((receipt) => {
    console.log('授权成功USDT', receipt);
    // stakeFun()
  }).catch((error) => { console.log('授权失败',error); })
}
</script>
<template>
  <div class="contact">
    <Header ref="headerChild"/>
    <section class="hero-section hero-breadcumnd">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-xxl-7 col-lg-7 wow fadeInUp" data-wow-delay="0.2s">
            <div class="breadcumnd-content">
              <h1>IPO {{ $t('power') }}</h1>
              <ul class="breadcrumb-light">
                <li><a href="#">{{ $t('home') }} </a></li>
                <li><i class="fas fa-long-arrow-right"></i></li>
                <li>Pages</li>
                <li><i class="fas fa-long-arrow-right"></i></li>
                <li>IPO {{ $t('power') }}</li>
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
          <h2 class="section-title">{{ $t('JoinMining') }}</h2>
          <p>
            {{ $t('JoinMiningTxt') }}
          </p>
        </div>
        <div class="tabs_warp">
          <div class="tabs_item" :class="{active : tabsActive == 1}" @click="changeTabs(1)">Miner</div>
          <div class="tabs_item" :class="{active : tabsActive == 2}" @click="changeTabs(2)">Swap</div>
        </div>
        <div
          class="row justify-content-between align-items-center max-w-2xl m-auto flex flex-col items-center justify-center">
          <div class="col-lg-12" style="padding: 0;">
            <div class="add_power rounded-lg px-3 py-3 pb-1 pt-6 h-sm:p-2 h-sm:pt-2">
              <div v-if="tabsActive == 1" class="wallet_info">
                <div class="wallet_item">
                  <div class="wallet_item_top">
                    <div>
                      <span>{{ $t('Stake') }} USDT</span>
                    </div>
                    <div class="flex">
                      <span>{{ $t('Balance') }}: {{ UserUSDTBalance }}
                        <span class="font-semibold">USDT</span>
                      </span>
                      <span class="max_btn" @click="MaxBalance()">Max</span>
                    </div>
                  </div>
                  <div class="wallet_item_mid relative">
                    <div
                      class="wallet_item_logo absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none px-3 py-3">
                      <IconUSDT style="width: 2rem;height: 2rem;" />
                    </div>
                    <input class="text-right" id="ethAmountToStake" name="ethAmountToStake" placeholder="0.00"
                      type="number" v-model="addUsdtNum" >
                  </div>
                  <div class="wallet_item_footer"></div>
                </div>
                <div class="wallet_item">
                  <div class="wallet_item_top">
                    <div>
                      <span>{{ $t('MyComputingPower') }}</span>
                    </div>
                    <div class="flex">
                    </div>
                  </div>
                  <div class="wallet_item_mid relative">
                    <div
                      class="wallet_item_logo absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none px-3 py-3">
                      <IconCPU style="width: 2rem;height: 2rem;" />
                    </div>
                    <div class="calculation text-right">{{ fromWeiFun(state.infoData.value.userCp) }}</div>
                  </div>
                  <div class="wallet_item_footer"></div>
                </div>
                <div class="rounded-md shadow mt-5 mb-5 h-sm:mt-2">
                  <div v-if="state.myAddress" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-md text-white action-button md:py-5 md:text-xl md:px-10" @click="stakeFun()">
                    {{ $t('StartMining') }}
                  </div>
                  <div
                    v-else
                    class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-md text-white action-button md:py-5 md:text-xl md:px-10">
                    {{ $t('ConnectWallet') }}
                  </div>
                </div>
              </div>
              <Swap v-if="tabsActive == 2"/>
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
              <h2>{{ $t('IPODetails') }}</h2>
              <p>
                {{ $t('IPODetails') }}
              </p>
            </div>
            <div class="main-faq">
              <div class="faq-left-wrapper">
                <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <div class="accordion-header" id="headingOne">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        <span>{{ $t('LiItem1') }} </span><span class="icon"><img
                            src="@/assets/img/faq/plus.png" alt="arrow-img" /></span><span class="plus"><img
                            src="@/assets/img/faq/d.png" alt="arrow-img" /></span>
                      </button>
                      <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                          <p>{{ $t('LiItem1Txt') }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div class="accordion-header" id="headingThree">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        <span>{{ $t('LiItem2') }}</span><span class="icon"><img
                            src="@/assets/img/faq/plus.png" alt="arrow-img" /></span><span class="plus"><img
                            src="@/assets/img/faq/d.png" alt="arrow-img" /></span>
                      </button>
                      <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                          <p>{{ $t('LiItem2Txt') }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div class="accordion-header" id="headingThree4">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThree4" aria-expanded="false" aria-controls="collapseThree">
                        <span>{{ $t('LiItem3') }}</span><span class="icon"><img
                            src="@/assets/img/faq/plus.png" alt="arrow-img" /></span><span class="plus"><img
                            src="@/assets/img/faq/d.png" alt="arrow-img" /></span>
                      </button>
                      <div id="collapseThree4" class="accordion-collapse collapse" aria-labelledby="headingThree4"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                          <p>{{ $t('LiItem3Txt') }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div class="accordion-header" id="headingTwo">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <span>{{ $t('LiItem4') }}</span><span class="icon"><img
                            src="@/assets/img/faq/plus.png" alt="arrow-img" /></span><span class="plus"><img
                            src="@/assets/img/faq/d.png" alt="arrow-img" /></span>
                      </button>
                      <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                          <p>{{ $t('LiItem4Txt') }}
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
