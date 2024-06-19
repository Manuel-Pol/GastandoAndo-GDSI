import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogClose, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { ExpenseType, ExpensesInterface, ExpensesInterfaceFields, PriorityType, RecurrenceType } from '@/types/personalExpenses'
import { UserFields } from '@/types/users'
import { UserContext } from '@/utils/contexts/userContext'
import { AlertCircle, CircleXIcon } from 'lucide-react'
import { dataPersonalExpenses } from '@/api/PersonalExpensesData'
import { useContext, useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import pensante from '../../../../assets/pensante.png'
import elquesugiere from '../../../../assets/elquesugiere.png'
import { Badge } from '@/components/ui/badge'
import { dateFormatter } from '@/utils/formatters/dateFormatter'
import { stringFormatter } from '@/utils/formatters/stringFormatter'
import { numberFormatter } from '@/utils/formatters/numberFormatter'



const SavingsSuggestions = () => {
    const [open, setOpen] = useState<boolean>(false)
    const { user } = useContext(UserContext)
    const [movements, setMovements] = useState<ExpensesInterface[]>([])
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [hideLoader, setHideLoader] = useState<boolean>(false)
    const [showComponent, setShowComponent] = useState<boolean>(false)
    const [porcN, setPorcN] = useState<number>(0)
    const [porcTotalN, setPorcTotalN] = useState<number>(0)

    useEffect(() => {
        !!user && setMovements(user[UserFields.PersonalExpenses].map(id => dataPersonalExpenses.data[id]))
    }, [user])


    useEffect(() => {
        if (showComponent)
            setTimeout(() => setHideLoader(true), 4000)

    }, [showComponent])

    useEffect(() => {
        const hideAlert = movements.some((m) => (m[ExpensesInterfaceFields.Recurrence] !== RecurrenceType.Singular && (m[ExpensesInterfaceFields.Priority] && (m[ExpensesInterfaceFields.Priority] === PriorityType.Low || m[ExpensesInterfaceFields.Priority] === PriorityType.Disposable))))
        setShowAlert(!hideAlert)
        const expenses = movements.filter((mov) => mov[ExpensesInterfaceFields.IsExpense] === ExpenseType.Gasto)
        const noRec = expenses.filter((mov) => mov[ExpensesInterfaceFields.Recurrence] === RecurrenceType.Singular)
        const porcNoRec = expenses.length !== 0 ? noRec.length / expenses.length : 0
        setPorcN(porcNoRec)
        const total = expenses.reduce((ac, m) => ac + m[ExpensesInterfaceFields.Amount], 0)
        const totalNoRec = noRec.reduce((ac, m) => ac + m[ExpensesInterfaceFields.Amount], 0)
        const porcTotalNoRec = totalNoRec / total
        setPorcTotalN(porcTotalNoRec)
    }, [movements])

    useEffect(() => {
        if (open) {
            setHideLoader(false)
            setShowComponent(false)
        } 
    }, [open])

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className='absolute bottom-10 right-6' onClick={() => setOpen(true)}>
                        <img src={elquesugiere} className='w-20 h-20 cursor-pointer border-2 animate-bounce border-[#1C753C] rounded-full'/>
                    </div>
                </DialogTrigger>
                {open &&
                    <DialogContent className='bg-white min-w-[800px] w-full'>
                        <DialogTitle className='text-black border-2 border-b-gray-400 border-t-0 border-x-0 py-2'>Sugerencias</DialogTitle>
                        <div className='flex flex-col gap-2'>

                            {
                                hideLoader ?
                                    movements.length !== 0 ?
                                        <div className='flex flex-col gap-4'>
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
                                                    {movements.map((m, idx) => 
                                                        (m[ExpensesInterfaceFields.Recurrence] !== RecurrenceType.Singular && (m[ExpensesInterfaceFields.Priority] === PriorityType.Low || m[ExpensesInterfaceFields.Priority] === PriorityType.Disposable)) &&
                                                        <div className='grid grid-cols-12 items-center' key={`movimientosAhorro_${idx}`}>
                                                            <div className='items-center col-span-6 grid grid-cols-4'>
                                                                <div className='font-semibold text-sm col-span-1'>
                                                                    {dateFormatter.toShortDate(m[ExpensesInterfaceFields.Date])}
                                                                </div>
                                                                <h4 className='font-semibold col-span-3'>
                                                                    {stringFormatter.cutIfHaveMoreThan(m[ExpensesInterfaceFields.Title], 40)}
                                                                </h4>
                                                            </div>
                                                            <div className='col-span-1'></div>
                                                            <div className='col-span-5'>
                                                                <div className='flex flex-row space-x-4'>
                                                                    <div className='flex flex-row space-x-2 col-span-4'>
                                                                        <Badge className='bg-[#e8ebe9]'>
                                                                            {m[ExpensesInterfaceFields.Recurrence]}
                                                                        </Badge>
                                                                        {
                                                                            m[ExpensesInterfaceFields.Priority] &&
                                                                            <Badge className='bg-[#274783] text-white'>
                                                                                {m[ExpensesInterfaceFields.Priority]}
                                                                            </Badge>
                                                                        }
                                                                    </div>
                                                                    <p className='text-xl text-red-500'>{`- $ ${numberFormatter.toStringWithDecimals(
                                                                            parseFloat(m[ExpensesInterfaceFields.Amount] ?? 0)
                                                                        )}`}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                    }
                                                </div>
                                            }
                                            {(porcN >= 0.5 && porcTotalN >= 0.5) &&
                                                <Alert variant='default' className='bg-white rounded-xl space-y-2 p-6 mt-4'>
                                                    <div className='flex flex-row gap-2 text-xl items-center'>
                                                        <AlertCircle />
                                                        <AlertTitle>Cuidá tus gastos no recurrentes</AlertTitle>
                                                    </div>
                                                    <AlertDescription>
                                                        <div className='flex flex-wrap items-center space-x-1'>
                                                            <p>{`Te recomendamos que tengas cuidado con tus gastos no recurrentes. El ${Math.ceil(porcN * 100)}% son`}</p>
                                                            <p className='italic'>NO RECURRENTES</p>
                                                            <p>{`y representan un ${Math.ceil(porcTotalN * 100)}% de tus gastos totales`}</p>
                                                        </div>
                                                    </AlertDescription>
                                            </Alert>}
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
                                showComponent ?
                                    <div className='items-center text-center flex flex-col gap-4 mt-4'>
                                        <img src={pensante} className='border rounded-full w-52 h-52 my-0 mx-auto animate-fadeInOut'/>
                                        <p className='text-lg text-black text-center'>Calculando ...</p>
                                    </div>
                                    :
                                    <div className='items-center text-center flex flex-col gap-4 mt-4'>
                                        <p className='text-center text-lg text-black'>En esta sección te vamos a dar sugerencias en base a tus gastos personales</p>
                                        <Button className=' bg-[#1c7549] hover:bg-[#124e30] text-white rounded px-8' onClick={() => setShowComponent(true)}>
                                            Pedir sugerencia
                                        </Button>
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