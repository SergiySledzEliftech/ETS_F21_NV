export const state = () => ({
  details: {},
  userJWT: String,
  isLoading: false
})

const BASE_URL = 'http://localhost:4000'

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
