export const state = () => ({
  modal: false,
  canBuy: false
})

export const actions = {
  setModal (ctx, value) {
    ctx.commit('updateModal', value)
  },

  setCanBuy (ctx, canBuy) {
    ctx.commit('updateCanBuy', canBuy)
  }
}

export const getters = {
  getCanBuy (state) {
    return state.canBuy
  }
}

export const mutations = {
  updateModal (state, modal) {
    state.modal = modal
  },

  updateCanBuy (state, canBuy) {
    state.canBuy = canBuy
  }
}
