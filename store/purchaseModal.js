export const state = () => ({
  modal: false,
  canBuy: false,
  currencyName: null,
  amount: null,
  rate: null
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
  },

  setRate (ctx, rate) {
    ctx.commit('updateRate', rate)
  },

  setAmount (ctx, amount) {
    ctx.commit('updateAmount', amount)
  }
}

export const getters = {
  getCanBuy (state) {
    return state.canBuy
  },

  getAmount (state) {
    return state.amount
  },

  getRate (state) {
    return state.rate
  },

  getCurrencyName (state) {
    return state.currencyName
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
  },

  updateRate (state, rate) {
    state.rate = rate
  },

  updateAmount (state, amount) {
    state.amount = amount
  }
}
