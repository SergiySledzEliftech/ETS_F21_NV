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
              class="d-flex justify-between"
            >
              <span 
                v-if="listItem.date"
                class="mr-auto">
                Date: {{parseDate(listItem.date)}}
              </span> 
              <span 
                v-if="listItem.name"
                class="mr-auto">
                {{listItem.name}}
              </span> 
              <span 
                v-else
                class="mr-auto">
                {{listItem.currencyName}}
              </span> 
              <span>
                {{roundCurrency(listItem.amount)}}
              </span> 
              <span
                v-if="listItem.spent"
                class="spent"
              >
                spent
              </span>
              <span
                v-if="listItem.bought"
                class="spent"
              >
                bought
              </span>
              <v-btn 
                v-if="key !== 'history'"
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
        history: [],
        currencies: []
    },
    text: "lorem"
  }

  async mounted() {
    this.tabs.items.currencies = await this.$axios.$get('http://localhost:4000/userCurrencies/currencies/all?userId=61926bc6418dbb9a949cdeb1')
    const data = await this.$axios.$get('http://localhost:4000/transaction-history?currency=ALL&page=1&limit=5&userId=61926bc6418dbb9a949cdeb1')
    const result = JSON.stringify(data)
    this.tabs.items.history = JSON.parse(result).data
  }

  roundCurrency(num) {
    return num.toFixed(2)
  }

  parseDate (date) {
    return date.split('T')[0].split('-').reverse().join('.')
  }

}
</script>

<style scoped>
  .btn {
    margin-right: 0;
    margin-left: auto;
  }

  .spent {
    margin-left: 10px;
  }
</style>
