<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from "vue";
import { useGlobalState } from "@/store";
import { RouterLink, RouterView } from "vue-router";
import { useRouteQuery } from '@vueuse/router'
import { ElMessage, ElNotification } from "element-plus";
import IconChina from '@/components/icons/IconChina.vue'
import IconUsa from '@/components/icons/IconUsa.vue'
import defiABI from "@/abis/defiABI.json";
import RouterABI from "@/abis/RouterABI.json";
import usdtABI from "@/abis/usdtABI.json";
import { useI18n } from "vue-i18n";
const state = useGlobalState();
const web3 = ref(null);
const isActive = ref(false);
const refLinks = ref(null);
const invites = useRouteQuery('invs')
const { locale } = useI18n();
let timer;
if (typeof (invites.value) == "undefined") {
  refLinks.value = '0xDA02d522d8cd60de0a2F9773f80b16Fc9ED99bdd'
} else {
  refLinks.value = invites.value
  state.inviteLink.value = invites.value
}
const changeLang = (val) => {
  locale.value = val
  localStorage.setItem('language', val)
};
let showAdd = computed(()=>{ 
    if(!state.myAddress.value){
      return 'Connect Wallet'
    }else{
      return state.myAddress.value.substring(0,4) + '....' + state.myAddress.value.substr(-4,4);
    }
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
// 当用户点击登录按钮时，请求 MetaMask 授权
const login = async () => {
    // Web3浏览器检测
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    }
    web3.value = new Web3(window.ethereum);
    state.updateWbe3(web3.value)
  try {

    // 请求 MetaMask 授权
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    // 请求用户授权连接钱包
    await window.ethereum.enable();

    // 生成一个随机数作为nonce
    const nonce = Math.floor(Math.random() * 1000000).toString();
    const message = `Welcome to IPO! Click to sign in and accept the IPO Terms of Service. This request will not trigger any blockchain transaction or cost any gas fees. Wallet address:${accounts[0]} Nonce: ${nonce}`; // 要签名的消息
    const signature = await web3.value.eth.personal.sign(message, accounts[0]);
    console.log('signature-123-----------------',signature);
    // 将签名发送到服务器或进行其他操作
    if(signature){
      state.updateMyAddress(accounts[0]);
      joinWeb3()
      setInterval(() => {
        joinWeb3()
      }, 30000);
    }
  } catch (error) {
    console.error(error);
    if (error.code == 4001) {
      console.log("用户拒绝连接");
    }
  }
};
 
// 当用户点击退出按钮时，清除 MetaMask 授权信息
const logout = async () => {
  try {
    // 清除 MetaMask 授权信息
    await window.ethereum.request({ method: 'eth_logout' });
    console.log('Logged out!');
  } catch (error) {
    console.error(error);
  }
}
onMounted(() => {

  // Web3浏览器检测
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
  }
  web3.value = new Web3(window.ethereum);
  state.updateWbe3(web3.value)
  // // 连接钱包账户切换后触发的事件
  // ethereum.on("accountsChanged", function (accounts) {
  //   console.log("连接钱包账户切换后触发的事件", accounts[0]); //一旦切换账号这里就会执行
  //   // state.updateMyAddress(accounts[0]);
  //   joinWeb3();
  // });
  // // 正确处理链更改之后的业务流程可能很复杂。官方建议链更改只有重新加载页面
  // ethereum.on("chainChanged", (chainId) => {
  //   console.log("chainId", chainId);
  //   window.location.reload();
  // });
  // 断开连接监听事件
  ethereum.on("disconnect", async function (result, error) {
    console.log("断开连接", result);
    console.log("error", error);
  });

});
const joinWeb3 = async () => {
  // 请求用户授权 解决web3js无法直接唤起Meta Mask获取用户身份
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  // // 授权获取账户
  // 返回指定地址账户的余额
  let balance = await web3.value.eth.getBalance(accounts[0]);
  let myAddress = accounts[0];
  state.updateMyAddress(accounts[0]);
  console.log('balance',balance);
  // myAddress = '0x73c76571d5956762Fb65d041509da2355537217F'
  // myAddress = '0xc126dfe4A539CAe4962Cb2fB0389847E4A550E37'
  // myAddress = '0x18212be8e3d23d0E4979E2Adb94519c40bF728F1'
  // state.updateMyAddress('0x18212be8e3d23d0E4979E2Adb94519c40bF728F1');
  try {
    // 创建合约实例
    const  DeFiContract = new web3.value.eth.Contract(defiABI, state.contractAddress.value);
    state.updateDeFiContract(DeFiContract) // 赋值合约实例
    const infoData = await DeFiContract.methods.getInfo(myAddress).call();
    console.log('infoData',infoData);
    state.updateInfoData(infoData);  // 设置info值
    state.updateBBACoin(infoData.bbaCoin);  // 设置BBA 代币地址
    state.updateWOKTCoin(infoData.usdtCoin);  // 设置WOKT 代币地址

    const Calu = await DeFiContract.methods.calu().call();
    console.log('Calu------------:',Calu);
    // 创建usdt合约实例
    const usdtContract = new web3.value.eth.Contract(usdtABI, infoData.usdtCoin);
    state.updateUsdtContract(usdtContract);  // 设置usdt合约实例
    // 获取usdt余额
    let usdtBalance = await usdtContract.methods.balanceOf(myAddress).call();
    const  myUSDTBalanceFromWe = web3.value.utils.fromWei(usdtBalance, "ether");
    state.updateMyUSDTBalance(myUSDTBalanceFromWe);  // 设置usdt余额
    // 获取getSy 剩余奖励
    let SYJL = await DeFiContract.methods.getSy(myAddress).call();
    state.updateUserSY(SYJL)
    console.log('我的剩余可领取---------:',web3.value.utils.fromWei(SYJL, "ether"));

    // 获取Fomo池子余额（合约地址USDT余额）
    const FomoBalance = await usdtContract.methods.balanceOf(state.contractAddress.value).call();
    const  FomoBalanceFromWe = web3.value.utils.fromWei(FomoBalance, "ether");
    console.log('FomoBalanceFromWe',FomoBalanceFromWe);
    state.updateFomoBalance(Number(FomoBalanceFromWe))  // 设置Fomo usdt余额
    if(infoData.bnbNum != '0'){
      console.log('Fomo池奖励：',infoData.bnbNum);
      const bnbNum = web3.value.utils.fromWei(infoData.bnbNum, "ether")
      state.updateFomoBalance(Number(bnbNum));  // 设置info值
    }
    // 获取第一名 BNB 奖励
    const userStakeCp = await DeFiContract.methods.userStakeCp(infoData.NO1).call();
    const userCP = web3.value.utils.fromWei(userStakeCp, "ether")
    console.log('第一名奖励=====:',userCP);
    // 测试网除以3，主网除以2
    state.updateTMCP((Number(userCP / 2)).toFixed(4));  // 设置info值
    


    // 通过DeFi合约实例获取IPO价格
    const IPOPrice = await DeFiContract.methods.getPrice2().call()
    const FromWeiNum = state.web3.value.utils.fromWei(IPOPrice, "ether");
    console.log('IPO价格为：', FromWeiNum);
    if(FromWeiNum != 0) state.updateIpoToWeiQuote(Number((Math.floor(FromWeiNum * 100000) / 100000)).toFixed(5))
    // 创建路由合约地址
    // const RouterContract = new web3.value.eth.Contract(RouterABI, state.Router_ADDRESS.value);
    // console.log('RouterContract----------',RouterContract);

    // const WETH = await RouterContract.methods.WETH().call();
    // console.log('WETH----------',WETH);
    // state.updateRouterContract(RouterContract) // 赋值合约实例

    // // 创建BBA代币实例并获取余额
    const BbaTokenContract = new web3.value.eth.Contract(usdtABI, infoData.bbaCoin);
    state.updateBbaContract(BbaTokenContract) // 赋值BBA合约实例
    // let BbaTokenBalance = await BbaTokenContract.methods.balanceOf(myAddress).call();
    // const BbaTokenBalanceFromWei = web3.value.utils.fromWei(BbaTokenBalance, "ether");
    // state.updateBbaCoinBlance(Number(BbaTokenBalanceFromWei)) // 赋值BBA代币余额

    // 查询接口，参数是个人地址，返回可直接卖币的数量
    const userPeopleMoney = await DeFiContract.methods.peopleMoney(myAddress).call();
    const BbaTokenBalanceFromWei = web3.value.utils.fromWei(userPeopleMoney, "ether");
    state.updateUserPeopleMoney(BbaTokenBalanceFromWei) // 赋值BBA代币余额
    state.updateBbaCoinBlance(Number(BbaTokenBalanceFromWei)) // 赋值BBA代币余额
    console.log('userPeopleMoney=====:',BbaTokenBalanceFromWei);


    updateCountdown()
    // // 获取钱包eth余额
    const myETHBalance = web3.value.utils.fromWei(balance, "ether");
    console.log('myETHBalance',myETHBalance);
    state.updateMyETHBalance(myETHBalance);  // 设置info值
    // // 获取当前gas价格
    // const gasPrice = await web3.value.eth.getGasPrice();
    // state.updateGasPrice(gasPrice);  // 设置Gas值
    // state.updateGasGWeiPrice(web3.value.utils.fromWei(gasPrice, "ether"));  // 设置GasGwei值
    // // // 设置gas费用
    // // gasLimit.value = 9000000; // 设置gas限制
    // // const gasCost = gasLimit.value * gasPrice.value;
    // // console.log('计算后的gas价格', gasCost/1000000000000000000);

    if(infoData.t12Length>0){
      let teamData = await DeFiContract.methods.getTeam12BNB(0,infoData.t12Length).call();
      const teamArray = teamData.filter(arrItem => arrItem != '0x0000000000000000000000000000000000000000');
      state.updateTeam12BNB(teamArray)
      // state.updateTeam12BNB(teamArray)
    }
    
  } catch (e) {
    // ElMessage.warning(e.message);
    console.log(e);
  }
};


