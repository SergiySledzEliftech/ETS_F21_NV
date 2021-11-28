export const state = () => ({
  currenciesRates: {},
  currenciesSigns: []
})

export const actions = {
  async fetchGlobalCurrencies (ctx) {
    try {
      const response = await this.$axios
        .$get('http://localhost:4000/globalCurrencies/latest')
      ctx.commit('updateCurrencies', response)
    } catch (error) {
      return error
    }
  }
}

export const mutations = {
  updateCurrencies (state, currencies) {
    state.currenciesRates = currencies
    state.currenciesSigns = Object.keys(currencies)
  }
}
