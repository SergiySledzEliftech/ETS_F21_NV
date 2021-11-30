<template>
  <div v-if="data.length">
    <v-data-table
      :page.sync="page"
      hide-default-footer
      :items-per-page="limit"
      :headers="headers"
      :items="data"
      :loading="loading"
      loading-text="We're loading data for you..."
      :search="search"
      class="elevation-1"
      multi-sort
      dense
      :height="height"
      fixed-header
    >
      <template v-slot:top>
        <v-row>
          <v-col cols="7">
            <v-text-field v-if="needSearch"
              v-model="search"
              label="Currencies search"
              class="mx-4"
            />
          </v-col>
            <v-col cols="1">
              <v-select
              class="mr-10"
                :items="[10,20,50,100,500]"
                v-model="limit"
              />
            </v-col>
            <v-col cols="4">
              <v-pagination
                v-model="page"
                :length="pageCount"
                :total-visible="6"
              />
            </v-col>
        </v-row>
      </template>
      <template v-slot:[`item.actions`]>
        <slot></slot>
      </template>
    </v-data-table>
  </div>
  
</template>

<script>
import { Prop, Vue, Watch } from 'vue-property-decorator'
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
  @Prop({type: Number | String, default: "auto"}) height

  loading = true
  search = ''
  page = 1
  limit = 10
  pageCount = 0

  mounted() {
    this.loading = false
  }

  @Watch("data")
  @Watch("limit")
  calculatePages() {
    this.pageCount = Math.ceil(this.data.length / this.limit)
  }

  searchMethod (value, search) {
    return value != null &&
      search != null &&
      typeof value === 'string' &&
      value.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1
  }
}
</script>