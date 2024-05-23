import { Calculator, User, Users } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomeLanding: React.FC = () => {
    const navigate = useNavigate()

    const goToPersonalExpenses = () => {
        navigate('/individual')
    }

    const goToGroupExpenses = () => {
        navigate('/group')
    }

    return (
        <div className='flex flex-col items-center justify-center h-full py-12 gap-14'>
            <h1 className='text-7xl font-serif font-semibold text-[#0e3d26]'>Gastando Ando</h1>
            <div className='flex flex-row gap-8 items-center'>
                <div className='flex flex-col gap-3 items-center'>
                    <div>
                        <img src='/assets/individual1.jpeg' className='w-52 h-52 rounded' />
                    </div>
                    <button
                        onClick={goToPersonalExpenses}
                        className='bg-[#1c7549] hover:bg-[#175e3a] text-white font-bold py-2 px-4 rounded flex flex-row items-center gap-3'
                    >
                        <User /> <p>Gastos Personales</p>
                    </button>
                </div>
                <div className='flex flex-col gap-3 items-center'>
                    <div>
                        <img src='/assets/grupal.jpeg' className='w-52 h-52 rounded' />
                    </div>
                    <button
                        onClick={goToGroupExpenses}
                        className='bg-[#1c7549] hover:bg-[#175e3a] text-white font-bold py-2 px-4 rounded  flex flex-row items-center gap-3'
                    >
                        <Users /> <p>Gastos Grupales</p>
                    </button>
                </div>
                <div className='flex flex-col gap-3 items-center'>
                    <div>
                        <img src='assets/calculo.jpeg' className='w-52 h-52 rounded' />
                    </div>
                    <button className='bg-[#1c7549] hover:bg-[#175e3a] text-white font-bold py-2 px-4 rounded  flex flex-row items-center gap-3'>
                        <Calculator /> <p>Calculo Financiero</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomeLanding
