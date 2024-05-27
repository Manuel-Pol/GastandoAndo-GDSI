import { Button } from '@/components/ui/button'
import { ExpenseType, ExpensesInterface, ExpensesInterfaceFields, RecurrenceType } from '@/types/personalExpenses'
import { Dialog, DialogContent, DialogClose, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { CirclePlusIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import PersonalExpensesAddNewForm from './PersonalExpensesAddNewForm'
import { EntityWithIdFields } from '@/types/baseEntities'

interface PersonalExpensesAddNewDialogProps {
    onAddExpense: (exp: ExpensesInterface) => void
}

const PersonalExpensesAddNewDialog = ({ onAddExpense }: PersonalExpensesAddNewDialogProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const [img, setImg] = useState<File>()

    const defaultFormValues: ExpensesInterface = {
        [EntityWithIdFields.Id]: 0,
        [ExpensesInterfaceFields.Image]: undefined,
        [ExpensesInterfaceFields.Amount]: undefined,
        [ExpensesInterfaceFields.Description]: '',
        [ExpensesInterfaceFields.Title]: '',
        [ExpensesInterfaceFields.IsExpense]: ExpenseType.Gasto,
        [ExpensesInterfaceFields.Date]: new Date(),
        [ExpensesInterfaceFields.Recurrence]: RecurrenceType.Singular
    }

    const methods = useForm<ExpensesInterface>({
        defaultValues: defaultFormValues
    })

    useEffect(() => {
        if (open) {
            methods.reset(defaultFormValues)
        }
    }, [open])

    const onSubmitExpense = (data: ExpensesInterface) => {
        const submitData: ExpensesInterface = {
            ...data,
            [ExpensesInterfaceFields.Image]: img
        }

        onAddExpense(submitData)
        setOpen(false)
    }

    const onTriggerImage = (newImg: File) => setImg(newImg)

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
                        <DialogTitle className='text-black'>Agregar Movimiento</DialogTitle>
                        <FormProvider {...methods}>
                            <PersonalExpensesAddNewForm onTriggerImage={onTriggerImage} />
                        </FormProvider>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    className='rounded text-black hover:bg-neutral-300'
                                    onClick={methods.handleSubmit(onSubmitExpense)}
                                    disabled={!methods.watch(ExpensesInterfaceFields.Amount)}
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

export default PersonalExpensesAddNewDialog
