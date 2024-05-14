import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ExpensesInterfaceFields, ExpenseType, FrequencyTypeCodes } from '@/types/personalExpenses'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFormContext } from 'react-hook-form'
import { DatePicker } from './DatePicker'

interface PersonalExpensesAddNewFormProps {
    onTriggerExpense: (expT: ExpenseType) => void,
    onTriggerFrequency: (freq: FrequencyTypeCodes) => void
}

const PersonalExpensesAddNewForm = ({ onTriggerExpense, onTriggerFrequency }: PersonalExpensesAddNewFormProps) => {
    const methods = useFormContext()

    return (
        <Form {...methods}>
            <div className='flex flex-col gap-4 justify-center'>
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
                        name={ExpensesInterfaceFields.Frequency}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Frecuencia</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(e: string) => onTriggerFrequency(parseInt(e))}
                                        defaultValue={(methods.getValues(ExpensesInterfaceFields.Frequency)).toString()}
                                    >
                                        <SelectTrigger className='w-[200px]'>
                                            <SelectValue placeholder='Frecuencia' />
                                        </SelectTrigger>
                                        <SelectContent className='bg-white'>
                                            <SelectGroup>
                                                <SelectItem className='cursor-pointer' value={`${FrequencyTypeCodes.Quarter}`}>
                                                    Trimestral
                                                </SelectItem>
                                                <SelectItem className='cursor-pointer' value={`${FrequencyTypeCodes.Monthly}`}>
                                                    Mensual
                                                </SelectItem>
                                                <SelectItem className='cursor-pointer' value={`${FrequencyTypeCodes.Weekly}`}>
                                                    Semanal
                                                </SelectItem>
                                                <SelectItem className='cursor-pointer' value={`${FrequencyTypeCodes.Diary}`}>
                                                    Diario
                                                </SelectItem>
                                                <SelectItem className='cursor-pointer' value={`${FrequencyTypeCodes.Singular}`}>
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
