<template>
  <v-slider
    v-model="vModel"
    :thumb-size="24"
    :label="label"
    thumb-color="primary"
    color="gray"
    inverse-label
    :max="max"
    :min="min"
    track-color="gray"
    thumb-label="always"
    :disabled="disabled"
    @mouseup="changeModel"
    light/>
</template>

<script>
import { Prop, Vue, Emit } from 'nuxt-property-decorator'
import Component from 'nuxt-class-component'

export default @Component({})

class Slider extends Vue {
  @Prop({type: String}) label;
  @Prop({type: Number}) min;
  @Prop({type: Number}) max;
  @Prop({type: Number, required: true}) model;
  @Prop({type: Boolean}) disabled;

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
