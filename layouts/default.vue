<template>
  <v-app light>
    <v-navigation-drawer v-model="drawer" floating color="rgb(255,242,245)" :mini-variant="mini"
    mini-variant-width="70" width="300" app :permanent="$vuetify.breakpoint.name != 'xs'">
      <v-container>
        <v-list flat>

          <v-list-item class="px-2 cursor-point mb-15" 
          @click.stop="$vuetify.breakpoint.name == 'xs' ? drawer = !drawer : miniScreen = !miniScreen">
            <v-list-item-avatar class="rounded-0">
              <v-img src="mainLogo.png"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="font-weight-light">
                <span class="header-span font-weight-medium">Train</span>der
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <div>
            <v-list-item class="mb-4" v-for="(link, key) in links" :key="key" 
            :to="link.link" color="blue lighten-1">
              <v-icon>{{ link.icon }}</v-icon>
              <v-icon :class="{'icon-circle-half': true, 'd-none': halfCircleIconsDisplayNone[link.link]}" x-small>mdi-circle-half</v-icon>
              <v-list-item-content class="mx-4 font-weight-light">
                <v-list-item-title >{{ link.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          
          <div class="logout-item-container">
            <v-list-item class="my-4 logout-item" to="/login" color="blue lighten-1">
              <v-icon>mdi-logout</v-icon>
              <v-list-item-content class="mx-4 font-weight-light">
                <v-list-item-title >Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list>
      </v-container>
    </v-navigation-drawer>

    <v-app-bar app flat color="rgba(0, 0, 0, 0)">
      <v-app-bar-nav-icon class="d-flex d-sm-none" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-medium text-h4" v-if="this.$vuetify.breakpoint.mdAndUp">
        {{ this.title.split('|')[0] }}
      </v-toolbar-title>

      <v-spacer v-if="!inputSeen || this.$vuetify.breakpoint.mdAndUp"></v-spacer>

      <v-col cols="8" sm="5" md="3" v-if="inputSeen">
        <v-text-field @blur="inputSeen = !inputSeen" autofocus hide-details single-line></v-text-field>
      </v-col>

      <v-btn @click="inputSeen = !inputSeen" icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <div :style="[this.$vuetify.breakpoint.xsOnly ? {'margin': '0'} : {'margin': '0 10px'}]">
        <v-btn class="notification-btn ma-2" v-if="!inputSeen || this.$vuetify.breakpoint.mdAndUp" small rounded>
          <v-icon color="white">mdi-bell</v-icon>
          <p class="font-weight-light white--text pt-3">12</p>
        </v-btn>
      </div>
      
      <div :style="[this.$vuetify.breakpoint.xsOnly ? {'margin': '0'} : {'margin': '0 10px'}]">
        <v-btn to="/" v-if="!inputSeen || this.$vuetify.breakpoint.mdAndUp" min-width="0" max-width="35" text>
          <v-img max-width="35" class="avatar" max-height="35" src="https://thispersondoesnotexist.com/image"></v-img>
        </v-btn>
      </div>

      <div :style="[this.$vuetify.breakpoint.xsOnly ? {'margin': '0'} : {'margin': '0 10px'}]" v-if="this.$vuetify.breakpoint.smAndUp && (!inputSeen || this.$vuetify.breakpoint.mdAndUp)" class="font-weight-light">Miracle Volkman</div>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { Component, Vue, Watch } from 'nuxt-property-decorator'

@Component
export default class DefautPage extends Vue{
  drawer = false;
  miniScreen = true;
  halfCircleIconsDisplayNone = {};
  inputSeen = false;
  links = [{name: 'Personal Cabinet', link: '/personalCabinet', icon: 'mdi-file-cabinet'},
           {name: 'Dashboard', link: '/', icon: 'mdi-view-dashboard'},
           {name: 'News and Trends', link: '/news', icon: 'mdi-newspaper'},
           {name: 'Trading page', link: '/trade', icon: 'mdi-swap-horizontal'}
           ];
  title = 'Trainder';

  created() {
    for (let i = 0; i < this.links.length; i++) {
      const link = this.links[i].link;
      if (this.$route.path == link) this.halfCircleIconsDisplayNone[link] = false;
      else this.halfCircleIconsDisplayNone[link] = true;
    }
  }

  get mini() {
    if (this.$vuetify.breakpoint.name == 'xs') return false;
    else return this.miniScreen;
  };
  
  head () {
    let sefl = this
    if (process.browser) this.title = document.title;
    return {
      changed ({title}) {
        sefl.title = title;
      }
    }
  };

  @Watch('$route')
  onRouteChange() {
    console.log(this.$route);
    const link = '/' + this.$route.path.split('/')[1];
    if (!Object.keys(this.halfCircleIconsDisplayNone).includes(link)) return;
    for (let i in this.halfCircleIconsDisplayNone) {
      this.halfCircleIconsDisplayNone[i] = true;
    }
    this.halfCircleIconsDisplayNone[link] = false;
  }

}
</script>

<style scoped>
.cursor-point {
  cursor: pointer;
}

.icon-circle-half {
  transform: rotate(180deg);
  position: absolute;
  left: -18px;
  box-shadow: inset 0 0 0px 10px #42A5F5,
              0 0 3px 6px #bcdaf3;
  border-radius: 50%;
}

.avatar {
  border-radius: 5px;
}

.notification-btn {
  box-shadow: 0px 4.54988px 30.9392px rgba(186, 19, 88, 0.42);
  background: linear-gradient(136.67deg, #FF409A 8.34%, #F93FA3 17.39%, #F53EA8 22.37%, #EF3EB1 31.88%, #DC3BCC 59.5%, #C438EF 95.26%);
}

.header-span {
  display: inline
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
}

.logout-item {
  position: absolute;
  bottom: 0;
}

</style>