const updateCountdown  = () => {
  const startTime = (Number(state.infoData.value.deadNum)*1000) + (24 * 60 * 60 * 1000); // 当前时间加上12小时的毫秒数
  timer = setInterval(() => {
    const currentTime = new Date().getTime();
    const timeLeft = startTime - currentTime;
    if (timeLeft <= 0) {
      clearInterval(timer);
      state.updateCountDown('Time UP!')
    } else {
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      state.updateCountDown(`${hours}:${minutes}:${seconds}`)
    }
  }, 1000);
};

onUnmounted(() => {
  clearInterval(timer);
});

// 输出组件的方法，让外部组件可以调用
defineExpose({
  joinWeb3,
})
</script>
<template>
  <el-affix :offset="0.1" @scroll="affixChange()">
    <div class="header-section animated slideInUp relative">
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
              <RouterLink :to="`/?invs=${invites}`">{{ $t("home") }}</RouterLink>
            </li>
            <li>
              <RouterLink :to="`power?invs=${invites}`">{{ $t("power") }}</RouterLink>
            </li>
            <li>
              <RouterLink :to="`income?invs=${invites}`">{{ $t("income") }}</RouterLink>
            </li>
            <li>
              <RouterLink :to="`team?invs=${invites}`">{{ $t("team") }}</RouterLink>
            </li>
            <!-- <li>
              <RouterLink :to="`addLiquidity?invs=${invites}`">{{ $t("addLiquidity") }}</RouterLink>
            </li> -->
            <!-- <li>
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
            </li> -->
              <li class="lang_li" style="border: none;">
                <p @click="changeLang('zh-cn')">
                  <IconChina/>
                  简体中文</p>
                <p @click="changeLang('en')">
                  <IconUsa/>
                  English</p>
              </li>
          </ul>
          <div class="connect_wallet" v-if="state.myAddress.value" @click="logout">
            <span>{{ showAdd }}</span>
          </div>
          <div class="connect_wallet" v-else @click="login">
            <span>Connect Wallet</span>
          </div>
        </div>
      </div>
    </div>
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
.lang_li{
  display: flex;
  align-items: center;
  justify-content: space-between;
  p{
    border-radius: 10px;
    padding: 14px 0;
    cursor: pointer;
    text-align: center;
    &:nth-child(1){
      margin-right: 10px;
    }
  }
}

@media screen and (max-width: 991px) {
  .lang_li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    p{
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 14px 0;
      width: 49%;
      text-align: center;
    }
  }
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
