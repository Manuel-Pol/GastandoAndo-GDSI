import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Outlet } from "react-router-dom"


const LayoutLogged = () => {

    return (
        <div>
            <div className="w-full flex items-center justify-end bg-[#1C7549] space-x-4 py-2 px-16">
                <h5 className="text-white text-xl">Vinicius</h5>
                <Avatar className="bg-white rounded-full hover:cursor-pointer">
                    <AvatarFallback>V</AvatarFallback>
                </Avatar>
            </div>
            <div className="container mx-auto my-6">
                <Outlet />
            </div>
        </div>
    )
}


export default LayoutLogged
