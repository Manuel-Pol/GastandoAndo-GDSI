import { ExpensesInterfaceFields, ExpenseType, RecurrenceTypeCodes } from '@/types/personalExpenses'
import { Form, useFormContext } from 'react-hook-form'

import { useEffect, useState } from 'react'
import { TextField } from '@/components/forms/TextField'
import { TextArea } from '@/components/forms/TextArea'
import { DateField } from '@/components/forms/DateField'
import { FileField } from '@/components/forms/FileField'
import { SelectField } from '@/components/forms/SelectField'
import { getExpenseRecurrence } from '@/utils/mappers/movementMappers'

interface PersonalExpensesAddNewFormProps {
    onTriggerExpense: (expT: ExpenseType) => void
    onTriggerRecurrence: (freq: RecurrenceTypeCodes) => void
    onTriggerImage: (img: File) => void
    prevImg?: File
}

const PersonalExpensesAddNewForm = ({
    onTriggerExpense,
    onTriggerRecurrence,
    onTriggerImage,
    prevImg
}: PersonalExpensesAddNewFormProps) => {
    const methods = useFormContext()
    const watchFile = methods.watch(ExpensesInterfaceFields.Image)
    const [img, setImg] = useState<string | ArrayBuffer | null>(null)

    useEffect(() => {
        if (watchFile) onTriggerImage(watchFile)
    }, [watchFile])

    useEffect(() => {
        if (prevImg) {
            methods.setValue(ExpensesInterfaceFields.Image, prevImg)
            const reader = new FileReader()

            reader.onloadend = () => {
                setImg(reader.result)
            }

            reader.readAsDataURL(prevImg)
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
                        onValueChange={(e: ExpenseType) => onTriggerExpense(e)}
                        defaultValue={methods.getValues(ExpensesInterfaceFields.IsExpense).toString()}
                    />
                    <SelectField
                        control={methods.control}
                        name={ExpensesInterfaceFields.Recurrence}
                        label='Frecuencia'
                        onValueChange={(e: string) => onTriggerRecurrence(parseInt(e))}
                        defaultValue={getExpenseRecurrence(RecurrenceTypeCodes.Singular)}
                        values={[
                            getExpenseRecurrence(RecurrenceTypeCodes.Quarter),
                            getExpenseRecurrence(RecurrenceTypeCodes.Monthly),
                            getExpenseRecurrence(RecurrenceTypeCodes.Weekly),
                            getExpenseRecurrence(RecurrenceTypeCodes.Diary),
                            getExpenseRecurrence(RecurrenceTypeCodes.Singular)
                        ]}
                    />
                </div>
                <DateField control={methods.control} name={ExpensesInterfaceFields.Date} label='Fecha' />
            </div>
        </Form>
    )
}

export default PersonalExpensesAddNewForm
