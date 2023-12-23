
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
        <div class="row justify-content-center g-4">
          <div
            class="col-lg-4 col-md-6 col-sm-10 wow fadeInUp"
            data-wow-delay="0.6s"
          >
            <div class="process-items">
              <div class="process-thumb">
                <a href="#0"
                  ><img
                    src="@/assets/img/process/process4.png"
                    alt="process-img"
                /></a>
              </div>
              <div class="process-content">
                <h4><a href="#0">Creativity </a></h4>
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
                  ><img
                    src="@/assets/img/process/process5.png"
                    alt="process-img"
                /></a>
              </div>
              <div class="process-content">
                <h4><a href="#0">Teamwork </a></h4>
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
                  ><img
                    src="@/assets/img/process/process1.png"
                    alt="process-img"
                /></a>
              </div>
              <div class="process-content">
                <h4><a href="#0">Innovation </a></h4>
                <p>
                  In vel ipsum pretium,sagittis tellus sed,finibus mauris.
                  Curabitur varius placerat risus.
                </p>
              </div>
            </div>
          </div>
          <div
            class="col-lg-4 col-md-6 col-sm-10 wow fadeInUp"
            data-wow-delay="0.6s"
          >
            <div class="process-items">
              <div class="process-thumb">
                <a href="#0"
                  ><img
                    src="@/assets/img/process/process6.png"
                    alt="process-img"
                /></a>
              </div>
              <div class="process-content">
                <h4><a href="#0">Quality </a></h4>
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
                  ><img
                    src="@/assets/img/process/process7.png"
                    alt="process-img"
                /></a>
              </div>
              <div class="process-content">
                <h4><a href="#0">Passion </a></h4>
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
                  ><img
                    src="@/assets/img/process/process8.png"
                    alt="process-img"
                /></a>
              </div>
              <div class="process-content">
                <h4><a href="#0">Simplicity </a></h4>
                <p>
                  In vel ipsum pretium,sagittis tellus sed,finibus mauris.
                  Curabitur varius placerat risus.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="service-btn">
          <a href="#" class="cmn--btn">Contact us </a>
        </div>
      </div>
    </section>
    <section class="result-section pb-120">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="result-thumb">
              <img
                src="@/assets/img/result/result-thumb.png"
                alt="result-img"
              />
              <div class="result1">
                <img src="@/assets/img/result/re1.png" alt="result1" />
              </div>
              <div class="result2">
                <img src="@/assets/img/result/re2.png" alt="result1" />
              </div>
              <div class="result3">
                <img src="@/assets/img/result/re3.png" alt="result1" />
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="result-content">
              <div
                class="section-header wow fadeInDown"
                data-wow-delay="0.3s"
              >
                <h2 class="section-title">Our results in numbers</h2>
                <p>
                  Donec malesuada consectetur placerat. Aliquam porta leo sed
                  pellentesque feugiat. Donec in dui tortor. Nunc pretium in
                  sapien in mollis. Donec facilisis in neque ac blandit.
                </p>
              </div>
              <div class="row g-4">
                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                  <div class="counter-items odometer-item">
                    <div class="counter-content">
                      <div class="cont d-flex align-items-center">
                        <h3>+</h3>
                        <h3
                          class="odometer odometer-auto-theme"
                          data-odometer-final="15"
                        >
                          <div class="odometer-inside">
                            <span class="odometer-digit"
                              ><span class="odometer-digit-spacer">8</span
                              ><span class="odometer-digit-inner"
                                ><span class="odometer-ribbon"
                                  ><span class="odometer-ribbon-inner"
                                    ><span class="odometer-value">1</span></span
                                  ></span
                                ></span
                              ></span
                            ><span class="odometer-digit"
                              ><span class="odometer-digit-spacer">8</span
                              ><span class="odometer-digit-inner"
                                ><span class="odometer-ribbon"
                                  ><span class="odometer-ribbon-inner"
                                    ><span class="odometer-value">5</span></span
                                  ></span
                                ></span
                              ></span
                            >
                          </div>
                        </h3>
                      </div>
                    </div>
                    <p>Years of experience</p>
                  </div>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                  <div class="counter-items">
                    <div class="counter-content">
                      <div class="cont d-flex align-items-center">
                        <h3
                          class="odometer odometer-auto-theme"
                          data-odometer-final="50"
                        >
                          <div class="odometer-inside">
                            <span class="odometer-digit"
                              ><span class="odometer-digit-spacer">8</span
                              ><span class="odometer-digit-inner"
                                ><span class="odometer-ribbon"
                                  ><span class="odometer-ribbon-inner"
                                    ><span class="odometer-value">5</span></span
                                  ></span
                                ></span
                              ></span
                            ><span class="odometer-digit"
                              ><span class="odometer-digit-spacer">8</span
                              ><span class="odometer-digit-inner"
                                ><span class="odometer-ribbon"
                                  ><span class="odometer-ribbon-inner"
                                    ><span class="odometer-value">0</span></span
                                  ></span
                                ></span
                              ></span
                            >
                          </div>
                        </h3>
                        <h3>+</h3>
                      </div>
                    </div>
                    <p>Satisfied clients</p>
                  </div>
                </div>
                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                  <div class="counter-items">
                    <div class="counter-content">
                      <div class="cont d-flex align-items-center">
                        <h3
                          class="odometer odometer-auto-theme"
                          data-odometer-final="70"
                        >
                          <div class="odometer-inside">
                            <span class="odometer-digit"
                              ><span class="odometer-digit-spacer">8</span
                              ><span class="odometer-digit-inner"
                                ><span class="odometer-ribbon"
                                  ><span class="odometer-ribbon-inner"
                                    ><span class="odometer-value">7</span></span
                                  ></span
                                ></span
                              ></span
                            ><span class="odometer-digit"
                              ><span class="odometer-digit-spacer">8</span
                              ><span class="odometer-digit-inner"
                                ><span class="odometer-ribbon"
                                  ><span class="odometer-ribbon-inner"
                                    ><span class="odometer-value">0</span></span
                                  ></span
                                ></span
                              ></span
                            >
                          </div>
                        </h3>
                        <h3>+</h3>
                      </div>
                    </div>
                    <p>Team members</p>
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

<style></style>
