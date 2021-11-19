export const state = () => ({
  transactions: []
})

export const actions = {
  async fetchTransactions (ctx, params = {}) {
    const defaultParams = { currency: 'USD', page: 1, limit: 2 }
    for (const param in defaultParams) {
      if (!Object.prototype.hasOwnProperty.call(params, param)) {
        params[param] = defaultParams[param]
      }
    }
    try {
      const url = `http://localhost:4000/transaction-history?currency=${params.currency}&page=${params.page}&limit=${params.limit}`
      // console.log(url)
      const response = await this.$axios.$get(url)
      ctx.commit('updateTransactionHistory', response)
    } catch (error) {
      // console.error(error)
    }
  }
}

export const mutations = {
  updateTransactionHistory (state, transactions) {
    state.transactions = transactions
  }
}
