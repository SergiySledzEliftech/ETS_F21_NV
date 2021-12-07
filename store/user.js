import { serverUrl } from '../utils/config'

export const state = () => ({
  details: {},
  userJWT: '',
  isLoading: false
})

export const actions = {
  async saveUser (ctx, b) {
    const body = b
    try {
      const response = await this.$axios.$post(`${serverUrl}/auth/register`, body)
      ctx.commit('updateUser', response)
      ctx.commit('updateJWT', response)
    } catch (error) {
      // console.log(error)
    }
  },

  async login (ctx, b) {
    const body = b
    try {
      const response = await this.$axios.$post(`${serverUrl}/auth/login`, body)
      this.$axios.setToken(response.access_token, 'Bearer') // пример
      ctx.commit('updateUser', response)
      ctx.commit('updateJWT', response)
    } catch (error) {
      // console.log(error)
    }
  },

  refreshToken (ctx, token) {
    this.$axios.setToken(token, 'Bearer')
    ctx.commit('refreshToken', token)
  },

  addToken (ctx, token) {
    ctx.commit('addToken', token)
  },

  logout (ctx) {
    try {
      ctx.commit('clearJwt')
    } catch (error) {
      // console.log(error)
    }
  },

  async getUser (ctx, id) {
    // console.log('in getUser')
    try {
      this.$axios.setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTI1YTMyYWYyYjBjYmNkOTMzMGYzZiIsImlhdCI6MTYzODg3NTU3MiwiZXhwIjoxNjM4OTYxOTcyfQ.EtNV_fP75k3cx-B-6GKBkaNHix6GYAhmbv2m30_BCz8', 'Bearer')
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
  updateUser (state, user) {
    if (user?.user) {
      state.details = user.user
    } else {
      state.details = user
    }
    // console.log(state.details)
  },

  updateBalance (state, user) {
    state.details = user
  },

  refreshToken (state, token) {
    state.userJWT = token
  },

  updateJWT (state, user) {
    state.userJWT = user.access_token
    localStorage.setItem('user', JSON.stringify(state.userJWT))
    // console.log(state.userJWT)
  },

  clearJwt (state) {
    state.userJWT = ''
    localStorage.removeItem('user')
  }

}
