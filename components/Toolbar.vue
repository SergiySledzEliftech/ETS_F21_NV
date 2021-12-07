<template>
  <v-app-bar 
  app 
  flat 
  color="rgb(255, 255, 255)"
  style="padding-top:4px">
    <v-app-bar-nav-icon 
    class="d-flex d-sm-none" 
    @click.stop="changeDrawer"/>

    <v-toolbar-title 
    class="font-weight-medium text-h4" 
    v-if="this.$vuetify.breakpoint.mdAndUp">
      {{ title }}
    </v-toolbar-title>

    <v-spacer/>
    
    <div>
      <avatar
      size="small-size"/>
    </div>

    <div 
    style="margin: 0 10px" 
    class="font-weight-light">{{ name }}</div>
  </v-app-bar>
</template>

<script>
import { Prop, Vue } from 'nuxt-property-decorator'
import Component from 'nuxt-class-component'
import { Emit } from 'vue-property-decorator'
import Avatar from './Avatar.vue'

@Component({
  components: {
    Avatar
  }
})

export default class Toolbar extends Vue {
  @Prop({type: String, required: true}) title
  @Prop({type: String, required: true}) name

  @Emit('changeDrawer')
  changeDrawer() {}
}
</script>
  
<style scoped>
</style>
