
<template>
  <swiper class="swiper pb-1" :options="swiperOption">
    <swiper-slide v-for="article in news" :key="article.id">
      <div class="footer-card-wrapper" :id="article.id">
    		<footer-card  :article="article"/>
      </div>
	</swiper-slide>

  </swiper>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  export default {
    name: 'swiper-example-multiple-slides-per-biew',
    title: 'Multiple slides per view',
    components: {
      Swiper,
      SwiperSlide
    },
	props: ['news'],
	components: {
		'footer-card': require('../components/Footer-card-news.vue').default,
	},
    data() {
      return {
        swiperOption: {
          slidesPerView: 1,
          spaceBetween: 15,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          breakpoints: {
            1264: {
              slidesPerView: 6
            },
            1024: {
              slidesPerView: 4
            },
            700: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            430: {
              slidesPerView: 2,
            }
          }
      },
      }
    },

    
  }
</script>

<style scoped>
.box {
	background-color: #000;
	height: 300px;
	max-height: 300px;
	height: 100%;
	width: 200px;
}

@media only screen 
and (max-width : 1264px) {
	
}
</style>