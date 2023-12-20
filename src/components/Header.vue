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
</script>
<template>
  <header class="header-section animated slideInUp">
    <div class="container">
      <div class="header-wrapper">
        <div class="logo-menu">
          <a href="#" class="logo"
            ><img src="@/assets/img/logo/logo.png" alt="logo"
          /></a>
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
</template>

<style></style>
