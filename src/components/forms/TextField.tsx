import { ControllerProps, FieldValues } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

interface TextFieldProps<TForm extends FieldValues> extends Omit<ControllerProps<TForm>, 'render'> {
    label: string
    adornment?: string
}

export const TextField = <TForm extends FieldValues>(props: TextFieldProps<TForm>) => {
    const { label, control, name, adornment } = props
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        {adornment ? (
                            <Input placeholder='' {...field} startAdornment={<h5>{adornment}</h5>} />
                        ) : (
                            <Input {...field} />
                        )}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
