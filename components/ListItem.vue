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
                Course: {{rate | getFourDecimal}}
                </v-card>
            </v-col>
            <v-col cols="12" sm="2" class="rounded-lg">
                <v-card class="pa-2 d-flex align-center justify-center">
                Dynamic: {{change | getPercents}}
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
import { Prop, Vue } from 'vue-property-decorator'
import Component from 'nuxt-class-component'

@Component({
    filters: {
        getFourDecimal (val) {
            return val && Math.round(val*10000)/10000 + " EUR"
        },
        getPercents (val) {
            return val && Math.round(val*10000)/100 + "%"
        }
    }
})
export default class ListItem extends Vue {
    @Prop({type: String}) title
    @Prop({type: Number}) rate
    @Prop({type: Number}) change
    @Prop({type: Boolean}) favorite
}
</script>
