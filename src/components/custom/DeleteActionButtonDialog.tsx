import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogClose, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CheckIcon, CircleX, Trash2 } from "lucide-react";

interface DeleteActionButtonDialogProps {
    title: string,
    icon?: ReactNode,
    description: string,
    onDelete: () => void
}


const DeleteActionButtonDialog = ({title, icon, description, onDelete} : DeleteActionButtonDialogProps) => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <Dialog>
            <DialogTrigger asChild>
                {
                    icon ?
                    <div className="rounded-full p-3 hover:bg-[#e2e2e2] cursor-pointer" onClick={() => setOpen(true)}>
                        {icon}
                    </div>
                    :
                    <Button variant='outline'
                            size='icon'
                            className='rounded-full border-none p-3 hover:bg-[#ccd3d8]'
                            onClick={() => setOpen(true)}
                            >
                                <Trash2 className='h-4 w-4' color='#EF4444' />
                    </Button>
                }
            </DialogTrigger>
            {
                open &&
                <DialogContent className="min-w-300px bg-white rounded">
                    <DialogTitle className="text-black">{title}</DialogTitle>
                    <div>
                        <p className="text-black">{description}</p>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                        <div className="flex flex-row justify-between items-center w-full">
                                <Button onClick={() => setOpen(false)}>
                                    <CircleX className='mr-2 items-center' />
                                    <p className='text-lg'>Cancelar</p>
                                </Button>
                                <Button className='bg-[#1b2766] hover:bg-[#1b2766] rounded text-white py-4'
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            setOpen(false)
                                            onDelete()
                                        }}
                                >
                                    <CheckIcon className='mr-2 text-white ' /> <p className='text-lg'>Eliminar</p>
                                </Button>
                            </div>    
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            }
        </Dialog>

    )
}


export default DeleteActionButtonDialog