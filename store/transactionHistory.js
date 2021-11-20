import { serverUrl } from '../utils/config'

export const state = () => ({
  transactions: []
})

export const mutations = {
  updateTransactionHistory (state, transactions) {
    state.transactions = transactions
  }
}

export const actions = {
  async fetchTransactions (ctx, params = {}) {
    const defaultParams = { currency: 'USD', page: 1, limit: 2 }
    for (const param in defaultParams) {
      if (!Object.prototype.hasOwnProperty.call(params, param)) {
        params[param] = defaultParams[param]
      }
    }
    try {
      const url = `${serverUrl}/transaction-history`
      const parameters = {
        currency: params.currency,
        page: params.page,
        limit: params.limit
      }
      const response = await this.$axios.$get(url, { params: parameters })
      ctx.commit('updateTransactionHistory', response)
    } catch (error) {
      // console.error(error)
    }
  }
}
