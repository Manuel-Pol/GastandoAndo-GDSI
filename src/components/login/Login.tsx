import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '../ui/dialog'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField } from '../forms/TextField'
import { dataUsers, isRegistered, isTruePassword } from '@/api/UsersData'
import { User, UserFields } from '@/types/users'
import { useContext } from 'react'
import { UserContext } from '@/utils/contexts/userContext'

const schema = z
    .object({
        email: z
            .string({ message: 'Este campo es obligatorio.' })
            .email({ message: 'El email no es válido.' })
            .refine(email => isRegistered(email), {
                message: `No hay un usuario registrado con este email.`
            }),
        password: z
            .string({ message: 'Este campo es obligatorio.' })
            .min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
    })
    .superRefine((data, ctx) => {
        if (dataUsers.names) {
            const inputUserId = dataUsers.names[data.email]
            if (!isTruePassword(dataUsers.data[inputUserId][UserFields.Password], data.password)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `La contraseña es incorrecta.`,
                    path: ['password']
                })
            }
        }
    })

type Schema = z.infer<typeof schema>

const Login = () => {
    const form = useForm<Schema>({ resolver: zodResolver(schema), mode: 'onBlur' })

    const { setUser } = useContext(UserContext)

    const navigate = useNavigate()

    useContext(UserContext)

    const goToHome = () => {
        navigate('/home')
    }

    const onLogin = (data: Schema) => {
        if (dataUsers.names) {
            const inputUserId = dataUsers.names[data.email]
            const inputUser: User = dataUsers.data[inputUserId]
            setUser(inputUser)
            goToHome()
        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='border-none text-white'>Ingresar</Button>
                </DialogTrigger>
                <DialogContent className='min-w-[400px] bg-white rounded'>
                    <DialogTitle className='text-black'>Ingresar</DialogTitle>
                    <FormProvider {...form}>
                        <TextField name={'email'} control={form.control} label='email' />
                        <TextField name={'password'} control={form.control} label='Constrasenia' type='password' />
                    </FormProvider>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                className='bg-[#1C7549] rounded text-white hover:text-white hover:bg-[#185537]'
                                onClick={form.handleSubmit(onLogin)}
                            >
                                Ingresar
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Login
