<template>
  <v-btn
  outlined
  class="ma-2"
  :loading="loading"
  :type="type"
  x-large
  @click="click"
  :color="color">
    {{ text }}
  </v-btn>
</template>

<script>
import { Prop, Vue, Watch, Emit } from 'nuxt-property-decorator'
import Component from 'nuxt-class-component'

export default @Component({})

class NeutralButton extends Vue {
  @Prop({type: String, required: true}) text;
  @Prop({type: String, default: 'primary'}) color;
  @Prop({type: Function, required: true}) onClick;
  @Prop({type: String}) type;
  @Prop({type: Boolean, default: false}) loading;
}
</script>

<style scoped>

</style>
