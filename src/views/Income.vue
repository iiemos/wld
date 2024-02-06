
<script setup>
import IconUSDT from '@/components/icons/IconUSDT.vue'
import IconLogo from '@/components/icons/IconLogo.vue'
import { ref, computed, onMounted, watch } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useDebounceFn } from '@vueuse/core'
import { ElMessage, ElNotification } from "element-plus";
// import { useI18n } from 'vue-i18n'
import { useGlobalState } from "@/store";
const state = useGlobalState();
const headerChild = ref();
const claimToWalletVal = ref(0);
const centerDialogVisible = ref(false)
const isApprove = ref(true)
// 除以18位，保留4位小数
function fromWeiFun(number) {
  // 将数字除以10的18次方
  const dividedNumber = number / Math.pow(10, 18);
  // 将除以18个0后的数字转为字符串
  const numberString = dividedNumber.toString();
  // 拆分整数部分和小数部分
  const [integerPart, decimalPart] = numberString.split('.');
  // 将整数部分每1000加一个逗号分隔符
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // 保留小数部分最多4位小数
  const formattedDecimalPart = decimalPart ? decimalPart.slice(0, 4) : '';
  // 组合整数部分和小数部分
  const result = formattedDecimalPart ? `${formattedIntegerPart}.${formattedDecimalPart}` : formattedIntegerPart;
  return result;
}

function fromWeiFunUSDT(number) {
  const numberString = number.toString();
  // 拆分整数部分和小数部分
  const [integerPart, decimalPart] = numberString.split('.');
  // 将整数部分每1000加一个逗号分隔符
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // 保留小数部分最多4位小数
  const formattedDecimalPart = decimalPart ? decimalPart.slice(0, 4) : '';
  // 组合整数部分和小数部分
  const result = formattedDecimalPart ? `${formattedIntegerPart}.${formattedDecimalPart}` : formattedIntegerPart;
  return result;
}


// 我的领取代币进度
const MyTokenJD = () =>{
  const userTotle = fromWeiFun(state.infoData.value.userCp*2)
  if(state.userSY.value == 0) return userTotle + ' / ' + userTotle
  const SYKLQ = state.userSY.value / Math.pow(10, 18) // 剩余可领取
  const WDSL = state.infoData.value.userCp / Math.pow(10, 18) // 我的算力
  const ToWeiYLQ = (WDSL * 2) - SYKLQ
  const res =  fromWeiFunUSDT(ToWeiYLQ) + ' / ' + userTotle
  return res
}

let myLevle = computed(()=>{ 
  const cp =  state.infoData.value.userCp / 1000000000000000000
  if(cp < 2000 ) return '0'
  if(cp >= 2000 || cp < 6000 ) return '1'
  if(cp >= 6000 || cp < 30000 ) return '2'
  if(cp >= 30000 || cp < 150000 ) return '3'
  if(cp >= 150000 || cp < 300000 ) return '4'
  if(cp >= 300000 || cp < 500000 ) return '5'
  if(cp >= 500000 || cp < 1000000 ) return '6'
  if(cp >= 1000000 || cp < 2000000 ) return '7'
  if(cp >= 2000000) return '8'
})

let UserIPOBalance = computed(()=>{ 
  if(!state.BbaCoinBlance.value){
    return 0
  }else{
    return Number((Math.floor(state.BbaCoinBlance.value * 100000) / 100000)).toFixed(5)
  }
})

// userSY 个人淘汰进度 已领取收益 overAward / 可领取上限收益 userAward
let nowUserSy = computed(()=>{ 
  if(state.infoData.value.userCp == 0){
    return 0
  }else if(state.userSY.value == 0)
    return 100
  else{
    // state.userSY
    // return Number(state.infoData.value.overAward) / (Number(state.infoData.value.userCp) * 2 )
    // 已领取
    const YLQ = (Number(state.infoData.value.userCp) * 2 ) - Number(state.userSY.value)
    return (YLQ / (Number(state.infoData.value.userCp) * 2 )*100)
  }
})


