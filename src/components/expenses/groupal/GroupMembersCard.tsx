import { Trash } from 'lucide-react'

interface GroupalMembersCardProps {
    members: string[]
    onDelete: (member: string) => void
}

const GroupMembersCard = ({ members, onDelete }: GroupalMembersCardProps) => {
    return (
        <div className='w-full'>
            {members.map((member, idx) => (
                <div
                    className='w-full flex items-center justify-between text-lg rounded px-4 py-2'
                    key={`member_${idx}`}
                >
                    <p className='font-medium'>{member}</p>
                    <div className='rounded-full p-3 hover:bg-[#ccd3d8]'>
                        <Trash className='w-4 h-4' onClick={() => onDelete(member)} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default GroupMembersCard
