<template>
  <div style="">
    <v-container
      fluid
      v-if="currencies.length"
    >
      <div class="finder">
      </div>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          class="d-flex justify-space-around"
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
              <v-btn
                text
              >
                See more / sell
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <CurrencyPurchaseModal
        :userId="userId"
      />
      <v-btn
        class="buy-button"
        @click="setModal(true)"
        absolute
      >
        Buy currency
      </v-btn>
    </v-container>
    <div
      v-else
      class="buy-suggestion"
    >
      <h2>You don't have any currencies yet</h2>
      <v-btn>Buy some</v-btn>
    </div>
  </div>
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
.buy-button {
  bottom: 20px;
  right: 20px;
}

.card {
  width: 300px;
}

.card .actions {
  justify-content: space-between;
}

.buy-suggestion {
  margin-left: 20px;
}

</style>