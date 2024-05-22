import { EntityWithIdAndDescription, EntityWithIdAndDescriptionFields, EntityWithIdFields } from "@/types/baseEntities"
import { Trash } from "lucide-react"

interface GroupalMembersCardProps {
    members: EntityWithIdAndDescription[],
    onRemoveMember: (id: number) => void
}

const GroupMembersCard = ({ members, onRemoveMember }: GroupalMembersCardProps) => {
    return (
        <div className='w-full'>
            {members.map((member, idx) => (
                <div
                    className='w-full flex items-center justify-between text-lg rounded px-4 py-2'
                    key={`member_${idx}`}
                >
                    <p className='font-medium'>{member[EntityWithIdAndDescriptionFields.Description]}</p>
                    {member[EntityWithIdFields.Id] !== 0 &&
                        <div className='rounded-full p-3 hover:bg-[#ccd3d8] cursor-pointer'>
                            <Trash className='w-4 h-4' onClick={() => onRemoveMember(member[EntityWithIdFields.Id])} />
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}

export default GroupMembersCard
