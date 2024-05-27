import { RecurrenceTypeCodes } from '@/types/personalExpenses'

export const getExpenseRecurrence = (freq: RecurrenceTypeCodes) => {
    switch (freq) {
        case RecurrenceTypeCodes.Singular:
            return 'No recurrente'
        case RecurrenceTypeCodes.Diary:
            return 'Diario'
        case RecurrenceTypeCodes.Weekly:
            return 'Semanal'
        case RecurrenceTypeCodes.Monthly:
            return 'Mensual'
        case RecurrenceTypeCodes.Quarter:
            return 'Trimestral'

        default:
            return 'No recurrente'
    }
}
