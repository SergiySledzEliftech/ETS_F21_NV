<template>
  <div class="trade-wrapper">
    <div class="finder">

    </div>
    <div
      class="currencies d-flex"
      v-if="currencies.length"
    >
      <v-card
        v-for="currency in currencies"
        v-bind:key="currency.name"
        class="card"
      >
        <v-card-title>
          {{ currency.name }}
        </v-card-title>
        <v-card-text>
          Amount: {{ currency.amount }}
        </v-card-text>
        <v-card-text>
          Purchase date: {{ currency.purchaseDate }}
        </v-card-text>
        <v-card-actions class="actions d-flex">
          <v-btn>Buy more</v-btn>
          <v-btn>Sell</v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div
      v-else-if="currencies && !currencies.length"
      class="buy-suggestion d-flex"
    >
      <h2>You don't have any currencies yet</h2>
      <br>
      <v-btn>Buy some</v-btn>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';

@Component({})

export default class TradePage extends Vue {
  data() {
    return {
      userId: '1',
      currencies: [],
    }
  }

  async fetchCurrencies (userId) {
    try {
      const response = await this.$axios
        .$get('http://localhost:4000/userCurrencies', {
          params: {
            userId: this.userId,
          }
        });
      this.currencies = response;
    } catch(error) {
      console.log(error);
    }
  }
  mounted() {
    this.fetchCurrencies(this.userId);
  }
}
</script>

<style>
.trade-wrapper {
  flex-direction: column;
  height: 100%;
  position: relative;
}

.currencies {
  flex-wrap: wrap;
}

.currencies .card {
  width: 350px;
  margin: 10px 30px
}

.card .actions {
  justify-content: space-between;
}

.buy-suggestion {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

</style>