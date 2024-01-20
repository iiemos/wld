
<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useDebounceFn } from '@vueuse/core'
import { ElMessage, ElNotification } from "element-plus";
import { useGlobalState } from "@/store";
import IconUSDT from '@/components/icons/IconUSDT.vue'
import IconLogo from '@/components/icons/IconLogo.vue'
import RouterABI from "@/abis/RouterABI.json";
import usdtABI from "@/abis/usdtABI.json";
const state = useGlobalState();

const RouterContract = ref(null)
const inputValue=ref(0)
const outputValue=ref(0)
const toWeiQuote=ref(0)
const replaceValue = ref(null)
const isApprove = ref(true)
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
  getPrice2Fun()
  // getQuote()
  checkAuthorization()
})


// getPrice 返回值是：1个U 可以换多少币
// getPrice2 无参数 返回值是：1个代币换多少U

// 监听IPO 更新WBNB数量
watch(inputValue, (newValue) => {
  console.log('newValue',newValue);
  if(!newValue || newValue == 0) return outputValue.value = 0
  if(newValue == 0) return outputValue.value = 0
  updateShowIPOTokensVal()
  // updateConversionValue()
});

let UserIPOBalance = computed(()=>{ 
  if(!state.BbaCoinBlance.value){
    return 0
  }else{
    return Number((Math.floor(state.BbaCoinBlance.value * 100000) / 100000)).toFixed(5)
  }
})

