<script setup>
import IconUSDT from '@/components/icons/IconUSDT.vue'
import IconLogo from '@/components/icons/IconLogo.vue'

</script>
<template>
  <div class="contact">
    <Header />
    <section class="hero-section hero-breadcumnd">
      <div class="container">
        <div class="row align-items-center">
          <div
            class="col-xxl-7 col-lg-7 wow fadeInUp"
            data-wow-delay="0.2s">
            <div class="breadcumnd-content">
              <h1>IPO Power</h1>
              <ul class="breadcrumb-light">
                <li><a href="#">Home </a></li>
                <li><i class="fas fa-long-arrow-right"></i></li>
                <li>Pages</li>
                <li><i class="fas fa-long-arrow-right"></i></li>
                <li>IPO Power</li>
              </ul>
            </div>
          </div>
          <div class="col-xxl-6 col-lg-5"></div>
        </div>
      </div>
      <div class="banner-shape1">
        <img src="@/assets/img/banner/b-shape1.png" alt="b-shape" />
      </div>
      <div class="banner-shape4">
        <img src="@/assets/img/banner/drop.png" alt="b-shape" />
      </div>
    </section>
    <section class="contact-section pt-120 pb-120">
      <div class="container">
        <div
          class="section-header section-center wow fadeInDown"
          data-wow-delay="0.3s">
          <h2 class="section-title">Join Mining</h2>
          <p>
            Join us now and embark on your journey of computing mining!
          </p>
        </div>
        <div class="tabs_warp">
          <div class="tabs_item active">Miner</div>
          <div class="tabs_item">Liquidity</div>
        </div>
        <div class="row justify-content-between align-items-center max-w-2xl m-auto flex flex-col items-center justify-center">
          <div class="col-lg-12" style="padding: 0;">
            <div class="add_power  rounded-lg px-3 py-3 pb-1 pt-6 h-sm:p-2 h-sm:pt-2">

              <div class="wallet_info">
                <div class="wallet_item">
                  <div class="wallet_item_top">
                    <div>
                      <span>Stake USDT</span>
                    </div>
                    <div class="flex">
                      <span>Balance: 0 
                        <span class="font-semibold">USDT</span>
                      </span>
                      <span class="max_btn">Max</span>
                    </div>
                  </div>
                  <div class="wallet_item_mid relative">
                    <div class="wallet_item_logo absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none px-3 py-3">
                      <IconUSDT style="width: 2rem;height: 2rem;"/>
                    </div>
                    <input id="ethAmountToStake" name="ethAmountToStake" placeholder="0.00" type="number">
                    <div class="absolute inset-y-0 right-2 flex items-center justify-end px-1 z-10 w-72">
                      <span class="text-xl">
                        <span class="text-2xl relative pr-1 -top-[1px]">≈</span>
                        $0.00 USD</span>
                    </div>
                  </div>
                  <div class="wallet_item_footer"></div>
                </div>
                <div class="wallet_item">
                  <div class="wallet_item_top">
                    <div>
                      <span>Stake IPO</span>
                    </div>
                    <div class="flex">
                      <span>Balance: 0 
                        <span class="font-semibold">IPO</span>
                      </span>
                    </div>
                  </div>
                  <div class="wallet_item_mid relative">
                    <div class="wallet_item_logo absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none px-3 py-3">
                      <IconLogo style="width: 2rem;height: 2rem;"/>
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
              </div>

            </div>
            <div class="rounded-md shadow mt-5 h-sm:mt-2">
              <button class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-md text-white action-button md:py-5 md:text-xl md:px-10">
                Connect Wallet
              </button>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="faq-section section-bg-two pb-120 pt-120">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div
              class="section-header section-center wow fadeInDown"
              style="visibility: visible; animation-name: fadeInDown"
            >
              <h2>Frequently Asked Questions</h2>
              <p>
                Aenean venenatis libero odio,id efficitur elit tempus fringilla.
                Fusce et rutrum tortor. Mauris ut enim nulla. Vestibulum a
                pellentesque eros.
              </p>
            </div>
            <div class="main-faq">
              <div class="faq-left-wrapper">
                <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <div class="accordion-header" id="headingOne">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="false"
                        aria-controls="collapseOne"
                      >
                        <span>Are you open for new projects? </span
                        ><span class="icon"
                          ><img
                            src="@/assets/img/faq/plus.png"
                            alt="arrow-img" /></span
                        ><span class="plus"
                          ><img src="@/assets/img/faq/d.png" alt="arrow-img"
                        /></span>
                      </button>
                      <div
                        id="collapseOne"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          <p>
                            Aenean venenatis libero odio,id efficitur elit
                            tempus fringilla. Fusce et rutrum tortor. Mauris ut
                            enim nulla. Vestibulum a pellentesque eros.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div class="accordion-header" id="headingTwo">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        <span>Do you currently have career openings?</span
                        ><span class="icon"
                          ><img
                            src="@/assets/img/faq/plus.png"
                            alt="arrow-img" /></span
                        ><span class="plus"
                          ><img src="@/assets/img/faq/d.png" alt="arrow-img"
                        /></span>
                      </button>
                      <div
                        id="collapseTwo"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          <p>
                            All successful bidders can confirm their winning bid
                            by checking the “Techbid”. In addition,all
                            successful bidders will receive an email notifying
                            them of their winning bid after the auction closes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div class="accordion-header" id="headingThree">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        <span>How long has the agency been running for?</span
                        ><span class="icon"
                          ><img
                            src="@/assets/img/faq/plus.png"
                            alt="arrow-img" /></span
                        ><span class="plus"
                          ><img src="@/assets/img/faq/d.png" alt="arrow-img"
                        /></span>
                      </button>
                      <div
                        id="collapseThree"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          <p>
                            All successful bidders can confirm their winning bid
                            by checking the “Techbid”. In addition,all
                            successful bidders will receive an email notifying
                            them of their winning bid after the auction closes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div class="accordion-header" id="headingThree4">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree4"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        <span
                          >Do you offer discounts for nonprofit companies?</span
                        ><span class="icon"
                          ><img
                            src="@/assets/img/faq/plus.png"
                            alt="arrow-img" /></span
                        ><span class="plus"
                          ><img src="@/assets/img/faq/d.png" alt="arrow-img"
                        /></span>
                      </button>
                      <div
                        id="collapseThree4"
                        class="accordion-collapse collapse"
                        aria-labelledby="headingThree4"
                        data-bs-parent="#accordionExample"
                      >
                        <div class="accordion-body">
                          <p>
                            All successful bidders can confirm their winning bid
                            by checking the “Techbid”. In addition,all
                            successful bidders will receive an email notifying
                            them of their winning bid after the auction closes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<style lang="less">
