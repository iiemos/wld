<script setup>
import { ref } from "vue";

import { RouterLink, RouterView } from "vue-router";
import IconLogo from "./icons/IconLogo.vue";
import IconEarth from "./icons/IconEarth.vue";

const isActive = ref(false);
const centerDialogVisible = ref(false);
const navToggle = () => {
  isActive.value = !isActive.value;
};
const affixChange = () => {
  console.log(123);
};

</script>
<template>
  <el-affix :offset="0.1" @scroll="affixChange()">
    <header class="header-section animated slideInUp">
      <div class="container">
        <div class="header-wrapper">
          <div class="logo-menu">
            <a href="#" class="logo logo_svg">
              <img src="@/assets/img/logo/logo.svg" alt="logo"/>
              IPO
            </a>
          </div>
          <div class="header-bar d-lg-none" :class="{ active: isActive }" @click="navToggle()">
            <span></span><span></span><span></span>
          </div>
          <ul class="main-menu" :class="{ active: isActive }">
            <li class="active">
              <RouterLink :to="`/`">Home</RouterLink>
            </li>
            <li>
              <RouterLink :to="`about`">About</RouterLink>
            </li>
            <li>
              <RouterLink :to="`contact`">Contact</RouterLink>
            </li>
            <li>
              <RouterLink :to="`portfolio-single`">Portfolio</RouterLink>
            </li>
            <li>
              <RouterLink :to="`packages`">Packages</RouterLink>
            </li>
            <li>
              <RouterLink :to="`404`">404</RouterLink>
            </li>
          </ul>
          <a href="javascript:;" class="cmn--btn">Contact us </a>
        </div>
      </div>
    </header>
  </el-affix>

</template>

<style lang="less">
.logo_svg{
  display: flex;
  align-items: center;
  color: var(--theme-color);
  font-weight: 700;
  font-size: 22px;
  font-family: "Montserrat",sans-serif;
  img{
    margin: 4px;
  }
}
</style>
