<template>
  <div class="home">
    <Header />
    <!-- Section A -->
    <section class="section-a">
      <div class="section-inner">
        <h4>SpaceX</h4>
        <h2>High Yield Miner</h2>
        <a href="#" class="btn">
          <div class="hover"></div>
          <span>Connect Wallet</span>
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
      <div class="inner_card my_info_warp">
        <div class="inner_item">
          钱包余额：<span>0 USDT</span>
        </div>
        <div class="inner_item">
          钱包余额：<span>0 USDT</span>
        </div>
        <div class="inner_item">
          我的算力：<span>1000 V1 </span>
        </div>
        <div class="inner_item">
          总算力：<span>1000</span>
        </div>
        <div class="action_wrapper">
          <div class="data_row">
            <div class="inner_item">
              我的奖励：<span>0 SpaceX</span>
            </div>
          </div>
          <div class="action_btns">
            <span>复投</span>
            <span>提现</span>
          </div>
        </div>
      </div>
      <div class="inner_card" style="margin-top: 40px;">
        <h4>我的团队</h4>
        <div class="data_row">
          <div class="inner_item">
            团队人数：<span>1,000</span>
          </div>
          <div class="inner_item">
            团队收益：<span>0 SpaceX</span>
          </div>
          <div class="inner_item">
            团队算力：<span>0</span>
          </div>
          <div class="inner_item">
            上级地址：<span class="address_txt">0xE02785c089bF7025dF03A5e022bF8c7a5319177f</span>
          </div>
          <div class="line"></div>

        </div>
        <div class="ref_wrapper">
          <h5>邀请链接 </h5>
          <span class="inner_desc">从使用您的推荐链接的任何人那里赚取邀请奖励</span>
          <div class="inner_item">
            推荐奖励：<span>0 SpaceX</span>
          </div>
          <div class="ref_btns">
            <span class="ref_ipt_txt address_txt">链接钱包</span>
            <span class="ref_ipt_btn">复制</span>
          </div>
        </div>
      </div>
    </section>
    <!-- Section C -->
    <section class="section-c">
      <div class="color_card">
        <div class="income_warp">
          <h2>收益</h2>
          <div class="income_item">
            <div class="income_item_tlt">
              静态收益：
            </div>
            <div class="income_item_txt">
              每日收益约为1.5%入金本位的代币SpaceX，每15秒爆一块。
            </div>
          </div>
          <div class="income_item">
            <div class="income_item_tlt">
              直推收益：
            </div>
            <div class="income_item_txt">
              每日收益为个人直推算力/全网算力*全网入金*0.15%，每15秒爆一块（带烧伤）
            </div>
          </div>
          <div class="income_item">
            <div class="income_item_tlt">
              团队收益：
            </div>
            <div class="income_item_txt">
              每日收益为团队小区算力/全网算力*全网入金*0.6%*级别权重，每15秒爆一块
            </div>
          </div>
        </div>
      </div>
      <div class="color_card" style="margin-top: 40px;">
        <div class="income_warp">
          <h2>算力</h2>
          <div class="income_item">
            <div class="income_item_tlt">
            </div>
            <div class="income_item_txt">
              算力<span>1-5000</span>为<span>V1</span>,权重 <span>0.5</span>
            </div>
          </div>
          <div class="income_item">
            <div class="income_item_tlt">
            </div>
            <div class="income_item_txt">
              算力<span>5001-12500</span>为<span>V2</span>,权重 <span>1</span>
            </div>
          </div>
          <div class="income_item">
            <div class="income_item_tlt">
            </div>
            <div class="income_item_txt">
              算力<span>12501-25000</span>为<span>V3</span>,权重 <span>1.2</span>
            </div>
          </div>
          <div class="income_item">
            <div class="income_item_tlt">
            </div>
            <div class="income_item_txt">
              算力大于或等于<span>25001</span>为<span>V4</span>,权重 <span>1.5</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Section F -->
    <section class="section-f">
      <div class="color_card blue" style="margin-top: 40px;">
        <div class="income_warp">
          <h2>代币经济学</h2>
          <div class="income_item">
            <div class="income_item_tlt">
              代币名称：
            </div>
            <div class="income_item_txt">
              SpaceX
            </div>
          </div>
          <div class="income_item">
            <div class="income_item_tlt">
              底池：
            </div>
            <div class="income_item_txt">
              底池不通缩
            </div>
          </div>
          <div class="income_item">
            <div class="income_item_tlt">
              手续费：
            </div>
            <div class="income_item_txt">
              转账无手续费
            </div>
          </div>
          <div class="income_item">
            <div class="income_item_tlt">
              团队收益：
            </div>
            <div class="income_item_txt">
              团队享受15代收益
            </div>
          </div>
          <div class="income_item">
            <div class="income_item_tlt">
              销毁及总量：
            </div>
            <div class="income_item_txt">
              总量60亿买卖滑点10%，打入黑洞销毁。
            </div>
          </div>
          <div class="income_item">
            <div class="income_item_tlt">
              通缩机制：
            </div>
            <div class="income_item_txt">
              持币每日通缩3%，每15分钟通缩一次，，总量通缩至6000万枚后不在通缩。
            </div>
          </div>
          <div class="income_item">
            <div class="income_item_tlt">
              流动性：
            </div>
            <div class="income_item_txt">
              添加流动性，撤出流动性无手续费，进入底池后不通缩（可撤出流动性方案）
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<style>
</style>