const USDTtransFromIPO = computed(()=>{ 
  if(state.infoData.value.userAward == 0){
    return 0
  }else{
    let userFromWei = state.web3.value.utils.fromWei(state.infoData.value.userAward, "ether");
    // let truncatedNum = Math.floor(state.ipoToWeiQuote.value * 10000) / 10000;
    let truncatedNum = state.ipoToWeiQuote.value;
    const usdNum = (Number(userFromWei) / Number(truncatedNum))
    const numberString = usdNum.toString();
    // 拆分整数部分和小数部分
    const [integerPart, decimalPart] = numberString.split('.');
    // 将整数部分每1000加一个逗号分隔符
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // 保留小数部分最多4位小数
    const formattedDecimalPart = decimalPart ? decimalPart.slice(0, 6) : '';
    // 组合整数部分和小数部分
    const result = formattedDecimalPart ? `${formattedIntegerPart}.${formattedDecimalPart}` : formattedIntegerPart;
    return result;
  }
})
onMounted(() => {
  // getPeopleMoney()
  // getPrice2Fun()
  // setTimeout(()=>{
  // checkAuthorization()
  // },2000)
})
// 领取奖励
const claimFun = useDebounceFn( async() => {
  if(!state.myAddress.value || state.myAddress.value === '0x00000000000000000000000000000000deadbeef'){
    return headerChild.value.joinWeb3();
  }
  if(state.myETHBalance.value * 1 < 0.001) return ElMessage.warning('Insufficient Gas');
  if(state.infoData.value.userAward == '0') return ElMessage.warning('当前奖励为0，请确认后再进行操作！');
  try{
    state.DeFiContract.value.methods.claim().send({
        from: state.myAddress.value,
        gasPrice: state.gasPrice.value
      })
    .on('transactionHash', (hash)=>{
      console.log('hash',hash);
      ElMessage.success(t('withdrawSend'))
      console.log("Transaction sent");
    })
    .once('receipt', res => {
      ElMessage.success(t('withdrawConfirmed'))
      console.log("Transaction confirmed");
      headerChild.value.joinWeb3();
    })
    .catch((error) => {
        console.error('Approval failed:', error.code);
        if(error.code == '-32603' || error.message == 'transaction underpriced'){
          ElMessage.error(t('gasLow'));
        }
      });
  }catch(e){
    console.log(e);
  }
})

const claimFun2 = useDebounceFn( async() => {
  if(!state.myAddress.value || state.myAddress.value === '0x00000000000000000000000000000000deadbeef'){
    return headerChild.value.joinWeb3();
  }
  const callValue = state.web3.value.utils.toWei(String(claimToWalletVal.value));
  const MyCoinVal = state.web3.value.utils.toWei(String(state.BbaCoinBlance.value));
  console.log('即将提取的数量------------',callValue);
  console.log('我的奖励数量------------',MyCoinVal);
  if(callValue == 0) return
  if(state.myETHBalance.value * 1 < 0.001) return ElMessage.warning('Insufficient Gas');
  if(MyCoinVal == '0') return ElMessage.warning('当前奖励为0，请确认后再进行操作！');
  if(Number(callValue) >  Number(MyCoinVal)) return ElMessage.warning('提取数量大于奖励数量，请确认后再操作');
  try{
    // const callValue = state.web3.value.utils.toWei(String(state.infoData.value.userAward));
    console.log('提取到钱包的数量',callValue);
    console.log('我的奖励数量',MyCoinVal);
    state.DeFiContract.value.methods.claim2(callValue).send({
        from: state.myAddress.value,
      })
    .on('transactionHash', (hash)=>{
      console.log('hash',hash);
      ElMessage.success(t('withdrawSend'))
      console.log("Transaction sent");
    })
    .once('receipt', res => {
      ElMessage.success(t('withdrawConfirmed'))
      console.log("Transaction confirmed");
      headerChild.value.joinWeb3();
    })
    .catch((error) => {
        console.error('Approval failed:', error.code);
        if(error.code == '-32603' || error.message == 'transaction underpriced'){
          ElMessage.error(t('gasLow'));
        }
      });
  }catch(e){
    console.log(e);
  }
})

