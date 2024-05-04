import { Button } from "@/components/ui/button"
import { Outlet } from "react-router-dom"

const LayoutNotLogged = () => {

    return (
        <div>
            <div className="w-full flex items-center justify-end bg-[#1C7549] space-x-4 py-2 px-16">
                <Button variant='link' className="border-none text-white">Ingresar</Button>
                <Button className="rounded bg-[#E4EFE7] text-[#082615] hover:bg-[#E4EFE7] hover:text-[#082615]">Registrarse</Button>
            </div>
            <div className="container-xl mx-auto">
                <Outlet />
            </div>
        </div>
    )
}


export default LayoutNotLogged