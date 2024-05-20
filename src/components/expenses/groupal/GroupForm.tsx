import { useFormContext } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GroupFields } from '@/types/groupalExpenses'
import { useEffect } from 'react'

interface GroupFormProps {
    onTriggerImage: (img: File) => void
    prevImg?: File
}

const GroupForm = ({ onTriggerImage, prevImg }: GroupFormProps) => {
    const methods = useFormContext()
    const watchFile = methods.watch(GroupFields.Image)

    useEffect(() => {
        if (watchFile) onTriggerImage(watchFile)
    }, [watchFile])

    useEffect(() => {
        if (prevImg) {
            methods.setValue(GroupFields.Image, prevImg)
        }
    }, [prevImg])

    return (
        <Form {...methods}>
            <div className='flex flex-col gap-4 justify-center'>
                <FormField
                    control={methods.control}
                    name={GroupFields.Name}
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
                    name={GroupFields.Description}
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
                    name={GroupFields.Image}
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                        <FormItem>
                            <FormLabel>Imagen</FormLabel>
                            <FormControl>
                                <Input
                                    {...fieldProps}
                                    type='file'
                                    accept='image/*, application/pdf'
                                    onChange={event => onChange(event.target.files && event.target.files[0])}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </Form>
    )
}

export default GroupForm
