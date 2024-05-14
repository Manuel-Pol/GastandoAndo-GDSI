import { Dialog, DialogContent, DialogClose, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Group, GroupFields } from '@/types/groupalExpenses'
import { Button } from '@/components/ui/button'
import { CirclePlusIcon } from 'lucide-react'
import { useForm, FormProvider } from 'react-hook-form'
import {useState, useEffect} from 'react'
import { EntityWithIdFields } from '@/types/baseEntities'
import GroupForm from './GroupForm'

interface GroupalExpensesAddDialogProps {
    onAddGroup: (g: Group) => void
}

const GroupalExpensesAddDialog = ({onAddGroup}: GroupalExpensesAddDialogProps) => {
    const [open, setOpen] = useState<boolean>(false)

    const defaultFormValues: Group = {
        [EntityWithIdFields.Id]: 0,
        [GroupFields.Name]: "",
        [GroupFields.Description]: "",
    }

    const methods = useForm<Group>({
        defaultValues: defaultFormValues
    })

    const onSubmitGroup = (group: Group) => {
        onAddGroup(group)
        setOpen(false)
    }

    useEffect(() => {
        if (open) methods.reset(defaultFormValues)
    }, [open])

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className='bg-[#E34400] hover:bg-[#E34400] rounded text-white py-6 '
                        onClick={() => {
                            setOpen(true)
                        }}
                    >
                        <CirclePlusIcon className='mr-2 text-white ' /> <p className='text-lg'>Agregar</p>
                    </Button>
                </DialogTrigger>
                {open && (
                    <DialogContent className='min-w-[400px] bg-white rounded'>
                        <DialogTitle className='text-black'>Agregar Grupo</DialogTitle>
                        <FormProvider {...methods}>
                            <GroupForm />
                        </FormProvider>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    className='rounded text-black hover:bg-neutral-300'
                                    onClick={methods.handleSubmit(onSubmitGroup)}
                                    disabled={!methods.watch(GroupFields.Name)}
                                >
                                    <CirclePlusIcon className='mr-2 items-center' /> Agregar
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                )}
            </Dialog>
        </div>
    )
}


export default GroupalExpensesAddDialog