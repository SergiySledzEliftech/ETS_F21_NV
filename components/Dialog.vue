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
        <slot toggleIsOpen="toggleIsOpen"></slot>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { Prop, Vue } from 'vue-property-decorator'
import Component, {namespace} from 'nuxt-class-component'

import GradientRoundedButton from '../components/GradientRoundedButton.vue'

const {State, Action} = namespace('dialog')

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
  @State isOpen
  @Action toggleIsOpen
  dialog = false
}
</script>
