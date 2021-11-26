<template>
  <div>
    <v-dialog
      v-model="isOpen" 
      :width="width"
      @click:outside="toggleIsOpen"
      @keydown.esc="toggleIsOpen"
    >
      <template v-slot:activator="{ on, attrs }">
        <!-- <buy-btn 
          :textOrIcon="textOpenButton" 
          :whatToDo="toggleIsOpen"
        /> -->
        <v-btn
          color="purple lighten-1"
          dark
          v-bind="attrs"
          v-on="on"
          @click="toggleIsOpen"
          
          >
          {{ textOpenButton }}
          </v-btn>        
      </template>

      <v-card>
        
        <slot></slot>

        <v-divider></v-divider>

        <!-- <v-card-actions>
          <v-spacer></v-spacer>

        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </div>

      
</template>

<script>
import { Prop, Vue } from 'vue-property-decorator'
import Component, {namespace} from 'nuxt-class-component'

import BuyBtn from './BuyBtn.vue'

const {State: dialogState, Action: dialogAction} = namespace('dialog')

@Component({
  components: {BuyBtn}
})
export default class Dialog extends Vue {
  @Prop({type: String, required: true}) textOpenButton
  @Prop({type: String, required: true}) textCloseButton
  @Prop({type: String, required: true}) width
  @Prop({}) Template 
  @dialogState isOpen
  @dialogAction toggleIsOpen
  dialog = false
}
</script>
