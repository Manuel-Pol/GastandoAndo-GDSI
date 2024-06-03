import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { CirclePlusIcon } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { TextField } from '@/components/forms/TextField'
import { Savings, SavingsFields } from '@/types/savings'
import { TextArea } from '@/components/forms/TextArea'
import { DateField } from '@/components/forms/DateField'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'

interface AddNewSavingProps {
    onAddSaving: (saving: Savings) => void
}

const schema = z.object({
    [SavingsFields.Title]: z.string({ message: 'Este campo es obligatorio.' }),
    [SavingsFields.Description]: z.string().optional(),
    [SavingsFields.Amount]: z.coerce
        .number({ message: 'Este campo es obligatorio.' })
        .positive({ message: 'El monto debe ser mayor a 0.' }),
    [SavingsFields.DateStart]: z.date({ message: 'Este campo es obligatorio.' }),
    [SavingsFields.DateObjective]: z.date({ message: 'Este campo es obligatorio.' })
})

export const AddNewSaving = (props: AddNewSavingProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const { onAddSaving } = props
    const form = useForm<Savings>({
        resolver: zodResolver(schema),
        mode: 'onBlur'
    })

    const onSubmitSaving = (data: Savings) => {
        setOpen(false)
        onAddSaving(data)
        form.reset()
    }

    useEffect(() => {
        if (open) {
            form.reset()
        }
    }, [open])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='bg-[#E34400] hover:bg-[#E34400] rounded text-white py-6'>
                    <CirclePlusIcon className='mr-2 text-white ' /> <p className='text-lg'>Agregar</p>
                </Button>
            </DialogTrigger>
            <DialogContent className='bg-white'>
                <DialogTitle className='text-black'>Agregar Ahorro</DialogTitle>
                <FormProvider {...form}>
                    <TextField control={form.control} name={SavingsFields.Title} label='Titulo' />
                    <TextArea control={form.control} name={SavingsFields.Description} label='Descripcion' />
                    <TextField control={form.control} name={SavingsFields.Amount} label='Monto' adornment='$' />
                    <DateField control={form.control} name={SavingsFields.DateStart} label='Fecha de inicio' />
                    <DateField control={form.control} name={SavingsFields.DateObjective} label='Fecha objetivo' />
                </FormProvider>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            className='rounded text-black hover:bg-neutral-300'
                            onClick={form.handleSubmit(onSubmitSaving)}
                        >
                            <CirclePlusIcon className='mr-2 items-center' /> Agregar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
