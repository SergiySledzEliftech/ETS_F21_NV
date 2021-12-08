<template>
  <v-app light style="fill-height">
    <notifications-bar> 
      <navbar-drawer 
      :links="links" 
      :logout-link="logoutLink" 
      :logo="logo" 
      :drawer="drawer"
      :title-parts="titleParts"
      :onLogoutClick="logout"/>

      <toolbar
      :title="title"
      @changeDrawer="drawer = !drawer"
      :name="name"/>
      
      <v-main
        style="height: 100%"
      >
        <div class="v-progress-holder">
          <v-progress-circular
          v-show="pageLoading"
          :size="50"
          color="primary"
          indeterminate/>
        </div>
        <Nuxt v-if="!pageLoading"/>
      </v-main>
    </notifications-bar>
  </v-app>
</template>

<script>
import { Vue, Watch } from 'nuxt-property-decorator'
import Component, {namespace} from 'nuxt-class-component'

import NavbarDrawer from '../components/NavbarDrawer.vue'
import Toolbar from '../components/Toolbar.vue'
import NotificationsBar from '../components/NotificationBar.vue'

import headLayoutMixin from '~/helpers/mixins/headLayoutMixin'

const {State, Action} = namespace('user')

@Component({
  components: {
    NavbarDrawer,
    Toolbar,
    NotificationsBar
  },
  mixins: [headLayoutMixin]
})

export default class DefautPage extends Vue {
  @State details;
  @Action getUser; 
  @Action logout; 
  @Action refreshToken; 

  drawer = false;
  logo = '/mainLogo.png';
  pageLoading = true;
  name = '';

  titleParts = ['Train', 'der'];
  links = [{name: 'Personal Cabinet', link: '/personalCabinet', icon: 'mdi-file-cabinet'},
           {name: 'Dashboard', link: '/', icon: 'mdi-view-dashboard'},
           {name: 'News and Trends', link: '/news', icon: 'mdi-newspaper'},
           {name: 'Trading page', link: '/trade', icon: 'mdi-swap-horizontal'},
           {name: 'Transaction history', link: '/transactionHistory', icon: 'mdi-chart-timeline-variant'}
           ];
  logoutLink = {name: 'Logout', link: '/login', icon: 'mdi-logout'}
  title = 'Trainder';

  async mounted() {
    try {
      await this.getUser();
      this.name = this.details.nickname;
    } catch (err) {
      this.NotificationsBar.consoleError(err.message);
    }
    this.pageLoading = false;    
  }
  
}
</script>

<style scoped>
div.v-progress-holder {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
