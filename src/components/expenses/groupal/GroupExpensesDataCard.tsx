import { GroupExpensesInterface, GroupMember } from '@/types/groupalExpenses'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { EntityWithIdFields } from '@/types/baseEntities'
import AccordionItemGroupExpense from './AccordionItemGroupExpense'

interface GroupExpensesDataCardProps {
    expenses: GroupExpensesInterface[]
    triggerDeleteExp: (exp: GroupExpensesInterface) => void
    onSaveEdit: (exp: GroupExpensesInterface) => void
    friends: GroupMember[]
}

const GroupExpensesDataCard = ({ expenses, triggerDeleteExp, onSaveEdit, friends }: GroupExpensesDataCardProps) => {
    const onDelExp = (exp: GroupExpensesInterface) => triggerDeleteExp(exp)

    return (
        <div className='w-full'>
            {expenses.length !== 0 ? (
                <div className='flex flex-col space-y-5'>
                    {expenses.map(exp => (
                        <AccordionItemGroupExpense
                            key={`${exp[EntityWithIdFields.Id]}`}
                            expense={exp}
                            onSaveEdit={onSaveEdit}
                            friends={friends}
                            onDeleteExpense={onDelExp}
                        />
                    ))}
                </div>
            ) : (
                <Alert variant='default' className='bg-white rounded-xl space-y-2 p-6'>
                    <div className='flex flex-row gap-2 text-xl items-center'>
                        <AlertCircle />
                        <AlertTitle>Sin gastos</AlertTitle>
                    </div>
                    <AlertDescription>
                        No hay gastos en este grupo por el momento. Presiona en agregar para registrarlos
                    </AlertDescription>
                </Alert>
            )}
        </div>
    )
}

export default GroupExpensesDataCard
