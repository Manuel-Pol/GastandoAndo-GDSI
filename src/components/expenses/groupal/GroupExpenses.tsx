import { EntityWithIdFields } from '@/types/baseEntities'
import { useState } from 'react'
import { Group } from '@/types/groupalExpenses'
import GroupalExpensesAddDialog from './GroupalExpensesAddDialog'
import GroupalDataCard from './GroupalDataCard'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import GroupMovements from './GroupMovements'
import { AlertCircle } from 'lucide-react'


const GroupExpenses = () => {
    const [currentGroups, setCurrentGroups] = useState<Group[]>([])
    const [selectedGroup, setSelectedGroup] = useState<Group>()

    const handleAddGroup = (group: Group) => {
        const groupAdd = {
            ...group,
            [EntityWithIdFields.Id]: currentGroups.length + 1
        }
        setCurrentGroups([...currentGroups, groupAdd])
    }

    const onClickGroup = (g: Group) => setSelectedGroup(g)

    const deleteGroup = (id: number) => {
        selectedGroup && selectedGroup[EntityWithIdFields.Id] == id && setSelectedGroup(undefined)
        const newGroups = currentGroups.filter((g) => g[EntityWithIdFields.Id] !== id)
        setCurrentGroups(newGroups)
    }

    return (
        <div className='grid grid-cols-4 gap-6 justify-center w-full'>
            <div className='col-span-1 bg-white rounded p-4'>
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-row justify-between items-center mb-2'>
                        <p className='text-2xl font-medium'>Grupos</p>
                        <GroupalExpensesAddDialog onAddGroup={handleAddGroup} />
                    </div>
                    <GroupalDataCard groups={currentGroups}
                                     onSelect={onClickGroup}
                                     selectedGroup={selectedGroup}
                                     onDelete={deleteGroup}
                    />
                </div>
            </div>
            <div className='col-span-3'>
                {selectedGroup ? 
                    <GroupMovements group={selectedGroup} />
                :
                <div className='w-full'>
                    <Alert variant='default' className='bg-white rounded-xl space-y-2 p-6'>
                        <div className='flex flex-row gap-2 text-xl items-center'>
                            <AlertCircle />
                            <AlertTitle>Sin movimientos</AlertTitle>
                        </div>
                        <AlertDescription>
                            Seleccione un grupo para visualizar sus movimientos.
                        </AlertDescription>
                    </Alert>
                </div>
                }
            </div>
        </div>
    )
}

export default GroupExpenses
