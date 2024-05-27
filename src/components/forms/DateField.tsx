import { ControllerProps, FieldValues } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { DatePicker } from '../custom/DatePicker'

interface DateFieldProps<TForm extends FieldValues> extends Omit<ControllerProps<TForm>, 'render'> {
    label: string
}

export const DateField = <TForm extends FieldValues>(props: DateFieldProps<TForm>) => {
    const { control, name, label } = props
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='space-y-2'>
                    <FormLabel>{label}</FormLabel>
                    <FormItem>
                        <FormControl>
                            <DatePicker {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </div>
            )}
        />
    )
}
