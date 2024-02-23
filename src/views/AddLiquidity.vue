
<script setup>
import { ref, computed, onMounted, watch } from "vue";
import RouterABI from "@/abis/RouterABI.json";
import { useGlobalState } from "@/store";
const state = useGlobalState();
const amountADesired = ref(0)
const amountBDesired = ref(0)
const RouterContract = ref(null)
const isApprove = ref(false)

onMounted(() => {
  // checkAuthorization()
})
// 检查用户是否已经授权
async function checkAuthorization() {
  try {
    // 调用合约中的allowance方法
    const allowance = await web3.eth.getAllowance(state.myAddress.value, state.Router_ADDRESS.value)
    // 如果allowance大于0，则表示已经授权
    isAuthorized.value = allowance > 0
    console.log('allowance======',allowance);

  } catch (error) {
    console.error('查询路由授权状态时发生错误:', error);
  }
}

// 通过路由合约添加流动性 
const addLiquidity = async() => {
  try {
      const pancakeRouterContract = new state.web3.value.eth.Contract(RouterABI, state.Router_ADDRESS.value);
      // 设置参数
      const tokenAAddress = state.infoData.value.bbaCoin
      const tokenBAddress = state.infoData.value.usdtCoin
      const account = state.myAddress.value
      const amountAMin = state.web3.value.utils.toWei('0.1'); // 最小接受的Token A数量
      const amountBMin = state.web3.value.utils.toWei('0.1'); // 最小接受的Token B数量
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20分钟后过期
      const amountAval = state.web3.value.utils.toWei(String(amountADesired.value), "ether");
      const amountBval = state.web3.value.utils.toWei(String(amountBDesired.value), "ether");
      // 调用addLiquidity方法
      const tx = await pancakeRouterContract.methods.addLiquidity(
        tokenAAddress,
        tokenBAddress,
        amountAval, // IPO
        amountBval, // USDT
        amountAMin,
        amountBMin,
        account,
        deadline
      ).send({
        from: account,
        // gas: 300000, // 设置gas限制
        // gasPrice: state.web3.value.utils.toWei('5', 'gwei'), // 设置gas价格
      });
      console.log('Transaction receipt:', tx);
  } catch (error) {
    console.error('Transaction error:', error);
  }
}

  // 投入授权USDT
  const approveUSDT = () =>{
    let defaultVal = state.web3.value.utils.toWei("1000000000000", "ether"); // 默认授权额度
    state.UsdtContract.value.methods.approve(state.Router_ADDRESS.value , defaultVal).send({
      from: state.myAddress.value,
      // gas: 300000, // 设置gas限制
      // gasPrice: state.web3.value.utils.toWei('5', 'gwei'), // 设置gas价格
    }).then((receipt) => {
      console.log('授权USDT成功：', receipt);
    }).catch((error) => {
      console.error('Approval failed:', error);
      if(error.code == '-32603' || error.message == 'transaction underpriced'){
        console.log('gas值低，请调高gas');
      }
    });
  }
  // 投入授权SpaceX
  const approveIPO = () =>{
    let defaultVal = state.web3.value.utils.toWei("10000000000000", "ether"); // 默认授权额度
    state.BbaContract.value.methods.approve(state.Router_ADDRESS.value , defaultVal).send({
      from: state.myAddress.value,
      // gas: 300000, // 设置gas限制
      // gasPrice: state.web3.value.utils.toWei('5', 'gwei'), // 设置gas价格
    }).then((receipt) => {
      console.log('授权IPO成功：', receipt);
    }).catch((error) => {
      console.error('Approval failed:', error);
      if(error.code == '-32603' || error.message == 'transaction underpriced'){
        console.log('gas值低，请调高gas');
      }
    });
  }
</script>

<template>
  <div>
    <Header />
    <div style="color: black; margin-top: 200px;">
      <h1>Add Liquidity</h1>
      <div>
        <label for="amountA">Amount IPO:</label>
        <input style="color: black;" type="text" id="amountA" v-model="amountADesired" />
      </div>
      <div>
        <label for="amountB">Amount USDT:</label>
        <input style="color: black;" type="text" id="amountB" v-model="amountBDesired" />
      </div>

      <button @click="approveIPO">授权IPO</button>
      <button @click="approveUSDT">授权USDT</button>
      <button @click="addLiquidity">添加流动性</button>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
h1 {
  color: blue;
}
</style>