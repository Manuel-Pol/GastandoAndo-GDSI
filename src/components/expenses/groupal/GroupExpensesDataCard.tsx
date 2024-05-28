import { GroupExpensesInterface, GroupExpensesInterfaceFields } from '@/types/groupalExpenses'
import { numberFormatter } from '@/utils/formatters/numberFormatter'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import GroupExpensesEditDialog from './GroupExpensesEditDialog'
import { EntityWithIdAndDescription, EntityWithIdAndDescriptionFields, EntityWithIdFields } from '@/types/baseEntities'
import { stringFormatter } from '@/utils/formatters/stringFormatter'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

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
                <Accordion type='single' collapsible className='w-full'>
                    <div className='flex flex-col space-y-5'>
                        {expenses.map(exp => (
                            <AccordionItem value={`${exp[EntityWithIdFields.Id]}`}>
                                <Card>
                                    <CardContent className='mt-6'>
                                        <AccordionTrigger>
                                                <div className='flex flex-row justify-between items-center w-full'>
                                                    <div className='flex flex-row items-center'>
                                                        <div className='flex flex-col'>
                                                            <h4 className='font-semibold'>{exp[GroupExpensesInterfaceFields.Title]}</h4>
                                                            <h6 className='font-semibold text-gray-400'>
                                                                {stringFormatter.cutIfHaveMoreThan(exp[GroupExpensesInterfaceFields.Description], 23)}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-row items-center space-x-4'>
                                                        <p className='text-xl font-medium'>
                                                            $
                                                            {numberFormatter.toStringWithDecimals(
                                                                parseFloat(exp[GroupExpensesInterfaceFields.Amount] ?? 0)
                                                            )}
                                                        </p>
                                                        <div className='flex flex-row items-center'>
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
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className='grid grid-cols-2 gap-8'>
                                                <div className='col-span-1'>
                                                    <p className='font-semibold text-black'>
                                                        Pagado por {exp[GroupExpensesInterfaceFields.Payer]}
                                                    </p>
                                                    <p className='font-normal text-sm'>
                                                        (En partes iguales deben pagar ${calculateDebt(exp)})
                                                    </p>
                                                </div>
                                                <div className='col-span-1'>
                                                    <p className='font-semibold text-black text-lg'>Participantes</p>
                                                    <div className='grid grid-cols-2 w-full items-center'>
                                                        <p className='font-medium text-black col-span-1'>{exp[GroupExpensesInterfaceFields.Payer]}</p>
                                                        <p className='font-medium text-slate-500 col-span-1'>{'$ 0'}</p>
                                                    </div>
                                                    {exp[GroupExpensesInterfaceFields.Debtors].map((deb) => 
                                                        <div className='grid grid-cols-2 w-full items-center'>
                                                            <p className='font-medium text-black' key={deb[EntityWithIdFields.Id]}>
                                                                {deb[EntityWithIdAndDescriptionFields.Description]}
                                                            </p>
                                                            <p className='font-medium text-red-500 col-span-1'>{`- $ ${calculateDebt(exp)}`}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </CardContent>
                                </Card>
                            </AccordionItem>
                        ))}
                    </div>
                </Accordion>
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
