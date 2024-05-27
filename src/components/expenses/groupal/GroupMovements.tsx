import { Group, GroupExpensesInterface, GroupFields } from '@/types/groupalExpenses'
import { useEffect, useState } from 'react'
import DialogAddGroupMovement from './DialogAddGroupMovement'
import { EntityWithIdFields } from '@/types/baseEntities'
import GroupExpensesDataCard from './GroupExpensesDataCard'

interface GroupMovementsProps {
    group: Group
    updateGroups: (g: Group) => void
}

const GroupMovements = ({ group, updateGroups }: GroupMovementsProps) => {
    const [movements, setMovements] = useState<GroupExpensesInterface[]>(group[GroupFields.Expenses])

    useEffect(() => {
        setMovements(group[GroupFields.Expenses])
    }, [group])

    const handleUpdateInGroup = (updatedMovements: GroupExpensesInterface[]) => {
        setMovements(updatedMovements)
        const groupUpdated: Group = {
            ...group,
            [GroupFields.Expenses]: updatedMovements
        }
        updateGroups(groupUpdated)
    }

    const handleAddMovement = (mov: GroupExpensesInterface) => {
        const newMovements = [...movements, mov]
        handleUpdateInGroup(newMovements)
    }

    const onDeleteMovement = (mov: GroupExpensesInterface) => {
        const newMovements = movements.filter(m => m[EntityWithIdFields.Id] !== mov[EntityWithIdFields.Id])
        handleUpdateInGroup(newMovements)
    }

    const onSaveEdit = (mov: GroupExpensesInterface) => {
        const newMovements = movements.map(m => {
            if (m[EntityWithIdFields.Id] === mov[EntityWithIdFields.Id]) return mov

            return m
        })

        handleUpdateInGroup(newMovements)
    }

    return (
        <div className='bg-white rounded p-4 w-full flex flex-col gap-6'>
            <div className='flex flex-row justify-between'>
                <p className='font-medium text-2xl'>{`Movimientos de ${group[GroupFields.Name]}`}</p>
                <DialogAddGroupMovement onAddMovement={handleAddMovement} groupMembers={group[GroupFields.Members]} />
            </div>
            <GroupExpensesDataCard
                expenses={movements}
                triggerDeleteExp={onDeleteMovement}
                onSaveEdit={onSaveEdit}
                friends={group[GroupFields.Members]}
            />
        </div>
    )
}

export default GroupMovements
