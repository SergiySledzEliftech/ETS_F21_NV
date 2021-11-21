<template>
  <v-list-item 
  class="px-2 cursor-point mb-15"
  @click.stop="changeDrawerPosition" >
    <v-list-item-avatar class="rounded-0">
      <v-img :src="logo"/>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="font-weight-light">
        <span class="header-span font-weight-medium">{{ titleParts[0] }}</span>{{ titleParts[1] }}
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { Prop, Vue } from 'nuxt-property-decorator'
import Component from 'nuxt-class-component'
import { Emit } from 'vue-property-decorator'

export default @Component({})

class AvatarTitle extends Vue {
  @Prop({type: String, required: true}) logo;
  @Prop({type: Array, required: true}) titleParts;

  @Emit('changeDrawerPosition')
  changeDrawerPosition() {}
}
</script>

<style scoped>
.header-span {
  display: inline
}
</style>
