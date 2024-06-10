import { Button } from '@/components/ui/button'
import { ExpenseType, ExpensesInterface, ExpensesInterfaceFields, PriorityType, RecurrenceType } from '@/types/personalExpenses'
import { Dialog, DialogContent, DialogClose, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { CirclePlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import PersonalExpensesAddNewForm from './PersonalExpensesAddNewForm'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface PersonalExpensesAddNewDialogProps {
    onAddExpense: (exp: ExpensesInterface) => void
}

const schema = z.object({
    [ExpensesInterfaceFields.Title]: z.string({ message: 'Este campo es obligatorio.' }),
    [ExpensesInterfaceFields.Description]: z.string().optional(),
    [ExpensesInterfaceFields.Amount]: z.coerce
        .number({ message: 'Este campo es obligatorio.' })
        .positive({ message: 'El monto debe ser mayor a 0.' }),
    [ExpensesInterfaceFields.Date]: z.date({ message: 'Este campo es obligatorio.' }),
    [ExpensesInterfaceFields.IsExpense]: z.nativeEnum(ExpenseType, { message: 'Este campo es obligatorio.' }),
    [ExpensesInterfaceFields.Recurrence]: z.nativeEnum(RecurrenceType, { message: 'Este campo es obligatorio.' }),
    [ExpensesInterfaceFields.Priority]: z.nativeEnum(PriorityType, { message: 'Este campo es obligatorio.' }).optional()
})

const refinedSchema = schema.refine(data => {
    if (data[ExpensesInterfaceFields.IsExpense] === ExpenseType.Gasto && !data[ExpensesInterfaceFields.Priority]) {
        return false
    }
    return true
    }, {
        message: 'Este campo es obligatorio',
        path: [ExpensesInterfaceFields.Priority]
    }
)

const PersonalExpensesAddNewDialog = ({ onAddExpense }: PersonalExpensesAddNewDialogProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const [img, setImg] = useState<string | ArrayBuffer | null>()

    const methods = useForm<ExpensesInterface>({
        resolver: zodResolver(refinedSchema),
        mode: 'onBlur'
    })

    useEffect(() => {
        methods.reset()
        setImg(null)
    }, [open])

    const onSubmitExpense = (data: ExpensesInterface) => {
        const submitData: ExpensesInterface = {
            ...data,
            [ExpensesInterfaceFields.Image]: img
        }

        onAddExpense(submitData)
        setOpen(false)
        methods.reset()
    }

    const onTriggerImage = (newImg: string | ArrayBuffer | null) => setImg(newImg)

    return (
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
    )
}

export default PersonalExpensesAddNewDialog
