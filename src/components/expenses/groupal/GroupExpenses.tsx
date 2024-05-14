import { EntityWithIdFields } from '@/types/baseEntities'
import { useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Group, GroupFields } from '@/types/groupalExpenses'
import GroupalExpensesAddDialog from './GroupalExpensesAddDialog'
import GroupalDataCard from './GroupalDataCard'

const GroupExpenses = () => {
    const [currentGroups, setCurrentGroups] = useState<Group[]>([])

    const handleAddGroup = (group: Group) => {
        const groupAdd = {
            ...group,
            [EntityWithIdFields.Id]: currentGroups.length + 1
        }
        setCurrentGroups([...currentGroups, groupAdd])
    }

    return (
        <div className='flex justify-center'>
            <div className='flex flex-col gap-8 items-center w-full max-w-xl'>
                <p className='text-6xl text-center'>Grupos</p>
                <div className='flex flex-row justify-between w-full items-center'>
                    <div>
                        {currentGroups.length !== 0 && (
                            <Select>
                                <SelectTrigger className='w-[180px] bg-white'>
                                    <SelectValue placeholder='Selecciona un grupo' />
                                </SelectTrigger>
                                <SelectContent className='bg-white'>
                                    <SelectGroup>
                                        {currentGroups.map(g => (
                                            <div>
                                                <SelectItem value={`${g.id}`} className='cursor-pointer'>
                                                    {g[GroupFields.Name]}
                                                </SelectItem>
                                            </div>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    </div>
                    <GroupalExpensesAddDialog onAddGroup={handleAddGroup} />
                </div>
                <GroupalDataCard groups={currentGroups} />
            </div>
        </div>
    )
}

export default GroupExpenses
