<template>
  <v-card
	height="100%"
	max-width="100%"
  :id="article.title.replace(/\s/g,'_')"
  >
    <v-img
      class="white--text align-end"
      height="100%"
	    max-width="100%"
      :src=article.image_url
	  
    >
    <div class="card-title">
      <span>{{ article.title }}</span>
    </div>
      <!-- <v-card-title class="subtitle-1 grey lighten-1 card-title">{{ article.title }}</v-card-title> -->
    </v-img>


  </v-card>
</template>

<script>
  export default {
  data() {
    return {

    }
  },
  props: {
    article: Object
  },
  
	
  }
</script>

<style scoped>
v-card-title {
	background: rgba(189, 189, 189, .7);
}

.card-title {
  font-size: 18px;
  padding: 10px 5px 10px 15px;
background: rgba(97, 97, 97, .8);
}
</style>