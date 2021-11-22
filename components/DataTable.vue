<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :loading="loading"
    :search="search"
    :footer-props="{
      itemsPerPageOptions: [10,20,50,100,500],
    }"
    class="elevation-1"
    multi-sort
    dense
  >
    <template v-if="needSearch" v-slot:top>
      <v-text-field
        v-model="search"
        label="Currencies search"
        class="mx-4"
      ></v-text-field>
    </template>
    <template v-slot:[`item.actions`]>
      <slot></slot>
    </template>
  </v-data-table>
  
</template>

<script>
import { Prop, Vue } from 'vue-property-decorator'
import Component from 'nuxt-class-component'

import BuyBtn from '../components/BuyBtn.vue'

@Component({
  components: {BuyBtn}
  })
export default class DataTable extends Vue {
  // Сюда передаём массив заголовков столбцов (объектов): [{text: *Имя столбца 1*, sortable: *Нужно ли по нему сортировать таблицу*, value: *По этому ID будут присваиваться значения в строках*, align: *Позиционирование текста в ячейке*}, ...]
  @Prop({type: Array, required: true}) headers

  // Сюда передаём массив данных (один объект на строку таблицы): [{*Имя столбца 1: значение столбца 1*, *Имя столбца 2: значение столбца 2*, ...}, ...]
  @Prop({type: Array, required: true}) data

  // Параметр отвечает за фун-ю поиска по таблице, если значение true, то над таблицей появляется строка поиска, которая фильтрует содержимое по имени. При значении false строки поиска не будет
  @Prop({type: Boolean, required: true}) needSearch

  loading = true
  search = ''

  mounted() {
    this.loading = false
  }

  searchMethod (value, search, item) {
    return value != null &&
      search != null &&
      typeof value === 'string' &&
      value.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1
  }
}
</script>