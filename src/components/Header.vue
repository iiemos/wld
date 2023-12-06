<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import IconLogo from "./icons/IconLogo.vue";

const isActive = ref(false);
const navToggle = () => {
  isActive.value = !isActive.value;
};
</script>
<template>
  <div class="header">
    <div id="overlay" :class="{ overlayShow: isActive }"></div>
    <div
      id="mobile-menu"
      class="mobile-main-menu"
      :class="{ showMenu: isActive }"
    >
      <ul>
        <li class="mobile-only">
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li class="mobile-only">
          <RouterLink to="liquidity">Liquidity</RouterLink>
        </li>
		<li class="mobile-only">
          <RouterLink to="income">Income</RouterLink>
        </li>
		<li class="mobile-only">
          <RouterLink to="team">Team</RouterLink>
        </li>
		<li class="mobile-only">
          <RouterLink to="burn">Burn</RouterLink>
        </li>
        <li class="mobile-only">
          <RouterLink to="#">White Paper</RouterLink>
        </li>
      </ul>
    </div>
    <header class="main-header">
      <div class="logo">
        <RouterLink to="/">
          <IconLogo />
        </RouterLink>
      </div>
      <nav class="desktop-main-menu">
        <ul>
          <li>
            <RouterLink to="/">Home</RouterLink>
          </li>
		  <li>
            <RouterLink to="income">Income</RouterLink>
          </li>
          <li>
            <RouterLink to="liquidity">Liquidity</RouterLink>
          </li>
		  <li>
            <RouterLink to="team">Team</RouterLink>
          </li>
		  <li>
            <RouterLink to="burn">Burn</RouterLink>
          </li>
          <li>
            <RouterLink to="#">White Paper</RouterLink>
          </li>
        </ul>
      </nav>
    </header>
    <!-- Hamburger Menu -->
    <button
      id="menu-btn"
      class="hamburger"
      :class="{ open: isActive }"
      type="button"
      @click="navToggle"
    >
      <span class="hamburger-top"></span>
      <span class="hamburger-middle"></span>
      <span class="hamburger-bottom"></span>
    </button>
  </div>
</template>

<style></style>
