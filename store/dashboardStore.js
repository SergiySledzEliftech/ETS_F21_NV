import { DateTime } from 'luxon'

export const state = () => ({
  dateRange: [DateTime.now().minus({ days: 2 }).toFormat('yyyy-M-dd'), DateTime.now().minus({ days: 1 }).toFormat('yyyy-M-dd')],
  fluctData: [],
  isLoading: true
})

export const getters = {
  formatDates ({ dateRange }) {
    const startDate = DateTime.fromFormat(dateRange[0], 'yyyy-M-dd').toFormat('LLL dd yyyy')
    const endDate = DateTime.fromFormat(dateRange[1], 'yyyy-M-dd').toFormat('LLL dd yyyy')
    return [startDate, endDate]
  },
  fluctLabels ({ fluctData }) {
    const sorted = sortAndSlice(fluctData)
    return sorted.map(arr => arr[0])
  },
  changesForChart ({ fluctData }) {
    const sorted = sortAndSlice(fluctData)
    return sorted.map(arr => Math.round(arr[1].change_pct * 10000) / 100)
  },
  dataForTable ({ fluctData }) {
    return fluctData.map(([name, values]) => ({
      currency: name,
      rate: Math.round(values.end_rate * 100) / 100,
      change: Math.round(values.change_pct * 10000) / 100,
      favorite: false
    }))
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
  },
  updateFluctData (state, newData) {
    state.fluctData = newData
  }
}

const sortAndSlice = (array) => {
  return [...array]
    .sort((a, b) => b[1].change_pct - a[1].change_pct)
    .slice(0, 20)
}
