export const state = () => ({
  currencies: [],
  balance: 10000
})

export const actions = {
  async fetchCurrencies (ctx, { userId }) {
    try {
      const response = await this.$axios
        .$get('http://localhost:4000/userCurrencies', {
          params: {
            userId
          }
        })
      ctx.commit('updateCurrencies', response)
    } catch (error) {
      return error
    }
  }
}

export const mutations = {
  updateCurrencies (state, currencies) {
    state.currencies = currencies
  }
}
