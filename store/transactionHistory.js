import { DateTime } from 'luxon'
import { serverUrl } from '../utils/config'
import { styleTransactionDates } from '../utils/styleTransactionDates'

export const state = () => ({
  transactions: [],
  pageCount: 1,
  transactionDates: [],
  transactionAmounts: [],
  pageNumber: 1,
  limitNumber: 6,
  dateRange: [DateTime.now().minus({ days: 10 }).toFormat('yyyy-M-dd'), DateTime.now().minus({ days: 1 }).toFormat('yyyy-M-dd')]
})

export const getters = {
  formattedDateRange ({ dateRange }) {
    return [
      DateTime.fromFormat(dateRange[0], 'yyyy-M-dd').toFormat('LLL dd yyyy'),
      DateTime.fromFormat(dateRange[1], 'yyyy-M-dd').toFormat('LLL dd yyyy')
    ]
  }
}

export const mutations = {
  updateTransactionHistory (state, transactions) {
    state.transactions = transactions
  },

  updatePageCount (state, pageCount) {
    state.pageCount = pageCount
  },

  updateTransactionDates (state, transactions) {
    state.transactionDates = transactions.map(transaction => transaction.date)
  },

  updateTransactionAmounts (state, transactions) {
    state.transactionAmounts = transactions.map(transaction => transaction.amount)
  },

  updatePageNumber (state, pageNumber) {
    state.pageNumber = +pageNumber
  },

  updateDateRange (state, [startDate, endDate]) {
    state.dateRange = [startDate, endDate]
  },

  updateLimitNumber (state, limitNumber) {
    state.limitNumber = limitNumber
  }
}

export const actions = {
  async fetchTransactions (ctx, params = {}) {
    const defaultParams = { currency: 'USD', page: 1, limit: 10 }
    for (const param in defaultParams) {
      if (!Object.prototype.hasOwnProperty.call(params, param)) {
        params[param] = defaultParams[param]
      }
    }
    const url = `${serverUrl}/transaction-history`
    const parameters = params

    const { data, numberOfPages, currentPage } = await this.$axios.$get(url, { params: parameters })
    const transactions = styleTransactionDates(data)
    ctx.commit('updatePageCount', numberOfPages)
    ctx.commit('updatePageNumber', currentPage)
    ctx.commit('updateTransactionAmounts', transactions)
    ctx.commit('updateTransactionHistory', transactions)
    ctx.commit('updateTransactionDates', transactions)
  }
}
