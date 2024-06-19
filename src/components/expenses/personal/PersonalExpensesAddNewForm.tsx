import { ExpensesInterfaceFields, ExpenseType, RecurrenceType, PriorityType } from '@/types/personalExpenses'
import { Form, useFormContext } from 'react-hook-form'

import { useEffect, useState } from 'react'
import { TextField } from '@/components/forms/TextField'
import { TextArea } from '@/components/forms/TextArea'
import { FileField } from '@/components/forms/FileField'
import { SelectField } from '@/components/forms/SelectField'
import { DateField } from '@/components/forms/DateField'

interface PersonalExpensesAddNewFormProps {
    onTriggerImage: (img: string | ArrayBuffer | null) => void
    prevImg?: string | ArrayBuffer | null
}

const PersonalExpensesAddNewForm = ({ onTriggerImage, prevImg }: PersonalExpensesAddNewFormProps) => {
    const methods = useFormContext()
    const watchFile = methods.watch(ExpensesInterfaceFields.Image)
    const watchIsExpense = methods.watch(ExpensesInterfaceFields.IsExpense)
    const [enablePriority, setEnablePriority] = useState<boolean>(false)
    const [img, setImg] = useState<string | ArrayBuffer | null>(null)

    useEffect(() => {
        if (watchFile && typeof watchFile !== 'string') {
            const reader = new FileReader()

            reader.onloadend = () => {
                onTriggerImage(reader.result)
            }

            reader.readAsDataURL(watchFile)
        }
    }, [watchFile])

    useEffect(() => {
        setEnablePriority(false)
        if (watchIsExpense == ExpenseType.Gasto) {
            setEnablePriority(true)
        }
        methods.setValue(ExpensesInterfaceFields.Priority, undefined)
    }, [watchIsExpense])

    useEffect(() => {
        if (prevImg) {
            methods.setValue(ExpensesInterfaceFields.Image, prevImg)
            setImg(prevImg)
        }
    }, [prevImg])

    return (
        <Form {...methods}>
            <div className='flex flex-col gap-2 justify-center'>
                <TextField label='Titulo' name={ExpensesInterfaceFields.Title} control={methods.control} />
                <TextArea label='Descripcion' name={ExpensesInterfaceFields.Description} control={methods.control} />
                <FileField control={methods.control} name={ExpensesInterfaceFields.Image} label='Imagen' img={img} />
                <TextField
                    label='Monto'
                    name={ExpensesInterfaceFields.Amount}
                    control={methods.control}
                    adornment='$'
                />
                <div className='flex flex-row justify-between items-center'>
                    <SelectField
                        control={methods.control}
                        name={ExpensesInterfaceFields.IsExpense}
                        label='Tipo de movimiento'
                        values={[ExpenseType.Gasto, ExpenseType.Ingreso]}
                    />
                    <SelectField
                        control={methods.control}
                        name={ExpensesInterfaceFields.Recurrence}
                        label='Frecuencia'
                        values={[
                            RecurrenceType.Quarter,
                            RecurrenceType.Monthly,
                            RecurrenceType.Weekly,
                            RecurrenceType.Diary,
                            RecurrenceType.Singular
                        ]}
                    />
                </div>
                <div className='flex flex-row justify-between items-center space-x-4'>
                    <DateField control={methods.control} name={ExpensesInterfaceFields.Date} label='Fecha'/>
                    {
                        enablePriority &&
                        <SelectField control={methods.control}
                                    name={ExpensesInterfaceFields.Priority}
                                    placeholder='Seleccione la prioridad'
                                    label='Prioridad'
                                    values={[
                                        PriorityType.Essential,
                                        PriorityType.High,
                                        PriorityType.Medium,
                                        PriorityType.Low,
                                        PriorityType.Disposable,
                                    ]}
                        />
                    }
                </div>
            </div>
        </Form>
    )
}

export default PersonalExpensesAddNewForm
