import { EntityWithIdFields } from '@/types/baseEntities'
import { Savings } from '@/types/savings'
import { useState } from 'react'
import { AddNewSaving } from './AddNewSaving'
import { SavingsDataCard } from './SavingsDataCard'

const SavingsPage = () => {
    const [savings, setSavings] = useState<Savings[]>([])

    const onAddSaving = (exp: Savings) => {
        const expAdd: Savings = {
            ...exp,
            [EntityWithIdFields.Id]: savings.length + 1
        }
        setSavings([...savings, expAdd])
    }

    const onDeleteSaving = (exp: Savings) => {
        const newSavings = savings.filter(e => e[EntityWithIdFields.Id] !== exp[EntityWithIdFields.Id])
        setSavings(newSavings)
    }

    const onSaveEdit = (saves: Savings) => {
        const newSavings = savings.map(e => {
            if (e[EntityWithIdFields.Id] === saves[EntityWithIdFields.Id]) return saves

            return e
        })

        setSavings(newSavings)
    }

    return (
        <div className='flex justify-center'>
            <div className='flex flex-col gap-8 items-center w-full max-w-3xl'>
                <div className='w-full flex space-x-24 items-center justify-between'>
                    <p className='text-6xl font-medium'>Ahorros</p>
                    <AddNewSaving onAddSaving={onAddSaving} />
                </div>
                <SavingsDataCard savings={savings} triggerDelete={onDeleteSaving} onSaveEdit={onSaveEdit} />
            </div>
        </div>
    )
}

export default SavingsPage