@import url('@/assets/css/base.css');
.font-semibold {
  font-weight: 600;
}
.add_power{
  background-color: var(--white-color);
  box-shadow: 0 5px 15.52px 0.48px rgba(0, 0, 0, 0.27);
  position: relative;
}
.wallet_item{
  color: var(--theme-color);
  margin-bottom: 20px;
}
.wallet_item_top{
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 6px;
}
.max_btn{
  cursor: pointer;
  font-size: .75rem;
  line-height: 1rem;
  font-weight: 500;
  padding: 4px 8px;
  margin-left: 4px;
  border-radius: 9999px;
  color: var(--white-color);
  background: var(--button-color);
}
#ethAmountToStake{
  box-shadow: none;
  display: block;
  width: 100%;
  font-size: 1.5rem;
  border-radius: 0.375rem;
  color: var(--theme-color);
  padding: 1rem 0.75rem 1rem 3.5rem;
  background-color: #f5f4ff;
  border: 1px solid #fff0;
  color: var(--theme-color);
  &:focus{
    outline: none;
    border: 1px solid var(--border);
  }
}
.calculation {
    display: block;
    width: 100%;
    border-radius: 0.375rem;
    --tw-border-opacity: 1;
    border-color: rgb(209 213 219 / var(--tw-border-opacity));
    padding: 1rem 0.75rem 1rem 3.5rem;
    --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);
    --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);
}
.calculation {
    border-style: none;
    background-color: rgb(254 202 202 / var(--tw-bg-opacity));
    --tw-bg-opacity: .25;
}
.calculation {
  font-size: 1.5rem;
  line-height: 1.75rem;
}
.action-button{
  border-radius: 10px;
  background: var(--button-color);
}
.tabs_warp{
  width: 268px;
  height: 44px;
  background-color: #231d70;
  border-radius: 22px;
  position: relative;
  display: flex;
  justify-content: space-around;
  -webkit-box-align: center;
  align-items: center;
  user-select: none;
  padding: 3px;
  margin: 0px auto 24px;
}
.tabs_item{
  z-index: 2;
  margin: 0px;
  border-radius: 22px;
  line-height: 1.6em;
  text-decoration: none;
  flex: 1 1 0%;
  text-align: center;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  height: 100%;
  color: #fff;
  cursor: pointer;
  &.active{
    opacity: 1;
    color: var(--border);
    background: #fff;
  }
}
</style>
