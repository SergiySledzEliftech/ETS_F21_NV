import { DateTime } from 'luxon'
import { serverUrl } from '../utils/config'
import { styleTransactionDates } from '../utils/styleTransactionDates'

export const state = () => ({
  transactions: [],
  pageCount: 1,
  transactionDates: [],
  transactionAmounts: [],
  pageNumber: 1,
  limitNumber: 10,
  currency: 'ALL',
  dateRange: [DateTime.now().minus({ days: 30 }).toFormat('yyyy-M-dd'), DateTime.now().minus({ days: 1 }).toFormat('yyyy-M-dd')]
})

export const getters = {
  formatDates ({ dateRange }) {
    const startDate = DateTime.fromFormat(dateRange[0], 'yyyy-M-dd').toFormat('LLL dd yyyy')
    const endDate = DateTime.fromFormat(dateRange[1], 'yyyy-M-dd').toFormat('LLL dd yyyy')
    return [startDate, endDate]
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
    state.dateRange = [
      DateTime.fromFormat(startDate, 'yyyy-M-dd').toFormat('yyyy-M-dd'),
      DateTime.fromFormat(endDate, 'yyyy-M-dd').toFormat('yyyy-M-dd')
    ]
  },

  updateLimitNumber (state, limitNumber) {
    state.limitNumber = limitNumber
  },

  updateCurrency (state, currency) {
    state.currency = currency
  }
}

export const actions = {
  async fetchTransactions (ctx, params = {}) {
    const defaultParams = { currency: 'ALL', page: 1, limit: 10 }
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
