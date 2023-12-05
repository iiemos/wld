<template>
  <div class="__home">
    <img class="__home_clock" src="@/assets/img/Clock.png" alt="">
    <img class="__home_mark" src="@/assets/img/mark.png" alt="">
    <div class="__home_ctx">
      <div class="__header">
        <div class="__header_l">
          <a href="https://twitter.com/Fried_Egg_Home" target="_black">
            <img src="@/assets/img/twitter_icon.png" alt="">
          </a>
          <a href="https://t.me/FriedEggGroup" target="_black">
            <img src="@/assets/img/telegram_icon.png" alt="">
          </a>
          <a href="https://bscscan.com/address/0xcf06db237105c104ffe4242144a586c5c30f3e66#code" target="_black">
            <img src="@/assets/img/bsc_icon.png" alt="">
          </a>
        </div>
        <div class="__header_c">
          <img src="@/assets/img/logo.svg" alt="">
        </div>
        <div class="__header_r" v-if="myAddress" @click="cutAdd">
          <span>{{ myAddress | showAdd }}</span>
        </div>
        <div class="__header_r" v-else @click="joinWeb3">
          <span>Connect Wallet</span>
        </div>
      </div>
      <div class="_egg_title">
        The easiest and most profitable blockchain fund pool
      </div>
      <div class="_egg_odds">
        <div class="_egg_odds_item" @click="progress">
          <img class="__odds_icon" src="@/assets/img/star.svg" alt="">
          WHITEPAPER
        </div>
        <div class="_egg_odds_item"  @click="progress">
          <img class="__odds_icon" src="@/assets/img/security.svg" alt="">
          AUDIT REPORT
        </div>
      </div>
      <div class="_egg_body">
        <div class="_egg_body_left">
          <img class="_egg_info_icon" src="@/assets/img/egg.svg" alt="">
          <div class="_egg_info_warp">
            <div class="_egg_info_ctx">
              <div class="_egg_info_tlt">
                Nutrition Facts
              </div>
              <div class="_egg_info_item">
                Daily Return
                <span>10%</span>
              </div>
              <div class="_egg_info_item">
                APR
                <span>3650%</span>
              </div>
              <div class="_egg_info_item">
                Dev Fee
                <span>3%</span>
              </div>
            </div>
          </div>
          <div class="_egg_referral">
            <div class="_egg_referral_tlt">
              Referral Link
            </div>
            <div class="_egg_referral_desc">
              Earn 13% of the BNB used to roast beef from anyone who uses your referral link
            </div>
            <div class="_egg_referral_ipt">
              <div class="_egg_referral_ipt_txt">
                {{ refLinks }}
              </div>
              <div class="_egg_referral_ipt_btn" id="copybuttons" @click="copyLink">
                COPY
              </div>
            </div>
          </div>
        </div>
        <div class="_egg_body_right">
          <div class="_egg_body_r_item">
            Contract  <span>{{ contractBalance | showBalance }} BNB</span>
          </div>
          <div class="_egg_body_r_item">
            Wallet  <span>{{ myBalance | showBalance }} BNB</span>
          </div>
          <div class="_egg_body_r_item">
            Your Egg  <span>{{ myMiners/10000000 }} EGG</span>
          </div>
          <div class="_egg_body_r_ant">
            <input type="text" class="_egg_body_r_ipt" v-model="buyNumber">
            <div class="_egg_body_r_ant_suffix" @click="totBalace">
              BNB
            </div>
          </div>
          <div class="_egg_body_r_buy_btn" @click="goinEgg">
            FRIED EGG
          </div>
          <div class="_egg_my_rews_warp">
            <div class="_egg_my_rews_txt">
              Your Rewards
              <span>
                {{ myEarns | showBalance }}BNB
              </span>
            </div>
            <div class="_egg_my_rews_btns">
              <div class="_refry_btn" @click="compound()">RE-FRY</div>
              <div class="_gain_btn" @click="withdraw()">EAT EGG</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Web3 = require('@/assets/js/web3.min.js');
