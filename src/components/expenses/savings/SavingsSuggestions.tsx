import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogClose, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { ExpensesInterface, ExpensesInterfaceFields, PriorityType, RecurrenceType } from '@/types/personalExpenses'
import { UserFields } from '@/types/users'
import { UserContext } from '@/utils/contexts/userContext'
import { AlertCircle, CircleXIcon } from 'lucide-react'
import { dataPersonalExpenses } from '@/api/PersonalExpensesData'
import { useContext, useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import pensante from '../../../../assets/pensante.png'



const SavingsSuggestions = () => {
    const [open, setOpen] = useState<boolean>(false)
    const { user } = useContext(UserContext)
    const [movements, setMovements] = useState<ExpensesInterface[]>([])
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [hideLoader, setHideLoader] = useState<boolean>(false)

    useEffect(() => {
        !!user && setMovements(user[UserFields.PersonalExpenses].map(id => dataPersonalExpenses.data[id]))
    }, [user])

    setTimeout(() => setHideLoader(false), 4000)

    useEffect(() => {
        const hideAlert = movements.some((m) => (m[ExpensesInterfaceFields.Recurrence] !== RecurrenceType.Singular && (m[ExpensesInterfaceFields.Priority] && (m[ExpensesInterfaceFields.Priority] === PriorityType.Low || m[ExpensesInterfaceFields.Priority] === PriorityType.Disposable))))
        setShowAlert(!hideAlert)
    }, [movements])

    useEffect(() => {
        !open && setHideLoader(true)
    }, [open])

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className=' bg-[#1c7549] hover:bg-[#124e30] text-white rounded px-8' onClick={() => setOpen(true)}>
                        Pedir sugerencia
                    </Button>
                </DialogTrigger>
                {open &&
                    <DialogContent className='bg-white min-w-[300px]'>
                        <DialogTitle className='text-black'>Sugerencias</DialogTitle>
                        <div className='flex flex-col gap-2'>
                            {
                                !hideLoader ?
                                    movements.length !== 0 ?
                                        <div className='flex flex-col gap-2'>
                                            {showAlert ? 
                                                <div className='w-full'>
                                                    <Alert variant='default' className='bg-white rounded-xl space-y-2 p-6'>
                                                        <div className='flex flex-row gap-2 text-xl items-center'>
                                                            <AlertCircle />
                                                            <AlertTitle>Sin sugerencias</AlertTitle>
                                                        </div>
                                                        <AlertDescription>
                                                            No tienes sugerencias de momento
                                                        </AlertDescription>
                                                    </Alert>
                                                </div>
                                                :
                                                <div className='flex flex-col gap-2'>
                                                    <p className='text-center font-semibold mb-2'>Te sugerimos que recortes en los siguientes gastos:</p>
                                                    {movements.map((m) => 
                                                        (m[ExpensesInterfaceFields.Recurrence] !== RecurrenceType.Singular && (m[ExpensesInterfaceFields.Priority] === PriorityType.Low || m[ExpensesInterfaceFields.Priority] === PriorityType.Disposable)) &&
                                                            <div className='flex flex-row items-center justify-between'>
                                                                <p>{m[ExpensesInterfaceFields.Title]}</p>
                                                            </div>
                                                    )
                                                    }
                                                </div>
                                            }
                                        </div>
                                        :
                                        <Alert variant='default' className='bg-white rounded-xl space-y-2 p-6'>
                                            <div className='flex flex-row gap-2 text-xl items-center'>
                                                <AlertCircle />
                                                <AlertTitle>Sin movimientos</AlertTitle>
                                            </div>
                                            <AlertDescription>
                                                No hay movimientos por el momento. Debes agregar desde la sección correspondiente para tener sugerencias
                                            </AlertDescription>
                                        </Alert>
                                :
                                <div className='items-center text-center flex flex-col gap-4 mt-4'>
                                    <img src={pensante} className='border rounded-full w-52 h-52 my-0 mx-auto animate-fadeInOut'/>
                                    <p className='text-lg text-black text-center'>Calculando ...</p>
                                </div>
                            }
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    className='rounded text-black hover:bg-neutral-300'
                                    onClick={() => setOpen(false)}
                                >
                                    <CircleXIcon className='mr-2 items-center' /> Cerrar
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                }
            </Dialog>
        </div>
    )
}


export default SavingsSuggestions