import { Group, GroupFields } from "@/types/groupalExpenses";
import { ExpensesInterface } from "@/types/personalExpenses";
import { useEffect, useState } from "react";
import DialogAddGroupMovement from "./DialogAddGroupMovement";
import PersonalExpensesDataCard from "../personal/PersonalExpensesDataCard";
import { EntityWithIdFields } from "@/types/baseEntities";


interface GroupMovementsProps {
    group: Group,
    updateGroups: (g: Group) => void
}

const GroupMovements = ({group, updateGroups}: GroupMovementsProps) => {
    const [movements, setMovements] = useState<ExpensesInterface[]>(group[GroupFields.Movements])

    useEffect(() => {
        setMovements(group[GroupFields.Movements])
    }, [group])

    const handleUpdateInGroup = (updatedMovements: ExpensesInterface[]) => {
        setMovements(updatedMovements)
        const groupUpdated: Group = {
            ...group,
            [GroupFields.Movements]: updatedMovements 
        }

        updateGroups(groupUpdated)
    }

    const handleAddMovement = (mov: ExpensesInterface) => {
        const newMovements = [...movements, mov]
        handleUpdateInGroup(newMovements)
    }

    const onDeleteMovement = (mov: ExpensesInterface) => {
        const newMovements = movements.filter(m => m[EntityWithIdFields.Id] !== mov[EntityWithIdFields.Id])
        handleUpdateInGroup(newMovements)
    }

    const onSaveEdit = (mov: ExpensesInterface) => {
        const newMovements = movements.map(m => {
            if (m[EntityWithIdFields.Id] === mov[EntityWithIdFields.Id]) return mov

            return m
        })

        handleUpdateInGroup(newMovements)
    }

    return (
        <div className="bg-white rounded p-4 w-full flex flex-col gap-6">
            <div className='flex flex-row justify-between'>
                <p className="font-medium text-2xl">{`Movimientos de ${group[GroupFields.Name]}`}</p>
                <DialogAddGroupMovement onAddMovement={handleAddMovement}/>
            </div>
            <PersonalExpensesDataCard
                    expenses={movements}
                    triggerDeleteExp={onDeleteMovement}
                    onSaveEdit={onSaveEdit}
            />
        </div>
    )
}



export default GroupMovements