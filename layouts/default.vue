<template>
  <v-app light>
    <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" app>
      <v-list>

        <v-list-item class="px-2" @click.stop="mini = !mini">
          <v-list-item-avatar class="rounded-0" >
            <v-img src="mainLogo.png"></v-img>
          </v-list-item-avatar>
          <v-list-item-content class="mx-4">
            <v-list-item-title >Trainder</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-for="link in links" :key="link.name" :to="link.link">
          <v-icon>
          {{ link.icon }}
          </v-icon>
          <v-list-item-content class="mx-4">
            <v-list-item-title >{{ link.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})

export default class DefautPage extends Vue{
  drawer = true;
  mini = true;
  links = [{name: 'Personal Cabinet', link: '/personalCabinet', icon: 'mdi-file-cabinet'},
           {name: 'Dashboard', link: '/', icon: 'mdi-view-dashboard'},
           {name: 'News and Trends', link: '/news', icon: 'mdi-newspaper'},
           {name: 'Trading page', link: '/trade', icon: 'mdi-swap-horizontal'},
           {name: 'Login', link: '/login', icon: 'mdi-login'}
           ];
}
</script>
