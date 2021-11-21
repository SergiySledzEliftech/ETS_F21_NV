<template>
  <div>
    <v-dialog
      v-model="isOpen" 
      :width="width"
    >
      <template v-slot:activator="{ on, attrs }">
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

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="toggleIsOpen"
          >
            {{textCloseButton}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

      
</template>

<script>
import { Prop, Vue } from 'vue-property-decorator'
import Component, {namespace} from 'nuxt-class-component'

const {State: dialogState, Action: dialogAction} = namespace('dialog')

@Component({
  components: {}
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
