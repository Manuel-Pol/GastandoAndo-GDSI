import { Dialog, DialogContent, DialogClose, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Group, GroupFields } from '@/types/groupalExpenses'
import { Button } from '@/components/ui/button'
import { CirclePlusIcon } from 'lucide-react'
import { useForm, FormProvider } from 'react-hook-form'
import { useState, useEffect, useContext } from 'react'
import { EntityWithIdAndDescription, EntityWithIdAndDescriptionFields, EntityWithIdFields } from '@/types/baseEntities'
import GroupForm from './GroupForm'
import { UserContext } from '@/utils/contexts/userContext'

interface GroupExpensesAddDialogProps {
    onAddGroup: (g: Group) => void
    friends: EntityWithIdAndDescription[]
}

const GroupExpensesAddDialog = ({ onAddGroup, friends }: GroupExpensesAddDialogProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const [img, setImg] = useState<string | ArrayBuffer | null>()
    const { username } = useContext(UserContext) // Obtener el nombre de usuario del contexto

    const defaultMembers: EntityWithIdAndDescription[] = [
        { [EntityWithIdFields.Id]: 0, [EntityWithIdAndDescriptionFields.Description]: username } // Utilizar el nombre de usuario obtenido del contexto
    ]
    const [members, setMembers] = useState<EntityWithIdAndDescription[]>(defaultMembers)

    const defaultFormValues: Group = {
        [EntityWithIdFields.Id]: 0,
        [GroupFields.Name]: '',
        [GroupFields.Description]: '',
        [GroupFields.Expenses]: [],
        [GroupFields.Members]: defaultMembers
    }

    const methods = useForm<Group>({
        defaultValues: defaultFormValues
    })

    const onSubmitGroup = (group: Group) => {
        const submitGroup: Group = {
            ...group,
            [GroupFields.Image]: img,
            [GroupFields.Members]: members
        }
        onAddGroup(submitGroup)
        setImg(undefined)
        setMembers(defaultMembers)
        setOpen(false)
    }

    useEffect(() => {
        methods.reset(defaultFormValues)
        setImg(undefined)
        setMembers(defaultMembers)
    }, [open])

    const onTriggerImage = (newImg: string | ArrayBuffer | null) => setImg(newImg)

    const onSelectMember = (member: EntityWithIdAndDescription) => {
        setMembers([...members, member])
    }

    const onUnselectMember = (member: EntityWithIdAndDescription) => {
        setMembers(members.filter(value => value[EntityWithIdFields.Id] !== member[EntityWithIdFields.Id]))
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className='bg-[#1b2766] hover:bg-[#1b2766] rounded text-white py-4'
                        onClick={() => {
                            setOpen(true)
                        }}
                    >
                        <CirclePlusIcon className='mr-2 text-white ' /> <p className='text-lg'>Nuevo grupo</p>
                    </Button>
                </DialogTrigger>
                {open && (
                    <DialogContent className='min-w-[400px] bg-white rounded'>
                        <DialogTitle className='text-black'>Crear grupo</DialogTitle>
                        <FormProvider {...methods}>
                            <GroupForm
                                onTriggerImage={onTriggerImage}
                                friends={friends}
                                selectedMembers={members}
                                onSelectMember={onSelectMember}
                                onUnselectMember={onUnselectMember}
                            />
                        </FormProvider>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    className='rounded text-black hover:bg-neutral-300'
                                    onClick={methods.handleSubmit(onSubmitGroup)}
                                    disabled={!methods.watch(GroupFields.Name)}
                                >
                                    <CirclePlusIcon className='mr-2 items-center' /> Aceptar
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                )}
            </Dialog>
        </div>
    )
}

export default GroupExpensesAddDialog
