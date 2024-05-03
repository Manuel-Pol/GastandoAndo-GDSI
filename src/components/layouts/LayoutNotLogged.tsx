import { Button } from "@/components/ui/button"

const LayoutNotLogged = () => {

    return (
        <div>
            <div className="w-full flex items-center justify-start bg-[#1C7549] flex-row-reverse space-x-16 py-2 px-16">
                <Button className="rounded bg-[#E4EFE7] text-[#082615] font-semibold hover:bg-[#E4EFE7] hover:text-[#082615]">Registrarse</Button>
                <Button variant='link' className="border-none text-white font-semibold">Ingresar</Button>
            </div>
        </div>
    )
}


export default LayoutNotLogged