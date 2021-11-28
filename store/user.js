import { serverUrl } from '../utils/config'

export const state = () => ({
  details: {},
  isLoading: false
})

export const actions = {
  // async saveUser () {} для регистрации

  async getUser (ctx, id) {
    // console.log('in getUser')
    try {
      const response = await this.$axios.$get(`${serverUrl}/users/${id}`)

      ctx.commit('updateUser', response)
    } catch (error) {
      // console.log(error)
    }
  },

  async updateUser (ctx, { id, body }) {
    try {
      const response = await this.$axios.$put(`${serverUrl}/users/${id}`, body)
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
      const response = await this.$axios.$put(`${serverUrl}/users/balance/${id}`, body)
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
