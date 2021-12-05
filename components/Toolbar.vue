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

    <v-spacer/>
    
    <div>
      <avatar
      size="small-size"/>
    </div>

    <div 
    :style="styleXSScreen" 
    class="font-weight-light">{{ name }}</div>
  </v-app-bar>
</template>

<script>
import { Prop, Vue } from 'nuxt-property-decorator'
import Component from 'nuxt-class-component'
import { Emit, Watch } from 'vue-property-decorator'
import Avatar from './Avatar.vue'
import GradientRoundedButton from './GradientRoundedButton.vue'

@Component({
  components: {
    Avatar,
    GradientRoundedButton
  }
})

export default class Toolbar extends Vue {
  @Prop({type: String, required: true}) title
  @Prop({type: String, required: true}) name

  data() {
    return {
      titleStr: this.title.split('|')[0],
    }
  }

  @Watch('title')
  onTitleChange() {
    this.titleStr = this.title.split('|')[0];
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
