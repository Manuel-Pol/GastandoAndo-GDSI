import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { useForm, FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField } from '../forms/TextField'
import { dataUsers, isRegistered } from '@/api/UsersData'
import { User, UserFields } from '@/types/users'
import { EntityWithIdFields } from '@/types/baseEntities'
import { saveNewData } from '@/api/Data'
import { useContext } from 'react'
import { UserContext } from '@/utils/contexts/userContext'

const schema = z
    .object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        confirm: z.string().min(6)
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.confirm) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Las contrasenias no coinciden.`
            })
        }
        if (isRegistered(data.email)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Ya hay un usuario registrado con ese email.`
            })
        }
    })

type Schema = z.infer<typeof schema>

export const SignUp = () => {
    const form = useForm<Schema>({ resolver: zodResolver(schema), mode: 'onBlur' })

    const navigate = useNavigate()

    const { setUser } = useContext(UserContext)

    const goToHome = () => {
        navigate('/home')
    }

    const onRegister = (data: Schema) => {
        const newUser: User = {
            [UserFields.Name]: data.name,
            [UserFields.Friends]: [],
            [UserFields.Mail]: data.email,
            [UserFields.Password]: data.password,
            [EntityWithIdFields.Id]: dataUsers.id
        }
        saveNewData(dataUsers, newUser[EntityWithIdFields.Id], newUser, newUser[UserFields.Mail])
        setUser(newUser)
        goToHome()
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='rounded bg-[#f5f5f5] text-[#082615] hover:bg-[#f5f5f5] hover:text-[#082615] drop-shadow-md'>
                        Registrarse
                    </Button>
                </DialogTrigger>
                <DialogContent className='min-w-[400px] bg-white rounded'>
                    <DialogTitle className='text-black'>Registrarse</DialogTitle>
                    <FormProvider {...form}>
                        <TextField name={'name'} control={form.control} label='Nombre' />
                        <TextField name={'email'} control={form.control} label='email' />
                        <TextField name={'password'} control={form.control} label='Contrasenia' type='password' />
                        <TextField
                            name={'confirm'}
                            control={form.control}
                            label='Confirmar contrasenia'
                            type='password'
                        />
                    </FormProvider>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                className='bg-[#1C7549] rounded text-white hover:text-white hover:bg-[#185537]'
                                onClick={form.handleSubmit(onRegister)}
                            >
                                Registrarse
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default SignUp
