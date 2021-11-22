import { serverUrl } from '../utils/config'

export const state = () => ({
  transactions: [],
  pageCount: 1,
  transactionDates: [],
  transactionAmounts: []
})

export const mutations = {
  updateTransactionHistory (state, transactions) {
    state.transactions = transactions
  },

  updatePageCount (state, pageCount) {
    state.pageCount = pageCount
  },

  updateTransactionDates (state, transactions) {
    state.transactionDates = transactions.map(transaction => transaction.date)
  },

  updateTransactionAmounts (state, transactions) {
    state.transactionAmounts = transactions.map(transaction => transaction.amount)
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
    const url = `${serverUrl}/transaction-history`
    const parameters = {
      currency: params.currency,
      page: params.page,
      limit: params.limit
    }
    const [transactions, pageCount] = await this.$axios.$get(url, { params: parameters })
    ctx.commit('updateTransactionHistory', transactions)
    ctx.commit('updatePageCount', pageCount)
    ctx.commit('updateTransactionDates', transactions)
    ctx.commit('updateTransactionAmounts', transactions)
  }
}
