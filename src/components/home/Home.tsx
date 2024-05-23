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
        <div className='flex flex-col items-center justify-center h-full py-12'>
            <h1 className='text-5xl font-bold mb-8 text-center'>Gastando Ando</h1>
            <div className='flex flex-col space-y-8'>
                <button
                    onClick={goToPersonalExpenses}
                    className='bg-[#1c7549] hover:bg-[#175e3a] text-white font-bold py-2 px-4 rounded'
                >
                    Ir a Gastos Personales
                </button>
                <button
                    onClick={goToGroupExpenses}
                    className='bg-[#1c7549] hover:bg-[#175e3a] text-white font-bold py-2 px-4 rounded mt-4'
                >
                    Ir a Gastos Grupales
                </button>
            </div>
        </div>
    )
}

export default HomeLanding
