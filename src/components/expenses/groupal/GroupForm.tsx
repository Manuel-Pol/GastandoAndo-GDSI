import { useFormContext } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GroupFields } from '@/types/groupalExpenses'
import { useEffect } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'

interface GroupFormProps {
    onTriggerImage: (img: File) => void
    prevImg?: File
    friends: string[]
}

const GroupForm = ({ onTriggerImage, prevImg, friends }: GroupFormProps) => {
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

    // useEffect(() => {
    //     if
    // })

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
                <FormField
                    control={methods.control}
                    name={GroupFields.Members}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Invite a los integrantes del grupo</FormLabel>
                            <FormControl>
                                <ScrollArea.Root className='w-[200px] h-[150px] rounded-md overflow-hidden border border-input bg-transparent'>
                                    <ScrollArea.Viewport className='w-full h-full rounded'>
                                        <div className='py-[15px] px-5'>
                                            <div className='text-[15px] leading-[18px] font-medium'>
                                                Usuarios amigos
                                            </div>
                                            {friends.map(friend => (
                                                <div
                                                    className='text-mauve12 text-[13px] leading-[18px] mt-2.5 pt-2.5 border-t border-t-mauve6'
                                                    key={friend}
                                                >
                                                    {friend}
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea.Viewport>
                                    <ScrollArea.Scrollbar
                                        className='flex select-none touch-none p-0.5 bg-transparent transition-colors duration-[160ms] ease-out data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5'
                                        orientation='vertical'
                                    >
                                        <ScrollArea.Thumb className="flex-1 bg-neutral-700 rounded-[10px] relative hover:bg-neutral-600 before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                                    </ScrollArea.Scrollbar>
                                </ScrollArea.Root>
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