const stake2 = useDebounceFn( async() => {
  try{
    state.DeFiContract.value.methods.stake2().send({
      from: state.myAddress.value,
    })
    .on('transactionHash', (hash)=>{
      console.log('hash',hash);
      console.log("Transaction sent");
    })
    .once('receipt', res => {
      console.log("Transaction confirmed");
      headerChild.value.joinWeb3();
    })
    .catch((error) => {
        console.error('Approval failed:', error.code);
        if(error.code == '-32603' || error.message == 'transaction underpriced'){
          ElMessage.error(t('gasLow'));
        }
      });
  }catch(e){
    console.log(e);
  }
})
</script>
<template>
  <div class="contact">
    <Header ref="headerChild"/>
    <section class="hero-section hero-breadcumnd">
      <div class="container">
        <div class="row align-items-center">
          <div
            class="col-xxl-7 col-lg-7 wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <div class="breadcumnd-content">
              <h1>IPO {{ $t("income") }}</h1>
              <ul class="breadcrumb-light">
                <li><a href="#">{{ $t("home") }} </a></li>
                <li><i class="fas fa-long-arrow-right"></i></li>
                <li>Pages</li>
                <li><i class="fas fa-long-arrow-right"></i></li>
                <li>IPO {{ $t("income") }}</li>
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
        <div
          class="section-header section-center wow fadeInDown"
          data-wow-delay="0.3s"
        >
          <h2 class="section-title">{{ $t("EarningsDetails") }}</h2>
          <p>
            {{ $t("EarningsDetailsTxt") }}
          </p>
        </div>
        <div class="row justify-content-between align-items-center max-w-2xl m-auto flex flex-col items-center justify-center">
          <div class="col-lg-12" style="padding: 0;">
            <div class="add_power rounded-lg px-3 py-3 pb-1 pt-6 h-sm:p-2 h-sm:pt-2">
              <p class="mb-2">{{ $t("EliminationProgress") }} </p>
              <p class="mb-2 " style="font-size: 12px;">
                {{ $t("ReceivedRewards") }}:
                <!-- <br/> -->
                {{ MyTokenJD() }}
              </p>
              <div class="mb-5 h-4 overflow-hidden rounded-full bg-gray-200">
                <div class="h-4 animate-pulse rounded-full bg-gradient-to-r from-sky-500 to-indigo-500" :style="{width: nowUserSy+'%'}"></div>
              </div>

              <div class="income_info">
                <div class="income_item bg-amber-50 flex items-center justify-between">
                  <span>{{ $t("MyCP") }} </span>
                  <span>
                    <!-- {{ fromWeiFun(state.infoData.value.userCp) }} / V{{ myLevle }} -->
                    {{ fromWeiFun(state.infoData.value.userCp) }} / V{{ state.infoData.value.levle }}
                  </span>
                </div>
                <div class="income_item bg-amber-50 flex items-center justify-between">
                  <span>{{ $t("MyFomoPool") }}</span>
                  <span>
                    {{ fromWeiFun(state.infoData.value.userOver12) }} USDT
                  </span>
                </div>
                <div class="income_item bg-lime-50 flex items-center justify-between">
                  <span>{{ $t("MyIPO") }}</span>
                  <span style="text-align: right;">
                    {{ UserIPOBalance }} IPO
                    <!-- <p style="font-size: 12px;">
                      ≈ 0.000 USDT
                    </p> -->
                  </span>
                </div>
                <div class="income_item bg-lime-50 flex items-center justify-between">
                  <span>{{ $t("OverAward") }}</span>
                  <span style="text-align: right;">
                    {{ fromWeiFun(state.infoData.value.overAward) }} IPO
                    <!-- <p style="font-size: 12px;">
                      ≈ 0.000 USDT
                    </p> -->
                  </span>
                </div>
                <div class="income_item bg-lime-50 flex items-center justify-between">
                  <span>{{ $t("DynamicIncome") }}</span>
                  <span style="text-align: right;">
                    {{ fromWeiFun(state.infoData.value.overTeam) }} IPO
                    <!-- <p style="font-size: 12px;">
                      ≈ 0.000 USDT
                    </p> -->
                  </span>
                </div>
                <div class="income_item bg-lime-50 flex items-center justify-between">
                  <span>{{ $t("TeamIncome") }}</span>
                  <span style="text-align: right;">
                    {{ fromWeiFun(state.infoData.value.overTeam2) }} IPO
                    <!-- <p style="font-size: 12px;">
                      ≈ 0.000 USDT
                    </p> -->
                  </span>
                </div>
                <div class="income_item bg-green-50 flex items-center justify-between">
                  <span>{{ $t("Award") }}</span>
                  <span style="text-align: right;">
                    {{  fromWeiFun(state.infoData.value.userAward) }} USDT
                    <p style="font-size: 12px;">
                      <!-- fromWeiFunUSDT(IpoTransFromUsdt) -->
                      ≈ {{ USDTtransFromIPO }} IPO 
                    </p>
                  </span>
                </div>
              </div>
              <div class="flex justify-between mt-5 mb-5 h-sm:mt-2">
                <div v-if="state.myAddress" class="flex items-center justify-center rounded-md shadow font-semibold py-3 action-button md:py-5 md:text-xl md:px-10" style="flex-basis: 48%" @click="claimFun()">
                  {{ $t("ClaimToAccount") }}
                </div>
   
                <div v-if="state.myAddress && isApprove"  :class="{ disabled: state.BbaCoinBlance.value == 0 }" class="flex items-center justify-center rounded-md shadow font-semibold py-3 action-button md:py-5 md:text-xl md:px-10" style="flex-basis: 48%" @click="centerDialogVisible = true">
                  {{ $t("ClaimToWallet") }}
                </div>
                <div
                v-if="!state.myAddress"
                  class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-md text-white action-button md:py-5 md:text-xl md:px-10">
                  Connect Wallet{{ $t("MyCP") }}
                </div>
              </div>
              <div class="migrate_data_btn py-3" 
              @click="stake2()">
                {{ $t('MigrateData') }}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
    <section v-if="false" class="contact-section pt-120 pb-120">
      <div class="container">
        <div class="section-header section-center wow fadeInDown" data-wow-delay="0.3s">
          <h2 class="section-title">Computing power level</h2>
        </div>
        <div class="row justify-content-between align-items-center max-w-2xl m-auto flex flex-col items-center justify-center mt-10">
            <div class="col-lg-12" style="padding: 0;">
              <div class="add_power rounded-lg px-3 py-3 pb-1 pt-6 h-sm:p-2 h-sm:pt-2">
                <div class="income_info">
                  <div class="flex flex-row py-3 px-2 my-2 ">
                    <div class="basis-1/4">等级</div>
                    <div class="basis-1/2 text-right">算力</div>
                    <div class="basis-1/4 text-right">权重</div>
                  </div>
                  <div class="flex flex-row py-3 px-2 my-2 rounded-md bg-red-50">
                    <div class="basis-1/4">V1</div>
                    <div class="basis-1/2 text-right">1-5000</div>
                    <div class="basis-1/4 text-right">0.5</div>
                  </div>
                  <div class="flex flex-row py-3 px-2 my-2 rounded-md bg-red-100">
                    <div class="basis-1/4">V2</div>
                    <div class="basis-1/2 text-right">5001-12500</div>
                    <div class="basis-1/4 text-right">1</div>
                  </div>
                  <div class="flex flex-row py-3 px-2 my-2 rounded-md bg-red-200">
                    <div class="basis-1/4">V3</div>
                    <div class="basis-1/2 text-right">12500-25000</div>
                    <div class="basis-1/4 text-right">1.2</div>
                  </div>
                  <div class="flex flex-row py-3 px-2 my-2 rounded-md bg-red-300">
                    <div class="basis-1/4">V4</div>
                    <div class="basis-1/2 text-right">≥ 25001</div>
                    <div class="basis-1/4 text-right">1.5</div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
    <Footer />
    <el-dialog
      v-model="centerDialogVisible"
      title="Claim to Wallet"
      width="90%"
      custom-class="toWalletDialog"
      align-center
    >
    <div class="wallet_item_mid relative">
      <div
        class="wallet_item_logo absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none px-3 py-3">
        <IconLogo style="width: 2rem;height: 2rem;" />
      </div>
      <input class="text-right" id="ethAmountToStake" name="ethAmountToStake" placeholder="0.00"
        type="number" v-model="claimToWalletVal" >
    </div>
      <template #footer>
        <span class="dialog-footer">
          <div class="confirm_btn" @click="claimFun2">{{ $t("Confirm") }}</div>
        </span>
      </template>
    </el-dialog>
  </div>
