import { useFormContext } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { GroupFields } from '@/types/groupalExpenses'
import { useEffect, useState } from 'react'
import { EntityWithIdAndDescription } from '@/types/baseEntities'
import { MultiselectField } from '@/components/forms/MultiselectField'
import { FileField } from '@/components/forms/FileField'
import { TextArea } from '@/components/forms/TextArea'
import { TextField } from '@/components/forms/TextField'

interface GroupFormProps {
    onTriggerImage: (img: File) => void
    prevImg?: File
    friends: EntityWithIdAndDescription[]
    selectedMembers: EntityWithIdAndDescription[]
    onSelectMember: (member: EntityWithIdAndDescription) => void
    onUnselectMember: (member: EntityWithIdAndDescription) => void
}

const GroupForm = ({
    onTriggerImage,
    prevImg,
    friends,
    selectedMembers,
    onSelectMember,
    onUnselectMember
}: GroupFormProps) => {
    const methods = useFormContext()
    const watchFile = methods.watch(GroupFields.Image)
    const [img, setImg] = useState<string | ArrayBuffer | null>(null)

    useEffect(() => {
        if (watchFile) onTriggerImage(watchFile)
    }, [watchFile])

    useEffect(() => {
        if (prevImg) {
            methods.setValue(GroupFields.Image, prevImg)
            const reader = new FileReader()

            reader.onloadend = () => {
                setImg(reader.result)
            }

            reader.readAsDataURL(prevImg)
        }
    }, [prevImg])

    return (
        <Form {...methods}>
            <div className='flex flex-col gap-4 justify-center'>
                <TextField label='Titulo' name={GroupFields.Name} control={methods.control} />

                <TextArea label='Descripcion' name={GroupFields.Description} control={methods.control} />

                <FileField control={methods.control} name={GroupFields.Image} label='Imagen' img={img} />

                <MultiselectField
                    control={methods.control}
                    name={GroupFields.Members}
                    label='Seleccione los integrantes del grupo'
                    values={friends}
                    selected={selectedMembers}
                    onSelect={onSelectMember}
                    onUnselect={onUnselectMember}
                />
            </div>
        </Form>
    )
}

export default GroupForm
