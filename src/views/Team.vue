
<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useDebounceFn } from '@vueuse/core'
import { ElMessage, ElNotification } from "element-plus";
import {
  ZoomIn,
  Pointer,
} from '@element-plus/icons-vue'
import { useGlobalState } from "@/store";
import IconCoins from '@/components/icons/IconCoins.vue'
import WOW from "wow.js";

const centerDialogVisible = ref(false)
const state = useGlobalState();
const teamArray = ref([]);
const headerChild = ref();
onMounted(async () => {
  let wow = new WOW({
    boxClass: 'wow',    //需要执行动画元素的Class
    animateClass: 'animated',    //animation.css动画的Class
    offset: 0,    //距离可视区域多少开始执行动画
    mobile: true,    //是否在移动设备执行动画
    live: true    //异步加载的内容是否有效
  });
  wow.init();
});
let fromWeiFun = (val)=>{ 
  if(val == 0) return val
  return (val / 1000000000000000000).toFixed(4)
}
let refLinks = computed(()=>{ 
  if(state.myAddress.value){
    return window.location.origin + `/?invs=${state.myAddress.value}`
  }
  return 'Connect Wallet'
})
const copyLink = () => {
  let _input = document.createElement('input')
    _input.value = refLinks.value;
    document.body.appendChild(_input)
    _input.select()
    document.execCommand('Copy')
    ElMessage.success('Link copied to clipboard! Send it to everyone')
    _input.remove()
};

const formatHas = (hash) => {
  if (!hash) {
    return '';
  }
  const front = hash.slice(0, 4);
  const back = hash.slice(-4);
  return `${front}....${back}`;
}
const getMyTeamArr = async() =>{
  centerDialogVisible.value = true
  // 获取直推地址列表
  if(state.infoData.value.teamLength>0){
    let teamData = await state.DeFiContract.value.methods
    .getTeamArry(state.myAddress.value,0,state.infoData.value.teamLength)
    .call();
    const teamMap = teamData.filter(arrItem => arrItem != '0x0000000000000000000000000000000000000000');
    const arr = await teamMap.map( async item =>{
      let userinfoData = await state.DeFiContract.value.methods.getInfo(item).call();
      let newObj = {...userinfoData, myUserAddress: item}
      return newObj
    });
    let temp = await Promise.all(arr)
    teamArray.value = temp
    console.log('团队小区业绩',temp);
  }
}
</script>

