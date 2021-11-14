<template>
  <div>
    Welcome to your personal cabinet!
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})

export default class PersonalCabinetPage extends Vue{
  head() {
    return {
      title: 'Personal Cabinet',
    }
  }
}
</script>
