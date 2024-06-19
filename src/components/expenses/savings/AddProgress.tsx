import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { CirclePlusIcon } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { TextField } from '@/components/forms/TextField'
import { Progress, ProgressFields } from '@/types/savings'
import { DateField } from '@/components/forms/DateField'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'

interface AddProgressProps {
    onAddProgress: (prog: Progress) => void
    disabled: boolean
    progreso: number
    total: number
}

export const AddProgress = (props: AddProgressProps) => {
    const { onAddProgress, disabled, total, progreso } = props
    const [open, setOpen] = useState<boolean>(false)
    const [disableAdd, setDisableAdd] = useState<boolean>(false)

    const schema = z.object({
        [ProgressFields.Amount]: z.coerce
            .number({ message: 'Este campo es obligatorio.' })
            .lte(total - progreso, { message: 'El monto supera el total del ahorro.' })
            .positive({ message: 'El monto debe ser positivo.' }),
        [ProgressFields.Date]: z.date({ message: 'Este campo es obligatorio.' })
    })

    const form = useForm<Progress>({
        resolver: zodResolver(schema),
        mode: 'onBlur'
    })

    const watchAmount = form.watch(ProgressFields.Amount)

    useEffect(() => {
        if (watchAmount) {
            if (total - watchAmount < 0) setDisableAdd(true)
            else setDisableAdd(false)
        }
    }, [watchAmount])

    const onSubmitProgress = (data: Progress) => {
        onAddProgress(data)
        setOpen(false)
    }

    useEffect(() => {
        if (open) {
            form.reset()
        }
    }, [open])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className=' bg-[#1c7549] hover:bg-[#124e30] text-white rounded px-8' disabled={disabled}>
                    Añadir progreso
                </Button>
            </DialogTrigger>
            <DialogContent className='bg-white'>
                <DialogTitle className='text-black'>Añadir progreso</DialogTitle>
                <FormProvider {...form}>
                    <TextField control={form.control} name={ProgressFields.Amount} label='Monto' adornment='$' />
                    <DateField control={form.control} name={ProgressFields.Date} label='Fecha' />
                </FormProvider>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            className='rounded text-black hover:bg-neutral-300'
                            onClick={form.handleSubmit(onSubmitProgress)}
                            disabled={disableAdd}
                        >
                            <CirclePlusIcon className='mr-2 items-center' /> Agregar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
