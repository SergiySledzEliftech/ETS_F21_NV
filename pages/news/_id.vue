
<template>
<v-container>
  <v-app class="mt-10 pa-0">

    <div :class="{isLoaded: 'page-wrapper d-flex justify-center align-center'}">
      <v-progress-circular v-if="isLoaded"  indeterminate></v-progress-circular>

  <div v-else>


    <div v-if="error" class="d-flex justify-center mt-10">
        <div class="text-h3">There is some error</div>

    </div>
    
    <div v-else>
<v-row class="d-flex  flex-column align-center">
      
      <div class="text-h3  mt-5 mb-5 mx-15 font-weight-bold text-center article-title">{{ viewedArticle.title}} </div>
      <div class="sub-title-box d-flex justify-space-between px-5 align-baseline">
        <div class="sub-title-box-child left-box d-flex align-center">
          <div class="caption-2"><span class="date">{{viewedArticle.date}}</span></div>

          <div id="select-btn" @click="addToSelectedArticles(viewedArticle.id); changeSelectedProp();" class="ml-2">
            <div v-if="!selected">
              <v-icon >mdi-star-outline</v-icon>
            </div>
            <div v-else>
              <v-icon>mdi-star</v-icon>
            </div>
          </div>
          
        </div>

      <div class="sub-title-box-child v-row d-flex" >
        <div v-for="ticker in viewedArticle.tickers" :key="ticker">
          <v-chip class="grey lighten-5 mr-2" label>{{ticker}}</v-chip>
        </div>
      </div>

        <div class="sub-title-box-child caption-1"><span>Source:</span> {{viewedArticle.source_name}}</div>
      </div>
      
      
    </v-row>
    <v-main class="pa-0 pt-8">
      <v-img
        :lazy-src="viewedArticle.image_url"
        width="100%"
        height="60%"
        :src="viewedArticle.image_url"
      ></v-img>

      <v-row class="px-15 d-flex flex-column">
        <div class="text-h5 mt-15" >
          <span class="subtitle-text">
            {{viewedArticle.text}}

          </span>
        </div>

        <div class="text-body-1 mt-10">
          <span class="article-text"> 
              Read more <v-icon class="mx-2">mdi-arrow-right-thick </v-icon>  <a :href="viewedArticle.news_url">Source Link</a>
          </span>
        </div>
      </v-row>

    </v-main>
        

    </div>


      

  </div>
    </div>
  

  </v-app>
</v-container>
</template>

<script>
import { Component, namespace, Vue} from 'nuxt-property-decorator'
const { State, Action, Getter } = namespace('news');


@Component({components: {

}})


export default  class NewsPage extends Vue{
  @State viewedArticle
  @Getter selectArticle
  @Action fetchNews
  @Action addToSelectedArticles
  @Action getArticleById

    data() {
      return {
        selected: false,
        isLoaded: true,
        error: false
      }
    }

    head() {
      return {
        title: 'Article Page',
      }
    }


    async mounted () {
      await this.getArticleById(this.$route.params.id)
      this.selected = this.viewedArticle.selected
      this.isLoaded = false

      if (Object.keys(this.viewedArticle).length) {
        this.error = false
      } else {
        this.error = true
      }
    } 


    async addToSelectedArticles() {
      this.selected = !this.selected
      this.addToSelectedArticles(id)
    }

    changeSelectedProp() {
      this.selected = !this.selected
    }

}

</script>

<style scoped>

.error-block {
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
}

.page-wrapper {
  height: 100%;
}

.sub-title-box {
  width: 100%;
}

.date {
  color: #808491;
}

.subtitle-text {
  color: #1e1a29;
}

.text-body-1 {
  text-align: justify;
}
.article-text {
  display: flex;
  line-height: 1.8;
  color: #6e7281;
}

.arrow {
  padding: 0 10px;
  margin-bottom: 5px
}

.v-row {
  width: auto;
}

@media only screen 
and (max-width : 1264px) {
  .article-title {
    font-size: 2.3rem !important;
  }
}

@media only screen 
and (max-width : 700px) {
  .article-title {
    font-size: 1.6rem !important;
  }

  .subtitle-text {
    font-size: 18px !important;
    line-height: 1.2;
  }
}


@media only screen 
and (max-width : 600px) {

  .article-title {
    font-size: 1.4rem !important;
  }

  .subtitle-text {
    font-size: 16px !important;
    line-height: 1.2;
  }

  .text-h2 {
    font-size: 2rem  !important;
    line-height: 1.4;
  }
}

.arrow {
  cursor: pointer;
  margin-top: 5px;
}

@media only screen 
and (max-width : 460px)  {
.article-title {
    font-size: 1.4rem !important;
  }

  .subtitle-text {
    font-size: 16px !important;
    line-height: 1.2;
  }

  .sub-title-box {
    width: 100%;
    flex-direction: column;
    align-content: center;
    justify-content: center;
  }

  .sub-title-box-child {
    display: flex;
    justify-items: center;
    align-items: center;
    text-align: center;
    margin: 2.5px auto;
  }

  .article-text {
    font-size: 14px !important;
}

}







</style>


