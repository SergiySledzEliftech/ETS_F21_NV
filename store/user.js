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
      this.$axios.setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTI1YTMyYWYyYjBjYmNkOTMzMGYzZiIsImlhdCI6MTYzODgzMDU2NiwiZXhwIjoxNjM4OTE2OTY2fQ.C2dkWR8TtCfBSc-Jv0f8aJCOanEtemkDsgxq7ZEhC04', 'Bearer')
      const response = await this.$axios.$get(`${serverUrl}/users/getOne`)

      ctx.commit('updateUser', response)
    } catch (error) {
      throw new Error(error.message)
    }
  },

  async updateUser (ctx, { id, body }) {
    try {
      const response = await this.$axios.$put(`${serverUrl}/users/${id}`, body)
      ctx.commit('updateUser', response)
    } catch (error) {
      throw new Error(error.message)
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
      throw new Error(error.message)
    }
  }
}

export const mutations = {
  updateUser (state, { user }) {
    state.details = user
  },

  updateBalance (state, user) {
    state.details = user
  }
}
