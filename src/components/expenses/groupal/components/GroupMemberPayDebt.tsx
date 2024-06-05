import { GroupMember, GroupMemberFields } from "@/types/groupalExpenses";
import { Dialog, DialogContent, DialogClose, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { EntityWithIdAndDescriptionFields } from "@/types/baseEntities";
import { CheckIcon, CircleX, HandCoinsIcon } from "lucide-react";
import { Button } from '@/components/ui/button'
import { useState } from "react";

interface GroupMemberPayDebtProps {
    member: GroupMember,
    onUpdateMember: (mem: GroupMember) => void
}


const GroupMemberPayDebt = ({member, onUpdateMember} : GroupMemberPayDebtProps) => {
    const [open, setOpen] = useState<boolean>(false)
    
    
    const handlePayDebt = () => {
        const newMember = {
            ...member,
            [GroupMemberFields.Amount]: 0
        }

        onUpdateMember(newMember)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="rounded-full p-3 hover:bg-[#e2e2e2] cursor-pointer">
                    <HandCoinsIcon className="w-4 h-4 text-green-500" onClick={() => setOpen(true)} />
                </div>
            </DialogTrigger>
            {open &&
                <DialogContent className='min-w-[400px] bg-white rounded'>
                    <DialogTitle className="text-black">{`Saldar deuda de ${member[EntityWithIdAndDescriptionFields.Description]}`}</DialogTitle>
                    <div>
                        <p className="text-black">{`¿Estás seguro que deseas saldar la deuda de ${member[EntityWithIdAndDescriptionFields.Description]}?`}</p>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <div className="flex flex-row justify-between items-center w-full">
                                <Button onClick={() => setOpen(false)}>
                                    <CircleX className='mr-2 items-center' />
                                    <p className='text-lg'>No</p>
                                </Button>
                                <Button className='bg-[#1b2766] hover:bg-[#1b2766] rounded text-white py-4'
                                        onClick={() => {
                                            setOpen(false)
                                            handlePayDebt()
                                        }}
                                >
                                    <CheckIcon className='mr-2 text-white ' /> <p className='text-lg'>Sí</p>
                                </Button>
                            </div>    
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            }
        </Dialog>
    )
}


export default GroupMemberPayDebt