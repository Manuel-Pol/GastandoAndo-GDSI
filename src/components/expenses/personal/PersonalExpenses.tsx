import { useContext, useEffect, useState } from 'react'
import { ExpenseType, ExpensesInterface, ExpensesInterfaceFields } from '@/types/personalExpenses'
import PersonalExpensesAddNewDialog from './PersonalExpensesAddNewDialog'
import PersonalExpensesDataCard from './PersonalExpensesDataCard'
import { EntityWithIdFields } from '@/types/baseEntities'
import { removeData, saveNewData, updateData } from '@/api/Data'
import { dataPersonalExpenses } from '@/api/PersonalExpensesData'
import { UserContext } from '@/utils/contexts/userContext'
import { UserFields } from '@/types/users'
import { dataUsers } from '@/api/UsersData'
import { numberFormatter } from '@/utils/formatters/numberFormatter'

const PersonalExpenses = () => {
    const { user } = useContext(UserContext)

    const [expenses, setExpenses] = useState<ExpensesInterface[]>([])
    const [balance, setBalance] = useState<number>(0)

    const onAddExpense = (exp: ExpensesInterface) => {
        const expAdd: ExpensesInterface = {
            ...exp,
            [EntityWithIdFields.Id]: dataPersonalExpenses.id
        }
        user[UserFields.PersonalExpenses].push(expAdd[EntityWithIdFields.Id])

        saveNewData(dataPersonalExpenses, expAdd[EntityWithIdFields.Id], expAdd)
        updateData(dataUsers, user[EntityWithIdFields.Id], user)

        const currentExp = [
            ...expenses,
            exp
        ]
        
        const total = currentExp.reduce((ac, d) => 
            d[ExpensesInterfaceFields.IsExpense] === ExpenseType.Gasto ?
                ac - (d[ExpensesInterfaceFields.Amount] ?? 0)
            : ac + (d[ExpensesInterfaceFields.Amount] ?? 0)
        , 0)
        setBalance(total)

        const newExpenses = user[UserFields.PersonalExpenses].map(id => dataPersonalExpenses.data[id])
        setExpenses(newExpenses)
    }

    useEffect(() => {
        if (user) {
            const movs = user[UserFields.PersonalExpenses].map(id => dataPersonalExpenses.data[id])
            setExpenses(movs)
            const total = movs.reduce((ac, d) => 
                d[ExpensesInterfaceFields.IsExpense] === ExpenseType.Gasto ?
                    ac - (d[ExpensesInterfaceFields.Amount] ?? 0)
                : ac + (d[ExpensesInterfaceFields.Amount] ?? 0)
            , 0)
            setBalance(total)
        }
    }, [user])

    const onDeleteExpense = (exp: ExpensesInterface) => {
        const total = exp[ExpensesInterfaceFields.IsExpense] === ExpenseType.Gasto ? balance + (exp[ExpensesInterfaceFields.Amount] ?? 0) :
            balance - (exp[ExpensesInterfaceFields.Amount] ?? 0)
        
        setBalance(total)

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
        const movement = expenses.find((mov) => mov[EntityWithIdFields.Id] == exp[EntityWithIdFields.Id])
        let total = movement?.[ExpensesInterfaceFields.IsExpense] === ExpenseType.Gasto ? balance + (movement[ExpensesInterfaceFields.Amount] ?? 0) :
            balance - (exp[ExpensesInterfaceFields.Amount] ?? 0)

        total = exp[ExpensesInterfaceFields.IsExpense] === ExpenseType.Gasto ? total - (exp[ExpensesInterfaceFields.Amount] ?? 0) : total + (exp[ExpensesInterfaceFields.Amount] ?? 0) 
        
        setBalance(total)

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
                    <div className='flex flex-col gap-1'>
                        <p className='text-6xl font-medium'>Movimientos</p>
                        <div className='flex flex-row space-x-2 items-center'>
                            {expenses.length !== 0 && <p className='text-lg'>{`El balance total es`}</p>}
                            {expenses.length !== 0 && (
                                balance >= 0 ?
                                    <div className='bg-[#38a052] border-1 rounded-full px-4 py-2'>
                                        <p className='text-white'>{`$ ${numberFormatter.toStringWithDecimals(balance)}`}</p>
                                    </div>
                                :
                                    <div className='bg-[#ca2f2f] border-1 rounded-full px-4 py-2'>
                                        <p className='text-white'>{`$ ${numberFormatter.toStringWithDecimals(balance)}`}</p>
                                    </div>
                            )
                            }
                        </div>
                    </div>
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
