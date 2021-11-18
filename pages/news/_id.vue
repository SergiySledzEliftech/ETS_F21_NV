<template>
  <div>Page for the specific News</div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})

export default class NewsPage extends Vue{
  head() {
    return {
      title: 'News name',
    }
  }
}
</script>