<template>
  <v-card>
    <v-toolbar
      color="blue"
      dark
      flat
    >
      <v-tabs
        v-model="tabs.tab"
        align-with-title
      >
        <v-tabs-slider color="purple" />
        <v-tab
          v-for="(value, key) in tabs.items"
          :key="key"
        >
          <span
            class="d-none d-sm-flex">
              your&nbsp;
          </span>
          {{ key }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="tabs.tab">
      <v-tab-item
        v-for="(value, key) in tabs.items"
        :key="key"
      >
        <v-card flat>
          <v-list>
            <v-list-item 
              v-for="listItem of value" 
              :key="listItem.name"
            >
              <span 
                class="mr-auto">
                {{listItem.name}}
              </span> 
              <span>
                {{roundCurrency(listItem.amount)}}
              </span> 
              <v-btn 
                class="
                d-none
                d-sm-flex
                ml-auto">
                buy quickly
              </v-btn>
            </v-list-item>
          </v-list>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { Vue } from 'nuxt-property-decorator'
import Component, {namespace} from 'nuxt-class-component'

export default @Component({})

class Tabs extends Vue{
  tabs = {
    tab: null,
    items: {
        history: ["BTC", "EFR", "TCP"],
        currencies: []
    },
    text: "lorem"
  }

  async mounted() {
    this.tabs.items.currencies = await this.$axios.$get('http://localhost:4000/userCurrencies/currencies/all?userId=61926bc6418dbb9a949cdeb1')
  }

  roundCurrency(num) {
    return Math.round(+num * 100) / 100
  }

}
</script>

<style scoped>
  .btn {
    margin-right: 0;
    margin-left: auto;
  }
</style>
