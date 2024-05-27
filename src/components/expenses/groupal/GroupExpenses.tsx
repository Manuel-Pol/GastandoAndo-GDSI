import { EntityWithIdFields } from '@/types/baseEntities'
import { useEffect, useState } from 'react'
import { Group, GroupFields, defaultFriends } from '@/types/groupalExpenses'
import GroupExpensesAddDialog from './GroupExpensesAddDialog'
import GroupDataCard from './GroupDataCard'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import GroupMovements from './GroupMovements'
import { AlertCircle } from 'lucide-react'
import GroupMembersCard from './GroupMembersCard'
import { GroupAddMemberDialog } from './GroupAddMemberDialog'

const GroupExpenses = () => {
    const [currentGroups, setCurrentGroups] = useState<Group[]>([])
    const [selectedGroup, setSelectedGroup] = useState<Group | undefined>(undefined)

    const handleAddGroup = (group: Group) => {
        const groupAdd = {
            ...group,
            [EntityWithIdFields.Id]: currentGroups.length + 1
        }
        setCurrentGroups([...currentGroups, groupAdd])
        setSelectedGroup(groupAdd)
    }

    const onClickGroup = (g: Group) => setSelectedGroup(g)

    const deleteGroup = (id: number) => {
        if (selectedGroup && selectedGroup[EntityWithIdFields.Id] === id) {
            setSelectedGroup(undefined)
        }
        const newGroups = currentGroups.filter(g => g[EntityWithIdFields.Id] !== id)
        setCurrentGroups(newGroups)
    }

    const onSaveEdit = (group: Group) => {
        const newGroups = currentGroups.map(g => {
            if (g[EntityWithIdFields.Id] === group[EntityWithIdFields.Id]) return group

            return g
        })

        setCurrentGroups(newGroups)
        onClickGroup(group)
    }

    const onDeleteMember = (memberId: number) => {
        if (selectedGroup) {
            const newGroup: Group = {
                ...selectedGroup,
                [GroupFields.Members]: selectedGroup[GroupFields.Members].filter(
                    m => m[EntityWithIdFields.Id] !== memberId
                )
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
                        <GroupExpensesAddDialog onAddGroup={handleAddGroup} friends={defaultFriends} />
                    </div>
                    <GroupDataCard
                        groups={currentGroups}
                        onSelect={onClickGroup}
                        selectedGroup={selectedGroup}
                        onSaveEdit={onSaveEdit}
                        onDelete={deleteGroup}
                    />
                </div>
            </div>
            <div className='col-span-2'>
                {selectedGroup ? (
                    <GroupMovements group={selectedGroup} updateGroups={onSaveEdit} />
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
            {selectedGroup && (
                <div className='col-span-1 bg-white rounded'>
                    <div className='flex flex-col gap-2 rounded'>
                        <div className='text-white text-2xl rounded font-medium flex items-center justify-between bg-[#1C7549] py-1 px-4'>
                            <p>Integrantes</p>
                            <GroupAddMemberDialog />
                        </div>
                        <GroupMembersCard
                            members={selectedGroup?.[GroupFields.Members]}
                            onRemoveMember={onDeleteMember}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default GroupExpenses
