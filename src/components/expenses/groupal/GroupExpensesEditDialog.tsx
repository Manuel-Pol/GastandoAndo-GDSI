import { EntityWithIdAndDescription, EntityWithIdAndDescriptionFields, EntityWithIdFields } from '@/types/baseEntities'
import { GroupExpensesInterface, GroupExpensesInterfaceFields, GroupMember, GroupMemberFields } from '@/types/groupalExpenses'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Edit, Save } from 'lucide-react'
import { Dialog, DialogContent, DialogClose, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { FormProvider, useForm } from 'react-hook-form'
import GroupExpensesAddNewForm from './GroupExpensesAddNewForm'

interface GroupExpensesEditDialogProps {
    expense: GroupExpensesInterface
    friends: GroupMember[]
    onSaveEdit: (exp: GroupExpensesInterface) => void
}

const entityToIdAndDescription = (e: GroupMember[]) => {
    const entityMapped = e.map((a) => {
        return {id: a[EntityWithIdFields.Id], descripcion: a[EntityWithIdAndDescriptionFields.Description]}
    })
    return entityMapped
}

const GroupExpensesEditDialog = ({ expense, friends, onSaveEdit }: GroupExpensesEditDialogProps) => {
    const [openEdit, setOpenEdit] = useState<boolean>(false)
    const [debtors, setDebtors] = useState<EntityWithIdAndDescription[]>(entityToIdAndDescription(expense[GroupExpensesInterfaceFields.Debtors]))
    const [payer, setPayer] = useState<string>(expense[GroupExpensesInterfaceFields.Payer][EntityWithIdAndDescriptionFields.Description])


    const onSelectDebtor = (debtor: EntityWithIdAndDescription) => {
        setDebtors([...debtors, debtor])
    }

    const onUnselectDebtor = (debtor: EntityWithIdAndDescription) => {
        setDebtors(debtors.filter(value => value[EntityWithIdFields.Id] !== debtor[EntityWithIdFields.Id]))
    }

    const defaultFormValues: GroupExpensesInterface = {
        [EntityWithIdFields.Id]: expense[EntityWithIdFields.Id],
        [GroupExpensesInterfaceFields.Amount]: expense[GroupExpensesInterfaceFields.Amount],
        [GroupExpensesInterfaceFields.Description]: expense[GroupExpensesInterfaceFields.Description],
        [GroupExpensesInterfaceFields.Title]: expense[GroupExpensesInterfaceFields.Title],
        [GroupExpensesInterfaceFields.Debtors]: expense[GroupExpensesInterfaceFields.Debtors],
        [GroupExpensesInterfaceFields.Payer]: expense[GroupExpensesInterfaceFields.Payer][EntityWithIdAndDescriptionFields.Description],
        [GroupExpensesInterfaceFields.Date]: expense[GroupExpensesInterfaceFields.Date]
    }

    const methods = useForm<GroupExpensesInterface>({
        defaultValues: defaultFormValues
    })

    const onSubmitExpense = (data: GroupExpensesInterface) => {
        const newDebtors = debtors.map((d) => {
            return {
                ...d,
                [GroupMemberFields.Amount]: 0
            }
        })

        const newPayer = friends.find((g) => g[EntityWithIdAndDescriptionFields.Description] == payer)

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
        
        onSaveEdit(submitData)
        setOpenEdit(false)
    }

    useEffect(() => {
        if (openEdit) {
            methods.reset(defaultFormValues)
            setDebtors(expense[GroupExpensesInterfaceFields.Debtors])
            setPayer(expense[GroupExpensesInterfaceFields.Payer][EntityWithIdAndDescriptionFields.Description])
        }
    }, [openEdit])

    const onEditExp = () => setOpenEdit(true)

    const friendsParams = friends.map((f) => {return {id: f.id, descripcion: f.descripcion}})

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant='outline' size='icon' className='rounded-full border-none p-3 hover:bg-[#ccd3d8]' onClick={onEditExp}>
                        <Edit className='h-4 w-4' color='#3B82F6' />
                    </Button>
                </DialogTrigger>
                {openEdit && (
                    <DialogContent className='min-w-[400px] bg-white rounded'>
                        <DialogTitle className='text-black mb-2'>Editar Movimiento</DialogTitle>
                        <FormProvider {...methods}>
                            <GroupExpensesAddNewForm
                                groupMembers={friendsParams}
                                setSelectedPayer={setPayer}
                                selectedDebtors={debtors}
                                onSelectDebtor={onSelectDebtor}
                                onUnselectDebtor={onUnselectDebtor}
                            />
                        </FormProvider>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    onClick={methods.handleSubmit(onSubmitExpense)}
                                    disabled={!methods.watch(GroupExpensesInterfaceFields.Amount)}
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

export default GroupExpensesEditDialog
