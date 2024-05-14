import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Group } from '@/types/groupalExpenses'

interface GroupDataCardProps {
    groups: Group[]
    // triggerDeleteExp: (exp: ExpensesInterface) => void
    // onSaveEdit: (exp: ExpensesInterface) => void
}

const GroupalDataCard = ({ groups }: GroupDataCardProps) => {
    return (
        <div className='w-full'>
            {groups.length !== 0 ? (
                <div className='w-full flex gap-2'>
                    <div className='w-2/3 flex flex-col space-y-5'></div>
                    <div className='w-1/3 flex flex-col'></div>
                </div>
            ) : (
                <Alert variant='default' className='bg-white rounded-xl space-y-2 p-6'>
                    <div className='flex flex-row gap-2 text-xl items-center'>
                        <AlertCircle />
                        <AlertTitle>Sin grupos</AlertTitle>
                    </div>
                    <AlertDescription>
                        No hay grupos por el momento. Presiona en crear para crear un nuevo grupo
                    </AlertDescription>
                </Alert>
            )}
        </div>
    )
}

export default GroupalDataCard
