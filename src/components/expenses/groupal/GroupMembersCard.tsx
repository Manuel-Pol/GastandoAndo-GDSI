
import { Group, GroupFields, GroupMember, GroupMemberBalance } from '@/types/groupalExpenses.ts'
import GroupMemberDataCard from './components/GroupMemberDataCard';
import { UserContext } from '@/utils/contexts/userContext';
import { useContext, useEffect, useState } from 'react';
import { EntityWithIdFields } from '@/types/baseEntities';

interface GroupalMembersCardProps {
    group: Group
    onRemoveMember: (id: number) => void,
    onUpdateMember: (a: GroupMemberBalance, logged: GroupMember, payedMember: GroupMember) => void
}

const GroupMembersCard = ({ group, onRemoveMember, onUpdateMember }: GroupalMembersCardProps) => {
    const { user } = useContext(UserContext)
    const [userMember, setUserMember] = useState<GroupMember | undefined>(group?.[GroupFields.Members].find((m) => m[EntityWithIdFields.Id] == user[EntityWithIdFields.Id]))

    useEffect(() => {
        setUserMember(group?.[GroupFields.Members].find((m) => m[EntityWithIdFields.Id] == user[EntityWithIdFields.Id]))
    }, [group])

    return (
        <div className='w-full'>
            {userMember ? group?.[GroupFields.Members].map((member, idx) => (
                <div key={`member_${idx}`}>
                    <GroupMemberDataCard member={member} logged={userMember} group={group} onRemoveMember={onRemoveMember} handleUpdateMember={onUpdateMember}/>
                </div>
            )): <></>}
        </div>
    );
};

export default GroupMembersCard
