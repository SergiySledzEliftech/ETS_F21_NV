<template>
  <v-app>
    <div class="justify-center text-center" v-if="isLoaded"> 
      <v-progress-circular   indeterminate></v-progress-circular>
    </div>

    <v-main v-else class="news-box pl-0 pt-0" >
      <v-container class="">
        <div class="d-flex justify-space-between align-baseline news-page-title">
          <p class="text-h3 font-weight-bold">Top news</p>
          <p class="text-body-1 mr-4"><nuxt-link class="link-selected" to="/news/selected">Go to selected articles <v-icon>mdi-newspaper-variant-multiple</v-icon></nuxt-link></p>
        </div>

        <div class="wrapper">
          <div v-for="article in news.slice(0,4)" :key="article.id" class="box" v-on:dblclick="getRoute" 
          :id="article.id">
            <NewsCard :article="article" />
          </div>

          
          <div class="box">
            <CurrencyList />
          </div>
        </div>
        <FooterNewsList :news="news.slice(4)"/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import NewsCard from '../../components/Card-news';
import CurrencyList from '../../components/CurrencyList.vue'
import FooterNewsList from '../../components/FooterNewsList.vue'
import SliderNews from '../../components/Slider-news.vue'

const { State, Action, Mutation, Getter } = namespace('news');

@Component({
  components: {
    NewsCard,
    CurrencyList,
    FooterNewsList,
    SliderNews,
  },
})


export default  class NewsPage extends Vue{

  @State news
  @State selectedArticles
  
  @Action parseId
  @Action fetchNews

  data() {
    return {
      isLoaded: true
    }
  }

    head() {
      return {
        title: 'News Page',
      }
    }

    getRoute(e) {

        for(let i = 0; i < 10; i++) {
          if (e.path[i].classList.value == 'box') {
            this.$router.push(`/news/${e.path[i].id}`)
          }
        }

    }

    async mounted () {
       await this.fetchNews()
      this.isLoaded = false
    }   

} 
</script>

<style scoped>
body {
  margin: 40px;
}

.container {
  box-sizing: border-box;
}

.link-selected {
  text-decoration: none;
}


.wrapper {
    width: auto;
    display: grid;
    box-sizing: border-box;
    grid-gap: 10px;
		grid-template-columns: 20% 20% 28% 28%;
    grid-template-rows: minmax(auto ,200px) minmax(auto ,200px);
		background-color: #fff;
		color: #444;
    overflow: hidden;
	}

	.box {
		background-color: #444;
		color: #fff;
		border-radius: 5px;
		font-size: 150%;
    cursor: pointer;
	}

  .box:first-child{ 
		grid-column: 1 / 3;
		grid-row: 1;    
  }

  .box:nth-child(2) {
    grid-column: 3;
		grid-row: 1 / 3;
  }
  .box:nth-child(3) {
    grid-column: 1 ;
		grid-row: 2 ;
  }
  .box:nth-child(4) {
    grid-column: 2;
		grid-row: 2;
  }
  .box:nth-child(5) {
    cursor: auto;
    background: #F5F5F5;
    grid-row:1/3;
  }


/* Media queries */
/* Large screens ----------- */
@media only screen 
and (max-width : 1024px) {
  .wrapper {
    grid-gap: 7px;
    grid-template-columns: 35% 35% 30%;
		grid-template-areas: "box box list"
                         "box box list";
	}

  .box {
    grid-area: box;
    grid-column: auto;
  }

  .box:first-child{ 
		grid-column: 1 / 2;
		grid-row: 1;    
  }

  .box:nth-child(2) {
    grid-column: 2;
		grid-row: 1 ;
  }


  .box:nth-child(5) {
    grid-area: list;
  }
}


@media only screen 
and (max-width : 960px) {
  .wrapper {
    grid-template-columns: 50% 50%;
    grid-template-rows: 200px 200px 240px;
    grid-template-areas: "box box "
                         "box box"
                         "list list"
                         "list list";
  }

  .news-box {
    padding: 0 !important;
  }

  .box:nth-child(5) {
    margin-top: 15px;
  }

  .box:nth-child(5) {
    cursor: auto;
  }
}

@media only screen 
and (max-width : 620px) {
  .news-page-title {
    display: flex;
    flex-direction: column;
  }
}


@media only screen 
and (max-width : 460px) {
  .wrapper {
    grid-template-columns: 100%;
    grid-template-rows: minmax(auto, 200px) 185px;
    grid-template-areas: "box "
                         "list"
  }

  .box:first-child, .box:nth-child(5) {
    display: block;
  }

  .box {
    display: none;
  }

}

</style>
