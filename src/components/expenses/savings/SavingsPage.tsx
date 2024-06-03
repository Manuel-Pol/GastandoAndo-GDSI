import { EntityWithIdFields } from '@/types/baseEntities'
import { Savings } from '@/types/savings'
import { useState } from 'react'
import { AddNewSaving } from './AddNewSaving'
import { SavingsDataCard } from './SavingsDataCard'

const SavingsPage = () => {
    const [savings, setSavings] = useState<Savings[]>([])

    const onAddSaving = (saving: Savings) => {
        const savingAdd: Savings = {
            ...saving,
            [EntityWithIdFields.Id]: savings.length + 1
        }
        setSavings([...savings, savingAdd])
    }

    const onDeleteSaving = (saving: Savings) => {
        const newSavings = savings.filter(s => s[EntityWithIdFields.Id] !== saving[EntityWithIdFields.Id])
        setSavings(newSavings)
    }

    const onSaveEdit = (saving: Savings) => {
        const newSavings = savings.map(s => {
            if (s[EntityWithIdFields.Id] === saving[EntityWithIdFields.Id]) return saving

            return s
        })

        setSavings(newSavings)
    }

    return (
        <div className='flex justify-center'>
            <div className='flex flex-col gap-8 items-center w-full max-w-4xl'>
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
