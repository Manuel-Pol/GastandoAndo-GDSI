import { EntityWithIdFields } from '@/types/baseEntities'
import { Savings, SavingsFields } from '@/types/savings'
import { useContext, useState } from 'react'
import { AddNewSaving } from './AddNewSaving'
import { SavingsDataCard } from './SavingsDataCard'
import { UserContext } from '@/utils/contexts/userContext'
import { UserFields } from '@/types/users'
import { dataSavings } from '@/api/SavingsData'
import { removeData, saveNewData, updateData } from '@/api/Data'
import { dataUsers } from '@/api/UsersData'

const SavingsPage = () => {
    const { user } = useContext(UserContext)

    const [savings, setSavings] = useState<Savings[]>(user[UserFields.Savings].map(id => dataSavings.data[id]))

    const onAddSaving = (saving: Savings) => {
        const savingAdd: Savings = {
            ...saving,
            [SavingsFields.Progress]: [],
            [EntityWithIdFields.Id]: dataSavings.id
        }

        user[UserFields.Savings].push(savingAdd[EntityWithIdFields.Id])

        saveNewData(dataSavings, savingAdd[EntityWithIdFields.Id], savingAdd)
        updateData(dataUsers, user[EntityWithIdFields.Id], user)

        setSavings([...savings, savingAdd])
    }

    const onDeleteSaving = (saving: Savings) => {
        removeData(dataSavings, saving[EntityWithIdFields.Id])
        user[UserFields.Savings] = user[UserFields.Savings].filter(id => id !== saving[EntityWithIdFields.Id])
        updateData(dataUsers, user[EntityWithIdFields.Id], user)

        const newSavings = user[UserFields.Savings].map(id => dataSavings.data[id])
        setSavings(newSavings)
    }

    const onSaveEdit = (saving: Savings) => {
        updateData(dataSavings, saving[EntityWithIdFields.Id], saving)

        const newSavings = user[UserFields.Savings].map(id => dataSavings.data[id])
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
