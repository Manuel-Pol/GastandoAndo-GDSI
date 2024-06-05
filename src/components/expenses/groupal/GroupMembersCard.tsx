import { EntityWithIdAndDescriptionFields, EntityWithIdFields } from '@/types/baseEntities'
import { UserMinus } from 'lucide-react'
import { Group, GroupFields, GroupMember, GroupMemberFields } from '@/types/groupalExpenses.ts'
import { stringFormatter } from '@/utils/formatters/stringFormatter'
import { numberFormatter } from '@/utils/formatters/numberFormatter'
import GroupMemberPayDebt from './components/GroupMemberPayDebt'
import { useContext } from 'react'
import { UserContext } from '@/utils/contexts/userContext'

interface GroupalMembersCardProps {
    group: Group
    onRemoveMember: (id: number) => void
}

const GroupMembersCard = ({ group, onRemoveMember }: GroupalMembersCardProps) => {
    const { user } = useContext(UserContext)

    const handleUpdateGroupMembers = (lst: GroupMember[], member: GroupMember) => {
        
    }


    const onUpdateMember = (member: GroupMember) => {

        const updatedMembers = group?.[GroupFields.Members].map((m) => {
            if (m[EntityWithIdFields.Id] == member[EntityWithIdFields.Id]) return member
            return m
        })

        handleUpdateGroupMembers(updatedMembers, member)
    }

    return (
        <div className='w-full'>
            {group?.[GroupFields.Members].map((member, idx) => (
                <div
                    className='w-full grid grid-cols-12 rounded px-4 py-2 items-center gap-2'
                    key={`member_${idx}`}
                >
                    <p className='font-medium col-span-6 text-lg'>
                        {stringFormatter.cutIfHaveMoreThan(member[EntityWithIdAndDescriptionFields.Description], 15)}
                    </p>
                    <div className='col-span-6 flex flex-row justify-between items-center'>
                        <p
                            className={`text-sm ${member[GroupMemberFields.Amount] < 0 ? 'text-red-500' : 'text-green-500'}`}
                        >
                            {stringFormatter.cutIfHaveMoreThan(member[GroupMemberFields.Amount] < 0 ? 
                                `- $${numberFormatter.toStringWithDecimals(parseFloat(Math.abs(member[GroupMemberFields.Amount] ?? 0)), 0, 0)}` : 
                                ` + $${numberFormatter.toStringWithDecimals(parseFloat(member[GroupMemberFields.Amount] ?? 0), 0, 0)}`, 14)}
                        </p>
                        <div className='flex flex-row space-x-2 items-center'>
                            {member[GroupMemberFields.Amount] > 0 && member[EntityWithIdFields.Id] !== user[EntityWithIdFields.Id] &&
                                <GroupMemberPayDebt member={member} onUpdateMember={onUpdateMember}/>
                            }
                            {member[EntityWithIdFields.Id] !== 0 && (
                                <div className="rounded-full p-3 hover:bg-[#e2e2e2] cursor-pointer">
                                    <UserMinus
                                        className="w-4 h-4 text-red-600"
                                        onClick={() => onRemoveMember(member[EntityWithIdFields.Id])}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GroupMembersCard
