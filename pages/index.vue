<template>
  <div>
    Welcome to dashboard!
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})

export default class DashboardPage extends Vue{
  head() {
    return {
      title: 'Dashboard',
    }
  }
}
</script>