const MaxBalance = () =>{
  inputValue.value = UserIPOBalance.value
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
// 通过swap卖出Token
const swapTokens = () => {
  if(state.BbaCoinBlance.value == 0) return false
    //console.log(this.inputValue, this.inputToken, this.outputValue, this.outputToken);
    let stringValue = String(inputValue.value.toString()+'000000000000000000'); 
    // BBA 代币 ---> WBNB
    const path = [state.TOKEN_ADDRESS.value, state.WOKT_ADDRESS.value];

    // swapExactTokensForTokensSupportingFeeOnTransferTokens
    /*
      amountIn: 这个参数表示你希望交换的输入代的数量。它指定了你希望在交易中使用的代币数量。
      amountOutMin: 这个参数表示你期望获得的目标代币的最低数量。在交易发生时，系统会确保你至少获得这个数量的目标代币。如果实际交易导致你获得的目标代币少于这个数额，交易将被取消。
      path: 这个参数是一个代币路径数组，指定了交易的路径。它用于确定交易从输入代币到目标代币的转换。例如，如果你想要在ETH和BNB间交换，你可以将path设置为[ETH, BNB]。
      to: 这个参数是指定交易目标地址的合约地址。它表示你希望将交易的结果发送到哪个合约地址。通常，这个地址是你自的钱包地址或其他合约地址。
      deadline: 这参数表示交易的截止时间。它是一个时间戳，以秒为单位，表示交易的有效期限。如果交易在截止时间之后仍未完成，交易将被取消。
    */ 
    // RouterContract.value.methods.swapExactTokensForTokens(stringValue, 0, path, state.myAddress.value, '0xFFFFFFFFFF').send({from: state.myAddress.value});
    RouterContract.value.methods.swapExactTokensForTokensSupportingFeeOnTransferTokens(stringValue, 0, path, state.myAddress.value, '0xFFFFFFFFFF').send({from: state.myAddress.value});
}
// 通过合约卖出Token
const ShellTokens = () =>{
  if(state.BbaCoinBlance.value == 0) return false
    //console.log(this.inputValue, this.inputToken, this.outputValue, this.outputToken);
    let stringValue = String(inputValue.value.toString()+'000000000000000000'); 
    // BBA 代币 ---> WBNB
    state.DeFiContract.value.methods.sellToken(stringValue).send({from: state.myAddress.value}).on('transactionHash', (hash)=>{
      console.log(hash);
      ElMessage.success('交易已发送')
      console.log("Transaction sent");
    })
    .once('receipt', res => {
      ElMessage.success(t('TransactionSuccess'))
      console.log("交易已确认");
    })
    .catch((error) => {
      console.error('Approval failed:', error);
      if(error.code == '4001'){
        ElMessage.warning('用户拒绝了请求！');
      }
      if(error.code == '-32603' || error.message == 'transaction underpriced'){
        ElMessage.error('gas不足！');
      }
    });
}
// 使用理由获取交换价格
const updateConversionValue = useDebounceFn( async(val) => {
  // BBA 代币 ---> WBNB
  const path = [state.TOKEN_ADDRESS.value, state.WOKT_ADDRESS.value];
  // 我想要收到的金额，用于交换的地址数组 [wethAddress, tokenAddress]
  // inputValue.value = await RouterContract.value.methods.getAmountsIn(outputValue.value, path).call()
  // console.log('inputValue.value ',inputValue.value);
  // const amountIn = String(inputValue.value.toString()+'000000000000000000'); 
  // const reserveIn = state.TOKEN_ADDRESS.value
  // const reserveOut = state.WOKT_ADDRESS.value
  let stringValue = String(inputValue.value.toString()+'000000000000000000'); 
  const getAmountsOut = await RouterContract.value.methods.getAmountsOut(stringValue, path).call()
  // const getAmountOut = await RouterContract.value.methods.getAmountOut(amountIn, reserveIn, reserveOut).call()
  console.log('getAmountsOut[0]',state.web3.value.utils.fromWei(getAmountsOut[0], "ether"));
  console.log('getAmountsOut[1]',state.web3.value.utils.fromWei(getAmountsOut[1], "ether"));
  const getAmountOutWei =  state.web3.value.utils.fromWei(getAmountsOut[1], "ether")
  // const getAmountOutWei = state.web3.value.utils.fromWei(getAmountOut, "ether")
  let truncatedNum = Math.floor(getAmountOutWei * 10000) / 10000;
  if(getAmountOutWei != 0) outputValue.value = truncatedNum
  else toWeiQuote.value = getAmountOutWei
  console.log('getAmountOut--------',outputValue.value);
},500)
// 查询授权状态
async function checkAuthorization() {
  try {
    // 调用合约中的allowance方法
    const allowance = await state.BbaContract.value.methods.allowance(state.myAddress.value, state.contractAddress.value).call();
    console.log('allowance======',allowance);
    // 根据返回值判断授权状态
    if (allowance > 0) {
      console.log('用户已授权DeFi合约');
    } else {
      isApprove.value = false;
      console.log('用户未授权DeFi合约');
    }
  } catch (error) {
    console.error('查询DeFi授权状态时发生错误:', error);
  }
}

const updateShowIPOTokensVal = useDebounceFn((val) => {
  // return inputValue.value * (toWeiQuote.value)
  let truncatedNum = Math.floor(toWeiQuote.value * 10000) / 10000;
  const deduct = truncatedNum * 0.9
  if(toWeiQuote.value != 0) outputValue.value = deduct * inputValue.value
},500)
// 通过DeFi合约实例获取价格
const getPrice2Fun =  async() => {
  const IPOPrice = await state.DeFiContract.value.methods.getPrice2().call()
  const FromWeiNum = state.web3.value.utils.fromWei(IPOPrice, "ether");
  if(FromWeiNum != 0) toWeiQuote.value = FromWeiNum.substring(0, 6)
  else toWeiQuote.value = FromWeiNum
}

// 通过薄饼路由获取价格
const getQuote = async() => {
  // // amountA reserveA reserveB
  // let reserveA = state.WOKT_ADDRESS.value
  // let reserveB = state.TOKEN_ADDRESS.value
  // // const QuoteRes = await RouterContract.value.methods.quote('100000000000000000',reserveB,reserveA).call()

  // const toWeiQuoteVal = state.web3.value.utils.fromWei(QuoteRes, "ether"); //
  // if(toWeiQuoteVal != 0) toWeiQuote.value = toWeiQuoteVal.substring(0, 6)
  // else toWeiQuote.value = toWeiQuoteVal
  // console.log('toWeiQuote',toWeiQuote.value);

  let stringValue = String('1000000000000000000'); 
  const path = [state.TOKEN_ADDRESS.value, state.WOKT_ADDRESS.value];
  const QuoteRes = await RouterContract.value.methods.getAmountsOut(stringValue, path).call()
  const toWeiQuoteVal = state.web3.value.utils.fromWei(QuoteRes[1], "ether"); //
  if(toWeiQuoteVal != 0) toWeiQuote.value = toWeiQuoteVal.substring(0, 6)
  else toWeiQuote.value = toWeiQuoteVal
  console.log('toWeiQuote',toWeiQuote.value);

}

// 执行查询授权状态函数
// checkAuthorization();
const approveContract = () => {
  if(state.BbaCoinBlance.value == 0) return false
  let stringValue = state.web3.value.utils.toWei("10000000000", "ether"); // 默认授权额度
  // 创建代币合约实例
  state.BbaContract.value.methods.approve(state.contractAddress.value, stringValue).send({
    from: state.myAddress.value
  }).then((receipt) => {
    console.log('授权成功DeFi', receipt);
    isApprove.value = true;
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
            <span>Balance: {{ UserIPOBalance }}
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
              <span class="font-semibold">USDT</span>
            </span>
          </div>
        </div>
        <div class="wallet_item_mid relative">
          <div
            class="wallet_item_logo absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none px-3 py-3">
            <IconUSDT style="width: 2rem;height: 2rem;" />
          </div>
          <div class="calculation text-right">≈ {{ outputValue }}</div>
        </div>
        <div class="wallet_item_footer"></div>
      </div>
      <dl class="divide-y divide-slate-100 divide-opacity-25 p-3 text-xs sm:text-sm h-sm:p-2 h-sm:text-xs">
        <div v-if="false" class="py-2 flex items-center justify-between">
          <dt class="font-medium">Routing</dt>
          <dd class="font-base flex items-center">
            <div
              class="bg-pink-100 text-pink-800 inline-flex items-baseline px-2 py-0.5 rounded-full mr-1 text-xs font-medium h-sm:text-xxs">
              Protocol</div>
          </dd>
        </div>
        <div class="py-2 flex items-center justify-between">
          <dt class="font-medium flex">After Tax Rate</dt>
            <dd class="font-base flex items-center justify-between">
              <span class="pr-1">1 IPO ≈ {{ toWeiQuote * 0.9 }} USDT</span>
            </dd>
        </div>
        <div class="py-2 flex items-center justify-between">
          <dt class="font-medium flex">Exchange Rate</dt>
            <dd class="font-base flex items-center justify-between">
              <span class="pr-1">1 IPO ≈ {{ toWeiQuote }} USDT</span>
            </dd>
        </div>
        <div v-if="false" class="py-2 flex items-center justify-between pb-0 divide-none">
          <dt class="font-medium">Transaction Cost</dt>
          <dd class="font-base">
            @ <span class="font-semibold">18</span> gwei<span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 h-sm:text-xxs">Low</span>  
          </dd>
        </div>
      </dl>
      <div v-if="!isApprove" @click="approveContract" :class="{ disabled: state.BbaCoinBlance.value == 0 }" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-md text-white action-button md:py-5 md:text-xl md:px-10 mb-4">
        Approve Swap
      </div>
      <div v-else @click="ShellTokens" :class="{ disabled: state.BbaCoinBlance.value == 0 }" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-md text-white action-button md:py-5 md:text-xl md:px-10 mb-4">
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

