import { Dialog, DialogContent, DialogClose, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CirclePlusIcon } from 'lucide-react'
import { ExpenseType, ExpensesInterface, ExpensesInterfaceFields, RecurrenceTypeCodes } from '@/types/personalExpenses'
import { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { EntityWithIdFields } from '@/types/baseEntities'
import PersonalExpensesAddNewForm from '../personal/PersonalExpensesAddNewForm'


interface DialogAddGroupMovementProps {
    onAddMovement: (m: ExpensesInterface) => void
}


const DialogAddGroupMovement = ({onAddMovement}: DialogAddGroupMovementProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const [isExpense, setIsExpense] = useState<ExpenseType>(ExpenseType.Gasto)
    const [recurr, setRecurr] = useState<RecurrenceTypeCodes>(RecurrenceTypeCodes.Singular)
    const [img, setImg] = useState<File>()

    const defaultFormValues: ExpensesInterface = {
        [EntityWithIdFields.Id]: 0,
        [ExpensesInterfaceFields.Image]: undefined,
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

    const onSubmitMovement = (data: ExpensesInterface) => {
        const submitData: ExpensesInterface = {
            ...data,
            [ExpensesInterfaceFields.IsExpense]: isExpense,
            [ExpensesInterfaceFields.Recurrence]: recurr,
            [ExpensesInterfaceFields.Image]: img
        }

        onAddMovement(submitData)
        setOpen(false)
    }

    const onChangeExpense = (expT: ExpenseType) => setIsExpense(expT)

    const onChangeRecurrence = (newRecurr: RecurrenceTypeCodes) => setRecurr(newRecurr)

    const onTriggerImage = (newImg: File) => setImg(newImg)

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
                            <PersonalExpensesAddNewForm
                                    onTriggerExpense={onChangeExpense}
                                    onTriggerImage={onTriggerImage}
                                    onTriggerRecurrence={onChangeRecurrence}
                            />
                        </FormProvider>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    className='rounded text-black hover:bg-neutral-300'
                                    onClick={methods.handleSubmit(onSubmitMovement)}
                                    disabled={!methods.watch(ExpensesInterfaceFields.Amount)}
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