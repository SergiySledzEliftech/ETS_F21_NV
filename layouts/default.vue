<template>
  <v-app light>
    <v-navigation-drawer v-model="drawer" floating color="rgb(255,242,245)"
    :mini-variant="mini"
    mini-variant-width="70" width="300" app :permanent="$vuetify.breakpoint.name != 'xs'">
      <v-container>
        <v-list flat>

          <v-list-item class="px-2 cursor-point mb-15" @click.stop="$vuetify.breakpoint.name == 'xs' ? drawer = !drawer : miniScreen = !miniScreen">
            <v-list-item-avatar class="rounded-0">
              <v-img src="mainLogo.png"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="font-weight-light">
                <span class="font-weight-medium" style="display: inline">Train</span>der
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-for="link in links" :key="link.name" :to="link.link" color="blue lighten-1" >
            <v-icon>
            {{ link.icon }}
            </v-icon>
            <v-list-item-content class="mx-4 font-weight-light">
              <v-list-item-title >{{ link.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-navigation-drawer>

    <v-app-bar app flat color="rgba(0, 0, 0, 0)">
      <v-app-bar-nav-icon class="d-flex d-sm-none" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-medium">
        {{ this.title.split('|')[0] }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
      <v-text-field hide-details prepend-icon="mdi-magnify" single-line>
      </v-text-field>
      </v-col>

      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>

      <div>Nickname</div>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { Component, Vue, Watch } from 'nuxt-property-decorator'

@Component({})

export default class DefautPage extends Vue{
  drawer = false;
  miniScreen = true;
  links = [{name: 'Personal Cabinet', link: '/personalCabinet', icon: 'mdi-file-cabinet'},
           {name: 'Dashboard', link: '/', icon: 'mdi-view-dashboard'},
           {name: 'News and Trends', link: '/news', icon: 'mdi-newspaper'},
           {name: 'Trading page', link: '/trade', icon: 'mdi-swap-horizontal'}
           ];
  title = 'Trainder';

  get mini() {
    if (this.$vuetify.breakpoint.name == 'xs') return false;
    else return this.miniScreen;
  }

  // mounted() {
  //   console.log(this.$vuetify.breakpoint.name, this.mini, this.$vuetify.breakpoint.name == 'xs' ? this.mini = false : this.mini);
  // }

  // @Watch('mini')
  // onMiniChange() {
  //   console.log(this.$vuetify.breakpoint.name, this.mini, this.$vuetify.breakpoint.name == 'xs' ? this.mini = false : this.mini);
  // }

  head () {
    let sefl = this
    if (process.browser) this.title = document.title;
    return {
      changed ({title}) {
        sefl.title = title;
      }
    }
  };

}
</script>

<style scoped>
.cursor-point {
  cursor: pointer;
}
</style>
