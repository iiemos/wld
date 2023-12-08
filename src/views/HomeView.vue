<script setup>
  import { ref, computed, onMounted } from "vue";
  import { ElMessage } from "element-plus";
  import { useGlobalState } from '@/store'
  import WLDABI from '@/abis/defiABI.json'
  // import Web3 from 'Web3'
  const state = useGlobalState()
  // import '@/joinWeb3'

  console.log('state',state);
  let web3 = ref() 
  let myAddress=ref('')//我的地址
  let WLDContract=ref(null)// 合约实例
  let myBalance=ref(null)// 钱包余额
  let infoData =ref(null)// 合约信息

  
  let refLinks = computed(()=>{ 
    if(myAddress.value){
      return window.location.origin + `/?ref=${myAddress.value}`
    }
    return 'Connect Wallet'
  })
  let showAdd = computed(()=>{ 
    if(!myAddress.value) return 'Connect Wallet'
    return myAddress.value.substring(0,4) + '....' + myAddress.value.substr(-4,4);
  })

  const navToggle = () => {
  };




  const copyLink = () => {
    let _input = document.createElement('input')
      _input.value = refLinks.value;
      document.body.appendChild(_input)
      _input.select()
      document.execCommand('Copy')
      ElMessage.success('Copied to clipboard')
      _input.remove()
  };
</script>
<template>
  <div class="home">
    <Header />
    <!-- Section A -->
    <section class="section-a">
      <span class="background gallery-background gallery-full" role="img" aria-label="Image from Starship's Second Flight Test" data-desktop="@/assets/img/home1.jpg" data-mobile="@/assets/img/home1.jpg" style="background-image: url(&quot;@/assets/img/home1.jpg&quot;);"><div class="vsc-controller"></div>
        <video aria-hidden="true" data-content-video="true" poster="@/assets/img/home1.jpg" muted="" playsinline="" loop="" autoplay="">
          <source type="video/mp4" src="@/assets/media/home.mp4">
        </video>
      </span>
      <div class="section-inner">
        <h4>WLD</h4>
        <h2>High Yield Miner</h2>
        <a href="#" class="btn">
          <div class="hover"></div>
          <span @click="copyLink()" v-if="myAddress">邀请好友</span>
          <span @click="connections()" v-if="!myAddress">Connect Wallet</span>
        </a>
      </div>

      <div class="scroll-arrow">
        <svg width="30px" height="20px">
          <path
            stroke="#ffffff"
            fill="none"
            stroke-width="2px"
            d="M2.000,5.000 L15.000,18.000 L28.000,5.000 "
          ></path>
        </svg>
      </div>
    </section>
    <!-- Section B -->
    <section class="section-b">
      <div class="section-inner">
        <h4>WLD</h4>
        <h2>High Yield Miner</h2>
        <a href="#" class="btn">
          <div class="hover"></div>
          <span>Home</span>
        </a>
      </div>
    </section>
    <!-- Section C -->
    <section class="section-c">
      <div class="section-inner">
        <h4>WLD</h4>
        <h2>High Yield Miner</h2>
        <a href="/" class="btn">
          <div class="hover"></div>
          <span>Liquidity</span>
        </a>
      </div>
    </section>
    <!-- Section F -->
    <section class="section-f">
      <div class="section-inner">
        <h4>WLD</h4>
        <h2>High Yield Miner</h2>
        <a href="/" class="btn">
          <div class="hover"></div>
          <span>Team</span>
        </a>
      </div>
    </section>
    <Footer />
  </div>
</template>

<style>
</style>
