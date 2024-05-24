import { useFormContext } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GroupFields } from '@/types/groupalExpenses'
import { useEffect, useState } from 'react'
import { EntityWithIdAndDescription } from '@/types/baseEntities'
import Multiselect from '@/components/custom/Multiselect'
import { ExpensesInterfaceFields } from '@/types/personalExpenses'

interface GroupFormProps {
    onTriggerImage: (img: File) => void
    prevImg?: File,
    friends: EntityWithIdAndDescription[],
    selectedMembers: EntityWithIdAndDescription[],
    onSelectMember: (member: EntityWithIdAndDescription) => void,
    onUnselectMember: (member: EntityWithIdAndDescription) => void
}

const GroupForm = ({ onTriggerImage, prevImg, friends, selectedMembers, onSelectMember, onUnselectMember }: GroupFormProps) => {
    const methods = useFormContext()
    const watchFile = methods.watch(GroupFields.Image)
    const [img, setImg] = useState<string | ArrayBuffer | null>(null)
    

    useEffect(() => {
        if (watchFile) onTriggerImage(watchFile)
    }, [watchFile])

    useEffect(() => {
        if (prevImg) {
            methods.setValue(GroupFields.Image, prevImg)
            const reader = new FileReader();
            
            reader.onloadend = () => {
                setImg(reader.result);
            };
            
            reader.readAsDataURL(prevImg);
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
                            {img && 
                                <div className='w-full'>
                                    <img src={img.toString()} className='w-[25%] block ml-auto mr-auto'/>
                                </div>
                            }
                            <FormControl>
                                <Input
                                    className='cursor-pointer'
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
                            <p className='font-medium text-lg'>Invite a los integrantes del grupo</p>
                            <FormField control={methods.control}
                                       name={GroupFields.Members}
                                       render={({ field: { value, onChange, ...fieldProps }}) => (
                                            <Multiselect options={friends}
                                                         selectedOptions={selectedMembers} 
                                                         onSelect={onSelectMember}
                                                         onUnselect={onUnselectMember}
                                            />
                                       )}
                            />
            </div>
        </Form>
    )
}

export default GroupForm
