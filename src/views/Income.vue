<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
// import '@/assets/js/deps-min.js';
// import '@/assets/js/core-min.js';
// import '@/assets/js/vehicles-min.js';
// function addFalconNineScripts() {
//     const t = document.getElementById("f9");
//     let n = document.createElement("script");
//     n.setAttribute("type", "text/javascript"),
//     n.setAttribute("src", require('@/assets/js/core-min.js')),
//     n.onload = function() {
//         let n = document.createElement("script");
//         n.setAttribute("type", "text/javascript"),
//         n.setAttribute("src", "/static/vehicles-min.js");
//         let e = document.createElement("script");
//         e.setAttribute("type", "text/javascript"),
//         e.setAttribute("src", "/static/tabs-min.js"),
//         t.appendChild(n),
//         t.appendChild(e)
//     }
//     ,
//     t.appendChild(n)
// }
onMounted(() => {
//   addFalconNineScripts()
})

</script>
<template>
    <div class="income">
      <Header />
        <section class="section-animate bg-falcon-9"></section>
        <div class="section-inner-center">
          <h3>Token income</h3>
          <p>SpaceX token income status</p>
        </div>
        <div id="slider" role="region" aria-label="Falcon 9 information carousel" tabindex="0" class="slider quickjump section swiper-container swiper-initialized swiper-horizontal swiper-backface-hidden" data-vehicle="">
            <div class="swiper-slide swiper-slide-active" role="group" aria-label="1 / 5" style="width: 100%;">
              <div class="background gallery-background gallery-full overflow-visible">
                <span class="reveal-bg" role="img" aria-label="A rendering of a fully stacked Falcon 9 booster with second stage and payload fairings" data-desktop="../../static/images/falcon-9/desktop/WebsiteF9Fairings_Render_Desktop.jpg" data-mobile="../../static/images/falcon-9/mobile/WebsiteF9Fairings_Render_Mobile.jpg" style="background-image: url(&quot;https://www.spacex.com/static/images/falcon-9/desktop/WebsiteF9Fairings_Render_Desktop.jpg&quot;);">
                </span>
                <div class="reveal-container">
                  <div class="reveal-overflow u-fullParent">
                    <span class="reveal-render u-fullParent" role="img" aria-label="A rendering of fully stacked Falcon 9 booster with second stage and payload fairings" data-desktop="../../static/images/falcon-9/desktop/WebsiteF9Fairings_Render_Desktop.jpg" data-mobile="../../static/images/falcon-9/mobile/WebsiteF9Fairings_Render_Mobile.jpg" style="background-image: url(&quot;https://www.spacex.com/static/images/falcon-9/desktop/WebsiteF9Fairings_Render_Desktop.jpg&quot;);"><div class="vsc-controller"></div>
                      <video id="reveal-video" role="img" aria-hidden="true" aria-describedby="f9-video-description" aria-labelledby="f9-video-description" autoplay="" loop="" muted="" width="100%" height="100%" preload="auto" autobuffer="true">
                        <source type="video/mp4" src="@/assets/media/WebsiteF9Fairings_Anim_Render_Desktop.mp4">
                        <p id="f9-video-description">A rendering of a fully stacked Falcon 9 booster spinning around its vertical axis</p>
                      </video>
                    </span>
                    <span id="reveal-lines" class="reveal-lines u-fullParent" role="img" aria-label="A wireframe rendering of a Falcon 9 booster with second stage and payload fairings" data-desktop="../../static/images/falcon-9/desktop/WebsiteF9Fairings_Lines_Desktop.jpg" data-mobile="../../static/images/falcon-9/mobile/WebsiteF9Fairings_Lines_Mobile.jpg" style="background-image: url(&quot;https://www.spacex.com/static/images/falcon-9/desktop/WebsiteF9Fairings_Lines_Desktop.jpg&quot;); opacity: 0;"><div class="vsc-controller"></div>
                      <video role="img" aria-hidden="true" loop="" muted="" width="100%" height="100%" preload="auto" autobuffer="true">
                        <source type="video/mp4" src="@/assets/media/WebsiteF9Fairings_Anim_Lines_Desktop.mp4">
                      </video>
                    </span>
                  </div>
                </div>
              </div>
              <div class="section-inner">
                <div id="reveal-overview" class="inner-left-middle" style="">
                  <p class="over-header js-bounding" style="margin: 0px; font-family: D-DIN-Bold;">Income</p>
                  <h2 class="js-stagger"  style="font-family: D-DIN-Bold;">Overview</h2>
                  <table class="data additional-toggle" style="display: table;">
                    <tbody>
                      <tr class="js-stagger">
                        <td>钱包余额</td>
                        <td>
                          70  <span>USDT /</span>
                          229.6 <span>SpaceX</span>
                        </td>
                      </tr>
                      <tr class="js-stagger">
                        <td>我的算力</td>
                          <td>
                            2000 <span> / v2</span>
                        </td>
                      </tr>
                      <tr class="js-stagger">
                        <td>全网算力</td>
                        <td>2000000 <span>/ ALL</span></td>
                      </tr>
                      <tr class="js-stagger">
                        <td>我的奖励</td>
                        <td>
                          999  <span>USDT /</span>
                          1,207,920 <span>SpaceX</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="action_btns">
                    <span>复投</span>
                    <span>提现</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div class="collapse" >
          <div class="section-inner resize" style="">
            <div class="inner-left-top">
              <p class="bold-over-header animate">revenue </p>
              <h2 class="animate" >mechanism</h2>
              <div class="content-tabs animate" role="tablist" >
              </div>
              <div class="content-tab-data" data-tab-bg="vacuum" role="tabpanel" id="vacuum-tab-panel" aria-labelledby="vacuum-tab">
                <p class="animate p_item">
                  <strong> 静态收益：</strong>
                  <span style="font-weight: 300;">
                    每日收益约为1.5%入金本位的代币SpaceX，每15秒爆一块。 
                  </span>
                </p>
                <p class="animate p_item" >
                  <strong> 直推收益：</strong>
                  <span style="font-weight: 300;">
                    每日收益为个人直推算力/全网算力*全网入金*0.15%，每15秒爆一块（带烧伤） 
                  </span>
                </p>
                <p class="animate p_item" >
                  <strong> 团队收益：</strong>
                  <span style="font-weight: 300;">
                    每日收益为团队小区算力/全网算力*全网入金*0.6%*级别权重，每15秒爆一块 
                  </span>
                </p>
              </div>
            </div>
          </div>

        </div>
        <div class="collapse" >
          <div class="section-inner resize" style="">
            <div class="inner-left-top">
              <p class="bold-over-header animate">Computing</p>
              <h2 class="animate" >power</h2>
              <div class="content-tabs animate" role="tablist" >
              </div>
              <table class="data animate" >
                <tbody>
                  <tr>
                    <td>level</td>
                    <td>power</td>
                    <td>Weights</td>
                  </tr>
                  <tr>
                    <td>V1</td>
                    <td>1-5000</td>
                    <td>0.5</td>
                  </tr>
                  <tr>
                    <td>V2</td>
                    <td>5001-12500</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td>V3</td>
                    <td>12501-25000</td>
                    <td>1.2</td>
                  </tr>
                  <tr>
                    <td>V2</td>
                    <td>>= 25001</td>
                    <td>1.5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      <Footer />
    </div>
  </template>
  
