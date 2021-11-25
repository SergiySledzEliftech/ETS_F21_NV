<template>
    <v-btn 
        icon 
        @click="whatToDo"
        >
          <v-icon>{{textOrIcon}}</v-icon>
      </v-btn>
</template>

<script>
import { Prop, Vue } from 'vue-property-decorator'
import Component from 'nuxt-class-component'

@Component({})
export default class BuyBtn extends Vue {
  @Prop({type: String, required: true}) textOrIcon // Текст или иконка для отображения внутри кнопки
  @Prop({type: Function, required: true}) whatToDo // Функция, которая сработает при клике на кнопку
}
</script>