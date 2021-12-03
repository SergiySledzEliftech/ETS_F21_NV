<template>
  <v-autocomplete
    :items="itemsList"
    v-model="localValue"
    :label="label"
    :disabled="disabled"
    v-on:change="setStoreValueFunction(localValue)"
  />
</template>

<script>
import { Component, Vue, Prop } from "nuxt-property-decorator";  

@Component({})
export default class Selector extends Vue {
  @Prop({ type: Array }) itemsList
  @Prop({ type: Function }) setStoreValueFunction
  @Prop({ type: String }) label
  @Prop({ type: Boolean }) disabled
  @Prop({ type: String }) defaultValue

  data() {
    return {
      localValue: this.defaultValue
    }
  }

}

</script>
