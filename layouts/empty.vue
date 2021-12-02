<template>
  <v-app light>
    <notifications-bar>
      <v-main>
        <Nuxt />
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

}
</script>
