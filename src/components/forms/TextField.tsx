import { useState, useEffect } from 'react'
import { ControllerProps, FieldValues } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

interface TextFieldProps<TForm extends FieldValues> extends Omit<ControllerProps<TForm>, 'render'> {
    label: string
    adornment?: string
    maxLength?: number
    type?: string
}

export const TextField = <TForm extends FieldValues>(props: TextFieldProps<TForm>) => {
    const { label, control, name, adornment, rules, maxLength, type } = props
    const [charCount, setCharCount] = useState(0)
    const [exceedsLimit, setExceedsLimit] = useState(false)

    useEffect(() => {
        if (maxLength) {
            setExceedsLimit(charCount > maxLength)
        }
    }, [charCount, maxLength])

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        {adornment ? (
                            <Input
                                placeholder=''
                                type={type ? type : 'text'}
                                {...field}
                                startAdornment={<h5>{adornment}</h5>}
                                onChange={e => {
                                    field.onChange(e)
                                    setCharCount(e.target.value.length)
                                }}
                            />
                        ) : (
                            <Input
                                {...field}
                                type={type ? type : 'text'}
                                onChange={e => {
                                    field.onChange(e)
                                    setCharCount(e.target.value.length)
                                }}
                            />
                        )}
                    </FormControl>
                    <div style={{ color: exceedsLimit ? 'red' : 'inherit' }}>
                        {maxLength && <p>{maxLength - charCount} caracteres restantes</p>}
                    </div>
                    <FormMessage className='text-red-600'>{error?.message}</FormMessage>
                </FormItem>
            )}
            rules={rules}
        />
    )
}
