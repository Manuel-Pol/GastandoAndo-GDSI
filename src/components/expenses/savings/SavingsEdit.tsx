import { DateField } from '@/components/forms/DateField'
import { TextArea } from '@/components/forms/TextArea'
import { TextField } from '@/components/forms/TextField'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { EntityWithIdFields } from '@/types/baseEntities'
import { Savings, SavingsFields } from '@/types/savings'
import { Edit, Save } from 'lucide-react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

interface SavingsEditProps {
    saving: Savings
    onSubmitEdit: (s: Savings) => void
}

export const SavingsEdit = ({ saving, onSubmitEdit }: SavingsEditProps) => {
    const [open, setOpen] = useState<boolean>(false)

    const defaultFormValues: Savings = {
        [EntityWithIdFields.Id]: saving[EntityWithIdFields.Id],
        [SavingsFields.Title]: saving[SavingsFields.Title],
        [SavingsFields.Description]: saving[SavingsFields.Description],
        [SavingsFields.Amount]: saving[SavingsFields.Amount],
        [SavingsFields.DateStart]: saving[SavingsFields.DateStart],
        [SavingsFields.DateObjective]: saving[SavingsFields.DateObjective]
    }

    const form = useForm<Savings>({
        defaultValues: defaultFormValues
    })

    const onSubmit = (data: Savings) => {
        onSubmitEdit(data)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant='outline' size='icon' className='rounded-full border-none p-3 hover:bg-[#ccd3d8]'>
                    <Edit className='h-4 w-4' color='#3B82F6' />
                </Button>
            </DialogTrigger>
            <DialogContent className='bg-white'>
                <DialogTitle className='text-black'>Editar Ahorro</DialogTitle>
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
                            onClick={form.handleSubmit(onSubmit)}
                        >
                            <Save className='mr-2 items-center' /> Guardar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
