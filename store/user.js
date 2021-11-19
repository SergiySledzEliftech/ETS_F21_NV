export const state = () => ({
  details: {},
  isLoading: false
})

const BASE_URL = 'http://localhost:4000'

export const actions = {
  // async saveUser () {} для регистрации

  async getUser (ctx, id) {
    // console.log('in getUser')
    try {
      const response = await this.$axios.$get(`${BASE_URL}/users/${id}`)

      ctx.commit('updateUser', response)
    } catch (error) {
      // console.log(error)
    }
  },

  async updateUser (ctx, { id, body }) {
    try {
      const response = await this.$axios.$put(`${BASE_URL}/users/${id}`, body)
      ctx.commit('updateUser', response)
    } catch (error) {

    }
  },

  async takeBonus (ctx, id) {
    const body = {
      lastBonusTime: Date.now(),
      dollarBalance: 50
    }
    try {
      const response = await this.$axios.$put(`${BASE_URL}/users/balance/${id}`, body)
      ctx.commit('updateBalance', response)
    } catch (error) {

    }
  }
}

export const mutations = {
  updateUser (state, user) {
    state.details = user
  },

  updateBalance (state, user) {
    state.details = user
  }
}
