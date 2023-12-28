
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

const RouterContract = ref(null)
const inputValue=ref(0)
const outputValue=ref(0)
const toWeiQuote=ref(0)
const replaceValue = ref(null)
const isApprove = ref(false)
/*
薄饼getAmountIn函数是用于计算在进行交易时，输入一定数量的目标代币所需的源代币数量。它可以帮助你确定在进行交易时需要提供多少源代币。
薄饼getAmountOut函数是用于计算在进行交易时，输出一定数量的源代币所能获得的目标代币数量。它可以帮助你确定在进行交易时可以获得多少目标代币。
薄饼getAmountsIn函数是用于计算在进行交易时，输入一定数量的目标代币所需的源代币数量。它可以帮助你确定在进行交易时需要提供多少源代币。
薄饼getAmountsOut函数是用于计算在进行交易时，输出一定数量的源代币所能获得的目标代币数量。它可以帮助你确定在进行交易时可以获得多少目标代币。
quote函数用于获取两种代币之间的实时交易报价。它可以告诉你当前市场上两种代币之间的兑换比率和价格。
这些函数都是在薄饼交易所上进行交易和流动性操作时使用的工具函数，它们可以帮助你计算和确定交易的成本、效益以及兑换比率等信息。
*/ 

onMounted(() => {
  RouterContract.value = new state.web3.value.eth.Contract(RouterABI, state.Router_ADDRESS.value);
  getQuote()
  console.log('BbaTokenBalanceFromWei',state.BbaCoinBlance.value);
})


// 监听IPO 更新WBNB数量
watch(inputValue, (newValue) => {
  if(!newValue || newValue == 0) return replaceValue.value = 0
  if(newValue == 0) return replaceValue.value = 0
  updateConversionValue()
});

const MaxBalance = () =>{
  inputValue.value = state.BbaCoinBlance.value
}
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
const swapTokens = () => {
  if(state.BbaCoinBlance.value == 0) return false
    //console.log(this.inputValue, this.inputToken, this.outputValue, this.outputToken);
    let stringValue = String(inputValue.value.toString()+'000000000000000000'); 
    // BBA 代币 ---> WBNB
    const path = [state.TOKEN_ADDRESS.value, state.WOKT_ADDRESS.value];
    RouterContract.value.methods.swapExactTokensForTokens(stringValue, 0, path, state.myAddress.value, '0xFFFFFFFFFF').send({from: state.myAddress.value});
}
const getQuote = async() => {
  // amountA reserveA reserveB
  let reserveA = state.WOKT_ADDRESS.value
  let reserveB = state.TOKEN_ADDRESS.value
  const QuoteRes = await RouterContract.value.methods.quote('100000000000000000',reserveA,reserveB).call()
  const toWeiQuoteVal = state.web3.value.utils.fromWei(QuoteRes, "ether"); // 默认授权额度
  if(toWeiQuoteVal != 0) toWeiQuote.value = toWeiQuoteVal.substring(0, 6)
  else toWeiQuote.value = toWeiQuoteVal
  console.log('toWeiQuote',toWeiQuote.value);
}

const updateConversionValue = useDebounceFn( async(val) => {
  // BBA 代币 ---> WBNB
  const path = [state.TOKEN_ADDRESS.value, state.WOKT_ADDRESS.value];
  console.log('path',path);
  // 我想要收到的金额，用于交换的地址数组 [wethAddress, tokenAddress]
  // inputValue.value = await RouterContract.value.methods.getAmountsIn(outputValue.value, path).call()
  // console.log('inputValue.value ',inputValue.value);
  const amountIn = inputValue.value
  const reserveIn = state.TOKEN_ADDRESS.value
  const reserveOut = state.WOKT_ADDRESS.value
  const getAmountsOut = await RouterContract.value.methods.getAmountsOut(inputValue.value, path).call()
  const getAmountOut = await RouterContract.value.methods.getAmountOut(amountIn, reserveIn, reserveOut).call()
  console.log('getAmountsOut',getAmountsOut);
  console.log('getAmountOut--------',getAmountOut);
},500)

