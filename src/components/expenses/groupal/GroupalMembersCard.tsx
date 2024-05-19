import { User, UserFields } from '@/types/users'

interface GroupalMembersCardProps {
    members: User[]
}

const GroupalMembersCard = ({ members }: GroupalMembersCardProps) => {
    return (
        <div className='w-full'>
            {members.map((member, idx) => (
                <div
                    className='w-full flex flex-row items-center justify-between hover:bg-[#ebebeb] rounded px-4 py-2'
                    key={`member_${idx}`}
                >
                    <p className='font-medium'>{member[UserFields.Name]}</p>
                </div>
            ))}
        </div>
    )
}

export default GroupalMembersCard
