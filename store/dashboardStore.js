import { DateTime } from 'luxon'

export const state = () => ({
  dateRange: [DateTime.now().minus({ days: 2 }).toFormat('yyyy-M-dd'), DateTime.now().minus({ days: 1 }).toFormat('yyyy-M-dd')],
  isLoading: true
})

export const getters = {
  formatDates ({ dateRange }) {
    const startDate = DateTime.fromFormat(dateRange[0], 'yyyy-M-dd').toFormat('LLL dd yyyy')
    const endDate = DateTime.fromFormat(dateRange[1], 'yyyy-M-dd').toFormat('LLL dd yyyy')
    return [startDate, endDate]
  }
}

export const mutations = {
  updateDateRange (state, [startDate, endDate]) {
    state.dateRange = [
      DateTime.fromFormat(startDate, 'yyyy-M-dd').toFormat('yyyy-M-dd'),
      DateTime.fromFormat(endDate, 'yyyy-M-dd').toFormat('yyyy-M-dd')
    ]
  },
  changeLoading (state) {
    return !state.isLoading
  }
}
