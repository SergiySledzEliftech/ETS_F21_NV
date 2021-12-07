<template>
  <div class="v-progress-holder">
    <v-progress-circular
    v-show="loading"
    :size="50"
    color="primary"
    indeterminate/>
  </div>
</template>

<script>
import { Vue, Prop } from 'nuxt-property-decorator'

import Component from 'nuxt-class-component'

Component({})
export default class PageLoader extends Vue{
  @Prop({type: Boolean, required: true}) loading
}

</script>

<style scoped>
div.v-progress-holder {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
