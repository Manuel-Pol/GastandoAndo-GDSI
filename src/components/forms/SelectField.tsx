import { ControllerProps, FieldValues } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface SelectFieldProps<TForm extends FieldValues> extends Omit<ControllerProps<TForm>, 'render'> {
    label: string,
    placeholder?: string,
    values: string[]
}

export const SelectField = <TForm extends FieldValues>(props: SelectFieldProps<TForm>) => {
    const { control, name, label, values, placeholder } = props
    return (
        <FormField
            rules={{ required: true }}
            control={control}
            name={name}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Select onValueChange={onChange} value={value}>
                            <SelectTrigger className='w-[200px]'>
                                <SelectValue placeholder={placeholder ?? label} />
                            </SelectTrigger>
                            <SelectContent className='bg-white'>
                                <SelectGroup>
                                    {values.map(value => (
                                        <SelectItem className='cursor-pointer' value={value}>
                                            {value}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage className='text-red-600'>{error?.message}</FormMessage>
                </FormItem>
            )}
        />
    )
}