<style lang="less" scoped>
.p_item{
  padding: 20px 0;
  border-bottom: 1pt solid rgba(255, 255, 255, 0.3);
}
// @import '@/assets/css/style.min.css';
.inner-left-middle, .inner-right-middle {
    top: 50%;
    -webkit-transform: translate(0,-50%);
    transform: translate(0,-50%);
    position: absolute;
}
.inner-left-bottom, .inner-left-middle, .inner-left-top, .inner-right-bottom, .inner-right-middle, .inner-right-top, .outer-right-top {
    text-align: left;
    width: 50%;
    max-width: 520px;
}

.reveal-inner {
    z-index: 3;
}
@media (max-width: 600px){
  .section-inner {
    bottom: 40px;
    left: 0;
}
}
#wrapper, .background, .section, .section-inner {
    display: block;
    width: 100%;
}
.section-inner {
    position: relative;
    height: 100%;
    max-width: 1400px;
    margin: 0 auto;
}
#slider{
  overflow: hidden;
}
#reveal .section-inner {
    height: 100%;
}
@media screen and (max-width: 960px){
  #reveal .inner-left-middle {
    width: 70%;
    right: 0;
    left: 0;
    margin: auto;
    top: 300px;
  }
}
.background {
    position: absolute;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #000;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}
.overflow-visible {
    overflow: visible!important;
}
.gallery-background, .swiper-slide {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
}
.gallery-background {
    display: block;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    height: auto;
    bottom: 100px;
}
.background {
    background-position: center bottom;
    height: 100vh;
}
.slider .gallery-background {
    position: relative;
    height: 500px;
    top: auto;
    right: auto;
    left: auto;
    bottom: auto;
}
.section-inner {
    position: relative;
    height: 100%;
    max-width: 1400px;
    margin: 0 auto;
}
.slider .section-inner {
  height: auto!important;
}
@media screen and (max-width: 960px){
  .slider .section-inner>div {
      position: relative;
      top: 0;
      left: auto;
      right: auto;
      -webkit-transform: none;
      transform: none;
      padding: 40px 20px;
      width: 100%;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
  }
}
#controls, #reveal-overview, .swiper-pagination-bullet {
    -webkit-transition: opacity .2s linear;
    transition: opacity .2s linear;
}
#reveal-overview {
    max-width: 100%;
}
a.btn,p:first-of-type {
      margin-top: 15px;
      font-family: D-DIN-Bold;
}
  #feature .inner-center {
      -webkit-transform: translate(-50%,-50%) translateY(-30px);
      transform: translate(-50%,-50%) translateY(-30px)
  }
table {
    width: 100%;
    margin-top: 30px;
}
table td {
    font: 600 16px/18px D-DIN-Regular,Arial,Verdana,sans-serif;
    text-align: left;
    color: #fff;
    padding: 20px 0;
    border-bottom: 1pt solid rgba(255,255,255,.3);
}
table.data td {
    text-align: right;
}
table.data td:first-child {
    font: 14px/18px D-DIN-Bold,Arial,Verdana,sans-serif;
    text-align: left;
}
table.data td {
    text-align: right;
}
table.data td span {
    color: #868686;
}

@media screen and (max-width: 600px){
  .section-inner h2 {
    font-size: 40px;
    line-height: normal;
}
  .inner-left-bottom, .inner-left-top, .inner-right-bottom, .inner-right-top {
    width: auto;
    max-width: none;
    right: 20px;
    left: 20px;
  }
  .collapse .inner-left-bottom, .collapse .inner-left-middle, .collapse .inner-left-top, .collapse .inner-right-bottom, .collapse .inner-right-middle, .collapse .inner-right-top {
    position: relative;
    top: auto;
    left: auto;
    right: auto;
    bottom: auto;
    -webkit-transform: none;
    transform: none;
    padding: 40px 20px;
    width: auto;
    font-family: "D-DIN-Regular";
  }
}

</style>
  