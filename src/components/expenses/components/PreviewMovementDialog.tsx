import { Dialog, DialogContent, DialogClose, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ExpenseType, ExpensesInterface, ExpensesInterfaceFields } from '@/types/personalExpenses'
import { CircleX, ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { dateFormatter } from '@/utils/formatters/dateFormatter'
import { numberFormatter } from '@/utils/formatters/numberFormatter'

interface PreviewMovementDialogProps {
    movement: ExpensesInterface
}

const PreviewMovementDialog = ({ movement }: PreviewMovementDialogProps) => {
    const [img, setImg] = useState<string | ArrayBuffer | null>(null)
    const [openView, setOpenView] = useState<boolean>(false)

    const onViewExp = () => setOpenView(true)

    useEffect(() => {
        if (movement[ExpensesInterfaceFields.Image]) {
            setImg(movement[ExpensesInterfaceFields.Image])
            // const reader = new FileReader()

            // reader.onloadend = () => {
            //     setImg(reader.result)
            // }

            // reader.readAsDataURL(movement[ExpensesInterfaceFields.Image])
        }
    }, [movement])

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant='outline'
                        size='icon'
                        className='rounded-full border-none p-3 hover:bg-[#ccd3d8]'
                        onClick={onViewExp}
                    >
                        <ExternalLink className='h-4 w-4' color='#438924' />
                    </Button>
                </DialogTrigger>
                {openView && (
                    <DialogContent className='min-w-[400px] bg-white rounded'>
                        <div className='flex flex-row justify-between items-center py-6 border-b-gray-400 border-b-[1px]'>
                            <DialogTitle className='text-black mb-2'>
                                {movement[ExpensesInterfaceFields.Title]}
                            </DialogTitle>
                            <div className='space-x-4'>
                                {movement[ExpensesInterfaceFields.IsExpense] === ExpenseType.Gasto ? (
                                    <Badge className='bg-[#EF4444] text-white px-3 text-[14px]'>Gasto</Badge>
                                ) : (
                                    <Badge className='bg-[#1C7549] text-white px-3 text-[14px]'>Ingreso</Badge>
                                )}
                                <Badge className='bg-[#e8ebe9] px-3 text-[14px]'>
                                    {movement[ExpensesInterfaceFields.Recurrence]}
                                </Badge>
                            </div>
                        </div>
                        <div className='flex flex-col gap-6 justify-center'>
                            <p className='text-lg font-medium'>
                                {dateFormatter.toShortDate(movement[ExpensesInterfaceFields.Date])}
                            </p>
                            {img && (
                                <div className='w-full'>
                                    <img src={img.toString()} className='w-[80%] block ml-auto mr-auto' />
                                </div>
                            )}
                            <div>
                                <p className='font-medium'>{movement[ExpensesInterfaceFields.Description]}</p>
                            </div>
                            <div>
                                {movement[ExpensesInterfaceFields.IsExpense] === ExpenseType.Gasto ? (
                                    <p className='text-3xl text-red-500 text-center'>{`- $ ${numberFormatter.toStringWithDecimals(
                                        parseFloat(movement[ExpensesInterfaceFields.Amount])
                                    )}`}</p>
                                ) : (
                                    <p className='text-3xl text-green-600 text-center'>{`+ $ ${numberFormatter.toStringWithDecimals(
                                        parseFloat(movement[ExpensesInterfaceFields.Amount])
                                    )}`}</p>
                                )}
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

export default PreviewMovementDialog
