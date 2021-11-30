<template>
  <v-app light>
    <notifications-bar>
      <navbar-drawer 
      :links="links" 
      :logout-link="logoutLink" 
      :logo="logo" 
      :drawer="drawer"
      :title-parts="titleParts"/>

      <toolbar
      :title="title"
      @changeDrawer="drawer = !drawer"
      :avatar-click-link="avatarClickLink"
      :avatar-src="avatarSrc"
      :name="name"/>
      
      <v-main>
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
import Component from 'nuxt-class-component'
import NavbarDrawer from '../components/NavbarDrawer.vue'
import Toolbar from '../components/Toolbar.vue'
import NotificationsBar from '../components/NotificationBar.vue'

export default @Component({
  components: {
    NavbarDrawer,
    Toolbar,
    NotificationsBar
  }
})

class DefautPage extends Vue {
  drawer = false;
  logo = 'mainLogo.png';
  pageLoading = true;
  avatarClickLink = '';
  name = 'Miracle Volkman';
  titleParts = ['Train', 'der'];
  avatarSrc = 'https://thispersondoesnotexist.com/image';
  links = [{name: 'Personal Cabinet', link: '/personalCabinet', icon: 'mdi-file-cabinet'},
           {name: 'Dashboard', link: '/', icon: 'mdi-view-dashboard'},
           {name: 'News and Trends', link: '/news', icon: 'mdi-newspaper'},
           {name: 'Trading page', link: '/trade', icon: 'mdi-swap-horizontal'},
           {name: 'Transaction history', link: '/transactionHistory', icon: 'mdi-chart-timeline-variant'}
           ];
  logoutLink = {name: 'Logout', link: '/login', icon: 'mdi-logout'}
  title = 'Trainder';

  head () {
    let self = this;
    if (process.browser) this.title = document.title;
    return {
      changed ({title}) {
        self.title = title;
      }
    }
  };

  mounted() {
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
