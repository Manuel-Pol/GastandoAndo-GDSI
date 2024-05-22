import { EntityWithIdFields } from '@/types/baseEntities'
import { useEffect, useState } from 'react'
import { Group, GroupFields, defaultFriends } from '@/types/groupalExpenses'
import GroupalExpensesAddDialog from './GroupalExpensesAddDialog'
import GroupalDataCard from './GroupalDataCard'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import GroupMovements from './GroupMovements'
import { AlertCircle } from 'lucide-react'
import GroupMembersCard from './GroupMembersCard'

const GroupExpenses = () => {
    const [currentGroups, setCurrentGroups] = useState<Group[]>([])
    const [selectedGroup, setSelectedGroup] = useState<Group | undefined>(undefined)
    const [currentDeleted, setCurrentDeleted] = useState<boolean>(false)

    const handleAddGroup = (group: Group) => {
        const groupAdd = {
            ...group,
            [EntityWithIdFields.Id]: currentGroups.length + 1
        }
        setCurrentGroups([...currentGroups, groupAdd])
    }

    const onClickGroup = (g: Group) => setSelectedGroup(g)

    useEffect(() => {
        if (selectedGroup) {
            setCurrentDeleted(false)
        }
    }, [selectedGroup])

    const deleteGroup = (id: number) => {
        if (selectedGroup && selectedGroup[EntityWithIdFields.Id] === id) {
            setSelectedGroup(undefined)
            setCurrentDeleted(true)
        }
        const newGroups = currentGroups.filter(g => g[EntityWithIdFields.Id] !== id)
        setCurrentGroups(newGroups)
    }

    const onSaveEdit = (group: Group) => {
        const newGroup = currentGroups.map(g => {
            if (g[EntityWithIdFields.Id] === group[EntityWithIdFields.Id]) return group

            return g
        })

        setCurrentGroups(newGroup)
        setSelectedGroup(undefined)
    }

    const onDeleteMember = (memberId: number) => {
        if (selectedGroup) {
            const newGroup: Group = {
                ...selectedGroup,
                [GroupFields.Members]: selectedGroup[GroupFields.Members].filter((m) => m[EntityWithIdFields.Id] !== memberId)
            }
            onSaveEdit(newGroup)
            setSelectedGroup(newGroup)
        }
    }

    return (
        <div className='grid grid-cols-4 gap-6 justify-center items-start w-full'>
            <div className='col-span-1 bg-white rounded p-4'>
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-row justify-between items-center mb-2'>
                        <p className='text-2xl font-medium'>Grupos</p>
                        <GroupalExpensesAddDialog onAddGroup={handleAddGroup} friends={defaultFriends} />
                    </div>
                    <GroupalDataCard
                        groups={currentGroups}
                        onSelect={onClickGroup}
                        selectedGroup={selectedGroup}
                        onSaveEdit={onSaveEdit}
                        onDelete={deleteGroup}
                    />
                </div>
            </div>
            <div className='col-span-2'>
                {selectedGroup && !currentDeleted ? (
                    <GroupMovements group={selectedGroup} />
                ) : (
                    <div className='w-full'>
                        <Alert variant='default' className='bg-white rounded-xl space-y-2 p-6'>
                            <div className='flex flex-row gap-2 text-xl items-center'>
                                <AlertCircle />
                                <AlertTitle>Sin movimientos</AlertTitle>
                            </div>
                            <AlertDescription>Seleccione un grupo para visualizar sus movimientos.</AlertDescription>
                        </Alert>
                    </div>
                )}
            </div>
            {selectedGroup && !currentDeleted && (
                <div className='col-span-1 bg-white rounded'>
                    <div className='flex flex-col gap-2 rounded'>
                        <p className='text-white text-2xl rounded font-medium text-center bg-[#1C7549] py-1'>
                            Integrantes
                        </p>
                        <GroupMembersCard members={selectedGroup?.[GroupFields.Members]} onRemoveMember={onDeleteMember}/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GroupExpenses
