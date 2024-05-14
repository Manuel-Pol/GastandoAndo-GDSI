import { Button } from '@/components/ui/button'
import { ExpenseType, ExpensesInterface, ExpensesInterfaceFields, RecurrenceTypeCodes } from '@/types/personalExpenses'
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
    const [isExpense, setIsExpense] = useState<ExpenseType>(ExpenseType.Gasto)
    const [recurr, setRecurr] = useState<RecurrenceTypeCodes>(RecurrenceTypeCodes.Singular)

    const defaultFormValues: ExpensesInterface = {
        [EntityWithIdFields.Id]: 0,
        [ExpensesInterfaceFields.Image]: '',
        [ExpensesInterfaceFields.Amount]: undefined,
        [ExpensesInterfaceFields.Description]: '',
        [ExpensesInterfaceFields.Title]: '',
        [ExpensesInterfaceFields.IsExpense]: ExpenseType.Gasto,
        [ExpensesInterfaceFields.Date]: new Date(),
        [ExpensesInterfaceFields.Recurrence]: RecurrenceTypeCodes.Singular
    }

    const methods = useForm<ExpensesInterface>({
        defaultValues: defaultFormValues
    })

    useEffect(() => {
        if (open) {
            methods.reset(defaultFormValues)
            setIsExpense(ExpenseType.Gasto)
            setRecurr(RecurrenceTypeCodes.Singular)
        }
    }, [open])

    const onSubmitExpense = (data: ExpensesInterface) => {
        const submitData: ExpensesInterface = {
            ...data,
            [ExpensesInterfaceFields.IsExpense]: isExpense,
            [ExpensesInterfaceFields.Recurrence]: recurr
        }

        console.log(submitData.fecha.toDateString())

        onAddExpense(submitData)
        setOpen(false)
    }
    const onChangeExpense = (expT: ExpenseType) => setIsExpense(expT)

    const onChangeRecurrence = (newRecurr: RecurrenceTypeCodes) => setRecurr(newRecurr)

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
                            <PersonalExpensesAddNewForm
                                onTriggerExpense={onChangeExpense}
                                onTriggerRecurrence={onChangeRecurrence}
                            />
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
