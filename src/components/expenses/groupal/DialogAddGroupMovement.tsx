import { Dialog, DialogContent, DialogClose, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CirclePlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { EntityWithIdAndDescription, EntityWithIdAndDescriptionFields, EntityWithIdFields } from '@/types/baseEntities'
import GroupExpensesAddNewForm from './GroupExpensesAddNewForm'
import { GroupExpensesInterface, GroupExpensesInterfaceFields } from '@/types/groupalExpenses'

interface DialogAddGroupMovementProps {
    onAddMovement: (m: GroupExpensesInterface) => void
    groupMembers: EntityWithIdAndDescription[]
}

const DialogAddGroupMovement = ({ onAddMovement, groupMembers }: DialogAddGroupMovementProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const defaultDebtors: EntityWithIdAndDescription[] = [
        { [EntityWithIdFields.Id]: 0, [EntityWithIdAndDescriptionFields.Description]: '' }
    ]
    const [debtors, setDebtors] = useState<EntityWithIdAndDescription[]>(defaultDebtors)

    const defaultFormValues: GroupExpensesInterface = {
        [EntityWithIdFields.Id]: 0,
        [GroupExpensesInterfaceFields.Title]: '',
        [GroupExpensesInterfaceFields.Description]: '',
        [GroupExpensesInterfaceFields.Amount]: undefined,
        [GroupExpensesInterfaceFields.Payer]: '',
        [GroupExpensesInterfaceFields.Debtors]: defaultDebtors,
        [GroupExpensesInterfaceFields.Date]: new Date()
    }

    const methods = useForm<GroupExpensesInterface>({
        defaultValues: defaultFormValues
    })

    useEffect(() => {
        if (open) {
            methods.reset(defaultFormValues)
        }
    }, [open])

    const onSubmitMovement = (data: GroupExpensesInterface) => {
        const submitData: GroupExpensesInterface = {
            ...data,
            [GroupExpensesInterfaceFields.Debtors]: debtors
        }

        console.log(submitData)

        onAddMovement(submitData)
        setOpen(false)
    }

    const onSelectDebtor = (debtor: EntityWithIdAndDescription) => {
        setDebtors([...debtors, debtor])
    }

    const onUnselectDebtor = (debtor: EntityWithIdAndDescription) => {
        setDebtors(debtors.filter(value => value[EntityWithIdFields.Id] !== debtor[EntityWithIdFields.Id]))
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className='bg-[#1b2766] hover:bg-[#1b2766] rounded text-white py-4'
                        onClick={() => {
                            setOpen(true)
                        }}
                    >
                        <CirclePlusIcon className='mr-2 text-white ' /> <p className='text-lg'>Agregar</p>
                    </Button>
                </DialogTrigger>
                {open && (
                    <DialogContent className='min-w-[400px] bg-white rounded'>
                        <DialogTitle className='text-black'>Nuevo movimiento grupal</DialogTitle>
                        <FormProvider {...methods}>
                            <GroupExpensesAddNewForm
                                groupMembers={groupMembers}
                                selectedDebtors={debtors}
                                onSelectDebtor={onSelectDebtor}
                                onUnselectDebtor={onUnselectDebtor}
                            />
                        </FormProvider>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    className='rounded text-black hover:bg-neutral-300'
                                    onClick={methods.handleSubmit(onSubmitMovement, console.log)}
                                    disabled={!methods.watch(GroupExpensesInterfaceFields.Amount)}
                                >
                                    <CirclePlusIcon className='mr-2 items-center' /> Aceptar
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                )}
            </Dialog>
        </div>
    )
}

export default DialogAddGroupMovement
