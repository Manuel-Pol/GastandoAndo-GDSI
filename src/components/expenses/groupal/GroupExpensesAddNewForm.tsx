import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { useFormContext } from 'react-hook-form'
import { GroupExpensesInterfaceFields } from '@/types/groupalExpenses'
import Multiselect from '@/components/custom/Multiselect'
import { EntityWithIdAndDescription } from '@/types/baseEntities'
import { DateField } from '@/components/forms/DateField'

interface GroupFormProps {
    friends: EntityWithIdAndDescription[]
    selectedDebtors: EntityWithIdAndDescription[]
    onSelectDebtor: (Debtor: EntityWithIdAndDescription) => void
    onUnselectDebtor: (Debtor: EntityWithIdAndDescription) => void
}

const GroupExpensesAddNewForm = ({ friends, selectedDebtors, onSelectDebtor, onUnselectDebtor }: GroupFormProps) => {
    const methods = useFormContext()

    return (
        <Form {...methods}>
            <div className='flex flex-col gap-2 justify-center'>
                <FormField
                    control={methods.control}
                    name={GroupExpensesInterfaceFields.Title}
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
                    name={GroupExpensesInterfaceFields.Description}
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
                    name={GroupExpensesInterfaceFields.Amount}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='mr-2'>Monto total</FormLabel>
                            <div className='w-full'>
                                <FormControl>
                                    <Input placeholder='' {...field} startAdornment={<h5>$</h5>} />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DateField label='Fecha' control={methods.control} name={GroupExpensesInterfaceFields.Date} />
                <p className='font-medium text-lg'>Seleccione entre quienes dividir el gasto</p>
                <FormField
                    control={methods.control}
                    name={GroupExpensesInterfaceFields.Debtors}
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                        <Multiselect
                            options={friends}
                            selectedOptions={selectedDebtors}
                            onSelect={onSelectDebtor}
                            onUnselect={onUnselectDebtor}
                        />
                    )}
                />
            </div>
        </Form>
    )
}

export default GroupExpensesAddNewForm
