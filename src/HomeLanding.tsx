export const HomeLanding = () => {
    return (
        <div className='flex justify-between pt-16 px-24 items-center'>
            <div className='space-y-4'>
                <h2 className='text-5xl font-serif font-semibold text-[#0e3d26]'>
                    Organizá tus gastos <br />
                    grupales e individuales
                </h2>
                <p className='text-ellipsis text-xl'>
                    Lleva un registro de tus gastos y saldos compartidos
                    <br /> con compañeros de piso, viajes, grupos, amigos y familiares.
                </p>
            </div>
            <div className='flex flex-col items-center gap-2'>
                <img src='assets/tipo.png' className='w-80 h-80' />
                <p className='text-7xl font-serif font-semibold text-[#0e3d26]'>Gastando Ando</p>
                <p className='text-xl'>Simplificá tus ganancias maximizá tu bienestar</p>
            </div>
        </div>
    )
}
