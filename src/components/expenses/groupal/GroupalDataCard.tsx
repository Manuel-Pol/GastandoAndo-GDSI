import { AlertCircle, Trash } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Group, GroupFields } from '@/types/groupalExpenses'
import { EntityWithIdFields } from '@/types/baseEntities'
import GroupEditDialog from './GroupEditDialog'
interface GroupDataCardProps {
    groups: Group[]
    onSelect: (g: Group) => void
    selectedGroup?: Group
    onSaveEdit: (group: Group) => void
    onDelete: (groupId: number) => void
}

const GroupalDataCard = ({ groups, onSelect, selectedGroup, onSaveEdit, onDelete }: GroupDataCardProps) => {
    return (
        <div className='w-full'>
            {groups.length !== 0 ? (
                groups.map((group, idx) => (
                    <div
                        className={
                            selectedGroup && selectedGroup[EntityWithIdFields.Id] === group[EntityWithIdFields.Id]
                                ? 'w-full flex flex-row items-center justify-between cursor-pointer bg-[#ebebeb] rounded px-4 py-2'
                                : 'w-full flex flex-row items-center justify-between cursor-pointer hover:bg-[#ebebeb] rounded px-4 py-2'
                        }
                        onClick={() => onSelect(group)}
                        key={`group_${idx}`}
                    >
                        <p className='font-medium'>{group[GroupFields.Name]}</p>
                        <div className='flex flex-row items-center gap-1'>
                            <div className='rounded-full p-2 hover:bg-[#ccd3d8]'>
                                <GroupEditDialog group={group} onSubmitEdit={onSaveEdit} />
                            </div>
                            <div className='rounded-full p-2 hover:bg-[#ccd3d8]'>
                                <Trash className='w-4 h-4' onClick={() => onDelete(group[EntityWithIdFields.Id])} />
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <Alert variant='default' className='bg-white rounded-xl space-y-2 p-6'>
                    <div className='flex flex-row gap-2 text-xl items-center'>
                        <AlertCircle />
                        <AlertTitle>Sin grupos</AlertTitle>
                    </div>
                    <AlertDescription>No hay grupos por el momento.</AlertDescription>
                </Alert>
            )}
        </div>
    )
}

export default GroupalDataCard
