import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Edit, Save } from 'lucide-react'
import { Dialog, DialogContent, DialogClose, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { EntityWithIdFields } from '@/types/baseEntities'
import { FormProvider, useForm } from 'react-hook-form'
import { Group, GroupFields } from '@/types/groupalExpenses'
import GroupForm from './GroupForm'

interface GroupEditDialogProps {
    group: Group
    onSubmitEdit: (e: Group) => void
}

const GroupEditDialog = ({ group, onSubmitEdit }: GroupEditDialogProps) => {
    const [openEdit, setOpenEdit] = useState<boolean>(false)

    const onEditExp = () => setOpenEdit(true)

    const defaultFormValues: Group = {
        [EntityWithIdFields.Id]: group[EntityWithIdFields.Id],
        [GroupFields.Description]: group[GroupFields.Description],
        [GroupFields.Name]: group[GroupFields.Name]
    }

    const methods = useForm<Group>({
        defaultValues: defaultFormValues
    })

    const onSubmitExpense = (data: Group) => {
        const submitData: Group = {
            ...data
        }

        onSubmitEdit(submitData)
        setOpenEdit(false)
    }

    useEffect(() => {
        if (openEdit) {
            methods.reset(defaultFormValues)
        }
    }, [openEdit])

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
                            <GroupForm />
                        </FormProvider>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    onClick={methods.handleSubmit(onSubmitExpense)}
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