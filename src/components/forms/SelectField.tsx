import { ControllerProps, FieldValues, Path, PathValue } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface SelectFieldProps<TForm extends FieldValues> extends Omit<ControllerProps<TForm>, 'render'> {
    label: string
    onValueChange: (value: PathValue<TForm, Path<TForm>>) => void
    defaultValue?: PathValue<TForm, Path<TForm>> | undefined
    values: string[]
}

export const SelectField = <TForm extends FieldValues>(props: SelectFieldProps<TForm>) => {
    const { control, name, label, defaultValue, onValueChange, values } = props
    return (
        <FormField
            rules={{ required: true }}
            control={control}
            name={name}
            render={() => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Select onValueChange={onValueChange} defaultValue={defaultValue}>
                            <SelectTrigger className='w-[200px]'>
                                <SelectValue placeholder={label} />
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
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
