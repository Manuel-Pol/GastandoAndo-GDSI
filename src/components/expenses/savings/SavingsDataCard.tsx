import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { EntityWithIdFields } from '@/types/baseEntities'
import { Savings } from '@/types/savings'
import { AlertCircle } from 'lucide-react'
import { AccordionSavings } from './AccordionSavings'

interface SavingsDataCardProps {
    savings: Savings[]
    triggerDelete: (saving: Savings) => void
    onSaveEdit: (saving: Savings) => void
}

export const SavingsDataCard = ({ savings, triggerDelete, onSaveEdit }: SavingsDataCardProps) => {
    const onDelete = (saving: Savings) => triggerDelete(saving)

    return (
        <div className='w-full'>
            {savings.length !== 0 ? (
                <div className='flex flex-col space-y-5'>
                    {savings.map(saving => (
                        <AccordionSavings
                            key={`${saving[EntityWithIdFields.Id]}`}
                            saving={saving}
                            onSaveEdit={onSaveEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            ) : (
                <Alert variant='default' className='bg-white rounded-xl space-y-2 p-6'>
                    <div className='flex flex-row gap-2 text-xl items-center'>
                        <AlertCircle />
                        <AlertTitle>Sin ahorros</AlertTitle>
                    </div>
                    <AlertDescription>
                        No hay ahorros por el momento. Presiona en agregar para registrarlos.
                    </AlertDescription>
                </Alert>
            )}
        </div>
    )
}
