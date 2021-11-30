export const state = () => ({
  modal: false,
  canBuy: false,
  currencyName: null
})

export const actions = {
  setModal (ctx, value) {
    ctx.commit('updateModal', value)
  },

  setCanBuy (ctx, canBuy) {
    ctx.commit('updateCanBuy', canBuy)
  },

  setCurrencyName (ctx, currencyName) {
    ctx.commit('updateCurrencyName', currencyName)
  }
}

export const getters = {
  getCanBuy (state) {
    return state.canBuy
  }
}

export const mutations = {
  updateCurrencyName (state, currencyName) {
    state.currencyName = currencyName
  },

  updateModal (state, modal) {
    state.modal = modal
  },

  updateCanBuy (state, canBuy) {
    state.canBuy = canBuy
  }
}
