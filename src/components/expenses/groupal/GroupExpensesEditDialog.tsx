import { EntityWithIdAndDescription, EntityWithIdFields } from "@/types/baseEntities";
import { GroupExpensesInterface, GroupExpensesInterfaceFields } from "@/types/groupalExpenses";
import { useEffect, useState } from "react";
import { Button } from '@/components/ui/button'
import { Edit, Save } from 'lucide-react'
import { Dialog, DialogContent, DialogClose, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { FormProvider, useForm } from "react-hook-form";
import GroupExpensesAddNewForm from "./GroupExpensesAddNewForm";

interface GroupExpensesEditDialogProps {
    expense: GroupExpensesInterface,
    friends: EntityWithIdAndDescription[],
    onSaveEdit: (exp: GroupExpensesInterface) => void
}

const GroupExpensesEditDialog = ({expense, friends, onSaveEdit} : GroupExpensesEditDialogProps) => {
    const [openEdit, setOpenEdit] = useState<boolean>(false)
    const [debtors, setDebtors] = useState<EntityWithIdAndDescription[]>(expense[GroupExpensesInterfaceFields.Debtors])

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
        [GroupExpensesInterfaceFields.Payers]: expense[GroupExpensesInterfaceFields.Payers],
        [GroupExpensesInterfaceFields.Date]: expense[GroupExpensesInterfaceFields.Date]
    }

    const methods = useForm<GroupExpensesInterface>({
        defaultValues: defaultFormValues
    })

    const onSubmitExpense = (data: GroupExpensesInterface) => {
        const submitData: GroupExpensesInterface = {
            ...data,
            [GroupExpensesInterfaceFields.Debtors]: debtors
        }

        onSaveEdit(submitData)
        setOpenEdit(false)
    }

    useEffect(() => {
        if (openEdit) {
            methods.reset(defaultFormValues)
            setDebtors(expense[GroupExpensesInterfaceFields.Debtors])
        }
    }, [openEdit])

    const onEditExp = () => setOpenEdit(true)


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
                        <DialogTitle className='text-black mb-2'>Editar Movimiento</DialogTitle>
                        <FormProvider {...methods}>
                            <GroupExpensesAddNewForm
                                friends={friends}
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