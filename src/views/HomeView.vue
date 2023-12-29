<script setup>
import { ref, computed, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { useGlobalState } from "@/store";
import WLDABI from "@/abis/defiABI.json";
import WOW from "wow.js";
import {
  More,
} from '@element-plus/icons-vue'
const state = useGlobalState();

console.log("state", state);
let web3 = ref();
let myAddress = ref(""); //我的地址
let WLDContract = ref(null); // 合约实例
let myBalance = ref(null); // 钱包余额
let infoData = ref(null); // 合约信息
let drawer = ref(false); // 合约信息

onMounted(async () => {
  let wow = new WOW({
    boxClass: 'wow',    // 需要执行动画元素的Class
    animateClass: 'animated',    //animation.css动画的Class
    offset: 0,    //距离可视区域多少开始执行动画
    mobile: true,    //是否在移动设备执行动画
    live: true    //异步加载的内容是否有效
  });
  wow.init();
});
 // young pool enforce priority cabbage amount warrior minute tooth resource transfer tag custom elephant goat remove noise ride select shift neutral young upset list
//  console.log('young pool enforce priority cabbage amount warrior minute tooth resource transfer tag custom elephant goat remove noise ride select shift neutral young upset list');
let showAdd = computed(() => {
  if (!myAddress.value) return "Connect Wallet";
  return (
    myAddress.value.substring(0, 4) + "...." + myAddress.value.substr(-4, 4)
  );
});
let refLinks = computed(()=>{ 
  if(state.myAddress.value){
    return window.location.origin + `/?invs=${state.myAddress.value}`
  }
  return 'Connect Wallet'
})
const copyLink = () => {
  let _input = document.createElement("input");
  _input.value = refLinks.value;
  document.body.appendChild(_input);
  _input.select();
  document.execCommand("Copy");
  ElMessage.success("Copied to clipboard");
  _input.remove();
};
const handleClose = () =>{
  drawer.value = false
}
const drawerShow = () =>{
  drawer.value = true
}
</script>
<template>
  <div class="home">
    <Header />
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div
            class="col-xxl-6 col-lg-7 wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <div class="hero-content">
              <h5>Welcome to IPO
              </h5>
              <h1>We are a high-yield web3 project</h1>
              <p>
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua quis ipsum.
              </p>
              <div class="banner-cmn">
                <!-- <a href="#" class="cmn--btn">邀请好友</a> -->
                <a href="#" class="cmn--border" @click="copyLink">
                  Copy referral link
                </a>
              </div>
            </div>
          </div>
          <div class="col-xxl-6 col-lg-5"></div>
        </div>
      </div>
      <div class="hero-thumb">
        <img src="@/assets/img/banner/hero.png" alt="hero-img" />
      </div>
      <div class="banner-shape1">
        <img src="@/assets/img/banner/b-shape1.png" alt="b-shape" />
      </div>
      <div class="banner-shape2">
        <img src="@/assets/img/banner/ratio2.png" alt="b-shape" />
      </div>
      <div class="banner-shape3">
        <img src="@/assets/img/banner/bisssu.png" alt="b-shape" />
      </div>
      <div class="banner-shape4">
        <img src="@/assets/img/banner/drop.png" alt="b-shape" />
      </div>
      <div class="banner-shape5">
        <img src="@/assets/img/banner/ratio.png" alt="b-shape" />
      </div>
    </section>
    <section class="counter-section pb-120">
      <div class="container">
        <div class="counter-wrapper">
          <div class="row g-4">
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div class="counter-items odometer-item">
                <p class="mb-4">Fomo Balance</p>
                <div class="counter-content">
                  <div class="cont d-flex align-items-center">
                    <h2
                      class="odometer odometer-auto-theme"
                      data-odometer-final="321"
                    >
                    $
                      <count-to class="conut_to" :startVal='0' :endVal='state.infoData.value.bnbNum' :duration='3000' :decimals="0"/>
                    </h2>
                    <h2>BNB</h2>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div class="counter-items odometer-item">
                <div class="counter-content">
                  <p>NO.1 Address</p>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="state.infoData.value.NO1"
                    placement="top-end"
                  >
                    <span class="address_txt">{{ state.infoData.value.NO1 }}</span>
                  </el-tooltip>
                  <div class="mt-5">
                    <p class="mb-2">NO.1 BNB Number</p>
                    <h2>{{ state.TMCP }} BNB</h2>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div class="counter-items odometer-item">
                <p class="mb-4">Invite more than 12 BNB addresses per day</p>
                <div class="add_warp">
                  <div class="add_item pt-2 pb-2" v-for="items in state.Team12BNB.value" :key="items">
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      :content="items"
                      placement="top-end"
                    >
                      <span class="">{{items}}</span>
                    </el-tooltip>
                  </div>
                  <div v-if="state.Team12BNB.value.length>0" class="more_btn" @click="drawerShow()">More <el-icon class="ml-2"><More /></el-icon></div>
                  <div v-else style="color: black;">No data</div>
                </div>
              </div>
            </div>
            <div v-if="false" class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div class="counter-items odometer-item">
                <div class="counter-content">
                  <div class="cont d-flex align-items-center">
                    <h2
                      class="odometer odometer-auto-theme"
                      data-odometer-final="56"
                    >
                      <count-to class="conut_to" :startVal='0' :endVal='15' :duration='3000' :decimals="0"/>
                    </h2>
                    <h2>%</h2>
                  </div>
                </div>
                <p>APR</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
    <el-drawer
      v-model="drawer"
      title="Invite more than 12 BNB addresses per day"
      direction="btt"
      :before-close="handleClose"
      size="90%"
    >
      <div class="add_item pt-2 pb-2" v-for="key in 20" :key="key">
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="state.infoData.value.NO1"
          placement="top-end"
        >
          <span class="pt-2 pb-2">0x0000000000000000000000000000000000000000</span>
    </el-tooltip>
      </div>
    </el-drawer>
  </div>
</template>

<style lang="less" scoped>
.add_item{
  border-bottom: 1px solid #ccc;
}
.ml-2{
  margin-left: 0.5rem!important;
}
.more_btn{
  margin-top: 20px;
  cursor: pointer;
  display: block;
  border-radius: 10px;
  padding: 10px 29px;
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  line-height: 23.4px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  z-index: 1;
  background-color: transparent;
  border: 1px solid var(--border);
  color: var(--theme-color);
}
.add_item{
  cursor: text;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: var(--theme-color);
}
.address_txt {
  color: var(--theme-color);
  display: inline-block;
  max-width: 220px;
  text-align: right;
  font-size: 20px;
  font-weight: bold;
  cursor: text;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
