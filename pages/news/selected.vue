<template>
  <v-app>

    <v-main class=" pt-5 px-0">
      <v-container >
		  <div >
			  <div v-if="isLoaded" >
      		<v-progress-circular  indeterminate></v-progress-circular>
		  </div>
        <v-row v-else class="d-flex flex-column">
			<v-row class="header d-flex justify-center align-center">
				<h1 class="article-title font-weight-regular ">Selected articles</h1>
				
			</v-row>
			<v-row class="d-flex justify-end">
				<div v-if="selectedArticles.length" class="menu-buttons d-flex flex-column align-center mr-5">
					<v-icon @click="toggleShowDialog"> mdi-delete </v-icon>
					<span class="text-body-2">Delete all articles</span>
				</div>
			</v-row>
			<v-row class="mt-10">

				<div class="articles" v-if="articles.length">
				  <template v-for="article in articles" > 
					
					  	<ArticleCard :article="article" :key="article.title" />
					</template>
			</div>
          
			<div class="empty-article mx-auto mt-10" v-else>
				<div class="text-h2 empty-article-text">There are no artiles</div>
				<div class="text-h4 mt-7" ><nuxt-link class="link-styles" to="/news">Go to news page</nuxt-link></div>
			</div>
			</v-row>
	  		<Dialog />

        </v-row>
		  </div>
		  
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { Component, namespace, Vue, Watch} from 'nuxt-property-decorator'
import ArticleCard from '../../components/SelectedArticleCard.vue';
import Dialog from '../../components/SelectedListDialog.vue';


const { State, Action, Getter } = namespace('news');

@Component({
  components: {
    ArticleCard,
	Dialog
  },
})

export default  class NewsPage extends Vue {

	data() {
		return {
			articles: []
		}
	}

	@State showDialog
	@State selectedArticles
	@Action populateSelectedArticles
	@Action deleteAllArticles
	@Action toggleDialog
	@Action toggleShowDialog
	@Getter getSelectedArticle

	@Watch('selectedArticles')
	async getTransactionHistory() {
		this.articles = this.selectedArticles
  	}

	data() {
		return {
			isLoaded: true
		}
	}
	
	async mounted() {
		await this.populateSelectedArticles()
		this.articles = this.selectedArticles;
		this.isLoaded = false
	}
}
</script>

<style scoped>
.article-container {
	display: grid;
	grid-template-columns: 50% auto;
	grid-template-rows: 50%;
	justify-content: center;
}

.article-img {
	border-radius: 6px;
}

.text-body-1 {
	color: #999;
}

.article-title {
	font-size: 52px;
}

.link {
	text-decoration: none;
	color: inherit;
}

.header {
	display: flex;
	flex-direction: columns;
}

.delete-btn {
	color: red;
	cursor: pointer;
}

.empty-article {
	text-align: center;
}

.link-styles {
	text-decoration: none;
}

.selected-articles-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
}


@media only screen 
and (max-width : 540px) {
.article-title {
	font-size: 2.5rem;
}	

.empty-article .empty-article-text {
	font-size: 2rem !important;
}

.empty-article .empty-article-text:nth-child(2) {
	font-size: 1.8rem !important;
}
}

@media only screen 
and (max-width : 540px) {
.article-title {
	font-size: 1.6rem;
	text-align: center;
}	
}


</style>