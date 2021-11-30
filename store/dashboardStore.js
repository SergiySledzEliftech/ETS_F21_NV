import { DateTime } from 'luxon'

export const state = () => ({
  dateRange: [DateTime.now().minus({ days: 2 }).toFormat('yyyy-MM-dd'), DateTime.now().minus({ days: 1 }).toFormat('yyyy-MM-dd')],
  fluctData: [],
  isLoading: true
})

export const getters = {
  dates: state => () => state.dateRange,
  formatDates ({ dateRange }) {
    const startDate = DateTime.fromFormat(dateRange[0], 'yyyy-MM-dd').toFormat('LLL dd yyyy')
    const endDate = DateTime.fromFormat(dateRange[1], 'yyyy-MM-dd').toFormat('LLL dd yyyy')
    return [startDate, endDate]
  },
  fluctLabels ({ fluctData }) {
    const sorted = sortAndSlice(fluctData)
    return sorted.map(arr => arr[0])
  },
  changesForChart ({ fluctData }) {
    const sorted = sortAndSlice(fluctData)
    return sorted.map(arr => arr[1].change_pct)
  },
  dataForTable ({ fluctData }) {
    return fluctData.map(([name, values]) => ({
      currency: name,
      rate: values.end_rate,
      change: values.change_pct,
      favorite: false
    }))
  }
}

export const mutations = {
  updateDateRange (state, [startDate, endDate]) {
    state.dateRange = [
      DateTime.fromFormat(startDate, 'yyyy-MM-dd').toFormat('yyyy-MM-dd'),
      DateTime.fromFormat(endDate, 'yyyy-MM-dd').toFormat('yyyy-MM-dd')
    ]
  },
  changeLoading (state) {
    state.isLoading = !state.isLoading
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
