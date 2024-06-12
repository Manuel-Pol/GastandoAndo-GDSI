import { Dialog, DialogContent, DialogClose, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import calcu from '../../../../assets/calcu.png'
import indec from '../../../../assets/indec.png'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { BadgeDollarSign } from 'lucide-react'
import { TextField } from '@/components/forms/TextField'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { DateField } from '@/components/forms/DateField'
import { numberFormatter } from '@/utils/formatters/numberFormatter'


enum CalculatorFormFields {
    Amount = 'monto',
    Date = 'fecha'
}

interface CalculatorForm {
    [CalculatorFormFields.Amount]: number,
    [CalculatorFormFields.Date]: Date
}

const IDX_IPC = 1.136


const Calculator = () => {
    const location = useLocation()
    const matchSavings = location.pathname === '/savings'

    const [openCalculator, setOpenCalculator] = useState<boolean>(false)
    const [calculatedValue, setCalculatedValue] = useState<number>()

    const schema = z.object({
        [CalculatorFormFields.Amount]: z.coerce.number({ message: 'Este campo es obligatorio.' }).positive({ message: 'El monto debe ser mayor a 0.' }),
        [CalculatorFormFields.Date]: z.date({ message: 'Este campo es obligatorio.' })
    })

    const methods = useForm<CalculatorForm>({
        resolver: zodResolver(schema)
    })

    const onSubmit = (data: CalculatorForm) => {
        const fechaActual = new Date();
        const añoActual = fechaActual.getFullYear()
        const mesActual = fechaActual.getMonth()
    
        const añoIngresado = data[CalculatorFormFields.Date].getFullYear();
        const mesIngresado = data[CalculatorFormFields.Date].getMonth()
    
        const diferenciaAños = añoIngresado - añoActual;
        const diferenciaMeses = diferenciaAños * 12 + (mesIngresado - mesActual);

        const total = diferenciaMeses == 0 ? data[CalculatorFormFields.Amount] : data[CalculatorFormFields.Amount] * diferenciaMeses * IDX_IPC
    
        setCalculatedValue(total)
    }


    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    {matchSavings &&
                        <div className='absolute bottom-10 left-6' onClick={() => setOpenCalculator(true)}>
                            <img src={calcu} className='w-20 h-20 cursor-pointer border-2 animate-bounce border-[#1C753C] rounded-full'/>
                        </div>
                    }
                </DialogTrigger>
                {
                    openCalculator &&
                        <DialogContent className='min-w-[280px] bg-white rounded'>
                            <DialogTitle className='text-black'>Calculadora Financiera</DialogTitle>
                            <div className='border-2 rounded-xl px-2 w-full'>
                                <div className='flex flex-row items-center justify-between space-x-4'>
                                    <p className='text-[12px]'>El monto es aproximado y calculado mediante el IPC indicado por INDEC. Para más información presione el logo</p>
                                    <img src={indec} className='w-24 h-24 cursor-pointer' onClick={() => window.open('https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31','_blank')}/>
                                </div>
                            </div>
                            <FormProvider {...methods}>
                                <div className='flex flex-row items-center space-x-4'>
                                    <TextField control={methods.control}
                                            name={CalculatorFormFields.Amount}
                                            label='Monto a pagar' adornment='$'
                                    />
                                    <div className='mb-2'>
                                        <DateField control={methods.control} label='En la fecha' name={CalculatorFormFields.Date} />
                                    </div>
                                </div>
                            </FormProvider>
                            <DialogFooter>
                                <div className='w-full flex flex-row items-center justify-center space-x-4'>
                                    {
                                        calculatedValue &&
                                        <div className='bg-[#fcba03] border-1 rounded-full px-4 py-2'>
                                            <p>
                                                {`$ ${numberFormatter.toStringWithDecimals(calculatedValue)}`}
                                            </p>
                                        </div>
                                    }
                                    <DialogClose asChild>
                                        <Button className='rounded text-black hover:bg-neutral-300'
                                                onClick={methods.handleSubmit(onSubmit)}
                                                disabled={!methods.watch(CalculatorFormFields.Amount) || !methods.watch(CalculatorFormFields.Date)}
                                        >
                                            <BadgeDollarSign className='mr-2 items-center' /> Calcular
                                        </Button>
                                    </DialogClose>
                                </div>
                            </DialogFooter>
                        </DialogContent>
                }
            </Dialog>
        </div>
    )
}


export default Calculator