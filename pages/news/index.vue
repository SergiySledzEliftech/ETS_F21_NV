<template>
  <div>
    <p>Welcome to news!</p>
    <v-btn :to="{name: 'news-id', params: {id: 1}}">Go to news with id equal to 1</v-btn>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class NewsPage extends Vue{

}
</script>
