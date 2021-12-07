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
      error.message = 'User with this email already exists! Try again!'
      throw new Error(error.message)
    }
  },

  async login (ctx, b) {
    const body = b
    try {
      const response = await this.$axios.$post(`${serverUrl}/auth/login`, body)
      ctx.commit('updateUser', response)
      ctx.commit('updateJWT', response)
    } catch (error) {
      error.message = 'Some data is incorrect! Try again!'
      throw new Error(error.message)
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
    }
  },

  async getUser (ctx, id) {
    try {
      this.$axios.setToken(this.$cookies.get('userToken'), 'Bearer')
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
  },

  updateBalance (state, user) {
    state.details = user
  },

  refreshToken (state, token) {
    state.userJWT = token
  },

  updateJWT (state, user) {
    state.userJWT = user.access_token
    this.$cookies.set('userToken', JSON.stringify(state.userJWT), {
      secure: true,
      sameSite: true
    })
  },

  clearJwt (state) {
    state.userJWT = ''
    this.$cookies.removeAll()
    this.$router.push('/login')
  }

}
