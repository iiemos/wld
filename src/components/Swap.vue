
<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useDebounceFn } from '@vueuse/core'
import { ElMessage, ElNotification } from "element-plus";
import { useGlobalState } from "@/store";
import IconBNB from '@/components/icons/IconBNB.vue'
import IconLogo from '@/components/icons/IconLogo.vue'
import RouterABI from "@/abis/RouterABI.json";
import usdtABI from "@/abis/usdtABI.json";
const state = useGlobalState();

const inputValue=ref(0)
const replaceValue = ref(null)
// 计算转换
const calculateConversion = async() => {
  // if (pool == this.tokens[0]){
  //     this.replaceValue = function(value){
  //       that.outputValueA = value;
  //       that.conversionValueA = value/that.inputValueA;
  //       that.conversionTokensA = ' RBTC per tokenA';
  //     };
  //     stringValue = String(this.inputValue.toString()+'000000000000000000'); 
  //   }
  let stringValue = String(inputValue.value.toString()+'000000000000000000');
  const path = [state.WOKT_ADDRESS.value, state.TOKEN_ADDRESS.value];
  let contractRouter = new state.web3.value.eth.Contract(RouterABI, state.Router_ADDRESS.value);
  try {
    const result = await contractRouter.methods.getAmountsIn(stringValue, path).call()
    var new_res = result[0]/(10**18);
    console.log(new_res);
    // replaceValue(new_res)
  } catch (error) {
    console.log('error',error);
  }
    
}

const addLiquidity = () => {
  
}

const approveContract = () => {
  var stringValue ='';
  // if (pool == 'A'){
  //   var tokenContract = new web3.eth.Contract(contractsInfo.tokenAContract.abi, contractsInfo.tokenAContract.address.toString().toLowerCase());
  //   var approveButton = function(){that.approvePoolA = true};
  //   stringValue = String(this.inputValueA.toString()+'000000000000000000'); 
  // } else {
  //   var tokenContract = new web3.eth.Contract(contractsInfo.tokenBContract.abi, contractsInfo.tokenBContract.address.toString().toLowerCase());
  //   var approveButton = function(){that.approvePoolB = true};
  //   stringValue = String(this.inputValueB.toString()+'000000000000000000'); 
  // }

  // var that = this;

  // window.ethereum.enable().then(function(){
  //   web3.eth.getAccounts(function(err, result){
  //     if (!err){
  //         that.defaultAccount = result[0];
  //         //alert(that.routerContract.address);
  //         tokenContract.methods.approve(contractsInfo.routerContract.address.toString().toLowerCase(), stringValue).send({
  //           from: that.defaultAccount
  //       });
  //       approveButton();
  //     }
  //   })
  // })

  // 创建代币合约实例
  // let tokenContract = new state.web3.value.eth.Contract(usdtABI, state.TOKEN_ADDRESS.value.toString().toLowerCase());



}
</script>

