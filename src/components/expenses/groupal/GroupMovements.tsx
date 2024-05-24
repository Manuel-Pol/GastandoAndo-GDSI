import { Group, GroupFields } from "@/types/groupalExpenses";
import { ExpensesInterface } from "@/types/personalExpenses";
import { useState } from "react";
import DialogAddGroupMovement from "./DialogAddGroupMovement";
import PersonalExpensesDataCard from "../personal/PersonalExpensesDataCard";
import { EntityWithIdFields } from "@/types/baseEntities";


interface GroupMovementsProps {
    group: Group
}

const GroupMovements = ({group}: GroupMovementsProps) => {
    const [movements, setMovements] = useState<ExpensesInterface[]>(group[GroupFields.Movements])

    const handleAddMovement = (mov: ExpensesInterface) => setMovements([...movements, mov])

    const onDeleteMovement = (mov: ExpensesInterface) => {
        const newMovements = movements.filter(m => m[EntityWithIdFields.Id] !== mov[EntityWithIdFields.Id])
        setMovements(newMovements)
    }

    const onSaveEdit = (mov: ExpensesInterface) => {
        const newMovements = movements.map(m => {
            if (m[EntityWithIdFields.Id] === mov[EntityWithIdFields.Id]) return mov

            return m
        })

        setMovements(newMovements)
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