import eggABI from '@/abis/eggABI.json';
import { checkTime,} from '@/assets/js/utils.js';
export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      myAddress: null,
      myBalance: 0,
      buyNumber: '0.01',
      refAdd: null,
      WEB3: null,
      contNumber: 0,
      eggContract: null,
      eggsPerMiner: '', // 合约内一天时间的秒数
      contractBalance: '', // 合约内的BNB余额
      myMiners: '', // 合约中用户的质押的蛋
      myEggs: '', // 合约中用户获得的奖励
      myEarns: '', // 合约中用户获得的奖励
      owner: '0x04E16d3EFE33b74c9FA8d5AEF2D2B1eAB7471fD2',
      contractAddress: '0xCF06db237105C104fFe4242144a586c5C30F3E66',
    }
  },
  filters: {
    showAdd: function(value) {
      return value.substring(0,4) + '....' + value.substr(-4,4);
    },
    showBalance(v){
      return ( parseInt( v * 10000 ) / 10000 ).toFixed(4);
    }
  },
  computed: {
    refLinks(){
      if(this.myAddress){
        return window.location.origin + `/?ref=${this.myAddress}`
      }
      return 'Connect Wallet'
    },
    network() {
      return 'https://bsc-dataseed.binance.org'
    }
  },
  mounted () {
    let _this = this
    if(this.$route.query && this.$route.query.ref){
      this.refAdd = this.$route.query.ref;
    }
    // Web3浏览器检测
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    }
    this.WEB3 = new Web3(ethereum);
    ethereum.on("accountsChanged", function(accounts) {
      console.log(accounts[0]);//一旦切换账号这里就会执行
      _this.myAddress = accounts[0];
      _this.joinWeb3();
    });
    if(ethereum.networkVersion == 97){
      return this.$message.error('Please check if the network environment is a production environment');
    }
    // 检测MetaMask
    if (this.WEB3.currentProvider.isMetaMask == true) {
      console.log('metamask 可用');
      _this.joinWeb3();
    } else {
      console.log('metamask 不可用');
    }
  },
  methods: {
    progress(){
      this.$notify({
        title: 'On the way',
        message: 'The team is in progress, please follow our news',
        type: 'success',
      });
    },
    cutAdd(){
      this.myAddress = null;
      this.myBalance = 0;
      this.buyNumber = 0;
      this.myEarns = 0;
      this.myMiners = 0;
    },
    async joinWeb3() {
        this.eggContract = new this.WEB3.eth.Contract(eggABI, this.contractAddress);
        // 请求用户授权 解决web3js无法直接唤起Meta Mask获取用户身份
        const enable = await ethereum.enable();
        // // 授权获取账户
        let accounts = await this.WEB3.eth.getAccounts();
        // 返回指定地址账户的余额
        let balance = await this.WEB3.eth.getBalance(accounts[0]);
        this.myAddress = accounts[0];
        // 账户余额
        try{
          this.myBalance = this.WEB3.utils.fromWei(balance, 'ether');
          // 合约账户余额
          this.contractBalance = this.WEB3.utils.fromWei(await this.WEB3.eth.getBalance(this.contractAddress))
          // eggsPerMiner 一天的时间秒数  864000（秒）
          this.eggsPerMiner = await this.eggContract.methods.EGGS_TO_HATCH_1MINERS().call();
          // myMiners 用户质押数量
          this.myMiners = await this.eggContract.methods.hatcheryMiners(this.myAddress).call();
          // myEggs 用户获得的奖励
          this.myEggs =  await this.eggContract.methods.getMyEggs().call({from:this.myAddress});
          // 
          let myEarns = 0;
          if(this.myEggs > 0){
            myEarns = this.WEB3.utils.fromWei(await this.eggContract.methods.calculateEggSell(this.myEggs).call());
            if(Number(myEarns) < 0.000001){
              myEarns = 0;
            }
          }
          this.myEarns = myEarns // 计算最终奖励
          console.log('myBalance',this.myBalance);
          console.log('contractBalance',this.contractBalance);
          console.log('eggsPerMiner',this.eggsPerMiner);
          console.log('myMiners',this.myMiners);
          console.log('myEggs',this.myEggs);
          console.log('myEarns',this.myEarns);
      }catch(e){
        console.log(e);
      }


    },
    // 获取账户余额
    async getBalance(){
      this.WEB3 = new Web3(new Web3.providers.HttpProvider(this.network));
      let r = await this.WEB3.eth.getBalance(this.myAddress); // 获取余额
      const BNBbalance = r / 1000000000000000000;
      this.myBalance = BNBbalance;
    },
    totBalace(){
      this.buyNumber = this.myBalance;
    },
    copyLink(){
      var _input = document.createElement('input')
        _input.value = this.refLinks;
        document.body.appendChild(_input)
        _input.select()
        document.execCommand('Copy')
        this.$message.success('Copied to clipboard')
        _input.remove()

    },
    goinEgg(){
      if(this.myBalance < 0.01 || this.buyNumber < 0.01) return this.$message.error('Minimum deposit amount 0.01 BNB');
      if(this.eggContract){
        try{
          const callValue = this.WEB3.utils.toWei(this.buyNumber);
          let inviter = this.owner;
          if(this.WEB3.utils.isAddress(this.refAdd)){
            inviter = this.refAdd;
          }
          this.eggContract.methods.buyEggs(inviter).send({
            from: this.myAddress,
            value: callValue,
          })
          .on('transactionHash', (hash)=>{
            console.log(hash);
            this.$message.success('Transaction sent',3)
            console.log("Transaction sent",3);
          })
          .once('receipt', res => {
            this.$message.success('Transaction confirmed',3)
            console.log("Transaction confirmed",3);
            this.joinWeb3();
          })
          .catch(err => console.log(err))
        }catch(e){
          console.log(e);
        }
      }
    },
    // 复投
    compound(){
      if(!checkTime()) return this.$message.error('Coming Soon!');
      if(!this.myAddress || this.myAddress === '0x00000000000000000000000000000000deadbeef'){
        return this.joinWeb3();
      }
      if(this.myBalance * 1 < 0.001) return this.$message.warning('Insufficient Gas');
      if(this.myEarns * 1 < 0.01){
        this.$message.warning('Minimum Re-Roast amount must be greater than 0.01 BNB');
        return;
      }
      try{
        let inviter = this.owner;
        if(this.WEB3.utils.isAddress(this.refAdd)){
          inviter = affrAddr;
        }
        console.log(inviter);
        this.eggContract.methods.hatchEggs(inviter).send({
          from: this.myAddress,
        })
        .on('transactionHash', (hash)=>{
          console.log(hash);
          this.$message.success('Transaction sent',3)
        })
        .once('receipt', res => {
          this.$message.success("Transaction confirmed",3)
          this.joinWeb3();
        })
        .then(res => {
        })
        .catch(err => console.log(err))
      }catch(e){
        console.log(e);
      }
    },
    // 提取
    withdraw(){
      if(!checkTime()) return this.$message.error('Coming Soon!');
      if(!this.myAddress || this.myAddress === '0x00000000000000000000000000000000deadbeef'){
        return this.joinWeb3();
      }
      if(this.myBalance * 1 < 0.001) return this.$message.warning('Insufficient Gas');
      try{
        this.eggContract.methods.sellEggs().send({
          from: this.myAddress,
        })
        .on('transactionHash', (hash)=>{
          console.log(hash);
          this.$message.success('Transaction sent',3)
        })
        .once('receipt', res => {
          this.$message.success("Transaction confirmed",3)
        })
        .then(res => {

        })
        .catch(err => console.log(err))
      }catch(e){
        console.log(e);
      }

    },

  },
}
</script>
<style lang="less" scoped="true">

