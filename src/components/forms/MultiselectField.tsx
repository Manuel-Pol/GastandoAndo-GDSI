import { EntityWithIdAndDescription } from '@/types/baseEntities'
import { ControllerProps, FieldValues } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import Multiselect from '../custom/Multiselect'

interface MultiselectFieldProps<TForm extends FieldValues> extends Omit<ControllerProps<TForm>, 'render'> {
    label: string
    values: EntityWithIdAndDescription[]
    selected: EntityWithIdAndDescription[]
    onSelect: (value: EntityWithIdAndDescription) => void
    onUnselect: (value: EntityWithIdAndDescription) => void
}

export const MultiselectField = <TForm extends FieldValues>(props: MultiselectFieldProps<TForm>) => {
    const { control, name, label, values, selected, onSelect, onUnselect } = props
    return (
        <FormField
            control={control}
            name={name}
            render={({ field: { value, onChange, ...fieldProps }, fieldState: { error } }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Multiselect
                            options={values}
                            selectedOptions={selected}
                            onSelect={onSelect}
                            onUnselect={onUnselect}
                        />
                    </FormControl>
                    <FormMessage className='text-red-600'>{error?.message}</FormMessage>
                </FormItem>
            )}
        />
    )
}