</template>


<style lang="less">
@import url('@/assets/css/base.css');
.font-semibold {
  font-weight: 600;
}
.migrate_data_btn{
  font-weight: bold;
  width: 100%;
  text-align: center;
  background: var(--border);
  border-radius: 6px;
  margin-bottom: 20px;
}
.toWalletDialog{
  border-radius: 10px;
  // background-color: #f0fdf4;
}
.confirm_btn{
  display: inline-block;
  padding: 4px 10px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid var(--border);
  color: var(--theme-color);
}
.add_power{
  background-color: var(--white-color);
  box-shadow: 0 5px 15.52px 0.48px rgba(0, 0, 0, 0.27);
  position: relative;
}
.wallet_item{
  color: var(--theme-color);
  margin-bottom: 20px;
}
.wallet_item_top{
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 6px;
}
.max_btn{
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
#ethAmountToStake{
  box-shadow: none;
  display: block;
  width: 100%;
  font-size: 1.5rem;
  border-radius: 0.375rem;
  color: var(--theme-color);
  padding: 1rem 0.75rem 1rem 3.5rem;
  background-color: #f5f4ff;
  border: 1px solid #fff0;
  color: var(--theme-color);
  &:focus{
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
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);
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
.action-button{
  border-radius: 10px;
  background: var(--button-color);
}
.income_info{
  color: var(--theme-color);
}
.income_item{
  margin-bottom: 10px;
  border-radius: 0.375rem;
  color: var(--theme-color);
  // background-color: #eceefb;
  padding: 1rem 0.75rem 1rem  0.75rem;
}
.bg-red-50{
  background-color: rgb(254 242 242);
}
.bg-red-300{
  background-color:#fca5a5;
}
.bg-orange-50{
  background-color: rgb(255 247 237);
}
.bg-amber-50{
  background-color: rgb(255 251 235);
}
.bg-lime-50{
  background-color: rgb(247 254 231);
}
.bg-green-50{
  background-color: rgb(240 253 244);
}
</style>

