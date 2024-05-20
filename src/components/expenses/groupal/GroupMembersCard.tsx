interface GroupalMembersCardProps {
    members: string[]
}

const GroupMembersCard = ({ members }: GroupalMembersCardProps) => {
    return (
        <div className='w-full'>
            {members.map((member, idx) => (
                <div
                    className='w-full flex items-center justify-center text-lg rounded px-4 py-2'
                    key={`member_${idx}`}
                >
                    <p className='font-medium'>{member}</p>
                </div>
            ))}
        </div>
    )
}

export default GroupMembersCard
