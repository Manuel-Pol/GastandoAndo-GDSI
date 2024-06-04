import { useContext, useState } from 'react'
import { ExpensesInterface } from '@/types/personalExpenses'
import PersonalExpensesAddNewDialog from './PersonalExpensesAddNewDialog'
import PersonalExpensesDataCard from './PersonalExpensesDataCard'
import { EntityWithIdFields, EntityWithUserIdFields } from '@/types/baseEntities'
import { removeData, saveNewData, updateData } from '@/api/Data'
import { dataPersonalExpenses } from '@/api/PersonalExpensesData'
import { UserContext } from '@/utils/contexts/userContext'

const PersonalExpenses = () => {
    const { user } = useContext(UserContext)

    const [expenses, setExpenses] = useState<ExpensesInterface[]>(
        Object.values(dataPersonalExpenses.data).filter(
            value => value[EntityWithUserIdFields.UserId] === user[EntityWithIdFields.Id]
        )
    )

    const onAddExpense = (exp: ExpensesInterface) => {
        const expAdd: ExpensesInterface = {
            ...exp,
            [EntityWithIdFields.Id]: dataPersonalExpenses.id
        }
        saveNewData(dataPersonalExpenses, expAdd[EntityWithIdFields.Id], expAdd)

        const newExpenses = Object.values(dataPersonalExpenses.data).filter(
            value => value[EntityWithUserIdFields.UserId] === user[EntityWithIdFields.Id]
        )
        setExpenses(newExpenses)
    }

    const onDeleteExpense = (exp: ExpensesInterface) => {
        if (exp[EntityWithIdFields.Id] in dataPersonalExpenses.data) {
            removeData(dataPersonalExpenses, exp[EntityWithIdFields.Id])

            const newExpenses = Object.values(dataPersonalExpenses.data).filter(
                value => value[EntityWithUserIdFields.UserId] === user[EntityWithIdFields.Id]
            )
            setExpenses(newExpenses)
        }
    }

    const onSaveEdit = (exp: ExpensesInterface) => {
        if (exp[EntityWithIdFields.Id] in dataPersonalExpenses.data) {
            updateData(dataPersonalExpenses, exp[EntityWithIdFields.Id], exp)

            const newExpenses = Object.values(dataPersonalExpenses.data).filter(
                value => value[EntityWithUserIdFields.UserId] === user[EntityWithIdFields.Id]
            )
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
