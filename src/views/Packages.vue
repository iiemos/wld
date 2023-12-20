<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
<template>
  <div class="packages">
    <Header />
    <section class="hero-section hero-breadcumnd packages-bg">
      <div class="container">
        <div class="row align-items-center">
          <div
            class="col-xxl-7 col-lg-7 wow fadeInUp"
            data-wow-delay="0.2s"
            style="
              visibility: visible;
              animation-delay: 0.2s;
              animation-name: fadeInUp;
            "
          >
            <div class="breadcumnd-content">
              <h1>Packages single</h1>
              <ul class="breadcrumb-light">
                <li><a href="#">Home </a></li>
                <li><i class="fas fa-long-arrow-right"></i></li>
                <li><a href="#0">Pages</a></li>
                <li><i class="fas fa-long-arrow-right"></i></li>
                <li><a href="#">Packages</a></li>
                <li><i class="fas fa-long-arrow-right"></i></li>
                <li>Packages Single</li>
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
    <section class="nice-rendering pt-120 pb-120 nice-space section-bg-two">
      <div class="rendering-shape2">
        <img src="@/assets/img/rendering/ratio.png" alt="shape" />
      </div>
      <div class="rendering-shape3">
        <img src="@/assets/img/rendering/piramid.png" alt="shape" />
      </div>
      <div class="rendering-shape4">
        <img src="@/assets/img/rendering/piramid2.png" alt="shape" />
      </div>
      <div class="rendering-shape5">
        <img src="@/assets/img/rendering/dimond.png" alt="shape" />
      </div>
      <div class="container">
        <div class="row g-4 justify-content-center align-items-center">
          <div
            class="col-lg-6 wow fadeInUp"
            data-wow-delay="0.4s"
            style="
              visibility: visible;
              animation-delay: 0.4s;
              animation-name: fadeInUp;
            "
          >
            <div class="nice-rendering-thumb">
              <img
                src="@/assets/img/rendering/rendering.png"
                alt="rendering-thumb"
              />
            </div>
          </div>
          <div
            class="col-lg-6 wow fadeInUp"
            data-wow-delay="0.6s"
            style="
              visibility: visible;
              animation-delay: 0.6s;
              animation-name: fadeInUp;
            "
          >
            <div class="nice-rendering-content">
              <div class="section-header">
                <h2 class="section-title">3D Rendering</h2>
                <p>
                  Lorem ipsum dolor sit amet,consectetur adipiscing elit. Duis
                  sagittis suscipit ultricies. Suspendisse eros mauris.
                </p>
                <div class="ren-price">
                  <h4>$ 5,000 USD</h4>
                  <h5>$ 8,700 USD</h5>
                </div>
                <div class="add-cart">
                  <select class="nice-select" style="display: none">
                    <option value="1">Select project type</option>
                    <option value="2">Domain</option>
                    <option value="3">Hosting</option>
                  </select>
                  <div class="nice-select" tabindex="0">
                    <span class="current">Select project type</span>
                    <ul class="list">
                      <li data-value="1" class="option selected">
                        Select project type
                      </li>
                      <li data-value="2" class="option">Domain</li>
                      <li data-value="3" class="option">Hosting</li>
                    </ul>
                  </div>
                  <a href="#0" class="cmn--btn">Add to cart </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="rendering-shape1">
        <img src="@/assets/img/rendering/drop.png" alt="shape" />
      </div>
    </section>
    <section class="rendering-product pb-120">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="rend-wrapper">
              <div class="row g-5 justify-content-center">
                <div class="col-lg-4 col-md-6">
                  <div class="rend-items">
                    <h4>3 - 6 weeks</h4>
                    <p>Time</p>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6">
                  <div class="rend-items">
                    <h4>3D Design Items</h4>
                    <p>Deliverables</p>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6">
                  <div class="rend-items">
                    <h4>3D Rendering</h4>
                    <p>Services</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <div class="nice-sevices pt-120">
              <div
                class="section-header wow fadeInDown"
                data-wow-delay="0.3s"
                style="
                  visibility: visible;
                  animation-delay: 0.3s;
                  animation-name: fadeInDown;
                "
              >
                <h2 class="section-title">About the service</h2>
                <p>
                  Lorem ipsum dolor sit amet,consectetur adipiscing elit. Duis
                  sagittis suscipit ultricies. Suspendisse eros mauris,laoreet
                  quis aliquet in,suscipit sed nulla. Aenean ut mattis
                  turpis,sed fermentum dui. Curabitur faucibus id augue id
                  fermentum.
                </p>
              </div>
              <ul class="first-list">
                <li>
                  1. Lorem Ipsum has been the industry's standard dummy text
                  ever since
                </li>
                <li>
                  2. Fusce nisi nisl, aliquet nec odio quis, posuere vehicula
                  velit.
                </li>
                <li>3. Fusce malesuada non tortor eget consequat.</li>
                <li>
                  4. Sed lobortis congue purus ut ornare. Praesent mollis non
                  neque et egestas
                </li>
              </ul>
              <p>
                Sed lobortis purus a elit laoreet efficitur. Aenean augue erat,
                sodales eleifend ligula ac, egestas porttitor erat. Duis laoreet
                tempus ipsum ac posuere. Duis dictum varius odio nec ultrices.
                Nullam consequat malesuada mauris sed tincidunt. Duis ac rutrum
                sem.
              </p>
              <p>
                Etiam ornare malesuada posuere. Proin libero dui, dapibus non
                posuere et, lacinia vitae eros. Vestibulum arcu quam, blandit
                commodo volutpat mollis, iaculis luctus velit. Curabitur gravida
                lorem neque, in viverra eros bibendum et. Curabitur laoreet
                ligula eget pellentesque venenatis. Sed lobortis congue purus ut
                ornare. Praesent mollis non neque et egestas. Fusce malesuada
                non tortor eget consequat.
              </p>
              <p>
                Fusce nisl tellus, maximus vitae lorem id, elementum lobortis
                diam. Maecenas sed erat urna. Cras et arcu est. Aenean ac felis
                fermentum, vulputate orci sit amet, pharetra mauris
              </p>
              <ul class="last-list">
                <li>
                  1. Lorem Ipsum has been the industry's standard dummy text
                  ever since
                </li>
                <li>
                  2. Fusce nisi nisl,aliquet nec odio quis,posuere vehicula
                  velit.
                </li>
                <li>3. Fusce malesuada non tortor eget consequat.</li>
                <li>
                  4. Sed lobortis congue purus ut ornare. Praesent mollis non
                  neque et egestas
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>
<style></style>
