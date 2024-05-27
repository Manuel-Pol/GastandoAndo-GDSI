import { ControllerProps, FieldValues } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'

interface TextAreaProps<TForm extends FieldValues> extends Omit<ControllerProps<TForm>, 'render'> {
    label: string
}

export const TextArea = <TForm extends FieldValues>(props: TextAreaProps<TForm>) => {
    const { label, control, name } = props
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
