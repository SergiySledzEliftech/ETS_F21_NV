<template>
  <v-card-actions
    class="justify-space-between"
  >
    <v-btn
      color="indigo darken-1"
      text
      :disabled="!getCanBuy"
      @click="buyCurrency"
    >
      Buy
    </v-btn>
    <v-btn
      @click="setModal(false)"
      text
    >
      Close
    </v-btn>
  </v-card-actions>
</template>

<script>

import { Component, Vue, namespace, Prop, Inject } from "nuxt-property-decorator";
import { serverUrl } from '~/utils/config';
const {
  State,
  Action,
  Getter
} = namespace('purchaseModal');

const { Action: UserCurrenciesAction } = namespace('userCurrencies');


@Component({})
export default class CurrencyPurchaseModalActions extends Vue {
  @Inject({default: null}) notificationsBar;

  @State canBuy
  @State currencyName
  @Action setModal
  @Action setAmount
  @Action setRate
  @Action setCurrencyName
  @Getter getCanBuy
  @Getter getRate
  @Getter getAmount
  @Getter getCurrencyName

  @UserCurrenciesAction fetchUserCurrencies
  @UserCurrenciesAction fetchBalance

  @Prop({ type: String }) userId

  async buyCurrency () {
    try {
      const spent = this.getAmount / this.getRate;
      const response = await this.$axios
        .$post(serverUrl + '/trade/buy', {
          userId: this.userId,
          currencyName: this.currencyName,
          spent
        })
      if (response.result !== 'success') {
        throw new Error(response.result);
      }
      this.notificationsBar.consoleSuccess('Currency has been successfully purchased');
    } catch (error) {
      this.notificationsBar.consoleError(error.message);
    } finally {
      this.fetchUserCurrencies({ userId: this.userId });
      this.fetchBalance({ userId: this.userId });
      this.setModal(false);
    }
  }

  nullVallues() {
    this.setRate(null);
    this.setAmount(null);
    this.setCurrencyName(null);
  }
}

</script>