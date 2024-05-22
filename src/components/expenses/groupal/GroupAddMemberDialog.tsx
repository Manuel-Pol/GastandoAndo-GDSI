'use client'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { CheckIcon, ClipboardIcon, UserPlus } from 'lucide-react'
import { useState } from 'react'

export const GroupAddMemberDialog = () => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText('https://gastandoando.com/invite/vacaciones2025')
            setCopied(true)
            // Reset the copied state after 2 seconds
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy text:', err)
        }
    }
    return (
        <div className='flex items-center '>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='rounded-full p-2 hover:bg-[#165737] cursor-pointer'>
                        <UserPlus className='w-6 h-6 text-white' />
                    </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-md bg-white'>
                    <DialogHeader>
                        <DialogTitle>Invitar amigos</DialogTitle>
                    </DialogHeader>
                    <div className='flex items-center space-x-2'>
                        <div className='grid flex-1 gap-2'>
                            <Label htmlFor='link' className='sr-only'>
                                Link
                            </Label>
                            <Input id='link' defaultValue='https://gastandoando.com/invite/vacaciones2025' readOnly />
                        </div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button className='rounded' variant='outline' onClick={handleCopy}>
                                        {copied ? (
                                            <div className='flex flex-row w-full'>
                                                <p>Copiado</p> <CheckIcon className='ml-2 h-4 w-4' />
                                            </div>
                                        ) : (
                                            <div className='flex flex-row w-full'>
                                                <p>Copiar</p> <ClipboardIcon className='ml-2 h-4 w-4' />
                                            </div>
                                        )}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Click to copy</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <DialogFooter className='justify-end '>
                        <DialogClose asChild>
                            <Button type='button' className='hover:bg-slate-300 rounded'>
                                Confirmar
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
