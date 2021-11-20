<template>
  <v-app light>
    <navbar-drawer :links="links" :logout-link="logoutLink" :logo="logo" :drawer="drawer"/>

    <v-app-bar app flat color="rgb(255, 255, 255)">
      <v-app-bar-nav-icon class="d-flex d-sm-none" @click.stop="drawer = !drawer"/>
      <v-toolbar-title class="font-weight-medium text-h4" v-if="this.$vuetify.breakpoint.mdAndUp">
        {{ this.title.split('|')[0] }}
      </v-toolbar-title>

      <v-spacer v-if="!inputSeen || this.$vuetify.breakpoint.mdAndUp"/>

      <v-col cols="8" sm="5" md="3" v-if="inputSeen">
        <v-text-field @blur="inputSeen = !inputSeen" autofocus hide-details single-line/>
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
          <v-img max-width="35" class="avatar" max-height="35" src="https://thispersondoesnotexist.com/image"/>
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
import { Vue, Watch } from 'nuxt-property-decorator'
import Component from 'nuxt-class-component'
import NavbarDrawer from '../components/NavbarDrawer.vue'

export default @Component({
  components: {
    NavbarDrawer
  }
})

class DefautPage extends Vue {
  drawer = false;
  logo = 'mainLogo.png';
  inputSeen = false;
  links = [{name: 'Personal Cabinet', link: '/personalCabinet', icon: 'mdi-file-cabinet'},
           {name: 'Dashboard', link: '/', icon: 'mdi-view-dashboard'},
           {name: 'News and Trends', link: '/news', icon: 'mdi-newspaper'},
           {name: 'Trading page', link: '/trade', icon: 'mdi-swap-horizontal'},
           {name: 'Transaction history', link: '/transactionHistory', icon: 'mdi-chart-timeline-variant'}
           ];
  logoutLink = {name: 'Logout', link: '/login', icon: 'mdi-logout'}
  title = 'Trainder';

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

</style>
