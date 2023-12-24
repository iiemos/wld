<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useGlobalState } from "@/store";
import { RouterLink, RouterView } from "vue-router";
import { useRouteQuery } from '@vueuse/router'
const state = useGlobalState();
const isActive = ref(false);
const invites = useRouteQuery('invs')
let showAdd = computed(()=>{ 
    if(!state.myAddress.value) return 'Connect Wallet'
    return state.myAddress.value.substring(0,4) + '....' + state.myAddress.value.substr(-4,4);
  })
const navToggle = () => {
  isActive.value = !isActive.value;
};
const affixChange = () => {
  console.log(123);
};
const cutAdd = () => {
  console.log(123);
};
const joinWeb3 = () => {
  console.log(123);
};

</script>
<template>
  <el-affix :offset="0.1" @scroll="affixChange()">
    <header class="header-section animated slideInUp relative">
      <div class="container">
        <div class="header-wrapper">
          <div class="logo-menu">
            <a href="#" class="logo logo_svg">
              <img src="@/assets/img/logo/logo.svg" alt="logo" />
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
              <RouterLink :to="`power`">power</RouterLink>
            </li>
            <li>
              <RouterLink :to="`income`">income</RouterLink>
            </li>
            <li>
              <RouterLink :to="`team`">team</RouterLink>
            </li>
            <li>
              <RouterLink :to="`portfolio-single`">Portfolio</RouterLink>
            </li>
            <li>
              <RouterLink :to="`packages`">Packages</RouterLink>
            </li>
            <li>
              <RouterLink :to="`about`">About</RouterLink>
            </li>
            <li>
              <RouterLink :to="`contact`">Contact</RouterLink>
            </li>
          </ul>
          <div class="connect_wallet" v-if="state.myAddress" @click="cutAdd">
            <span>{{ showAdd }}</span>
          </div>
          <div class="connect_wallet" v-else @click="joinWeb3">
            <span>Connect Wallet</span>
          </div>
        </div>
      </div>
    </header>
  </el-affix>
</template>

<style lang="less">
.connect_wallet {
  cursor: pointer;
  display: block;
  border-radius: 10px;
  padding: 14px 29px 15px;
  font-size: 18px;
  font-weight: 600;
  line-height: 23.4px;
  display: inline-block;
  text-transform: capitalize;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  z-index: 1;
  background-color: transparent;
  border: 1px solid var(--border);
  color: var(--theme-color);

}

@media screen and (max-width: 991px) {
  .connect_wallet {
    position: absolute;
    left: 50%;
    top: 50%;
    padding: 10px 12px;
    transform: translate(-50%, -50%);
  }
}

.logo_svg {
  display: flex;
  align-items: center;
  color: var(--theme-color);
  font-weight: 700;
  font-size: 22px;
  font-family: "Montserrat", sans-serif;

  img {
    margin: 4px;
  }
}

.header-wrapper .main-menu {
  z-index: 9999;
}</style>
