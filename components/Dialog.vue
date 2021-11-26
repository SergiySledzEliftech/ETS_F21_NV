<template>
  <div>
    <v-dialog
      v-model="isOpen" 
      :width="width"
      @click:outside="toggleIsOpen"
      @keydown.esc="toggleIsOpen"
    >
      <template v-slot:activator="{ on, attrs }">
        <Button
          v-bind="attrs"
          v-on="on"
          :text="textOpenButton"
          :onClick="toggleIsOpen"         
          />    
      </template>
      <v-card>        
        <slot></slot>
        <!-- <v-divider></v-divider> -->
      </v-card>
    </v-dialog>
  </div>

      
</template>

<script>
import { Prop, Vue } from 'vue-property-decorator'
import Component, {namespace} from 'nuxt-class-component'

import GradientRoundedButton from '../components/GradientRoundedButton.vue'

const {State: dialogState, Action: dialogAction} = namespace('dialog')

@Component({
  components: {
    Button: GradientRoundedButton
  }
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
