'use client'

import * as React from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { ExpensesInterfaceFields } from '@/types/personalExpenses'

export function DatePicker(field: ControllerRenderProps<FieldValues, ExpensesInterfaceFields.Date>) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-[280px] justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                    )}
                >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {field.value ? (
                        field.value.toLocaleDateString('es-AR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        })
                    ) : (
                        <span>Elija una fecha</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
                <Calendar
                    className='bg-white'
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
