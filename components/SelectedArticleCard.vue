<template>
  <v-col
						
					class="mt-2 "
					cols="12"
					>
					<div class="article-container pt-2">
						<div class="text">
							<div class="text-body-1 font-weight-bold date-title">{{article.date}}</div>
							<div class="text-h4 mt-2 article-title">{{article.title}}</div>
							<p class="text-body-1 mt-3 aricle-text">{{article.text}}</p>
							
							<p class="text-body-2">Source: {{article.source_name}}</p>
							<v-btn  large class="blue-grey lighten-4" dark>
								<a :href="article.news_url" target="_bank" class="link " >Read more</a>
							</v-btn>
							<v-icon @click="deleteArticle(article.id)" large class="ml-5 delete">mdi-delete</v-icon>
						</div>
						<div class="article-img-container">
							<v-img
							:lazy-src=article.image_url
							:src=article.image_url
							height="150px"
							width="200px"
							class="mt-5 ml-7 article-img"
						></v-img>		
						</div>
						
						
					</div>
					<v-divider class="mt-15"></v-divider>
					</v-col>
</template>

<script>
import { Prop,Component, Vue, namespace } from 'nuxt-property-decorator'
const { Action } = namespace('news');

  @Component({components: {
	  
}})

export default  class SelectedArticlesPage extends Vue {
  @Prop({type: Object,required: true}) article;
  @Action deleteArticle
  
	data() {
		return {
			articleInfo: null
		}
	}

  mounted () {

  }
}

</script>

<style scoped>
.aricle-text {
	overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 2;
           line-clamp: 2; 
   -webkit-box-orient: vertical;
}

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
	color: #fff !important;
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

@media only screen 
and (max-width : 900px) {
	.article-title {
		font-size: 1.8rem !important;
	}

	.aricle-text {
		font-size: 1rem !important;
	}
}

@media only screen 
and (max-width : 765px) {
.article-container {
	margin-left: 15px;
	display: flex;
	flex-direction: column;
}

.text {
	order:2;
}

.article-img{
	/* width: 100% !important; */
	margin: 0 !important; 
	order:1;
}

.article-img-container {
	width: 100%;
}

}
@media only screen 
and (max-width : 540px) {
	.article-title {
		font-size: 1.4rem !important;
	}

}

@media only screen 
and (max-width : 540px) {
	.article-title {
		font-size: 1.2rem !important;
	}

}



</style>