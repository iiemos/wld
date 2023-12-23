
<script setup>
import { ref, computed, onMounted } from "vue";
import WOW from "wow.js";
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
</script>

<template>
  <div class="about">
    <Header />
    <section class="hero-section hero-breadcumnd">
      <div class="container">
        <div class="row align-items-center">
          <div
            class="col-xxl-6 col-lg-7 wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <div class="breadcumnd-content">
              <h1>Team</h1>
              <ul class="breadcrumb-light">
                <li><a href="#">Home </a></li>
                <li><i class="fas fa-long-arrow-right"></i></li>
                <li>Team</li>
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
          <h2 class="section-title">Our core values</h2>
          <p>
            Nam semper,lectus ac vestibulum sollicitudin,enim ante elementum
            ligula,nec ornare nulla elit vel nunc.
          </p>
        </div>
        <div class="row justify-content-between align-items-center max-w-2xl m-auto flex flex-col items-center justify-center">
          <div class="col-lg-12" style="padding: 0;">
            <div class="add_power rounded-lg px-3 py-3 pb-1 pt-6 h-sm:p-2 h-sm:pt-2">
              <div class="income_info">
                <div class="income_item bg-amber-50 flex items-center justify-between">
                  <span class="text-sm">
                    <img class="w-10 h-10" src="@/assets/img/process/process1.png"/>
                    直推算力
                  </span>
                  <span>
                    0.000
                  </span>
                </div>
                <div class="income_item bg-amber-50 flex items-center justify-between">
                  <span class="text-sm">
                    <img class="w-10 h-10" src="@/assets/img/process/process5.png"/>
                    团队算力
                    </span>
                  <span>
                    0.000
                  </span>
                </div>
                <div class="income_item bg-lime-50 flex items-center justify-between">
                  <span class="text-sm">
                    <img class="w-10 h-10" src="@/assets/img/process/process8.png"/>
                    直推可领奖励
                    </span>
                  <span style="text-align: right;">
                    0.000 USDT
                    <p style="font-size: 12px;">
                      ≈ 0.000 SpaceX 
                    </p>
                  </span>
                </div>
                <div class="income_item bg-green-50 flex items-center justify-between">
                  <span class="text-sm">
                    <img class="w-10 h-10" src="@/assets/img/process/process8.png"/>
                    团队可领奖励
                    </span>
                  <span class="text-sm">
                    0.000 USDT
                    <p style="font-size: 12px;">
                      ≈ 0.000 SpaceX 
                    </p>
                  </span>
                </div>
                <div class="income_item bg-green-50 flex items-center justify-between">
                  <span class="text-sm">
                    <img class="w-10 h-10" src="@/assets/img/process/process7.png"/>
                    上级地址
                    </span>
                  <span style="text-align: right;">
                    <p style="font-size: 12px;">
                    0x0000000000000000000
                    </p>
                  </span>
                </div>
              </div>

            </div>
            <div class="rounded-md shadow mt-5 h-sm:mt-2">
              <button class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-md text-white action-button md:py-5 md:text-xl md:px-10">
                Connect Wallet
              </button>
              <div></div>
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

