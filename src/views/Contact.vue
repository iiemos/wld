<template>
  <div class="contact">
    <Header />
    <section class="hero-section hero-breadcumnd">
      <div class="container">
        <div class="row align-items-center">
          <div
            class="col-xxl-7 col-lg-7 wow fadeInUp"
            data-wow-delay="0.2s"
            style="
              visibility: visible;
              animation-delay: 0.2s;
              animation-name: fadeInUp;
            "
          >
            <div class="breadcumnd-content">
              <h1>Contact</h1>
              <ul class="breadcrumb-light">
                <li><a href="#">Home </a></li>
                <li><i class="fas fa-long-arrow-right"></i></li>
                <li>Pages</li>
                <li><i class="fas fa-long-arrow-right"></i></li>
                <li>Contact</li>
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
          data-wow-delay="0.3s"
          style="
            visibility: visible;
            animation-delay: 0.3s;
            animation-name: fadeInDown;
          "
        >
          <h2 class="section-title">Get In touch With US</h2>
          <p>
            Nam semper,lectus ac vestibulum sollicitudin,enim ante elementum
            ligula,nec ornare nulla elit vel nunc.
          </p>
        </div>
        <div class="row justify-content-between align-items-center">
          <div class="col-lg-6">
            <div class="form-area-left">
              <form id="form">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-control">
                      <label for="Name">Name</label
                      ><input
                        type="text"
                        id="Name"
                        placeholder="Your Full Name"
                      /><small>Error message</small>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-control">
                      <label for="email">Your Email</label
                      ><input
                        type="text"
                        id="email"
                        placeholder="Your Email"
                      /><small>Error message</small>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-control">
                      <label for="phone">Phone</label
                      ><input
                        type="number"
                        id="phone"
                        placeholder="Phone Number"
                      /><small>Error message</small>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-control form_control">
                      <label for="subject">Subject</label
                      ><input
                        type="text"
                        id="subject"
                        placeholder="Project"
                      /><small class="conpany_error">Error message</small>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-control">
                      <label for="message">Message</label
                      ><textarea
                        name="message"
                        id="message"
                        cols="10"
                        rows="5"
                        placeholder="Please type your message here..."
                      ></textarea
                      ><small>Error message</small>
                    </div>
                  </div>
                </div>
                <button type="submit" class="cmn--btn">Send Message</button>
                <div class="thank_you">
                  <p>Your Message is successfully sent!</p>
                </div>
              </form>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="right-contact">
              <div class="contact-form-right">
                <div class="section-header">
                  <h3 class="section-title">Contact Information</h3>
                  <p>
                    Lorem ipsum dolor sit amet,consectetur adipiscing elit,sed
                    do eiusmod tempor
                  </p>
                </div>
                <ul class="contact">
                  <li>
                    <div class="phone-icon">
                      <img src="@/assets/img/footer/email.png" alt="email" />
                    </div>
                    <a href="#0" class="email-part"
                      ><span>Email:</span
                      ><span
                        class="__cf_email__"
                        data-cfemail="75060005051a0701353112101b160c"
                        >[email&nbsp;protected]</span
                      ></a
                    >
                  </li>
                  <li>
                    <div class="phone-icon">
                      <img src="@/assets/img/footer/phone.png" alt="phone" />
                    </div>
                    <a href="#0" class="email-part"
                      ><span>Phone:</span>+879 624 548
                    </a>
                  </li>
                </ul>
                <div class="found">
                  <h5>Found us on</h5>
                  <ul class="social">
                    <li>
                      <a href="#" class="icon"
                        ><i class="fa-brands fa-facebook-f"></i
                      ></a>
                    </li>
                    <li>
                      <a href="#" class="icon"
                        ><i class="fa-brands fa-instagram"></i
                      ></a>
                    </li>
                    <li>
                      <a href="#" class="icon"
                        ><i class="fa-brands fa-twitter"></i
                      ></a>
                    </li>
                    <li>
                      <a href="#" class="icon"
                        ><i class="fa-brands fa-whatsapp"></i
                      ></a>
                    </li>
                  </ul>
                </div>
              </div>
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

<style></style>