<template>
  <div class="about">
    <Header ref="headerChild"/>
    <section class="hero-section hero-breadcumnd">
      <div class="container">
        <div class="row align-items-center">
          <div
            class="col-xxl-6 col-lg-7 wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <div class="breadcumnd-content">
              <h1>IPO {{ $t("team") }}</h1>
              <ul class="breadcrumb-light">
                <li><a href="#">{{ $t("home") }} </a></li>
                <li><i class="fas fa-long-arrow-right"></i></li>
                <li>Pages</li>
                <li><i class="fas fa-long-arrow-right"></i></li>
                <li>IPO {{ $t("team") }}</li>
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
    <section class="process-section pt-120 pb-120">
      <div class="container">
        <div
          class="section-header section-center wow fadeInDown"
          data-wow-delay="0.3s"
        >
          <h2 class="section-title">{{ $t("myTeam") }}</h2>
          <p>
            <!-- {{ $t("FootetP1") }} -->
          </p>
        </div>
        <div class="row justify-content-between align-items-center max-w-2xl m-auto flex flex-col items-center justify-center">
          <div class="col-lg-12" style="padding: 0;">
            <div class="add_power rounded-lg px-3 py-3 pb-1 pt-6 h-sm:p-2 h-sm:pt-2">
              <div class="income_info">
  
                <div class="income_item bg-amber-50 flex items-center justify-between">
                  <span class="text-sm">
                    <img class="w-10 h-10" src="@/assets/img/process/process1.png"/>
                    {{ $t("TeamSize") }}
                  </span>
                  <span>
                    {{ (state.infoData.value.team2Length) }}
                  </span>
                </div>
                <div class="income_item bg-amber-50 flex items-center justify-between">
                  <span class="text-sm">
                    <img class="w-10 h-10" src="@/assets/img/process/process5.png"/>
                    {{ $t("TeamComputingPower") }}
                    </span>
                  <span>
                    {{ fromWeiFun(state.infoData.value.teamCp2) / 2 }}
                  </span>
                </div>
                <div>
                  <div class="income_item bg-lime-50 flex items-center justify-between" @click="getMyTeamArr">
                    <span class="text-sm">
                      <img class="w-10 h-10" src="@/assets/img/process/process8.png"/>
                      {{ $t("TeamCommunityPerformance") }}
                      </span>
                    <span style="text-align: right;">
                      <!-- {{ (state.infoData.value.teamLength) }} -->
                      <el-icon><Pointer /></el-icon>
                    </span>
                  </div>
                </div>

                <div class="income_item bg-lime-50 flex items-center justify-between">
                  <span class="text-sm">
                    <img class="w-10 h-10" src="@/assets/img/process/process8.png"/>
                    {{ $t("MyCP") }}
                    </span>
                  <span style="text-align: right;">
                    {{ fromWeiFun(state.infoData.value.userCp) }}
                  </span>
                </div>
                <!-- <div class="income_item bg-green-50 flex items-center justify-between">
                  <span class="text-sm">
                    <img class="w-10 h-10" src="@/assets/img/process/process8.png"/>
                    我的算力
                    </span>
                  <span class="text-sm" style="text-align: right;">
                    0.000 BNB
                    <p style="font-size: 12px;">
                      ≈ 0.000 USDT 
                    </p>
                  </span>
                </div> -->
                <div class="income_item bg-green-50 flex items-center justify-between">
                  <span class="text-sm">
                    <img class="w-10 h-10" src="@/assets/img/process/process7.png"/>
                    {{ $t("SuperiorAddress") }}
                    </span>
                  <span style="text-align: right;">
                    <p style="font-size: 12px;" class="flex items-center">
                      <el-tooltip
                        class="box-item"
                        effect="dark"
                        :content="state.infoData.value.inivet"
                        placement="top-end"
                      >
                        <span class="address_txt">{{ formatHas(state.infoData.value.inivet) }}</span>
                      </el-tooltip>
                    </p>
                  </span>
                </div>
              </div>
              <!-- <div class="award_warp mt-4 mb-4 flex items-center justify-center">
                <div class="award_btn">
                  <IconCoins />
                  直推奖励
                </div>
                <div class="award_btn">
                  <IconCoins />团队奖励
                </div>
              </div> -->
            </div>
          </div>
          <div class="rounded-md mt-5 mb-5 h-sm:mt-2">
            <div v-if="state.myAddress" class=" w-full flex items-center justify-center px-8 py-3 text-base font-semibold rounded-md  md:py-5 md:text-xl md:px-10 copy_btn" @click="copyLink()">
              {{ $t("CopyInvitationLink") }}
            </div>
            <div
              v-else
              class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-md text-white action-button md:py-5 md:text-xl md:px-10">
              {{ $t("ConnectWallet") }}
            </div>
          </div>
        </div>
      </div>
    </section>
    <el-dialog
      v-model="centerDialogVisible"
      :title="`${$t('InvitationList')} ${state.infoData.value.teamLength}`"
      width="90%"
      align-center
    >
    <div>
      <!-- <div v-if="teamArray > 0" class="inv_list"> -->
      <div class="inv_list">
        <div class="inv_item" v-for="invitem in teamArray" :key="invitem.myUserAddress">
          <div>
            Levle: V{{ invitem.levle }}
          </div>
          <div>
            Pool: {{ fromWeiFun(invitem.userCp) }}
          </div>
          <div>
            Team CP : {{ fromWeiFun(invitem.teamCp2) / 2 }}
          </div>
          <el-tooltip
            effect="dark"
            :content="invitem.myUserAddress"
            placement="top-end"
          >
            <span class="">
              Address: {{ formatHas(invitem.myUserAddress) }}
            </span>
          </el-tooltip>
        </div>
        <!-- <div class="inv_item" v-for="invitem in teamArray" :key="invitem">
          {{ invitem }}
        </div> -->
      </div>
      <div v-if="teamArray.length <= 0" class="">
        <el-empty description="No Data" />
      </div>
    </div>

    </el-dialog>
    <Footer />
  </div>
</template>


<style lang="less">
@import url('@/assets/css/base.css');
.inv_list{
  max-height: 60vh;
  overflow-y: scroll;
  font-size: 12px;
  .inv_item{
    text-align: left;
    cursor: text;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 10px 0;
    border-bottom: 1px solid rgba(0, 0, 0, .2);
  }
}
.copy_btn{
  background-color: transparent;
  border: 1px solid var(--border);
  color: var(--border);
  border-radius: 10px;
}
.address_txt {
  // color: #fff !important;
  display: inline-block;
  max-width: 150px;
  text-align: right;
  cursor: text;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.award_warp{
  .award_btn{
    background-color: transparent;
    border: 1px solid var(--border);
    color: var(--border);
    border-radius: 10px;
    font-size: 14px;
    padding: 8px 12px;
    width: 50%;
    line-height: 23.4px;
    display: inline-block;
    text-transform: capitalize;
    transition: all 0.3s;
    text-align: center;
    &:nth-child(1){
      margin-right: 4px;
    }
    &:nth-child(2){
      margin-left: 4px;
    }
  }
}
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

