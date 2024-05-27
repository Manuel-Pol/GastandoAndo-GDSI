import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { CirclePlusIcon } from 'lucide-react'
import { Form, useForm } from 'react-hook-form'
import { TextField } from '@/components/forms/TextField'
import { Savings, SavingsFields } from '@/types/savings'
import { TextArea } from '@/components/forms/TextArea'
import { DateField } from '@/components/forms/DateField'

interface AddNewSavingProps {
    onAddSaving: (exp: Savings) => void
}

export const AddNewSaving = (props: AddNewSavingProps) => {
    const { onAddSaving } = props
    const form = useForm()

    const onSubmitSaving = (data: Savings) => {
        const submitData: Savings = {
            ...data
        }

        onAddSaving(submitData)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='bg-[#E34400] hover:bg-[#E34400] rounded text-white py-6'>
                    <CirclePlusIcon className='mr-2 text-white ' /> <p className='text-lg'>Agregar</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle className='text-black'>Agregar Ahorro</DialogTitle>
                <Form {...form}>
                    <TextField control={form.control} name={SavingsFields.Title} label='Titulo' />
                    <TextArea control={form.control} name={SavingsFields.Description} label='Descripcion' />
                    <TextField control={form.control} name={SavingsFields.Amount} label='Monto' adornment='$' />
                    <DateField control={form.control} name={SavingsFields.Date} label='Fecha objetivo' />
                </Form>
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
