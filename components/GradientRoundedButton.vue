<template>
  <v-btn 
  class="notification-btn px-8 py-1 d-flex justify-center align-center" 
  small 
  rounded
  height="35px"
  :loading="loading"
  :type="type"
  @click="click"
  dark>
    <v-icon v-if="icon" color="white">{{ icon }}</v-icon>
    <span class="font-weight-medium white--text">{{ text }}</span>
  </v-btn>
</template>

<script>
import { Prop, Vue, Watch, Emit } from 'nuxt-property-decorator'
import Component from 'nuxt-class-component'

export default @Component({})

class GradientRoundedButton extends Vue {
  @Prop({type: String}) icon;
  @Prop({type: Function, required: true}) onClick;
  @Prop({type: String, required: true}) text;
  @Prop({type: String}) type;
  @Prop({type: Boolean, default: false}) loading;
}
</script>

<style scoped>
.notification-btn {
  box-shadow: 0px 4.54988px 30.9392px rgba(186, 19, 88, 0.42);
  background: linear-gradient(136.67deg, #fa4d9e 8.34%, #F93FA3 17.39%, #F53EA8 22.37%, #EF3EB1 31.88%, #DC3BCC 59.5%, #C438EF 95.26%);
  text-align: center;
}

</style>
