
<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useDebounceFn } from '@vueuse/core'
import { ElMessage, ElNotification } from "element-plus";
// import { useI18n } from 'vue-i18n'
import { useGlobalState } from "@/store";
const state = useGlobalState();
const headerChild = ref();
let fromWeiFun = (val)=>{ 
  if(val == 0) return val
  return (val / 1000000000000000000).toFixed(4)
}
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
              <h1>IPO Income</h1>
              <ul class="breadcrumb-light">
                <li><a href="#">Home </a></li>
                <li><i class="fas fa-long-arrow-right"></i></li>
                <li>Pages</li>
                <li><i class="fas fa-long-arrow-right"></i></li>
                <li>IPO Income</li>
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
          <h2 class="section-title">View my earnings details</h2>
          <p>
            Update earnings every 15 seconds, please check carefully
          </p>
        </div>
        <div class="row justify-content-between align-items-center max-w-2xl m-auto flex flex-col items-center justify-center">
          <div class="col-lg-12" style="padding: 0;">
            <div class="add_power rounded-lg px-3 py-3 pb-1 pt-6 h-sm:p-2 h-sm:pt-2">
              <div class="income_info">
                <div class="income_item bg-amber-50 flex items-center justify-between">
                  <span>个人算力</span>
                  <span>
                    {{ fromWeiFun(state.infoData.value.userCp) }} / V0
                  </span>
                </div>
                <div class="income_item bg-lime-50 flex items-center justify-between">
                  <span>已领取奖励</span>
                  <span style="text-align: right;">
                    {{ fromWeiFun(state.infoData.value.overAward) }} BNB
                    <p style="font-size: 12px;">
                      ≈ 0.000 USDT
                    </p>
                  </span>
                </div>
                <div class="income_item bg-green-50 flex items-center justify-between">
                  <span>可领取奖励</span>
                  <span style="text-align: right;">
                    {{ fromWeiFun(state.infoData.value.userAward) }} BNB
                    <p style="font-size: 12px;">
                      ≈ 0.000 USDT 
                    </p>
                  </span>
                </div>
              </div>
              <div class="rounded-md shadow mt-5 mb-5 h-sm:mt-2">
                <div v-if="state.myAddress" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-md text-white action-button md:py-5 md:text-xl md:px-10" @click="claimFun()">
                  Receive award
                </div>
                <div
                  v-else
                  class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-md text-white action-button md:py-5 md:text-xl md:px-10">
                  Connect Wallet
                </div>
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
  </div>
</template>


<style lang="less">
@import url('@/assets/css/base.css');
.font-semibold {
  font-weight: 600;
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

