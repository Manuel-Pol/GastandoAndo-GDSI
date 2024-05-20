import { Dialog, DialogContent, DialogClose, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CircleX, ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Group, GroupFields } from '@/types/groupalExpenses'

interface PreviewGroupDialogProps {
    group: Group
}

const PreviewGroupDialog = ({ group }: PreviewGroupDialogProps) => {
    const [img, setImg] = useState<string | ArrayBuffer | null>(null)
    const [openView, setOpenView] = useState<boolean>(false)

    const onViewExp = () => setOpenView(true)

    useEffect(() => {
        if (group[GroupFields.Image]) {
            const reader = new FileReader()

            reader.onloadend = () => {
                setImg(reader.result)
            }

            reader.readAsDataURL(group[GroupFields.Image])
        }
    }, [group])

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant='outline' size='icon' className='rounded-full border-none' onClick={onViewExp}>
                        <ExternalLink className='h-4 w-4' color='#438924' />
                    </Button>
                </DialogTrigger>
                {openView && (
                    <DialogContent className='min-w-[400px] bg-white rounded'>
                        <div className='flex flex-row justify-between items-center py-6 border-b-gray-400 border-b-[1px]'>
                            <DialogTitle className='text-black mb-2'>{group[GroupFields.Name]}</DialogTitle>
                        </div>
                        <div className='flex flex-col gap-6 justify-center'>
                            {img && <img src={img.toString()} />}
                            <div>
                                <p className='font-medium'>{group[GroupFields.Description]}</p>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button onClick={() => setOpenView(false)}>
                                    <CircleX className='mr-2 items-center' />
                                    Cerrar
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                )}
            </Dialog>
        </div>
    )
}

export default PreviewGroupDialog
