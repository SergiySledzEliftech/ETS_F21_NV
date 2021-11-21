<template>
  <v-btn 
  class="notification-btn ma-2" 
  small 
  rounded
  :to="link || null"
  @click="onClick || null">
    <v-icon color="white">{{ icon }}</v-icon>
    <p class="font-weight-light white--text pt-3">{{ text }}</p>
  </v-btn>
</template>

<script>
import { Prop, Vue } from 'nuxt-property-decorator'
import Component from 'nuxt-class-component'

export default @Component({})

class GradientRoundedButton extends Vue {
  @Prop({type: String}) icon
  @Prop({type: Function}) onClick
  @Prop({type: String, required: true}) text
  @Prop({type: String}) link

}
</script>

<style scoped>
.notification-btn {
  box-shadow: 0px 4.54988px 30.9392px rgba(186, 19, 88, 0.42);
  background: linear-gradient(136.67deg, #FF409A 8.34%, #F93FA3 17.39%, #F53EA8 22.37%, #EF3EB1 31.88%, #DC3BCC 59.5%, #C438EF 95.26%);
}
</style>