.__home{
  min-width: 100vw;
  min-height: 100vh;
  background: linear-gradient(163.68deg, #FFED8C 15.43%, #F4B335 83.92%);
  position: relative;
  overflow: hidden;

}
.__header{
  display: flex;
  align-items: flex-start;
  justify-content:space-between;
  padding: 20px 10px 0 10px;
}
.__header_l{
  a{
    img{
      width: 60px;
    }
  }
}
.__header_c{
  img{
    width: 200px;
  }
}
.__header_r{
  cursor: pointer;
  color: #fff;
  font-weight: 600;
  padding: 10px 20px;
  width: 180px;
  text-align: center;
  border-radius: 20px;
  background: linear-gradient(270deg, #ff6e6e, #ffbb00);
  transition: all .3s;
  &:hover{
    transform:translateY(-2px);
  }
}
.__home_ctx{
  position: relative;
  z-index: 1;
}
._egg_title{
  width: 100%;
  font-size: 36px;
  margin: 25px auto;
  text-align: center;
  color: #fff;
  text-shadow: 0px 1px 1px #ddd,
                0px 2px 1px #d6d6d6,
                0px 3px 1px #ccc,
                0px 4px 1px #c5c5c5,
                0px 5px 1px #c1c1c1,
                0px 6px 1px #bbb,
                0px 7px 1px #777;
  transition:all .8s ease-in-out;  
  -o-transition:all .8s ease-in-out;  
  -moz-transition:all .8s ease-in-out;  
  -webkit-transition:all .8s ease-in-out;
}
.__home_clock{
  position: absolute;
  right: 0;
  top: 60vh;
  width: 448px;
}
.__home_mark{
  position: absolute;
  left: 0;
  top: 25vh;
  width: 248px;
}
._egg_odds{
  display: flex;
  align-items: center;
  justify-content:center;
  margin-bottom: 100px;
  ._egg_odds_item{
    cursor: pointer;
    margin: 20px;
    padding: 20px;
    font-weight: 600;
    border-radius: 10px;
    background:#fff;
    transition: all 0.3s;
    box-shadow: 0px 100px 80px rgb(0 0 0 / 7%), 0px 41.7776px 33.4221px rgb(0 0 0 / 5%), 0px 22.3363px 17.869px rgb(0 0 0 / 4%), 0px 12.5216px 10.0172px rgb(0 0 0 / 4%), 0px 6.6501px 5.32008px rgb(0 0 0 / 3%), 0px 2.76726px 2.21381px rgb(0 0 0 / 2%);
    &:hover{
      transform:translateY(-2px);
    }
  }
  .__odds_icon{
    width: 50px;
    margin-right: 10px;
  }
}
._egg_body{
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 800px;
  max-width: 100%;
  align-items: stretch;
  grid-gap: 20px;
  gap: 20px;
}
._egg_body_left{
  position: relative;
  width: calc(50% - 10px);
  padding: 20px;
  padding-top: 130px;
  border-radius: 20px;
  box-shadow: 3px 0px 25px 11px #ffffff80;
  background: radial-gradient(#ffd700, transparent);
  ._egg_info_warp{
    width: 100%;
  }
  ._egg_info_icon{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -100px;
  }
  ._egg_info_ctx{

  }
  ._egg_info_tlt{
    color:#fff;
    font-size: 20px;
    font-weight: 600;
  }
  ._egg_info_item{
    color:#fff;
    font-size: 14px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    padding: 8px 0;
    box-shadow: inset 0px -0.5px 0px #F5F5F5;
    span{
      font-weight: 600;
    }
  }
  ._egg_referral{
    margin-top: 20px;
  }
  ._egg_referral_tlt{
    color:#fff;
    font-size: 20px;
    font-weight: 600;
  }
  ._egg_referral_desc{
    color:#fff;
    font-size: 14px;
    font-weight: 400;
    margin-top: 10px;
  }
  // 复制推荐码
  ._egg_referral_ipt{
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color:#fff;
    ._egg_referral_ipt_txt{
      color:#fff;
      border-radius: 32px;
      flex-grow: 2;
      max-width: 70%;
      text-align: center;
      cursor: text;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      padding: 10px 15px;
      box-shadow: inset -2px -2px 4px rgba(255, 255, 255, 0.5), inset 2px 2px 4px rgba(170, 170, 204, 0.25), inset 5px 5px 10px rgba(170, 170, 204, 0.5), inset -5px -5px 10px #FFFFFF;
    }
    ._egg_referral_ipt_btn{
      cursor: pointer;
      padding: 10px 15px;
      background: #f9d082;
      box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
      border-radius: 32px;
      &:hover{
        background: #fff;
        color: #f9d082;
      }
    }
  }
}
._egg_body_right{
  width: calc(50% - 10px);
  padding: 20px;
  box-shadow: 3px 0px 25px 11px #ffffff80;
  background: radial-gradient(#fbd66c, transparent);
  border-radius: 20px;
  ._egg_body_r_item{
    margin: 10px 0;
    border-radius: 10px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 400;
    padding: 10px;
    font-size: 18px;
    color:#fff;
    background: linear-gradient(270deg,#ffa900,#fff00000);
    span{
      font-weight: 600;
      color: #761212;
    }
  }
  ._egg_body_r_ant{
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 25px;
    padding: 2px 16px;
    box-shadow: inset -2px -2px 4px rgb(255 255 255 / 50%), inset 2px 2px 4px rgb(170 170 204 / 25%), inset 5px 5px 10px rgb(170 170 204 / 50%), inset -5px -5px 10px #ffffff;
  }
  ._egg_body_r_ipt{
    flex-grow: 2;
    max-width: 80%;
    height: 44px;
    background: #fff0;
    text-align: center;
    color: #5a0202;
    font-size: 20px;
    font-weight: 600;
  }
  ._egg_body_r_ant_suffix{
    cursor: pointer;
    font-weight: 600;
  }
  ._egg_body_r_buy_btn{
    border-radius: 25px;
    display: flex;
    padding: 11px 0;
    cursor: pointer;
    color: #fff;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    border: 1px solid #fff;    
    font-weight: 600;
    &:hover{
      color:#f9d082;
      border: 1px solid #fff; 
      background:#fff;
    }
  }

  ._egg_my_rews_warp{
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ._egg_my_rews_txt{
      display: flex;
      flex-direction: column;
      font-weight: 600;
      color: #fff;
      span{
        margin-top: 10px;
        font-weight: 800;
      }
    }
    ._egg_my_rews_btns{

      ._refry_btn,._gain_btn{
        margin: 10px 0;
        padding: 8px 20px;
        border-radius: 8px;
        background: #fff;
        color: #333;
        text-align: center;
        cursor: pointer;
        transition: all .3s;
        &:hover{
          transform:translateY(-2px);
        }
      }

    }
  }
}

@media (max-width: 765px){
  .__home_mark{
    top: 60%;
    left: -20%;
  }
  .__home_clock{
    bottom: -5%;
    right: 0;
    width: 400px;
    top: auto;
  }
  ._egg_odds{
    display: block;
  }
  .__header{
    align-items: center;
    flex-direction: column-reverse;
    .__header_c{
      margin: 30px 0;
      img{
        width: 150px;
      }
    }
  }
  ._egg_body{
    margin: 0px auto 0;
    align-items: center;
    flex-direction: column;
    grid-gap: 10px;
    gap: 10px;
  }
  ._egg_body_left,._egg_body_right{
    width: calc(100% - 20px);
  }
}

</style>
