
<script setup>
	import IconUSDT from '@/components/icons/IconUSDT.vue'
	import IconSpacex from '@/components/icons/IconSpacex.vue'
</script>
<template>
    <div class="home">
      <Header />

      <section class="section-animate bg-dragon liquidity_warp">
          <div class="my_liquidity" style="--color: #0f2bff">
            <div class="my_liquidity_tlt">
              <h4>我的流动性</h4>
              <span>流动性持仓列表</span>
            </div>
            <div class="my_liquidity_list">
              <div class="my_liquidity_top">
                <span class="my_liquidity_item_num">number</span>
                <span class="my_liquidity_item_usdt">USDT</span>
                <span class="my_liquidity_item_sx">SpaceX</span>
              </div>
              <div class="my_liquidity_item">
                <span class="my_liquidity_item_num">1</span>
                <span class="my_liquidity_item_usdt">999</span>
                <span class="my_liquidity_item_sx">1999</span>
              </div>
              <div class="my_liquidity_item">
                <span class="my_liquidity_item_num">2</span>
                <span class="my_liquidity_item_usdt">1999</span>
                <span class="my_liquidity_item_sx">2999</span>
              </div>
            </div>
            <div class="add_lp_warp">
              <div class="add_lp_list">
                <div class="add_lp_list_top">
                  <IconUSDT class="lp_icon" /> USDT
                </div>
                <div class="add_lp_list_bottom">
                  <input type="text" name="" id="">
                  <div class="moey">~265.27 USD</div>
                </div>
              </div>
              <div class="add_lp_list">
                <div class="add_lp_list_top">
                  <IconSpacex class="lp_icon" /> USDT
                </div>
                <div class="add_lp_list_bottom">
                  <input type="text" name="" id="">
                  <div class="moey">~265.27 USD</div>
                </div>
              </div>
            </div>
            <div class="add_liquidity">
			        <span class="text">添加流动性</span>
		        </div>
          </div>
      </section>

  
      <Footer />
    </div>
  </template>
  
  <style lang="less" scoped>
  .liquidity_warp{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .my_liquidity{
    width: 90%;
    padding: 30px;
    position: relative;
    margin: 10px;
    background: linear-gradient(rgba(25, 31, 50, 0.2), rgb(4 8 20 / 0.01)), rgb(4 8 20 / 0.8);
    box-shadow: inset 0 0 0 1px rgb(200 200 220 / 0.16), inset 0 0 5px -3px #0f2bff, inset 0 12px 48px 0 rgb(160 220 240 / 0.08), inset 0 0 120px -100px #0f2bff;
    border-radius: 16px;
    overflow: hidden;
    // &::after{
    //   content: "";
    //   position: absolute;
    //   inset: 0;
    //   background-color: #0f2bff;
    //   opacity: 0.2;
    //   -webkit-mask-image: radial-gradient(90% 90% at 50% 50%, transparent, black);
    //   mask-image: radial-gradient(90% 90% at 50% 50%, transparent, black);
    //   filter: url(#noiseFilter);
    //   z-index: 1;
    // }
    // &::before{
    //   content: "";
    //   position: absolute;
    //   inset: 0;
    //   background-image: radial-gradient(#0f2bff 8%, transparent 8%), radial-gradient(#0f2bff 8%, transparent 8%), radial-gradient(#0f2bff 8%, transparent 8%), radial-gradient(#0f2bff 8%, transparent 8%);
    //   background-position: 0% 0%, 0% 100%, 100% 0%, 100% 100%;
    //   background-size: 40px 40px;
    //   background-repeat: no-repeat;
    //   filter: drop-shadow(0 0 6px #0f2bff);
    // }
    .my_liquidity_tlt{
      h4{
        font-size: 16px;
      }
      span{
        font-size: 14px;
      }
    }
    .add_liquidity{
      margin-top: 20px;
      cursor: pointer;
      text-align: center;
      padding: 10px 15px;
      border: 1px solid #fff;
      box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
      border-radius: 10px;
    }
    .my_liquidity_item,.my_liquidity_top{
      display: flex;
      align-items: center;
    }
    .my_liquidity_item_num{
      width: 33.33%;
    }
    .my_liquidity_item_usdt{
      width: 33.33%;
    }
    .my_liquidity_item_sx{
      width: 33.33%;
    }
  }
  .add_lp_list{
    display: flex;
    flex-direction: column; 
  }

  .add_lp_list_top{
    display: flex;
    align-items: center;
    margin-top: 10px;
    .lp_icon{
      width: 24px;
      height: 24px;
      margin-right: 6px;
    }
  }


  .add_lp_list_bottom{
    margin-top: 6px;
    border-radius: 10px;
    width: 100%;
    color: #fff;
    border-radius: 10px;
    flex-grow: 2;
    text-align: center;
    cursor: text;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 10px 15px;
    box-shadow: inset -2px -2px 4px rgba(255, 255, 255, 0.5), inset 2px 2px 4px rgba(170, 170, 204, 0.25), inset 5px 5px 10px rgba(170, 170, 204, 0.5), inset -5px -5px 10px #FFFFFF;
    input{
      text-align: right;
      width: 100%;
      position: relative;
      font-weight: 500;
      outline: none;
      border: none;
      flex: 1 1 auto;
      background-color: transparent;
      font-size: 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0;
      color: #fff;
    }
    .moey{
      text-align: right;
      width: 100%;
      color: #b8add2;
      font-weight: 400;
      line-height: 1.5;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 12px;
    }
  }
  </style>
  