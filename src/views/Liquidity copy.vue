
<script setup>
	import IconUSDT from '@/components/icons/IconUSDT.vue'
	import IconSpacex from '@/components/icons/IconSpacex.vue'
</script>
<template>
    <div class="home">
      <Header />

      <section class="section-animate bg-dragon liquidity_warp">
        <div class="section-inner-center">
            <div class="lp_warp">
                <h2>liquidity list</h2>
                <table class="data additional-toggle" style="display: table">
                    <tbody >
                        <tr class="js-stagger">
                            <td >
                              <div class="coin_box">
                                <IconUSDT class="lp_icon" /> USDT
                              </div>
                            </td>
                            <td >
                                70
                            </td>
                        </tr>
                        <tr class="js-stagger">
                            <td >
                              <div class="coin_box">
                                <IconSpacex class="lp_icon" /> SpaceX
                              </div>
                            </td>
                            <td >
                                70000
                            </td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
            <div class="add_liquidity">
			        <span class="text">添加流动性</span>
		        </div>
        </div>
          <!-- <div class="my_liquidity" style="--color: #0f2bff">
            <div class="my_liquidity_tlt">
              <h4>Liquidity List</h4>
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
          </div> -->
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
  .lp_warp{
    h2{
      text-align: left;
    }
  }
  .add_liquidity{
      margin-top: 20px;
      cursor: pointer;
      text-align: center;
      padding: 10px 15px;
      border: 1px solid #fff;
    }
  .my_liquidity{
    width: 90%;
    position: relative;
    margin: 10px;
    overflow: hidden;

    .my_liquidity_tlt{
      h4{
        font: 36px/36px D-DIN-Bold,Arial,Verdana,sans-serif;
        font-weight: 400;
        font-style: normal;
      }
    }

    .my_liquidity_item{
      padding: 20px 0;
      border-bottom: 1px solid #fff;
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
.my_liquidity_list{
  margin-top: 30px;
  font: 14px/18px D-DIN-Bold,Arial,Verdana,sans-serif;
  text-align: left;
  span{
    &:first-child{
      text-align: left;
    }
    text-align: right;
  }
}
  .add_lp_list_top{
    display: flex;
    align-items: center;
    margin-top: 20px;
    font-weight: bold;

  }
.coin_box{
  color: #fff;
  display: flex;
  align-items: center;
}
  .lp_icon{
      width: 24px;
      height: 24px;
      margin-right: 6px;
    }
  .add_lp_list_bottom{
    margin-top: 6px;
    width: 100%;
    color: #fff;
    flex-grow: 2;
    text-align: center;
    cursor: text;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 10px 15px;
    border: 1px solid #fff;
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
      font-weight: 400;
      line-height: 1.5;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 12px;
    }
  }
.address_txt{
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
    font: 600 16px/18px D-DIN-Regular,Arial,Verdana,sans-serif;
    text-align: left;
    color: #fff;
    padding: 20px 0;
    border-bottom: 1pt solid rgba(255,255,255,.3);
}
table.data td {
    text-align: right;
}
table.data td:first-child {
    font: 14px/18px D-DIN-Bold,Arial,Verdana,sans-serif;
    text-align: left;
}
table.data td {
    text-align: right;
}
table.data td span {
    color: #868686;
}
  </style>
  