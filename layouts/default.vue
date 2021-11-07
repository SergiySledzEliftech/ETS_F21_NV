<template>
  <v-app light>
    <v-navigation-drawer v-model="drawer" floating color="rgba(255,242,245, 0.5)" :mini-variant="mini" permanent app>
      <v-list>

        <v-list-item class="px-2 cursor-point" @click.stop="mini = !mini">
          <v-list-item-avatar class="rounded-0">
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

    <v-app-bar app flat color="rgba(0, 0, 0, 0)">
        <v-toolbar-title class="grey--text">
          Title
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
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})

export default class DefautPage extends Vue{
  drawer = true;
  mini = true;
  links = [{name: 'Personal Cabinet', link: '/personalCabinet', icon: 'mdi-file-cabinet'},
           {name: 'Dashboard', link: '/', icon: 'mdi-view-dashboard'},
           {name: 'News and Trends', link: '/news', icon: 'mdi-newspaper'},
           {name: 'Trading page', link: '/trade', icon: 'mdi-swap-horizontal'}
           ];
}
</script>

<style scoped>
.cursor-point {
  cursor: pointer;
}
</style>
