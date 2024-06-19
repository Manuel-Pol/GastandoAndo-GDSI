import { Dialog, DialogContent, DialogClose, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CirclePlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { EntityWithIdAndDescription, EntityWithIdAndDescriptionFields, EntityWithIdFields } from '@/types/baseEntities'
import GroupExpensesAddNewForm from './GroupExpensesAddNewForm'
import { GroupExpensesInterface, GroupExpensesInterfaceFields, GroupMember, GroupMemberFields } from '@/types/groupalExpenses'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface DialogAddGroupMovementProps {
    onAddMovement: (m: GroupExpensesInterface) => void
    groupMembers: GroupMember[]
}

const schema = z.object({
    [GroupExpensesInterfaceFields.Title]: z.string({ message: 'Este campo es obligatorio.' }),
    [GroupExpensesInterfaceFields.Description]: z.string().optional(),
    [GroupExpensesInterfaceFields.Amount]: z.coerce
        .number({ message: 'Este campo es obligatorio.' })
        .positive({ message: 'El monto debe ser mayor a 0.' }),
    [GroupExpensesInterfaceFields.Payer]: z.string({ message: 'Este campo es obligatorio.' })
})

const DialogAddGroupMovement = ({ onAddMovement, groupMembers }: DialogAddGroupMovementProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const defaultDebtors: EntityWithIdAndDescription[] = []
    const [debtors, setDebtors] = useState<EntityWithIdAndDescription[]>(defaultDebtors)
    const [payer, setPayer] = useState<string>('')

    const methods = useForm<GroupExpensesInterface>({
        resolver: zodResolver(schema),
        mode: 'onBlur'
    })

    useEffect(() => {
        if (open) {
            methods.reset()
            setDebtors(defaultDebtors)
        }
    }, [open])

    const onSubmitMovement = (data: GroupExpensesInterface) => {
        const newDebtors = debtors.map((d) => {
            return {
                ...d,
                [GroupMemberFields.Amount]: 0
            }
        })

        const newPayer = groupMembers.find((g) => g[EntityWithIdAndDescriptionFields.Description] == payer)

        const payerUpdated = {
            [EntityWithIdFields.Id]: newPayer?.[EntityWithIdFields.Id] ?? 0,
            [EntityWithIdAndDescriptionFields.Description]: payer,
            [GroupMemberFields.Amount]: 0
        }
        
        const submitData: GroupExpensesInterface = {
            ...data,
            [GroupExpensesInterfaceFields.Debtors]: newDebtors,
            [GroupExpensesInterfaceFields.Payer]: payerUpdated
        }
        
        onAddMovement(submitData)
        setOpen(false)
        methods.reset()
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
                                setSelectedPayer={setPayer}
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
