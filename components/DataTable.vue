<template>
  <div v-if="data.length" class="elevation-0">
    <v-data-table
      :page.sync="page"
      hide-default-footer
      :items-per-page="limit"
      :headers="headers"
      :items="data"
      :loading="loading"
      loading-text="We're loading data for you..."
      :search="search"
      class="elevation-0 data-table-class"
      multi-sort
      dense
      @update:page="onPageChange"
      @update:items-per-page="onItemsPerPageChange"
      :height="height"
      fixed-header
      :server-items-length="numberOfPages"
    >
      <template v-slot:top>
        <v-row class="my-5 d-flex justify-center align-items-center">
          <v-col cols="9" sm="10" md="4" lg="7" xl="8" class="d-flex align-center justify-center pa-0">
            <v-text-field v-if="needSearch"
              v-model="search"
              label="Currencies search"
              class="ma-0 mr-4 pa-0"
              :color="color"
            />
          </v-col>
            <v-col cols="3" sm="2" md="2" lg="1" class="d-flex align-center justify-center pa-0">
              <v-select
                :items="[10,20,50,100,500]"
                v-model="limit"
                class="ma-0 pa-0"
                :color="color"
                :item-color="color"
              />
            </v-col>
            <v-col cols="12" md="6" lg="4" xl="3" class="d-flex align-center justify-center pa-sm-0 pb-5">
              <v-pagination
                :color="color"
                class="mb-sm-12 my-md-auto"
                v-model="page"
                :disabled="loading"
                :length="numberOfPages || pageCount"
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
import { Prop, Vue, Watch, Emit } from 'vue-property-decorator'
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
  
  @Prop({type: Number}) numberOfPages;
  @Prop({type: Number, default: 10}) limitNumber;
  @Prop({type: Number, default: 1}) pageNumber;
  @Prop({type: String, default: 'primary'}) color;

  loading = true
  search = ''
  pageCount = 0

  data() {
    return {
      limit: this.limitNumber,
      page: this.pageNumber
    }
  }

  mounted() {
    this.loading = false
  }

  @Emit('onLimitChange')
  onItemsPerPageChange() {
    if (!this.numberOfPages) return;
    this.page = 1; 
    return this.limit;
  }

  @Emit('onPageChange')
  onPageChange() {
    return this.page;
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

<style>
.data-table-class {
  padding: 0 4px 0 10px;
}

.v-data-table__wrapper::-webkit-scrollbar {
    width: 24px;
    height: 8px;
    background-color: #143861;
    color: pink;
}

.v-data-table__wrapper::-webkit-scrollbar{
	width: 6px;
	background-color: #F5F5F5;
}

.v-data-table__wrapper::-webkit-scrollbar-thumb {
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: rgb(190, 43, 141);
}

.v-data-table__wrapper::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

.v-input__slot {
  margin: 0;
}

.v-text-field__details {
  position: absolute;
}

</style>