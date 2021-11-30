<template>
  <v-navigation-drawer 
  v-model="drawerBool" 
  floating 
  color="rgb(255,242,245)" 
  :mini-variant="mini"
  mini-variant-width="70" 
  width="300" 
  app 
  :permanent="$vuetify.breakpoint.name != 'xs'">
    <v-container>
      <v-list flat>

        <logo-title 
        :logo="logo" 
        :title-parts="titleParts" 
        @changeDrawerPosition="changeDrawerPosition"/>

        <div>
          <menu-link 
          v-for="(link, key) in links" 
          :key="key" 
          :icon="link.icon" 
          :name="link.name" 
          :link="link.link" 
          :ref="link.link"
          :halfCircleDisplayNone="halfCircleIconsDisplayNone[link.link]"
          @onMenuLinkClick="onMenuLinkClick"/>
        </div>
        
        <div class="logout-item-container">
          <menu-link 
          class="my-4 logout-item" 
          :icon="logoutLink.icon"
          :link="logoutLink.link"
          :name="logoutLink.name"
          :halfCircleDisplayNone="true" />
        </div>
      </v-list>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { Prop, Vue, Watch } from 'nuxt-property-decorator'
import Component from 'nuxt-class-component'
import MenuLink from './MenuLink.vue'
import LogoTitle from './LogoTitle.vue'

export default @Component({
  components: {
    MenuLink,
    LogoTitle
  }
})

class NavbarDrawer extends Vue {
  @Prop({type: Array, required: true}) links
  @Prop({type: String, required: true}) logo 
  @Prop({type: Boolean, required: true}) drawer
  @Prop({type: Object, required: true}) logoutLink
  @Prop({type: Array, required: true}) titleParts

  miniScreen = true;
  halfCircleIconsDisplayNone = {};

  data() {
    return {
      drawerBool: this.drawer 
    }
  }

  changeHalfCircleDisplay(link, val) {
    this.$refs[link][0].changeHalfCircleDisplay(val)
  }

  @Watch('drawer')
  changeDrawerPosition() {
    if (this.$vuetify.breakpoint.name == 'xs') this.drawerBool = !this.drawerBool;
    else this.miniScreen = !this.miniScreen;
  }

  get mini() {
    return (this.$vuetify.breakpoint.name == 'xs')? false : this.miniScreen;
  };

  created() {
    for (let i = 0; i < this.links.length; i++) {
      const link = this.links[i].link;
      this.halfCircleIconsDisplayNone[link] = this.$route.path !== link;
    }
  }

  onMenuLinkClick(link) {
    if (!Object.keys(this.halfCircleIconsDisplayNone).includes(link)) return;
    for (let i in this.halfCircleIconsDisplayNone) {
      this.changeHalfCircleDisplay(i, true);
    }
    this.changeHalfCircleDisplay(link, false);
  }
}
</script>

<style scoped>
.cursor-point {
  cursor: pointer;
}

.v-list-item {
  flex: none;
}

.container {
  height: 100%;
}

.v-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.logout-item-container {
  position: relative;
  height: auto;
  flex-grow: 1;
  min-height: 64px;
}

.logout-item {
  position: absolute;
  bottom: 0;
}
</style>
