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
    boxClass: 'wow',    //需要执行动画元素的Class
    animateClass: 'animated',    //animation.css动画的Class
    offset: 0,    //距离可视区域多少开始执行动画
    mobile: true,    //是否在移动设备执行动画
    live: true    //异步加载的内容是否有效
  });
  wow.init();
});

let refLinks = computed(() => {
  if (myAddress.value) {
    return window.location.origin + `/?ref=${myAddress.value}`;
  }
  return "Connect Wallet";
});
let showAdd = computed(() => {
  if (!myAddress.value) return "Connect Wallet";
  return (
    myAddress.value.substring(0, 4) + "...." + myAddress.value.substr(-4, 4)
  );
});
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
              <h5>Welcome to IPO</h5>
              <h1>We are a high-yield web3 project</h1>
              <p>
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua quis ipsum.
              </p>
              <div class="banner-cmn">
                <a href="#" class="cmn--btn">邀请好友</a>
                <a href="#" class="cmn--border">
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
    <section class="service-section pb-120">
      <div class="container">
        <div
          class="section-header section-center wow fadeInDown"
          data-wow-delay="0.3s"
        >
          <h2 class="section-title">Our Services</h2>
          <p>
            Nam semper,lectus ac vestibulum sollicitudin,enim ante elementum
            ligula,nec ornare nulla elit vel nunc.
          </p>
        </div>
        <div class="row g-4">
          <div
            class="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp"
            data-wow-delay="0.9s"

          >
            <div class="service-items">
              <div class="thumb">
                <img src="@/assets/img/service/service1.png" alt="service-img" />
              </div>
              <div class="content">
                <h5><a href="#0">3D modeling</a></h5>
                <p>Praesent volutpat lorem vitae sem rutrum faucibus.</p>
              </div>
            </div>
          </div>
          <div
            class="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp"
            data-wow-delay="0.7s"
          >
            <div class="service-items">
              <div class="thumb">
                <img src="@/assets/img/service/service2.png" alt="service-img" />
              </div>
              <div class="content">
                <h5><a href="#0">3D rendering</a></h5>
                <p>Praesent volutpat lorem vitae sem rutrum faucibus.</p>
              </div>
            </div>
          </div>
          <div
            class="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp"
            data-wow-delay="0.5s"
          >
            <div class="service-items">
              <div class="thumb">
                <img src="@/assets/img/service/service3.png" alt="service-img" />
              </div>
              <div class="content">
                <h5><a href="#0">3D modeling</a></h5>
                <p>Praesent volutpat lorem vitae sem rutrum faucibus.</p>
              </div>
            </div>
          </div>
          <div
            class="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <div class="service-items">
              <div class="thumb">
                <img src="@/assets/img/service/service4.png" alt="service-img" />
              </div>
              <div class="content">
                <h5><a href="#0">3D rendering</a></h5>
                <p>Praesent volutpat lorem vitae sem rutrum faucibus.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="service-btn">
          <a href="#0" class="cmn--border">Browse Services </a>
        </div>
      </div>
    </section>
    <section class="about-section section-bg-two pt-120 pb-120">
      <div class="container">
        <div class="row flex-row-reverse align-items-center">
          <div
            class="col-lg-5 wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <div class="about-content-right">
              <div class="section-header">
                <h2 class="section-title">About Us</h2>
                <p>
                  Nam semper,lectus ac vestibulum sollicitudin,enim ante
                  elementum ligula,nec ornare nulla elit vel nunc. Fusce
                  consequat varius blandit.
                </p>
              </div>
              <div class="about-cmn">
                <a href="#" class="cmn--btn">About us </a
                ><a href="#" class="cmn--border">Contact us </a>
              </div>
            </div>
          </div>
          <div
            class="col-lg-7 wow fadeInDown"
            data-wow-delay="0.4s"
          >
            <div class="about-thumb-left">
              <img src="@/assets/img/about/about.png" alt="about-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="protfolio-section pt-120 pb-120">
      <div class="container">
        <div class="protfolio-header-wrapper">
          <div class="section-header">
            <h2 class="section-title">Our portfolio</h2>
            <p>
              Nam semper,lectus ac vestibulum sollicitudin,enim ante elementum
              ligula,nec ornare nulla elit vel nunc.
            </p>
          </div>
          <a href="#" class="cmn--btn">Browse Portfolio </a>
        </div>
        <div class="row g-4">
          <div
            class="col-lg-4 col-md-6 col-sm-10 wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <div class="protfolio-items">
              <div class="protfolio-thumb">
                <a href="#"
                  ><img
                    src="@/assets/img/protfolio/protfolio1.png"
                    alt="protfolio-img"
                /></a>
              </div>
              <div class="protfolio-content">
                <h5>
                  <a href="#"
                    >Illustrations for Saaslify Website Design
                  </a>
                </h5>
                <a href="#" class="cmn--link"
                  >Read Case study <i class="fas fa-chevron-right"></i
                ></a>
              </div>
            </div>
          </div>
          <div
            class="col-lg-4 col-md-6 col-sm-10 wow fadeInUp"
            data-wow-delay="0.4s"
          >
            <div class="protfolio-items">
              <div class="protfolio-thumb">
                <a href="#"
                  ><img
                    src="@/assets/img/protfolio/protfolio2.png"
                    alt="protfolio-img"
                /></a>
              </div>
              <div class="protfolio-content">
                <h5>
                  <a href="#"
                    >Motion Graphics for Techly Intro Video
                  </a>
                </h5>
                <a href="#" class="cmn--link"
                  >Read Case study <i class="fas fa-chevron-right"></i
                ></a>
              </div>
            </div>
          </div>
          <div
            class="col-lg-4 col-md-6 col-sm-10 wow fadeInUp"
            data-wow-delay="0.6s"
          >
            <div class="protfolio-items">
              <div class="protfolio-thumb">
                <a href="#"
                  ><img
                    src="@/assets/img/protfolio/protfolio3.png"
                    alt="protfolio-img"
                /></a>
              </div>
              <div class="protfolio-content">
                <h5>
                  <a href="#"
                    >Characters 3D Pack for Applify Brand
                  </a>
                </h5>
                <a href="#" class="cmn--link"
                  >Read Case study <i class="fas fa-chevron-right"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="touch-project pt-120 pb-120 section-bg">
      <div class="container">
        <div class="row align-items-center">
          <div
            class="col-lg-6 wow fadeInDown"
          >
            <div class="touch-left-content">
              <div class="section-header">
                <h2 class="section-title text-white">
                  Have a project? Get in touch today
                </h2>
                <p class="text-white">
                  Pellentesque tortor lorem,facilisis vel urna eget,maximus
                  sodales metus. Nulla luctus lacus ante,ut sollicitudin mi
                  eleifend eu. Donec condimentum nibh at enim accumsan
                  vestibulum.
                </p>
                <a href="#0" class="cmn--btn">Get in touch </a>
              </div>
            </div>
          </div>
          <div
            class="col-lg-6 wow fadeInUp"
          >
            <div class="touch-thumb">
              <img src="@/assets/img/touch/touch.png" alt="touch-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="process-section pt-120 pb-120">
      <div class="container">
        <div
          class="section-header section-center wow fadeInDown"
        >
          <h2 class="section-title">Our Process</h2>
          <p>
            Nam semper,lectus ac vestibulum sollicitudin,enim ante elementum
            ligula,nec ornare nulla elit vel nunc.
          </p>
        </div>
        <div class="row justify-content-center g-4">
          <div
            class="col-lg-4 col-md-6 col-sm-10 wow fadeInUp"
            data-wow-delay="0.6s"
          >
            <div class="process-items">
              <div class="process-thumb">
                <a href="#0"
                  ><img src="@/assets/img/process/process1.png" alt="process-img"
                /></a>
              </div>
              <div class="process-content">
                <h4><a href="#0">Project Idea </a></h4>
                <p>
                  In vel ipsum pretium,sagittis tellus sed,finibus mauris.
                  Curabitur varius placerat risus.
                </p>
              </div>
            </div>
          </div>
          <div
            class="col-lg-4 col-md-6 col-sm-10 wow fadeInUp"
            data-wow-delay="0.4s"
          >
            <div class="process-items">
              <div class="process-thumb">
                <a href="#0"
                  ><img src="@/assets/img/process/process2.png" alt="process-img"
                /></a>
              </div>
              <div class="process-content">
                <h4><a href="#0">Execution </a></h4>
                <p>
                  In vel ipsum pretium,sagittis tellus sed,finibus mauris.
                  Curabitur varius placerat risus.
                </p>
              </div>
            </div>
          </div>
          <div
            class="col-lg-4 col-md-6 col-sm-10 wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <div class="process-items">
              <div class="process-thumb">
                <a href="#0"
                  ><img src="@/assets/img/process/process3.png" alt="process-img"
                /></a>
              </div>
              <div class="process-content">
                <h4><a href="#0">Deliver </a></h4>
                <p>
                  In vel ipsum pretium,sagittis tellus sed,finibus mauris.
                  Curabitur varius placerat risus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="touch-section section-bg-two pt-120 pb-120">
      <div class="container">
        <div class="protfolio-header-wrapper">
          <div class="section-header">
            <h2 class="section-title">Our articles</h2>
            <p>
              Nam semper,lectus ac vestibulum sollicitudin,enim ante elementum
              ligula,nec ornare nulla elit vel nunc.
            </p>
          </div>
          <a href="#" class="cmn--btn">Browse all articles </a>
        </div>
        <div class="row g-4">
          <div
            class="col-lg-6 col-md-6 col-sm-10 wow fadeInUp"
            data-wow-delay="0.4s"
          >
            <div class="protfolio-items touch-items">
              <div class="protfolio-thumb">
                <a href="#"
                  ><img src="@/assets/img/article/article1.png" alt="article-img"
                /></a>
                <div class="article-btn">
                  <a href="#0" class="cmn--btn">News </a>
                </div>
              </div>
              <div class="protfolio-content">
                <h5>April 1,2022</h5>
                <h4>
                  <a href="#"
                    >How to Solve the Biggest Problems in a Creative Design
                    Agency
                  </a>
                </h4>
              </div>
            </div>
          </div>
          <div
            class="col-lg-6 col-md-6 col-sm-10 wow fadeInUp"
            data-wow-delay="0.6s"
          >
            <div class="protfolio-items touch-items">
              <div class="protfolio-thumb">
                <a href="#"
                  ><img src="@/assets/img/article/article2.png" alt="article-img"
                /></a>
                <div class="article-btn">
                  <a href="#0" class="cmn--btn">Resources </a>
                </div>
              </div>
              <div class="protfolio-content">
                <h5>April 1,2022</h5>
                <h4>
                  <a href="#"
                    >10 benefits of creating 3d animated videos for your
                    business
                  </a>
                </h4>
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
