import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { ExpensesInterface, ExpenseType, ExpensesInterfaceFields } from '@/types/personalExpenses'
import PersonalExpensesEditDialog from './PersonalExpensesEditDialog'
import { numberFormatter } from '@/utils/formatters/numberFormatter'
import PreviewMovementDialog from '../components/PreviewMovementDialog'
import { getExpenseRecurrence } from '@/utils/mappers/movementMappers'
import { dateFormatter } from '@/utils/formatters/dateFormatter'

interface PersonalExpensesDataCardProps {
    expenses: ExpensesInterface[]
    triggerDeleteExp: (exp: ExpensesInterface) => void
    onSaveEdit: (exp: ExpensesInterface) => void
}

const PersonalExpensesDataCard = ({ expenses, triggerDeleteExp, onSaveEdit }: PersonalExpensesDataCardProps) => {
    const onDelExp = (exp: ExpensesInterface) => triggerDeleteExp(exp)


    return (
        <div className='w-full'>
            {expenses.length !== 0 ? (
                <div className='flex flex-col space-y-5'>
                    {expenses.map(exp => (
                        <Card>
                            <CardContent className='mt-6'>
                                <div className='flex flex-row justify-between items-center'>
                                    <div className='flex flex-row space-x-6 items-center'>
                                        <div className='flex flex-col gap-4'>
                                            <div>
                                                {exp[ExpensesInterfaceFields.IsExpense] === ExpenseType.Gasto ? (
                                                    <Badge className='bg-[#EF4444] text-white'>Gasto</Badge>
                                                ) : (
                                                    <Badge className='bg-[#1C7549] text-white'>Ingreso</Badge>
                                                )}
                                            </div>
                                            <div className='text-xs'>
                                                {dateFormatter.toShortDate(exp[ExpensesInterfaceFields.Date])}
                                            </div>
                                        </div>
                                        <div className='flex flex-col'>
                                            <div className='flex flex-row space-x-4 items-center'>
                                                <h4 className='font-semibold'>{exp[ExpensesInterfaceFields.Title]}</h4>
                                                <Badge className='bg-[#e8ebe9]'>
                                                    {getExpenseRecurrence(exp[ExpensesInterfaceFields.Recurrence])}
                                                </Badge>
                                            </div>
                                            <h6 className='font-semibold text-gray-400'>
                                                {exp[ExpensesInterfaceFields.Description]}
                                            </h6>
                                        </div>
                                    </div>
                                    <div className='flex flex-row items-center space-x-4'>
                                        <div>
                                            {exp[ExpensesInterfaceFields.IsExpense] === ExpenseType.Gasto ? (
                                                <p className='text-xl text-red-500'>{`- $ ${numberFormatter.toStringWithDecimals(
                                                    parseFloat(exp[ExpensesInterfaceFields.Amount])
                                                )}`}</p>
                                            ) : (
                                                <p className='text-xl text-green-600'>{`+ $ ${numberFormatter.toStringWithDecimals(
                                                    parseFloat(exp[ExpensesInterfaceFields.Amount])
                                                )}`}</p>
                                            )}
                                        </div>
                                        <div className='flex flex-row items-center relative left-5'>
                                            <PreviewMovementDialog movement={exp} />
                                            <PersonalExpensesEditDialog expense={exp} onSubmitEdit={onSaveEdit} />
                                            <Button
                                                variant='outline'
                                                size='icon'
                                                className='rounded-full border-none'
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
                        <AlertTitle>Sin movimientos</AlertTitle>
                    </div>
                    <AlertDescription>
                        No hay movimientos por el momento. Presiona en agregar para registrarlos
                    </AlertDescription>
                </Alert>
            )}
        </div>
    )
}

export default PersonalExpensesDataCard
