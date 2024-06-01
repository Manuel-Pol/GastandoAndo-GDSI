import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Savings, SavingsFields } from '@/types/savings'
import { dateFormatter } from '@/utils/formatters/dateFormatter'
import { numberFormatter } from '@/utils/formatters/numberFormatter'
import { stringFormatter } from '@/utils/formatters/stringFormatter'
import { AlertCircle, Trash2 } from 'lucide-react'

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
                        <Card>
                            <CardContent className='pt-6'>
                                <div className='flex flex-row justify-between items-center '>
                                    <div className='flex flex-row gap-20'>
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
                                                {dateFormatter.toShortDate(saving[SavingsFields.Date])}
                                            </p>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <Progress
                                            value={50}
                                            max={100}
                                            className='[&>*]:bg-gradient-to-r [&>*]:from-red-600 [&>*]:to-yellow-400 [&>*]:via-orange-600 bg-neutral-200 w-56'
                                        />
                                    </div>
                                    <div className='flex flex-row items-center space-x-2'>
                                        <div className='flex flex-row items-center relative'>
                                            {/* <SavingsEditDialog savingense={saving} onSubmitEdit={onSaveEdit} /> */}
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
                            </CardContent>
                        </Card>
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
