<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useGlobalState } from "@/store";
import {
  Pointer,
} from '@element-plus/icons-vue'
import SpaceXABI from "@/abis/defiABI.json";
const state = useGlobalState();
console.log("state", state);
let web3 = ref();
let myAddress = ref(""); //我的地址
let infoData = ref(""); //我的地址
let SpaceXContract = ref(""); // 合约实例

onMounted(() => {
  // Web3浏览器检测
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
    console.log("当前连接网络的id:", window.ethereum.chainId);
  }

  web3.value = new Web3(window.ethereum);
  // 连接钱包账户切换后触发的事件
  ethereum.on("accountsChanged", function (accounts) {
    console.log("连接钱包账户切换后触发的事件", accounts[0]); //一旦切换账号这里就会执行
    myAddress.value = accounts[0];
    joinWeb3();
  });
  // 正确处理链更改之后的业务流程可能很复杂。官方建议链更改只有重新加载页面
  ethereum.on("chainChanged", (chainId) => {
    console.log("chainId", chainId);
    window.location.reload();
  });
  // 断开连接监听事件
  ethereum.on("disconnect", async function (result, error) {
    console.log("断开连接", result);
    console.log("error", error);
  });
  connections();
});

const connections = () => {
  //链接小狐狸钱包
  window.ethereum
    .request({ method: "eth_requestAccounts" })
    .then((res) => {
      console.log(res, "当前钱包地址");
      myAddress.value = res[0];
      joinWeb3();
    })
    .catch((err) => {
      console.log(err);
      if (err.code == 4001) {
        console.log("用户拒绝连接");
      }
    });
};
const joinWeb3 = async () => {
  let eth_chainId = web3.value.eth.getChainId();
  console.log("eth_chainId", eth_chainId);
  let accounts = await web3.value.eth.getAccounts();
  console.log("查询eth_chainId", eth_chainId);

  SpaceXContract.value = new web3.value.eth.Contract(
    SpaceXABI,
    state.contractAddress.value
  );
  // 请求用户授权 解决web3js无法直接唤起Meta Mask获取用户身份
  const enable = await ethereum.enable();
  console.log("enable", enable[0]);
  // // 授权获取账户
  // 返回指定地址账户的余额
  let balance = await web3.value.eth.getBalance(enable[0]);
  myAddress.value = accounts[0];
  console.log("balance", balance);
  // 账户余额
  try {
    let myBalance = web3.value.utils.fromWei(balance, "ether");
    console.log("SpaceXContract.value.method", SpaceXContract.value.methods);
    infoData.value = await SpaceXContract.value.methods
      .getInfo(myAddress.value)
      .call();
    state.updateInfoData(infoData.value);
    state.userLevel.value = await SpaceXContract.value.methods
      .getUserLevel(myAddress.value)
      .call();
    console.log("state.userLevel.value", state.userLevel.value);
    // userLevel
    console.log("state", state.infoData.value);
  } catch (e) {
    console.log(e);
  }
};
</script>
<template>
  <div class="home">
    <Header />
    <section class="section-animate section-a"></section>
    <div class="section-inner-center team_inner">
      <div class="team_warp">
        <h2>我的团队</h2>
        <table class="data additional-toggle" style="display: table">
          <tbody>
            <tr class="js-stagger">
              <td>直接推荐人数</td>
              <td>{{ state.infoData.value.teamLength }}</td>
            </tr>
            <tr class="js-stagger">
              <td>15代推荐人数</td>
							<td>{{ state.infoData.value.team2Length }}</td>
            </tr>
            <tr class="js-stagger">
              <td>直接推荐团队算力</td>
              <td>{{ state.infoData.value.teamCp }} <span>/ ALL</span></td>
            </tr>
            <tr class="js-stagger">
              <td>15代推荐团队算力</td>
              <td>{{ state.infoData.value.teamCp2 }}</td>
            </tr>
						<tr class="js-stagger">
              <td>直接推荐已经领取奖励</td>
              <td>{{ state.infoData.value.overTeam }}</td>
            </tr>
						<tr class="js-stagger">
              <td>15代推荐已经领取奖励</td>
              <td>{{ state.infoData.value.overTeam2 }}</td>
            </tr>
            <tr class="js-stagger">
              <td>直接推荐可领取奖励</td>
              <td>
								<div class="receive_btn">
									0USDT
									<el-icon style="margin-left: 4px;"><Pointer /></el-icon>
								</div>
								<!-- <el-button type="success" plain :icon="Pointer"></el-button> -->
							</td>
            </tr>
						<tr class="js-stagger">
              <td>15代推荐可领取奖励</td>
              <td>1000USDT</td>
            </tr>
            <tr class="js-stagger">
              <td>上级地址</td>
              <td style="text-align: right">
                <span class="address_txt">{{ state.infoData.value.inivet }}</span>
              </td>
            </tr>
            <tr class="js-stagger">
              <td>我的邀请链接</td>
              <td style="text-align: right">
                <span class="address_txt"
                  >0xE02785c089bF7025dF03A5e022bF8c7a5319177f</span
                >
              </td>
            </tr>
          </tbody>
        </table>
        <div class="ref_wrapper">
          <span class="text">复制邀请链接</span>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped lang="less">
.team_inner{
	position: relative;
	left: auto;
	top: auto;
	transform: none;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin-top: -80vh;
	margin-bottom: 100px;
}
.ref_wrapper {
  margin-top: 20px;
  cursor: pointer;
  text-align: center;
  padding: 10px 15px;
  border: 1px solid #fff;
}
.team_warp {
  h2 {
    text-align: left;
  }
}
.receive_btn{
	display: flex;
	align-items: center;
	justify-content: end;
	font: 600 16px/18px D-DIN-Regular, Arial, Verdana, sans-serif;
}
.ref_wrapper {
}
.address_txt {
  color: #fff !important;
  display: inline-block;
  max-width: 200px;
  text-align: right;
  cursor: text;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
table {
  width: 100%;
  margin-top: 30px;
}
table td {
  font: 600 16px/18px D-DIN-Regular, Arial, Verdana, sans-serif;
  text-align: left;
  color: #fff;
  padding: 20px 0;
  border-bottom: 1pt solid rgba(255, 255, 255, 0.3);
}
table.data td {
  text-align: right;
}
table.data td:first-child {
  font: 14px/18px D-DIN-Bold, Arial, Verdana, sans-serif;
  text-align: left;
}
table.data td {
  text-align: right;
}
table.data td span {
  color: #868686;
}
</style>
