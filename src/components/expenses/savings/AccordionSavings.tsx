import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { EntityWithIdFields } from '@/types/baseEntities'
import { Progress, ProgressFields, Savings, SavingsFields } from '@/types/savings'
import { dateFormatter } from '@/utils/formatters/dateFormatter'
import { numberFormatter } from '@/utils/formatters/numberFormatter'
import { Trash2 } from 'lucide-react'
import { SavingsEdit } from './SavingsEdit'
import { AddProgress } from './AddProgress'
import { Progress as ProgressBar } from '@/components/ui/progress'
import { useState } from 'react'

interface AccordionSavingsProps {
    saving: Savings
    onSaveEdit: (saving: Savings) => void
    onDelete: (saving: Savings) => void
}

export const AccordionSavings = ({ saving, onSaveEdit, onDelete }: AccordionSavingsProps) => {
    const [progressValue, setProgressValue] = useState<number>((): number => {
        let totalProgress = 0
        console.log(saving[SavingsFields.Progress])
        for (const progress of saving[SavingsFields.Progress]) {
            totalProgress += progress[ProgressFields.Amount]
        }
        return totalProgress
    })
    console.log(progressValue)
    const [disabled, setDisabled] = useState<boolean>(saving[SavingsFields.Amount] == progressValue)

    const cuantoFalta = () => {
        const total = parseFloat(saving[SavingsFields.Amount] ?? 0)
        return total - progressValue
    }

    const calculateProgress = () => {
        const total = parseFloat(saving[SavingsFields.Amount] ?? 0)
        const montoRestante = cuantoFalta()
        const porcentaje = ((total - montoRestante) / total) * 100
        return porcentaje
    }

    const onAddProgress = (prog: Progress) => {
        setProgressValue(progressValue + prog[ProgressFields.Amount])

        const currentProgress = [...(saving[SavingsFields.Progress] ?? []), prog]

        const newSaving = {
            ...saving,
            [SavingsFields.Progress]: currentProgress
        }

        setDisabled(progressValue + prog[ProgressFields.Amount] == saving[SavingsFields.Amount])
        onSaveEdit(newSaving)
    }

    return (
        <Accordion type='single' collapsible className='w-full'>
            <AccordionItem value={`${saving[EntityWithIdFields.Id]}`}>
                <Card className='drop-shadow-md'>
                    <CardContent className='pt-4'>
                        <AccordionTrigger>
                            <div className='flex flex-row justify-between items-center gap-16'>
                                <div className='flex flex-row gap-16 items-center'>
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
                                    <p className='text-sm'>
                                        $ {numberFormatter.toStringWithDecimals(progressValue)}/ ${' '}
                                        {numberFormatter.toStringWithDecimals(saving[SavingsFields.Amount])}
                                    </p>
                                    <ProgressBar
                                        value={calculateProgress()}
                                        max={100}
                                        className='[&>*]:bg-gradient-to-r [&>*]:from-[#34db88] [&>*]:to-[#0d3822] [&>*]:via-[#29a768] bg-neutral-200 w-56'
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
                            <div className='flex flex-row justify-between w-full pt-6 items-center'>
                                <div className='flex flex-col items-center'>
                                    <p className='text-lg text-[#124e30]'>Fecha de inicio</p>
                                    <p>{dateFormatter.toShortDate(saving[SavingsFields.DateStart])}</p>
                                </div>
                                <div className='flex flex-col items-center'>
                                    {saving[SavingsFields.Progress].length !== 0 ? (
                                        <div className='flex flex-col items-center'>
                                            <p className='text-lg text-[#124e30]'>Ultimo progreso cargado</p>
                                            <p>
                                                {`$ ${numberFormatter.toStringWithDecimals(
                                                    parseFloat(
                                                        saving[SavingsFields.Progress].at(-1)[ProgressFields.Amount] ??
                                                            0
                                                    )
                                                )}`}
                                            </p>
                                            <p className='text-lg text-[#124e30]'>el</p>
                                            <p>
                                                {dateFormatter.toShortDate(
                                                    saving[SavingsFields.Progress].at(-1)[ProgressFields.Date]
                                                )}
                                            </p>
                                        </div>
                                    ) : (
                                        <p className='text-lg text-[#124e30]'>Todavia no hay progresos cargados</p>
                                    )}
                                </div>
                                <div className='flex flex-col items-center space-y-4'>
                                    <Button className=' bg-[#1c7549] hover:bg-[#124e30] text-white rounded px-8'>
                                        Pedir sugerencia
                                    </Button>
                                    <AddProgress
                                        progreso={progressValue}
                                        total={saving[SavingsFields.Amount]}
                                        disabled={disabled}
                                        onAddProgress={onAddProgress}
                                    />
                                </div>
                            </div>
                        </AccordionContent>
                    </CardContent>
                </Card>
            </AccordionItem>
        </Accordion>
    )
}
