import { GroupExpensesInterface, GroupExpensesInterfaceFields } from '@/types/groupalExpenses'
import { numberFormatter } from '@/utils/formatters/numberFormatter'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import PreviewGroupExpenseDialog from './PreviewGroupExpense'
import GroupExpensesEditDialog from './GroupExpensesEditDialog'
import { EntityWithIdAndDescription } from '@/types/baseEntities'

interface GroupExpensesDataCardProps {
    expenses: GroupExpensesInterface[]
    triggerDeleteExp: (exp: GroupExpensesInterface) => void
    onSaveEdit: (exp: GroupExpensesInterface) => void
    friends: EntityWithIdAndDescription[]
}

const calculateDebt = (exp: GroupExpensesInterface) => {
    const totalDebt = exp[GroupExpensesInterfaceFields.Amount] / exp[GroupExpensesInterfaceFields.Debtors].length
    return numberFormatter.toStringWithDecimals(totalDebt)
}

const GroupExpensesDataCard = ({ expenses, triggerDeleteExp, onSaveEdit, friends }: GroupExpensesDataCardProps) => {
    const onDelExp = (exp: GroupExpensesInterface) => triggerDeleteExp(exp)

    return (
        <div className='w-full'>
            {expenses.length !== 0 ? (
                <div className='flex flex-col space-y-5'>
                    {expenses.map(exp => (
                        <Card>
                            <CardContent className='mt-6'>
                                <div className='flex flex-row justify-between space-x-6 items-center'>
                                    <div className='flex flex-row items-center'>
                                        <div className='flex flex-col'>
                                            <h4 className='font-semibold'>{exp[GroupExpensesInterfaceFields.Title]}</h4>
                                            <h6 className='font-semibold text-gray-400'>
                                                {stringFormatter.cutIfHaveMoreThan(exp[GroupExpensesInterfaceFields.Description], 23)}
                                            </h6>
                                        </div>
                                    </div>
                                    <div>
                                        <p className='font-semibold text-black'>
                                            Pagado por {exp[GroupExpensesInterfaceFields.Payer]}
                                        </p>
                                        <p className='font-normal text-sm'>
                                            (Cada uno debe pagar ${calculateDebt(exp)})
                                        </p>
                                    </div>
                                    <div className='flex flex-row items-center space-x-4'>
                                        <p className='text-xl font-medium'>
                                            $
                                            {numberFormatter.toStringWithDecimals(
                                                exp[GroupExpensesInterfaceFields.Amount]
                                            )}
                                        </p>
                                        <div className='flex flex-row items-center'>
                                            <PreviewGroupExpenseDialog expense={exp} />
                                            <GroupExpensesEditDialog
                                                expense={exp}
                                                onSaveEdit={onSaveEdit}
                                                friends={friends}
                                            />
                                            <Button
                                                variant='outline'
                                                size='icon'
                                                className='rounded-full p-3 hover:bg-[#ccd3d8] border-none'
                                                onClick={() => onDelExp(exp)}
                                            >
                                                <Trash2 className='h-4 w-4' color='#EF4444' />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
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
