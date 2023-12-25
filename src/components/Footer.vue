<script setup>
import IconTwitter from '@/components/icons/IconTwitter.vue'
import { RouterLink, RouterView } from "vue-router";
import { useRouteQuery } from '@vueuse/router'
const invites = useRouteQuery('invs')
</script>
<template>
  <footer class="footer-section section-bg pt-120">
    <div class="container">
      <div class="footer-top pb-120">
        <div class="row g-4">
          <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <div class="widget-items">
              <div class="footer-head">
                <a href="#" class="logo logo_svg" style="color: #fff;">
                  <img src="@/assets/img/logo/logo.svg" alt="logo"/>
                  IPO
                </a>
              </div>
              <div class="content-area">
                <p>
                  The IPO platform is designed to facilitate users to seamlessly transfer tokens between different blockchain networks (including the Bitcoin network), thereby enhancing liquidity and interoperability between different blockchain networks.
                </p>
                <p>The protocol permanently binds the token units of each blockchain network to the IPO, destroys them and automatically inscribes them on the IPO network.</p>

              </div>
            </div>
          </div>
          <div class="col-xl-2 col-lg-4 col-md-6 col-sm-6">
            <div class="widget-items">
              <div class="footer-head"><h5 class="title">Menu</h5></div>
              <div class="content-area">
                <ul class="quick-link">
                  <li class="active">
                    <RouterLink :to="`/?invs=${invites}`">Home</RouterLink>
                  </li>
                  <li>
                    <RouterLink :to="`power?invs=${invites}`">power</RouterLink>
                  </li>
                  <li>
                    <RouterLink :to="`income?invs=${invites}`">income</RouterLink>
                  </li>
                  <li>
                    <RouterLink :to="`team?invs=${invites}`">team</RouterLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <div class="widget-items">
              <div class="footer-head"><h5 class="title">Contact Us</h5></div>
              <div class="content-area">
                <ul class="social mb-4" style="justify-content: space-around;">
                  <li>
                    <a href="#" class="icon">
                      <IconTwitter style="color: #231d70; width: 14px;"/>
                     </a>
                  </li>
                  <li>
                    <a href="#" class="icon">
                      <i class="fa-brands fa-discord"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="icon">
                      <i class="fa-brands fa-telegram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style>
footer {
  position: relative;
  padding: 55px 0;
}

footer ul {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

footer ul li {
  margin-right: 30px;
  color: #aaa;
  text-transform: uppercase;
  font-size: 13px;
  line-height: 2.5;
}

footer ul li a {
  color: #fff;
  transition: color 0.6s;
}

footer ul li a:hover {
  color: #aaa;
}
</style>
