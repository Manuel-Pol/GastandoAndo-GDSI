import { useContext, useEffect, useState } from 'react'
import { ExpensesInterface } from '@/types/personalExpenses'
import PersonalExpensesAddNewDialog from './PersonalExpensesAddNewDialog'
import PersonalExpensesDataCard from './PersonalExpensesDataCard'
import { EntityWithIdFields } from '@/types/baseEntities'
import { removeData, saveNewData, updateData } from '@/api/Data'
import { dataPersonalExpenses } from '@/api/PersonalExpensesData'
import { UserContext } from '@/utils/contexts/userContext'
import { UserFields } from '@/types/users'
import { dataUsers } from '@/api/UsersData'

const PersonalExpenses = () => {
    const { user } = useContext(UserContext)

    const [expenses, setExpenses] = useState<ExpensesInterface[]>([])

    const onAddExpense = (exp: ExpensesInterface) => {
        const expAdd: ExpensesInterface = {
            ...exp,
            [EntityWithIdFields.Id]: dataPersonalExpenses.id
        }
        user[UserFields.PersonalExpenses].push(expAdd[EntityWithIdFields.Id])

        saveNewData(dataPersonalExpenses, expAdd[EntityWithIdFields.Id], expAdd)
        updateData(dataUsers, user[EntityWithIdFields.Id], user)

        const newExpenses = user[UserFields.PersonalExpenses].map(id => dataPersonalExpenses.data[id])
        setExpenses(newExpenses)
    }

    useEffect(() => {
        !!user && setExpenses(user[UserFields.PersonalExpenses].map(id => dataPersonalExpenses.data[id]))
    }, [user])

    const onDeleteExpense = (exp: ExpensesInterface) => {
        if (exp[EntityWithIdFields.Id] in dataPersonalExpenses.data) {
            removeData(dataPersonalExpenses, exp[EntityWithIdFields.Id])
            user[UserFields.PersonalExpenses] = user[UserFields.PersonalExpenses].filter(
                id => id !== exp[EntityWithIdFields.Id]
            )
            updateData(dataUsers, user[EntityWithIdFields.Id], user)

            const newExpenses = user[UserFields.PersonalExpenses].map(id => dataPersonalExpenses.data[id])
            setExpenses(newExpenses)
        }
    }

    const onSaveEdit = (exp: ExpensesInterface) => {
        if (exp[EntityWithIdFields.Id] in dataPersonalExpenses.data) {
            updateData(dataPersonalExpenses, exp[EntityWithIdFields.Id], exp)

            const newExpenses = user[UserFields.PersonalExpenses].map(id => dataPersonalExpenses.data[id])
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
