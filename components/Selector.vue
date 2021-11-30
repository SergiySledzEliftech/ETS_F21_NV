<template>
  <v-autocomplete
    :items="itemsList"
    v-model="localValue"
    v-on:change="setStoreValueFunction(localValue)"
  />
</template>

<script>
import { Component, Vue, Prop } from "nuxt-property-decorator";  

@Component({})
export default class Selector extends Vue {
  @Prop({ type: Array }) itemsList
  @Prop({ type: Function }) setStoreValueFunction

  localValue = null
}

</script>
