<template>
  <v-app light>
    <notifications-bar>
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
import { Vue } from 'nuxt-property-decorator'
import Component from 'nuxt-class-component'

import NotificationsBar from '../components/NotificationBar.vue'


@Component({
  components: {
    NotificationsBar
  }
})

export default class EmptyPage extends Vue {
  pageLoading = true;

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