const approveContract = () => {
  if(state.BbaCoinBlance.value == 0) return false
  let stringValue = state.web3.value.utils.toWei("10000000000", "ether"); // 默认授权额度
  // 创建代币合约实例
  let tokenContract = new state.web3.value.eth.Contract(usdtABI, state.TOKEN_ADDRESS.value.toString().toLowerCase());
  tokenContract.methods.approve(state.Router_ADDRESS.value.toString().toLowerCase(), stringValue).send({
    from: state.myAddress.value
  }).then((receipt) => {
    console.log('授权成功swap', receipt);
  }).catch((error) => { console.log('授权失败',error); })
}
</script>

<template>
  <div class="pools">
    <div class="wallet_info">
      <div class="wallet_item">
        <div class="wallet_item_top">
          <div>
            <span>Stake IPO</span>
          </div>
          <div class="flex">
            <span>Balance: {{ state.BbaCoinBlance }}
              <span class="font-semibold">IPO</span>
            </span>
            <span class="max_btn" @click="MaxBalance">Max</span>
          </div>
        </div>
        <div class="wallet_item_mid relative">
          <div
            class="wallet_item_logo absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none px-3 py-3">
            <IconLogo style="width: 2rem;height: 2rem;" />
          </div>
          <input class="text-right" id="ethAmountToStake" name="ethAmountToStake" placeholder="0.00"
            type="number" v-model="inputValue">
        </div>
        <div class="wallet_item_footer"></div>
      </div>
      <div class="wallet_item">
        <div class="wallet_item_top">
          <div>
            <span></span>
          </div>
          <div class="flex">
            <span>Balance: 0.00
              <span class="font-semibold">WBNB</span>
            </span>
          </div>
        </div>
        <div class="wallet_item_mid relative">
          <div
            class="wallet_item_logo absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none px-3 py-3">
            <IconBNB style="width: 2rem;height: 2rem;" />
          </div>
          <div class="calculation text-right">{{ outputValue }}</div>
        </div>
        <div class="wallet_item_footer"></div>
      </div>
      <dl class="divide-y divide-slate-100 divide-opacity-25 p-3 text-xs sm:text-sm h-sm:p-2 h-sm:text-xs">
        <div class="py-2 flex items-center justify-between">
          <dt class="font-medium">Routing</dt>
          <dd class="font-base flex items-center">
            <div
              class="bg-pink-100 text-pink-800 inline-flex items-baseline px-2 py-0.5 rounded-full mr-1 text-xs font-medium h-sm:text-xxs">
              Protocol</div>
          </dd>
        </div>
        <div class="py-2 flex items-center justify-between">
          <dt class="font-medium flex">Exchange Rate</dt>
            <dd class="font-base flex items-center justify-between">
              <span class="pr-1">1 WBNB ≈ {{ toWeiQuote }} IPO</span>
            </dd>
        </div>
        <div class="py-2 flex items-center justify-between pb-0 divide-none">
          <dt class="font-medium">Transaction Cost</dt>
          <dd class="font-base">
            @ <span class="font-semibold">18</span> gwei<span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 h-sm:text-xxs">Low</span>  
          </dd>
        </div>
      </dl>
      <div v-if="isApprove" @click="approveContract" :class="{ disabled: state.BbaCoinBlance.value == 0 }" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-md text-white action-button md:py-5 md:text-xl md:px-10 mb-4">
        Approve Swap
      </div>
      <div v-else @click="swapTokens" :class="{ disabled: state.BbaCoinBlance.value == 0 }" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-md text-white action-button md:py-5 md:text-xl md:px-10 mb-4">
        Swap
      </div>
    </div>
  </div>
</template>


<style lang="less">
.disabled{
  background-color: #ccc !important;
}

</style>

