import { serverUrl } from '../utils/config'

export const state = () => ({
  details: {},
  userJWT: String,
  isLoading: false
})

export const actions = {
  async saveUser (ctx, b) {
    const body = b
    try {
      const response = await this.$axios.$post(`${BASE_URL}/users`, body)
      ctx.commit('updateUser', response)
    } catch (error) {
      // console.log(error)
    }
  },

  async getUserJwt (ctx, b) {
    const body = b
    try {
      const response = await this.$axios.$post(`${BASE_URL}/users/login`, body)
      // http://localhost:4000/users/login
      ctx.commit('updateUser', response)
    } catch (error) {
      // console.log(error)
    }
  },

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
