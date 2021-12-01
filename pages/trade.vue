<template>
  <v-container
    :fluid="fluid"
  >
    <div class="finder">

    </div>
    <v-row
      v-if="currencies.length"
    >
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="currency in currencies"
        v-bind:key="currency.name"
      >
        <v-card
          class="card"
        >
          <v-card-title>
            {{ currency.name }}
          </v-card-title>
          <v-card-text>
            Amount: {{ currency.amount }}
          </v-card-text>
          <v-card-text>
            Updated at: {{ parseDate(new Date(currency.updatedAt)) }}
          </v-card-text>
          <v-card-actions class="actions d-flex">
            <v-btn>Buy more</v-btn>
            <v-btn>Sell</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <div
      v-else
      class="buy-suggestion d-flex"
    >
      <h2>You don't have any currencies yet</h2>
      <v-btn>Buy some</v-btn>
    </div>
    
    <CurrencyPurchaseModal
      :userId="userId"
    />

    <v-btn
      @click="setModal(true)"
    >
      Buy currency
    </v-btn>
  </v-container>
</template>

<script>
import { Component, Vue, namespace } from 'nuxt-property-decorator';
import CurrencyPurchaseModal from '~/components/CurrencyPurchaseModal.vue';
const { State, Action } = namespace('userCurrencies');
const { State: ModalState, Action: ModalAction } = namespace('purchaseModal');

@Component({
  components: {
    CurrencyPurchaseModal
  },
})

export default class TradePage extends Vue {
  @State currencies
  @Action fetchUserCurrencies

  @ModalAction setModal

  head() {
    return {
      title: 'Trade',
    }
  }

  dialog = false
  userId = '61926bc6418dbb9a949cdeb1'
  fluid = true

  async mounted () {
    this.fetchUserCurrencies({
      userId: this.userId
    });
  }

  parseDate (date) {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }
  
}
</script>

<style>

.currencies .card {
  width: 350px;
  margin: 10px 30px
}

.card .actions {
  justify-content: space-between;
}

.buy-suggestion {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

</style>