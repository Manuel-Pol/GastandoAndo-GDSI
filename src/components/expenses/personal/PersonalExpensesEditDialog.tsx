import { ExpensesInterface, ExpensesInterfaceFields } from '@/types/personalExpenses'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Edit, Save } from 'lucide-react'
import { Dialog, DialogContent, DialogClose, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { EntityWithIdFields } from '@/types/baseEntities'
import { FormProvider, useForm } from 'react-hook-form'
import PersonalExpensesAddNewForm from './PersonalExpensesAddNewForm'

interface PersonalExpensesEditDialogProps {
    expense: ExpensesInterface
    onSubmitEdit: (e: ExpensesInterface) => void
}

const PersonalExpensesEditDialog = ({ expense, onSubmitEdit }: PersonalExpensesEditDialogProps) => {
    const [openEdit, setOpenEdit] = useState<boolean>(false)
    const [img, setImg] = useState<string | ArrayBuffer | null | undefined>(expense[ExpensesInterfaceFields.Image])

    const onEditExp = () => setOpenEdit(true)

    const defaultFormValues: ExpensesInterface = {
        [EntityWithIdFields.Id]: expense[EntityWithIdFields.Id],
        [ExpensesInterfaceFields.Image]: undefined,
        [ExpensesInterfaceFields.Amount]: expense[ExpensesInterfaceFields.Amount],
        [ExpensesInterfaceFields.Description]: expense[ExpensesInterfaceFields.Description],
        [ExpensesInterfaceFields.Title]: expense[ExpensesInterfaceFields.Title],
        [ExpensesInterfaceFields.IsExpense]: expense[ExpensesInterfaceFields.IsExpense],
        [ExpensesInterfaceFields.Recurrence]: expense[ExpensesInterfaceFields.Recurrence],
        [ExpensesInterfaceFields.Date]: expense[ExpensesInterfaceFields.Date]
    }

    const methods = useForm<ExpensesInterface>({
        defaultValues: defaultFormValues
    })

    const onSubmitExpense = (data: ExpensesInterface) => {
        const submitData: ExpensesInterface = {
            ...data,
            [ExpensesInterfaceFields.Image]: img
        }

        onSubmitEdit(submitData)
        setOpenEdit(false)
    }

    useEffect(() => {
        if (openEdit) {
            methods.reset(defaultFormValues)
            setImg(expense[ExpensesInterfaceFields.Image])
        }
    }, [openEdit])

    const onChangeImage = (img: string | ArrayBuffer | null) => setImg(img)

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant='outline'
                        size='icon'
                        className='rounded-full border-none p-3 hover:bg-[#ccd3d8]'
                        onClick={onEditExp}
                    >
                        <Edit className='h-4 w-4' color='#3B82F6' />
                    </Button>
                </DialogTrigger>
                {openEdit && (
                    <DialogContent className='min-w-[400px] bg-white rounded'>
                        <DialogTitle className='text-black mb-2'>Editar Movimiento</DialogTitle>
                        <FormProvider {...methods}>
                            <PersonalExpensesAddNewForm onTriggerImage={onChangeImage} prevImg={img} />
                        </FormProvider>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    onClick={methods.handleSubmit(onSubmitExpense)}
                                    disabled={!methods.watch(ExpensesInterfaceFields.Amount)}
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

export default PersonalExpensesEditDialog
