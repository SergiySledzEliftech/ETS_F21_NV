import { DateTime } from 'luxon'

export function styleTransactionDates (transactions) {
  transactions.forEach((transaction) => {
    transaction.date = DateTime.fromISO(transaction.date).toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)
  })
  return transactions
}
