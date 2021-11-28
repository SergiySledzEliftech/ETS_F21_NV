<template>
  <v-pagination 
  v-model="page" 
  :length="pageCount" 
  @input="next"
  elevation="0"
  :total-visible="5"
  :disabled="disabled"
  class="my-2 pagination-start"/>
</template>

<script>
import { Prop, Vue, Emit } from 'nuxt-property-decorator'
import Component from 'nuxt-class-component'

export default @Component({})
class Pagination extends Vue {
  @Prop({type: Number, required: true}) model;
  @Prop({type: Number, required: true}) pageCount;
  @Prop({type: Function}) input;
  @Prop({type: Boolean}) disabled;

  data() {
    return {
      page: this.model,
    }
  }

  @Emit('onPageChange') 
  next(page) {
    return this.page;
  }

}
</script>

<style scoped>
nav.pagination-start > :nth-child(1) {
  justify-content: flex-start;
}
</style>
