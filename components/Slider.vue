<template>
  <v-slider
    v-model="vModel"
    :thumb-size="24"
    :label="label"
    thumb-color="blue"
    color="gray"
    :max="max"
    :min="min"
    track-color="gray"
    thumb-label="always"
    @mouseup="changeModel"/>
</template>

<script>
import { Prop, Vue, Emit } from 'nuxt-property-decorator'
import Component from 'nuxt-class-component'

export default @Component({})

class Slider extends Vue {
  @Prop({type: String}) label;
  @Prop({type: Number}) min;
  @Prop({type: Number}) max;
  @Prop({type: Number}) model;

  data() {
    return {
      vModel: this.model,
    }
  }

  @Emit('changeModel')
  changeModel() {
    return this.vModel;
  }
}
</script>
