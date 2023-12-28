<script setup>
import { ref, computed, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { useGlobalState } from "@/store";
import WLDABI from "@/abis/defiABI.json";
import WOW from "wow.js";

const state = useGlobalState();

console.log("state", state);
let web3 = ref();
let myAddress = ref(""); //我的地址
let WLDContract = ref(null); // 合约实例
let myBalance = ref(null); // 钱包余额
let infoData = ref(null); // 合约信息

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
                <div class="counter-content">
                  <div class="cont d-flex align-items-center">
                    <h2
                      class="odometer odometer-auto-theme"
                      data-odometer-final="321"
                    >
                    $
                      <count-to class="conut_to" :startVal='0' :endVal='321' :duration='3000' :decimals="0"/>
                    </h2>
                    <h2>B</h2>
                  </div>
                </div>
                <p>30 Day Volume</p>
              </div>
            </div>
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div class="counter-items odometer-item">
                <div class="counter-content">
                  <div class="cont d-flex align-items-center">
                    <h2
                      class="odometer odometer-auto-theme"
                      data-odometer-final="28"
                    >$
                      <count-to class="conut_to" :startVal='0' :endVal='59' :duration='3000' :decimals="0"/>
                    </h2>
                    <h2>B</h2>
                  </div>
                </div>
                <p>Managed on IPO</p>
              </div>
            </div>
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div class="counter-items odometer-item">
                <div class="counter-content">
                  <div class="cont d-flex align-items-center">
                    <h2
                      class="odometer odometer-auto-theme"
                      data-odometer-final="9"
                    >
                    $
                      <count-to class="conut_to" :startVal='0' :endVal='28' :duration='3000' :decimals="0"/>
                    </h2>
                    <h2>M</h2>
                  </div>
                </div>
                <p>Total Collateral Automated</p>
              </div>
            </div>
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
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
  </div>
</template>

<style></style>
