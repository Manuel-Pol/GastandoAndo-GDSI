import { AlertCircle, Trash } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Group, GroupFields } from '@/types/groupalExpenses'
import { EntityWithIdFields } from '@/types/baseEntities'
import GroupEditDialog from './GroupEditDialog'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface GroupDataCardProps {
    groups: Group[]
    onSelect: (g: Group) => void
    selectedGroup?: Group
    onSaveEdit: (group: Group) => void
    onDelete: (groupId: number) => void
}

const GroupDataCard = ({ groups, onSelect, selectedGroup, onSaveEdit, onDelete }: GroupDataCardProps) => {
    return (
        <div className='w-full'>
            {groups.length !== 0 ? (
                groups.map((group, idx) => (
                    <div
                        className={
                            selectedGroup && selectedGroup[EntityWithIdFields.Id] === group[EntityWithIdFields.Id]
                                ? 'grid grid-cols-[auto,1fr,auto] items-center cursor-pointer bg-[#ebebeb] rounded px-4 py-2'
                                : 'grid grid-cols-[auto,1fr,auto] items-center cursor-pointer hover:bg-[#ebebeb] rounded px-4 py-2'
                        }
                        onClick={() => onSelect(group)}
                        key={`group_${idx}`}
                    >
                        <div className='flex items-center space-x-4'>
                            {group[GroupFields.Image] ? (
                                <img
                                    src={URL.createObjectURL(group[GroupFields.Image])}
                                    className='w-12 h-12 rounded-full cursor-pointer'
                                />
                            ) : (
                                <Avatar className='bg-[#1c7549] w-10 h-10 rounded-full cursor-pointer text-white text-lg'>
                                    <AvatarFallback>{group[GroupFields.Name].charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                            )}
                            <p className='font-medium text-base truncate max-w-[100px]'>{group[GroupFields.Name]}</p>
                        </div>

                        <div className='flex flex-row items-center justify-end space-x-1'>
                            <div className='rounded-full hover:bg-[#ccd3d8]'>
                                <GroupEditDialog group={group} onSubmitEdit={onSaveEdit} />
                            </div>
                            <div className='rounded-full p-3 hover:bg-[#ccd3d8]'>
                                <Trash
                                    className='w-4 h-4 text-red-600'
                                    onClick={event => {
                                        event.preventDefault()
                                        event.stopPropagation() // Evitar la propagación del evento al contenedor del grupo
                                        onDelete(group[EntityWithIdFields.Id])
                                    }}
                                />
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

export default GroupDataCard
