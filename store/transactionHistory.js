export const state = () => ({
  transactions: []
})

export const actions = {
  async fetchTransactions (ctx) { // }, { userId }) {
    try {
      const response = await this.$axios.$get('http://localhost:4000/transaction-history')
      ctx.commit('updateTransactionHistory', response)
    } catch (error) {
      // console.log(error)
    }
  }
}

export const mutations = {
  updateTransactionHistory (state, transactions) {
    state.transactions = transactions
  }
}
