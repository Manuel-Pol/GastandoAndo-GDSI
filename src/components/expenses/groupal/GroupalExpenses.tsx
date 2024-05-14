import { EntityWithIdFields } from "@/types/baseEntities"
import { useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Group, GroupFields } from "@/types/groupalExpenses"
import GroupalExpensesAddDialog from "./GroupalExpensesAddDialog"

const GroupalExpenses = () => {
    const [currentGroups, setCurrentGroups] = useState<Group[]>([])

    const handleAddGroup = (group: Group) => {
        const groupAdd = {
            ...group,
            [EntityWithIdFields.Id]: currentGroups.length + 1
        }
        setCurrentGroups([...currentGroups, groupAdd])
    }

    return (
        <div className="flex justify-center mt-16">
            <div className='flex flex-col gap-8 items-center w-full max-w-xl'>
                <p className="text-xl text-center">Seleccioná tu grupo actual para ver sus movimientos</p>
                <div className="flex flex-row justify-between w-full">
                    <div>
                        {currentGroups.length !== 0 &&
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Selecciona el grupo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {currentGroups.map((g) => <SelectItem value={`${g.id}`}>{g[GroupFields.Name]}</SelectItem>)}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        }
                    </div>
                    <GroupalExpensesAddDialog onAddGroup={handleAddGroup}/> 
                </div>
            </div>
        </div>
    )
}


export default GroupalExpenses