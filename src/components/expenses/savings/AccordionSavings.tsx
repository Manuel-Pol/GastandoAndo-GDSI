import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { EntityWithIdFields } from '@/types/baseEntities'
import { Savings, SavingsFields } from '@/types/savings'
import { dateFormatter } from '@/utils/formatters/dateFormatter'
import { numberFormatter } from '@/utils/formatters/numberFormatter'
import { Trash2 } from 'lucide-react'
import { SavingsEdit } from './SavingsEdit'

interface AccordionSavingsProps {
    saving: Savings
    onSaveEdit: (saving: Savings) => void
    onDelete: (saving: Savings) => void
}

export const AccordionSavings = ({ saving, onSaveEdit, onDelete }: AccordionSavingsProps) => {
    return (
        <div>
            <Accordion type='single' collapsible className='w-full'>
                <AccordionItem value={`${saving[EntityWithIdFields.Id]}`}>
                    <Card className='drop-shadow-md'>
                        <CardContent className='pt-4'>
                            <AccordionTrigger>
                                <div className='flex flex-row justify-between items-center gap-8'>
                                    <div className='flex flex-row gap-12'>
                                        <h4 className='font-semibold text-xl'>{saving[SavingsFields.Title]}</h4>
                                        <div className='flex flex-col items-center w-full '>
                                            <p className='text-sm text-neutral-700'>Monto</p>
                                            <p className='text-md '>{`$ ${numberFormatter.toStringWithDecimals(
                                                parseFloat(saving[SavingsFields.Amount] ?? 0)
                                            )}`}</p>
                                        </div>
                                        <div className='flex flex-col items-center'>
                                            <p className='text-sm text-neutral-700'>Para</p>
                                            <p className='text-md'>
                                                {dateFormatter.toShortDate(saving[SavingsFields.DateObjective])}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className='text-sm'>50% o 100/500000 o falta tanto</p>
                                        <Progress
                                            value={50}
                                            max={100}
                                            className='[&>*]:bg-gradient-to-r [&>*]:from-red-600 [&>*]:to-yellow-400 [&>*]:via-orange-600 bg-neutral-200 w-56'
                                        />
                                    </div>
                                    <div className='flex flex-row items-center space-x-2'>
                                        <div className='flex flex-row items-center relative'>
                                            <SavingsEdit saving={saving} onSubmitEdit={onSaveEdit} />
                                            <Button
                                                variant='outline'
                                                size='icon'
                                                className='rounded-full border-none p-3 hover:bg-[#ccd3d8]'
                                                onClick={() => onDelete(saving)}
                                            >
                                                <Trash2 className='h-4 w-4' color='#EF4444' />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className='flex flex-row justify-between w-full pt-6'>
                                    <div className='col-span-1'>
                                        <p className='text-lg text-[#124e30]'>Fecha de inicio</p>
                                        <p>{dateFormatter.toShortDate(saving[SavingsFields.DateStart])}</p>
                                    </div>
                                    <div className='col-span-1 flex flex-col items-center'>
                                        <p className='text-lg text-[#124e30]'>Ultimo progreso cargado</p>
                                        <p>progreso</p>
                                        <p className='text-lg text-[#124e30]'>el</p>
                                        <p>fecha de progreso</p>
                                    </div>
                                    <div className='flex flex-col items-center space-y-4'>
                                        <Button className=' bg-[#1c7549] hover:bg-[#124e30] text-white rounded px-8'>
                                            Pedir sugerencia
                                        </Button>
                                        <Button className='bg-[#1c7549] hover:bg-[#124e30] text-white rounded px-8'>
                                            Añadir progreso
                                        </Button>
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
