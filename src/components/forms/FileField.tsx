import { ControllerProps, FieldValues } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

interface FileFieldProps<TForm extends FieldValues> extends Omit<ControllerProps<TForm>, 'render'> {
    label: string
    img: string | ArrayBuffer | null
}

export const FileField = <TForm extends FieldValues>(props: FileFieldProps<TForm>) => {
    const { control, name, label, img } = props
    return (
        <FormField
            control={control}
            name={name}
            render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    {img ? (
                        <div className='space-y-2 flex flex-col'>
                            <div className='flex flex-row space-x-4 items-center'>
                                <FormControl>
                                    <Input
                                        {...fieldProps}
                                        type='file'
                                        accept='image/*'
                                        onChange={event => onChange(event.target.files && event.target.files[0])}
                                        className='cursor-pointer'
                                    />
                                </FormControl>
                                <FormMessage />
                            </div>
                            <div className='w-full'>
                                <img src={img.toString()} className='w-[20%] block ml-auto mr-auto' />
                            </div>
                        </div>
                    ) : (
                        <>
                            <FormControl>
                                <Input
                                    {...fieldProps}
                                    type='file'
                                    accept='image/*, application/pdf'
                                    onChange={event => onChange(event.target.files && event.target.files[0])}
                                    className='cursor-pointer'
                                />
                            </FormControl>
                            <FormMessage />
                        </>
                    )}
                </FormItem>
            )}
        />
    )
}
