<template>
  <v-dialog
    v-model="modal"
    width="700"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
      >
        Click me
      </v-btn>
    </template>

    <v-card
      class="dialog"
    >
      <v-card-header>
        <v-card-text>
          <v-row>
            <v-col
              cols="6"
              class="text-subtitle-1"
            >
              Buy window
            </v-col>
            <v-col
              cols="6"
              class="text-right"
            >
              Your balance: {{ $store.state.userCurrencies.balance }}$
            </v-col>
          </v-row>
        </v-card-text>
      </v-card-header>
      <v-card-text>
        <div class="graph d-flex justify-center align-center">
          graph
        </div>

      </v-card-text>

      <v-card-text>
        <v-row>
          <v-col cols="6">
            Rate: {{ rate }}
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            Select currency:
            <v-autocomplete
              class="autocomplete"
              :items="$store.state.globalCurrencies.currenciesSigns"
              v-model="currency"
              v-on:change="changeValues"
            >
            </v-autocomplete>
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
            Amount:
            <v-text-field
              id="amount-field"
              type="number"
              v-model="amount"
              :max="maxAmount"
            >
            </v-text-field>
            <v-slider
              class="slider"
              v-model="amount"
              :max="maxAmount"
            ></v-slider>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions
        class="justify-space-between"
      >
        <v-btn
          color="indigo darken-1"
          :disabled="!currency || !amount"
        >
          Buy
        </v-btn>
        <v-btn
          @click="modal = false"
          color="red darken-1"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {

  data() {
    return {
      modal: false,
      amount: 0,
      min: 0,
      userId: '1',
      currency: null,
      rate: null,
      maxAmount: null
    }
  },

  mounted () {
    this.$store.dispatch('globalCurrencies/fetchCurrencies', {
      userId: this.userId
    })
  },

  methods: {
    changeValues () {
      const balance = this.$store.state.userCurrencies.balance;
      this.rate = this.$store.state.globalCurrencies.currenciesRates[this.currency];
      this.maxAmount = Math.floor(balance * this.rate);
    },

    async buyCurrency () {

    }
  }
}
</script>

<style>
.amount > *:first-child {
  margin-right: 20px;
}

#amount-field {
  width: 60%;
}

.graph {
  border: 1px solid black;
  height: 250px;
}

</style>