import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ExpensesInterfaceFields, ExpenseType, RecurrenceTypeCodes } from '@/types/personalExpenses'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFormContext } from 'react-hook-form'
import { DatePicker } from './DatePicker'
import { useEffect } from 'react'

interface PersonalExpensesAddNewFormProps {
    onTriggerExpense: (expT: ExpenseType) => void
    onTriggerRecurrence: (freq: RecurrenceTypeCodes) => void,
    onTriggerImage: (img: File) => void,
    prevImg?: File
}

const PersonalExpensesAddNewForm = ({ onTriggerExpense, onTriggerRecurrence, onTriggerImage, prevImg }: PersonalExpensesAddNewFormProps) => {
    const methods = useFormContext()
    const watchFile = methods.watch(ExpensesInterfaceFields.Image)

    useEffect(() => {
        if (watchFile) onTriggerImage(watchFile)
    }, [watchFile])

    useEffect(() => {
        if (prevImg) {
            methods.setValue(ExpensesInterfaceFields.Image, prevImg)
        }
    }, [prevImg])

    return (
        <Form {...methods}>
            <div className='flex flex-col gap-2 justify-center'>
                <FormField
                    control={methods.control}
                    name={ExpensesInterfaceFields.Title}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Titulo</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={methods.control}
                    name={ExpensesInterfaceFields.Description}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripcion</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={methods.control}
                    name={ExpensesInterfaceFields.Image}
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                        <FormItem>
                            <FormLabel>Imagen</FormLabel>
                            <FormControl>
                                <Input {...fieldProps} type='file'
                                        accept="image/*, application/pdf"
                                        onChange={(event) =>
                                          onChange(event.target.files && event.target.files[0])
                                        }
                                        defaultValue={methods.getValues(ExpensesInterfaceFields.Image)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={methods.control}
                    name={ExpensesInterfaceFields.Amount}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='mr-2'>Monto</FormLabel>
                            <div className='w-full'>
                                <FormControl>
                                    <Input placeholder='' {...field} startAdornment={<h5>$</h5>} />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex flex-row justify-between items-center'>
                    <FormField
                        rules={{ required: true }}
                        control={methods.control}
                        name={ExpensesInterfaceFields.IsExpense}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo de movimiento</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(e: ExpenseType) => onTriggerExpense(e)}
                                        defaultValue={methods.getValues(ExpensesInterfaceFields.IsExpense)}
                                    >
                                        <SelectTrigger className='w-[200px]'>
                                            <SelectValue placeholder='Tipo de movimiento' />
                                        </SelectTrigger>
                                        <SelectContent className='bg-white'>
                                            <SelectGroup>
                                                <SelectItem className='cursor-pointer' value={ExpenseType.Gasto}>
                                                    Gasto
                                                </SelectItem>
                                                <SelectItem className='cursor-pointer' value={ExpenseType.Ingreso}>
                                                    Ingreso
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        rules={{ required: true }}
                        control={methods.control}
                        name={ExpensesInterfaceFields.Recurrence}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Frecuencia</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(e: string) => onTriggerRecurrence(parseInt(e))}
                                        defaultValue={methods.getValues(ExpensesInterfaceFields.Recurrence).toString()}
                                    >
                                        <SelectTrigger className='w-[200px]'>
                                            <SelectValue placeholder='Frecuencia' />
                                        </SelectTrigger>
                                        <SelectContent className='bg-white'>
                                            <SelectGroup>
                                                <SelectItem
                                                    className='cursor-pointer'
                                                    value={`${RecurrenceTypeCodes.Quarter}`}
                                                >
                                                    Trimestral
                                                </SelectItem>
                                                <SelectItem
                                                    className='cursor-pointer'
                                                    value={`${RecurrenceTypeCodes.Monthly}`}
                                                >
                                                    Mensual
                                                </SelectItem>
                                                <SelectItem
                                                    className='cursor-pointer'
                                                    value={`${RecurrenceTypeCodes.Weekly}`}
                                                >
                                                    Semanal
                                                </SelectItem>
                                                <SelectItem
                                                    className='cursor-pointer'
                                                    value={`${RecurrenceTypeCodes.Diary}`}
                                                >
                                                    Diario
                                                </SelectItem>
                                                <SelectItem
                                                    className='cursor-pointer'
                                                    value={`${RecurrenceTypeCodes.Singular}`}
                                                >
                                                    Singular
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={methods.control}
                    name={ExpensesInterfaceFields.Date}
                    render={({ field }) => (
                        <div className='space-y-2'>
                            <FormLabel>Fecha</FormLabel>
                            <FormItem>
                                <FormControl>
                                    <DatePicker {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </div>
                    )}
                />
            </div>
        </Form>
    )
}

export default PersonalExpensesAddNewForm
