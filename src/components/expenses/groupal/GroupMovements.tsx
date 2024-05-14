import { Group, GroupFields } from "@/types/groupalExpenses";


interface GroupMovementsProps {
    group: Group
}

const GroupMovements = ({group}: GroupMovementsProps) => {


    return (
        <div className="bg-white rounded p-4 w-full flex flex-col gap-6">
            <div className='flex flex-row justify-between'>
                <p className="font-medium text-2xl">{`Movimientos de ${group[GroupFields.Name]}`}</p>
            </div>
        </div>
    )
}



export default GroupMovements