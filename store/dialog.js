export const state = () => ({
  isOpen: false
})

export const actions = {
  toggleIsOpen (ctx) {
    ctx.commit('toggle')
  }
}

export const mutations = {
  toggle (state) {
    state.isOpen = !state.isOpen
  }
}