<template>
  <div class="pools">
    <div class="wallet_info">
      <div class="wallet_item">
        <div class="wallet_item_top">
          <div>
            <span>Stake BNB</span>
          </div>
          <div class="flex">
            <span>Balance: 0.00
              <span class="font-semibold">BNB</span>
            </span>
            <span class="max_btn">Max</span>
          </div>
        </div>
        <div class="wallet_item_mid relative">
          <div
            class="wallet_item_logo absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none px-3 py-3">
            <IconBNB style="width: 2rem;height: 2rem;" />
          </div>
          <input class="text-right" id="ethAmountToStake" name="ethAmountToStake" placeholder="0.00"
            type="number">
        </div>
        <div class="wallet_item_footer"></div>
      </div>
      <div class="wallet_item">
        <div class="wallet_item_top">
          <div>
            <span>Stake IPO</span>
          </div>
          <div class="flex">
            <span>Balance: 0.00
              <span class="font-semibold">IPO</span>
            </span>
            <span class="max_btn">Max</span>
          </div>
        </div>
        <div class="wallet_item_mid relative">
          <div
            class="wallet_item_logo absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none px-3 py-3">
            <IconLogo style="width: 2rem;height: 2rem;" />
          </div>
          <div class="calculation">0.00000</div>
          <div class="absolute inset-y-0 right-2 flex items-center justify-end px-1 z-10 w-72">
            <span class="text-xl">
              <span class="text-2xl relative pr-1 -top-[1px]">≈</span>
              $0.00 USD</span>
          </div>
        </div>
        <div class="wallet_item_footer"></div>
      </div>
      <dl class="divide-y divide-slate-100 divide-opacity-25 p-3 text-xs sm:text-sm h-sm:p-2 h-sm:text-xs">
        <div class="py-2 flex items-center justify-between">
          <dt class="font-medium">Routing</dt>
          <dd class="font-base flex items-center"><!---->
            <div
              class="bg-pink-100 text-pink-800 inline-flex items-baseline px-2 py-0.5 rounded-full mr-1 text-xs font-medium h-sm:text-xxs">
              Protocol</div>
            <div data-v-5784ed69="" class="inline-block"
              style="border: 12px solid transparent; margin: -12px; --c81fc0a4: 9999;">
              <div data-v-5784ed69=""><svg data-v-5784ed69-s="" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                  data-slot="icon" class="h-5 w-5 cursor-pointer">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z">
                  </path>
                </svg></div>
              <div data-v-5784ed69="" class="popper" style="display: none;">
                <p data-v-5784ed69-s="">Determines whether you are using the protocol's deposit pool or being
                  routed through secondary markets.</p>
                <p data-v-5784ed69-s="" class="my-2"> Note that there is a 0.05% deposit fee when minting rETH
                  through the protocol. This fee prevents attacks around rate updates. This fee is socialised
                  across all rETH holders. </p>
                <div data-v-20b7fd4a="" data-v-5784ed69="" id="arrow" data-popper-arrow=""></div>
              </div>
            </div>
          </dd>
        </div>
        <div class="py-2 flex items-center justify-between">
          <dt class="font-medium flex">Exchange Rate</dt>
          <dd class="font-base flex items-center justify-between"><span class="pr-1">1 rETH = 1.09336 ETH</span>
            <div data-v-5784ed69="" class="inline-block"
              style="border: 12px solid transparent; margin: -12px; --c81fc0a4: 9999;">
              <div data-v-5784ed69=""><svg data-v-5784ed69-s="" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                  data-slot="icon" class="h-5 w-5 cursor-pointer">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z">
                  </path>
                </svg></div>
              <div data-v-5784ed69="" class="popper" style="display: none;">
                <p data-v-5784ed69-s="">rETH's exchange rate continuously accrues value vs ETH. As you receive
                  rewards, your amount of rETH will not change.</p>
                <p data-v-5784ed69-s="" class="my-2">When you unstake it will be worth more ETH than what you
                  paid.</p>
                <p data-v-5784ed69-s="" class="my-2">A market <span data-v-5784ed69-s=""
                    class="font-bold">discount</span> means the price given is less than the redeemable
                  (assuming liquidity) rETH exchange rate.</p>
                <p data-v-5784ed69-s="" class="my-2">A market <span data-v-5784ed69-s=""
                    class="font-bold">premium</span> means the price given is greater than the redeemable
                  (assuming liquidity) rETH exchange rate.</p>
                <div data-v-20b7fd4a="" data-v-5784ed69="" id="arrow" data-popper-arrow=""></div>
              </div>
            </div>
          </dd>
        </div>
        <div class="py-2 flex items-center justify-between">
          <dt class="font-medium">Average Return</dt>
          <dd class="font-base flex items-center"><span class="font-bold text-theme-highlight pr-1"><span
                class="relative -top-[1px] text-md leading-none">≈</span> 3.25%</span><span
              class="pr-1">APR</span>
            <div data-v-5784ed69="" class="inline-block"
              style="border: 12px solid transparent; margin: -12px; --c81fc0a4: 9999;">
              <div data-v-5784ed69=""><svg data-v-5784ed69-s="" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"
                  data-slot="icon" class="h-5 w-5 cursor-pointer">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z">
                  </path>
                </svg></div>
              <div data-v-5784ed69="" class="popper" style="display: none;">Based on 7 day average<div
                  data-v-20b7fd4a="" data-v-5784ed69="" id="arrow" data-popper-arrow=""></div>
              </div>
            </div>
          </dd>
        </div>
        <div class="py-2 flex items-center justify-between pb-0 divide-none">
          <dt class="font-medium">Transaction Cost</dt>
          <dd class="font-base">0.01 ETH (<span class="relative -top-[1px] text-md leading-none">≈</span> $21.79
            <span class="font-semibold">USD</span>)</dd>
        </div>
        <div class="py-2 flex items-center justify-between pb-0 border-none">
          <dt class="font-medium"></dt>
          <dd class="font-base"> @ <span class="font-semibold">19</span> gwei <!----><span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 h-sm:text-xxs">Low</span>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>


<style lang="less">


</style>

