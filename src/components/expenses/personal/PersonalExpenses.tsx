import { useState } from 'react'
import { ExpensesInterface } from '@/types/personalExpenses'
import PersonalExpensesAddNewDialog from './PersonalExpensesAddNewDialog'
import PersonalExpensesDataCard from './PersonalExpensesDataCard'
import { EntityWithIdFields } from '@/types/baseEntities'
import { removeData, saveNewData, updateData } from '@/api/Data'
import { dataPersonalExpenses } from '@/api/PersonalExpensesData'

const PersonalExpenses = () => {
    const [expenses, setExpenses] = useState<ExpensesInterface[]>(Object.values(dataPersonalExpenses.data))

    const onAddExpense = (exp: ExpensesInterface) => {
        const expAdd: ExpensesInterface = {
            ...exp,
            [EntityWithIdFields.Id]: dataPersonalExpenses.id
        }
        saveNewData(dataPersonalExpenses, expAdd[EntityWithIdFields.Id], expAdd)

        const newExpenses = Object.values(dataPersonalExpenses.data)
        setExpenses(newExpenses)
    }

    const onDeleteExpense = (exp: ExpensesInterface) => {
        if (exp[EntityWithIdFields.Id] in dataPersonalExpenses.data) {
            removeData(dataPersonalExpenses, exp[EntityWithIdFields.Id])

            const newExpenses = Object.values(dataPersonalExpenses.data)
            setExpenses(newExpenses)
        }
    }

    const onSaveEdit = (exp: ExpensesInterface) => {
        if (exp[EntityWithIdFields.Id] in dataPersonalExpenses.data) {
            updateData(dataPersonalExpenses, exp[EntityWithIdFields.Id], exp)

            const newExpenses = Object.values(dataPersonalExpenses.data)
            setExpenses(newExpenses)
        }
    }

    return (
        <div className='flex justify-center'>
            <div className='flex flex-col gap-8 items-center w-full max-w-3xl'>
                <div className='w-full flex space-x-24 items-center justify-between'>
                    <p className='text-6xl font-medium'>Movimientos</p>
                    <PersonalExpensesAddNewDialog onAddExpense={onAddExpense} />
                </div>
                <PersonalExpensesDataCard
                    expenses={expenses}
                    triggerDeleteExp={onDeleteExpense}
                    onSaveEdit={onSaveEdit}
                />
            </div>
        </div>
    )
}

export default PersonalExpenses
