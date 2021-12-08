<template>
  <v-card>
    <v-toolbar
      class="color-pink"
      white
    >
      <v-tabs
        v-model="tabs.tab"
        align-with-title
      >
        <v-tabs-slider 
          color="purple"
        />
        <v-tab
          v-for="(value, key) in tabs.items"
          :key="key"
        >
          <span
            active
            class="
              d-flex
              color-pink"
            >
            <span
              class="d-none 
                d-sm-flex"
            >
              your&nbsp;
            </span>
          {{ key }}
          </span>
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="tabs.tab">
      <v-tab-item
        v-for="(value, key) in tabs.items"
        :key="key"
      >
        <Scroll
          height="326">
          <v-card
          flat
        >
          <v-list>
            <v-list-item 
              v-for="listItem of value" 
              :key="listItem.name"
              class="d-flex justify-space-between"
            >
              <span 
                v-if="listItem.date"
                class="d-flex"
                >
                <span class="d-none
                  d-sm-flex"
                >
                  Date:&nbsp;
                </span>
                {{parseDate(listItem.date)}}
              </span> 
              <span 
                v-if="listItem.name"
                class="mr-auto">
                {{listItem.name}} 
              </span> 
              <span 
                v-else
                >
              </span> 
              <span 
                class="slot"
              >
                <span>{{listItem.currencyName}}</span>
                  <span>{{roundCurrency(listItem.amount)}}</span> 
              </span> 
              <span
                v-if="listItem.spent"
                class="spent"
              >
                <span  
                  class="slot"
                >
                  <span>spent</span>
                  <span>{{roundCurrency(listItem.spent)}}</span>  
                </span> 
              </span>
              <span
                v-if="listItem.bought"
                class="spent"
              >
                bought
              </span>
              <BuyBtn
                v-if="key !== 'history'"
                class="ml-auto"
                textOrIcon="mdi-cart-arrow-down"
                :whatToDo="goTrade"
              />
            </v-list-item>
          </v-list>
          <Button
            v-if="key === 'history'"
            :onClick="getHistory"
            :disabled="disabled"
            text="load more"
            class="d-flex
            ml-auto
            mr-auto"
          />
        </v-card>
        </Scroll>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { Vue, Inject, Prop, Watch } from 'nuxt-property-decorator'
import Component, {namespace} from 'nuxt-class-component'

import NeutralButton from '../components/NeutralButton.vue'
import BuyBtn from '../components/BuyBtn.vue'
import Scroll from '../components/ScrollContainer.vue'

import { serverUrl } from '../utils/config'

const { State, Action } = namespace('user')

export default @Component({
    components:{
      BuyBtn,
      Scroll,
      Button: NeutralButton
    }
  })

class Tabs extends Vue{
@Inject({default: null}) notificationsBar;
@State details
@Action getUser

 


  tabs = {
    tab: null,
    items: {
        history: [],
        currencies: []
    }
  }

  disabled = false

  paramsHistory = {
      currency: 'ALL',
      page: 1,
      limit: 5,
      userId: ''
    }

  mounted() {
    this.getCurrency()
    // this.getHistory()
  }
  // params: {userId: '61926bc6418dbb9a949cdeb1'
  @Watch('details', {deep: true})
  async getCurrency() {
    try {
      this.$axios.setToken(this.$cookies.get('userToken'), 'Bearer')
      this.tabs.items.currencies = await this.$axios.$get(`${serverUrl}/userCurrencies/all`, {params: {userId: this.details._id}})
    } catch (error) {
      this.notificationsBar.consoleError(error.message);
    }
  }

  @Watch('details', {deep: true})
  async getHistory() {
    try {
        this.paramsHistory.userId = this.details._id
        
        this.disabled = true
        this.$axios.setToken(this.$cookies.get('userToken'), 'Bearer')
        const data = await this.$axios.$get(`${serverUrl}/transaction-history`, {params: this.paramsHistory})
        // console.log(data);
        const result = JSON.stringify(data)
        this.tabs.items.history = [...this.tabs.items.history, ...JSON.parse(result).data]
        this.paramsHistory.page = this.paramsHistory.page + 1
    } catch (error) {
      this.notificationsBar.consoleError(error.message);
    } finally {
      this.disabled = false
    }

  }

  roundCurrency(num) {
    if(!num) {
      return 
    }
    return num.toFixed(2)
  }

  parseDate (date) {
    return date.split('T')[0].split('-').reverse().join('.')
  }

  goTrade () {
    this.$router.push("/trade")
  }

}
</script>

<style scoped>
  .slot {
    display: flex;
    justify-content: space-between;
    width: 110px;
  }

  .btn {
    margin-right: 0;
    margin-left: auto;
  }

  .spent {
    margin-left: 10px;
  }

  .color-pink{
    color: rgb(214, 76, 161);
  }
</style>
