<template>
    <v-list-item class="small">
        <v-row class="d-flex justify-space-around" no-gutters>
            <v-col cols="12" sm="6" class="rounded-lg">
                <v-card class="pa-2 d-flex align-center justify-center" outlined tile>
                Currency: {{title}}
                </v-card>
            </v-col>
            <v-col cols="12" sm="2" class="rounded-lg">
                <v-card class="pa-2 d-flex align-center justify-center">
                Course: {{Math.round(rate*1000)/1000}}
                </v-card>
            </v-col>
            <v-col cols="12" sm="2" class="rounded-lg">
                <v-card class="pa-2 d-flex align-center justify-center">
                Dynamic: {{Math.round(change*1000)/1000}}
                </v-card>
            </v-col>
            <v-col cols="12" sm="1" class="rounded-lg">
                <v-icon v-if="!favorite" color="grey lighten-1" class="pa-2 d-flex align-center justify-center">
                  mdi-star-outline
                </v-icon>

                <v-icon v-else color="yellow darken-3" class="pa-2 d-flex align-center justify-center">
                  mdi-star
                </v-icon>
            </v-col>
            <v-col cols="12" sm="1" class="rounded-lg">
                <v-btn icon class="pa-2 d-flex align-center justify-center">
                    <v-icon>Purchase mdi-cart-arrow-down</v-icon>
                </v-btn>
            </v-col>
        </v-row>    
    </v-list-item>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  props: {
      title: {
          type: String
      },
      rate: {
          type: Number
      }, 
      change: {
          type: Number
      }, 
      favorite: {
          type: Boolean
      }
  },
})
export default class ListItem extends Vue {
}
</script>
