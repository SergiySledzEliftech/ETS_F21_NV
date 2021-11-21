<template>
  <v-app-bar 
  app 
  flat 
  color="rgb(255, 255, 255)">
    <v-app-bar-nav-icon 
    class="d-flex d-sm-none" 
    @click.stop="changeDrawer"/>

    <v-toolbar-title 
    class="font-weight-medium text-h4" 
    v-if="this.$vuetify.breakpoint.mdAndUp">
      {{ titleStr }}
    </v-toolbar-title>

    <v-spacer 
    v-if="styleInputSeen"/>

    <v-col 
    cols="8" 
    sm="5" 
    md="3" 
    v-if="inputSeen">
      <v-text-field 
      @blur="inputSeen = !inputSeen" 
      autofocus 
      hide-details 
      single-line/>
    </v-col>

    <v-btn 
    @click="inputSeen = !inputSeen"
    icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <div :style="styleXSScreen">
      <gradient-rounded-button
      v-if="styleInputSeen"
      icon="mdi-bell"
      text="12"/>
    </div>
    
    <div :style="styleXSScreen">
      <avatar-icon
      v-if="styleInputSeen"
      :link="avatarClickLink"
      :image-link="avatarSrc"
      :measurements="35"/>
    </div>

    <div 
    :style="styleXSScreen" 
    v-if="this.$vuetify.breakpoint.smAndUp && styleInputSeen" 
    class="font-weight-light">{{ name }}</div>
  </v-app-bar>
</template>

<script>
import { Prop, Vue } from 'nuxt-property-decorator'
import Component from 'nuxt-class-component'
import { Emit } from 'vue-property-decorator'
import AvatarIcon from './AvatarIcon.vue'
import GradientRoundedButton from './GradientRoundedButton.vue'

export default @Component({
  components: {
    AvatarIcon,
    GradientRoundedButton
  }
})

class Toolbar extends Vue {
  @Prop({type: String, required: true}) title
  @Prop({type: String, required: true}) avatarClickLink
  @Prop({type: String, required: true}) avatarSrc
  @Prop({type: String, required: true}) name

  data() {
    return {
      titleStr: this.title.split('|')[0],
    }
  }

  inputSeen = false;
  get styleInputSeen() {
    return !this.inputSeen || this.$vuetify.breakpoint.mdAndUp;
  } 

  get styleXSScreen() {
    return [this.$vuetify.breakpoint.xsOnly ? {'margin': '0'} : {'margin': '0 10px'}];
  }

  @Emit('changeDrawer')
  changeDrawer() {}
}
</script>
  
<style scoped>
</style>
