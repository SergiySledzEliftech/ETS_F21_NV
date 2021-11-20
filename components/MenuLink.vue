<template>
  <v-list-item 
  class="mb-4"  
  :to="link" 
  color="blue lighten-1">
    <v-icon>{{ icon }}</v-icon>
    <v-icon 
    :class="{'icon-circle-half': true, 'd-none': halfCircleDisplayNoneBool}" 
    x-small>mdi-circle-half</v-icon>
    <v-list-item-content class="mx-4 font-weight-light">
      <v-list-item-title >{{ name }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { Prop, Vue, Watch } from 'nuxt-property-decorator'
import Component from 'nuxt-class-component'

export default @Component({})

class MenuLink extends Vue {
  @Prop({type: String}) icon
  @Prop({type: String}) name
  @Prop({type: String}) link 
  @Prop({type: Boolean}) halfCircleDisplayNone

  halfCircleDisplayNoneBool = true;

  mounted() {
    this.halfCircleDisplayNoneBool = this.halfCircleDisplayNone;
  }

  changeHalfCircleDisplay(val) {
    this.halfCircleDisplayNoneBool = val;
  }
}
</script>

<style scoped>
.icon-circle-half {
  transform: rotate(180deg);
  position: absolute;
  left: -18px;
  box-shadow: inset 0 0 0px 10px #42A5F5,
              0 0 3px 6px #bcdaf3;
  border-radius: 50%;
}
</style>
