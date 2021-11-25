<template>
  <v-btn 
  :to="link || null" 
  min-width="0" 
  :max-width="measurements"
  text>
    <v-img 
    :max-width="measurements" 
    class="avatar rounded-lg" 
    :max-height="measurements" 
    :src="imageLink"/>
  </v-btn>
</template>

<script>
import { Prop, Vue } from 'nuxt-property-decorator'
import Component from 'nuxt-class-component'

export default @Component({})

class AvatarIcon extends Vue {
  @Prop({type: String}) link
  @Prop({type: String, required: true}) imageLink
  @Prop({type: Number, required: true}) measurements
}
</script>

<style scoped>
.avatar {
  border-radius: 5px;
}
</style>
