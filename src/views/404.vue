<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
<template>
  <div class="error_404">
    <section class="error-section">
      <div class="error1">
        <img src="@/assets/img/error/ratio1.png" alt="error-img" />
      </div>
      <div class="error2">
        <img src="@/assets/img/error/ratio2.png" alt="error-img" />
      </div>
      <div class="error3">
        <img src="@/assets/img/error/ratio3.png" alt="error-img" />
      </div>
      <div class="error-main">
        <div class="error-thumb">
          <img src="@/assets/img/error/error.png" alt="error-img" />
        </div>
        <div class="error-content">
          <h4>Oops,Something went wrong!</h4>
          <RouterLink class="cmn--btn" :to="`/`">Go Back Home</RouterLink>
          <!-- <a href="index.html" ></a> -->
        </div>
      </div>
    </section>
  </div>
</template>
<style></style>
