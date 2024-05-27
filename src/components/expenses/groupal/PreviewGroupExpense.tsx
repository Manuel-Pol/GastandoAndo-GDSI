import { Dialog, DialogContent, DialogClose, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CircleX, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { dateFormatter } from '@/utils/formatters/dateFormatter'
import { numberFormatter } from '@/utils/formatters/numberFormatter'
import { GroupExpensesInterface, GroupExpensesInterfaceFields } from '@/types/groupalExpenses'

interface PreviewGroupExpenseDialogProps {
    expense: GroupExpensesInterface
}


const PreviewGroupExpenseDialog = ({expense}: PreviewGroupExpenseDialogProps) => {
    const [openView, setOpenView] = useState<boolean>(false)

    const onViewExp = () => setOpenView(true)

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                <Button variant='outline' size='icon' className='rounded-full border-none' onClick={onViewExp}>
                        <ExternalLink className='h-4 w-4' color='#438924' />
                    </Button>
                </DialogTrigger>
                {
                    openView &&
                    <DialogContent className='min-w-[400px] bg-white rounded'>
                        <div className='flex flex-row justify-between items-center py-6 border-b-gray-400 border-b-[1px]'>
                            <DialogTitle className='text-black mb-2'>{expense[GroupExpensesInterfaceFields.Title]}</DialogTitle>
                        </div>
                        <div className='flex flex-col gap-6 justify-center'>
                            <p className='text-lg font-medium'>{dateFormatter.toShortDate(expense[GroupExpensesInterfaceFields.Date])}</p>
                            <div>
                                <p className='font-medium'>{expense[GroupExpensesInterfaceFields.Description]}</p>
                            </div>
                                <p className='text-3xl font-medium text-center'>{`+ $ ${numberFormatter.toStringWithDecimals(
                                                    expense[GroupExpensesInterfaceFields.Amount] ?? 0
                                )}`}
                                </p>
                            
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button onClick={() => setOpenView(false)}>
                                   <CircleX className='mr-2 items-center'/>Cerrar
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                }
            </Dialog>
        </div>
    )
}


export default PreviewGroupExpenseDialog