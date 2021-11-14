export const state = () => ({
  currencies: []
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
      console.log(error)
    }
  }
}

export const mutations = {
  updateCurrencies (state, currencies) {
    state.currencies = currencies
  }
}
