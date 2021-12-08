<template>
  <div>
    <p class="text-h4 font-weight-bold mt-5 ">Other news</p>
        <v-row >

          <template class="justify-space-between">
            <v-col>
              <news-slider :news="news"/>
            </v-col>
          </template>
        </v-row>
  </div>
        
</template>

<script>

import { Component, namespace, Vue, Prop } from 'nuxt-property-decorator'
import FooterCard from '../components/Footer-card-news.vue';
import NewsSlider from '../components/Slider-news.vue'


const { State, Action, Mutation, Getter } = namespace('news');

export default @Component({
  components: {
    FooterCard,
    NewsSlider,
  },
})


class NewsPage extends Vue{

  @Prop({type: Array}) news

} 



</script>

<style>

</style>