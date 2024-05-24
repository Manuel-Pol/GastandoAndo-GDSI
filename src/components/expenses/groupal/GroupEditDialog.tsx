import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Edit, Save } from 'lucide-react'
import { Dialog, DialogContent, DialogClose, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { EntityWithIdFields, EntityWithIdAndDescription } from '@/types/baseEntities'
import { FormProvider, useForm } from 'react-hook-form'
import { Group, GroupFields, defaultFriends } from '@/types/groupalExpenses'
import GroupForm from './GroupForm'

interface GroupEditDialogProps {
    group: Group
    onSubmitEdit: (e: Group) => void
}

const GroupEditDialog = ({ group, onSubmitEdit }: GroupEditDialogProps) => {
    const [openEdit, setOpenEdit] = useState<boolean>(false)
    const [img, setImg] = useState<File | undefined>(group[GroupFields.Image])
    const [members, setMembers] = useState<EntityWithIdAndDescription[]>(group[GroupFields.Members])

    const onEditExp = () => setOpenEdit(true)

    const defaultFormValues: Group = {
        [EntityWithIdFields.Id]: group[EntityWithIdFields.Id],
        [GroupFields.Description]: group[GroupFields.Description],
        [GroupFields.Name]: group[GroupFields.Name],
        [GroupFields.Members]: group[GroupFields.Members],
        [GroupFields.Image]: group[GroupFields.Image]
    }

    const methods = useForm<Group>({
        defaultValues: defaultFormValues
    })

    const onSubmitGroup = (data: Group) => {
        const submitData: Group = {
            ...data,
            [GroupFields.Image]: img,
            [GroupFields.Members]: members
        }

        onSubmitEdit(submitData)
        setOpenEdit(false)
    }

    useEffect(() => {
        if (openEdit) {
            methods.reset(defaultFormValues)
            setImg(group[GroupFields.Image])
            setMembers(group[GroupFields.Members])
        }
    }, [openEdit])

    const onTriggerImage = (newImg: File) => setImg(newImg)

    const onSelectMember = (member: EntityWithIdAndDescription) => {
        setMembers([...members, member])
    }

    const onUnselectMember = (member: EntityWithIdAndDescription) => {
        setMembers(members.filter(value => value[EntityWithIdFields.Id] !== member[EntityWithIdFields.Id]))
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant='outline' size='icon' className='rounded-full border-none' onClick={onEditExp}>
                        <Edit className='h-4 w-4' color='#3B82F6' />
                    </Button>
                </DialogTrigger>
                {openEdit && (
                    <DialogContent className='min-w-[400px] bg-white rounded'>
                        <DialogTitle className='text-black mb-2'>Editar Grupo</DialogTitle>
                        <FormProvider {...methods}>
                            <GroupForm onTriggerImage={onTriggerImage} prevImg={img} friends={defaultFriends}
                                       onSelectMember={onSelectMember} selectedMembers={members} onUnselectMember={onUnselectMember}
                            />
                        </FormProvider>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    onClick={methods.handleSubmit(onSubmitGroup)}
                                    disabled={!methods.watch(GroupFields.Name)}
                                >
                                    <Save className='mr-2 items-center' /> Guardar
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                )}
            </Dialog>
        </div>
    )
}

export default GroupEditDialog
