import { GroupExpensesInterface, GroupExpensesInterfaceFields } from "@/types/groupalExpenses";
import GroupExpensesEditDialog from './GroupExpensesEditDialog'
import { EntityWithIdAndDescription, EntityWithIdAndDescriptionFields, EntityWithIdFields } from '@/types/baseEntities'
import { stringFormatter } from '@/utils/formatters/stringFormatter'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from '@/components/ui/card'
import { numberFormatter } from "@/utils/formatters/numberFormatter";

interface AccordionItemGroupExpenseProps {
    expense: GroupExpensesInterface,
    onSaveEdit: (exp: GroupExpensesInterface) => void,
    friends: EntityWithIdAndDescription[],
    onDeleteExpense: (exp: GroupExpensesInterface) => void
}


const AccordionItemGroupExpense = ({expense, onSaveEdit, friends, onDeleteExpense}: AccordionItemGroupExpenseProps) => {
    
    const calculateDebt = (exp: GroupExpensesInterface) => {
        const totalDebt = exp[GroupExpensesInterfaceFields.Amount] / exp[GroupExpensesInterfaceFields.Debtors].length
        return numberFormatter.toStringWithDecimals(totalDebt)
    }

    return (
        <div>

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={`${expense[EntityWithIdFields.Id]}`}>
                    <Card>
                        <CardContent className='mt-6'>
                            <AccordionTrigger>
                                    <div className='flex flex-row justify-between items-center w-full'>
                                        <div className='flex flex-row items-center'>
                                            <div className='flex flex-col'>
                                                <h4 className='font-semibold'>{expense[GroupExpensesInterfaceFields.Title]}</h4>
                                                <h6 className='font-semibold text-gray-400'>
                                                    {stringFormatter.cutIfHaveMoreThan(expense[GroupExpensesInterfaceFields.Description], 23)}
                                                </h6>
                                            </div>
                                        </div>
                                        <div className='flex flex-row items-center space-x-4'>
                                            <p className='text-xl font-medium'>
                                                $
                                                {numberFormatter.toStringWithDecimals(
                                                    parseFloat(expense[GroupExpensesInterfaceFields.Amount] ?? 0)
                                                )}
                                            </p>
                                            <div className='flex flex-row items-center'>
                                                <GroupExpensesEditDialog
                                                    expense={expense}
                                                    onSaveEdit={onSaveEdit}
                                                    friends={friends}
                                                    />
                                                <Button
                                                    variant='outline'
                                                    size='icon'
                                                    className='rounded-full p-3 hover:bg-[#ccd3d8] border-none'
                                                    onClick={() => onDeleteExpense(expense)}
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
                                            Pagado por {expense[GroupExpensesInterfaceFields.Payer]}
                                        </p>
                                        <p className='font-normal text-sm'>
                                            (En partes iguales deben pagar ${calculateDebt(expense)})
                                        </p>
                                    </div>
                                    <div className='col-span-1'>
                                        <p className='font-semibold text-black text-lg'>Participantes</p>
                                        <div className='grid grid-cols-2 w-full items-center'>
                                            <p className='font-medium text-black col-span-1'>{expense[GroupExpensesInterfaceFields.Payer]}</p>
                                            <p className='font-medium text-slate-500 col-span-1'>{'$ 0'}</p>
                                        </div>
                                        {expense[GroupExpensesInterfaceFields.Debtors].map((deb) => 
                                            <div className='grid grid-cols-2 w-full items-center'>
                                                <p className='font-medium text-black' key={deb[EntityWithIdFields.Id]}>
                                                    {deb[EntityWithIdAndDescriptionFields.Description]}
                                                </p>
                                                <p className='font-medium text-red-500 col-span-1'>{`- $ ${calculateDebt(expense)}`}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </AccordionContent>
                        </CardContent>
                    </Card>
                </AccordionItem>
            </Accordion>
        </div>
    )
}


export default AccordionItemGroupExpense