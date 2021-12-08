<template>
  <v-card
    class="mx-auto  card"
    color="#fff"
    width="200"
	height="270"
	
	v-on:dblclick="getRoute"
  >

	<v-img
	:lazy-src="article.image_url"
	height="150px"
	width="200px"
	:src="article.image_url"
	class="article-img"
	></v-img>
	<div class="text-block align-center">
		<v-card-title class="article-title pt-2 pl-2 pb-0 pr-2">
			<span class="text-h6 text-white pa-0 content-title">{{article.source_name}}</span>
		</v-card-title>

		<v-card-text class="caption text-white  content-text pa-2 ">
			{{ article.title }}
		</v-card-text>
	</div>


  </v-card>
</template>

<script>

import { Component, Vue, Prop } from 'nuxt-property-decorator'

 @Component({
  
})


export default class NewsPage extends Vue{

  @Prop({type: Object}) article

  getRoute(e) {

			for(let i = 0; i < 10; i++) {
				if (e.path[i].classList.value == 'footer-card-wrapper') {
					this.$router.push(`/news/${e.path[i].id}`)
				}
			}
		}

} 
</script>

<style scoped>
.card {
	overflow: hidden;
	box-sizing: border-box;
}

.article-title {
	word-break: break-word;
}

.article-title span {
	line-height: 1.2;
}

.caption {

overflow: hidden;
	text-overflow: ellipsis;
	   display: -webkit-box;
   -webkit-line-clamp: 2; 
           line-clamp: 2; 
   -webkit-box-orient: vertical;
     max-height: 4.2em;
  line-height: 1.9em;
}

.text-block {
   text-overflow: ellipsis;

}


@media only screen 
and (max-width : 1024px) {
  .card {
	  width: 100% !important;
  }
  .article-img {
	  width: 100% !important;
  }

  .article-title {
	  padding-bottom: 5px;
  }
}

@media only screen 
and (max-width : 700px) {
  .article-img {
	  width: 100% !important;
	  height: 30% !important;
  }


	.caption {

overflow: hidden;
	text-overflow: ellipsis;
	   display: -webkit-box;
   -webkit-line-clamp: 4; 
           line-clamp: 4; 
   -webkit-box-orient: vertical;
     max-height: 4.2em;
  line-height: 1.9em;
}

  .content-text {
	  font-size: 18px !important;
	  line-height: 1.2;
  }

  .content-title {
	  font-size: 20px !important;
  }
}



</style>