import { serverUrl } from '../utils/config'

export const state = () => ({
  currencies: [],
  balance: null
})

export const actions = {
  async fetchUserCurrencies (ctx, { userId }) {
    try {
      const response = await this.$axios
        .$get(serverUrl + '/userCurrencies/all', {
          params: {
            userId
          }
        })
      ctx.commit('updateCurrencies', response)
    } catch (error) {
      return error
    }
  },

  async fetchBalance (ctx, { userId }) {
    try {
      const response = await this.$axios
        .get(serverUrl + '/users/balance/' + userId)
      ctx.commit('updateBalance', response.data)
    } catch (error) {
      return error
    }
  }
}

export const mutations = {
  updateCurrencies (state, currencies) {
    state.currencies = currencies
  },

  updateBalance (state, balance) {
    state.balance = balance
  }
}
