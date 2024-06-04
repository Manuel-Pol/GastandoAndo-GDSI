import { EntityWithIdAndDescriptionFields, EntityWithIdFields } from '@/types/baseEntities'
import { UserMinus } from 'lucide-react'
import { Group, GroupExpensesInterface, GroupExpensesInterfaceFields, GroupFields, GroupMemberFields } from '@/types/groupalExpenses.ts'
import { useMemo } from 'react'
import { stringFormatter } from '@/utils/formatters/stringFormatter'
import { numberFormatter } from '@/utils/formatters/numberFormatter'

interface GroupalMembersCardProps {
    group: Group
    onRemoveMember: (id: number) => void
}

const GroupMembersCard = ({ group, onRemoveMember }: GroupalMembersCardProps) => {
    
    /*const memberDebts = useMemo(() => {
        const debts: { [key: number]: number } = {};

        group[GroupFields.Expenses].forEach((expense: GroupExpensesInterface) => {
            const amountPerDebtor = (expense[GroupExpensesInterfaceFields.Amount] ?? 0) / (expense[GroupExpensesInterfaceFields.Debtors].length + 1);
            const amountPayer = (expense[GroupExpensesInterfaceFields.Amount] ?? 0) - amountPerDebtor

            expense[GroupExpensesInterfaceFields.Debtors].forEach(debtor => {
                if (debts[debtor[EntityWithIdFields.Id]] && debtor[EntityWithIdAndDescriptionFields.Description] !== expense[GroupExpensesInterfaceFields.Payer]) {
                    debts[debtor[EntityWithIdFields.Id]] -= amountPerDebtor;
                } else {
                    debts[debtor[EntityWithIdFields.Id]] += amountPayer;
                }
            });
        });

        return debts;
    }, [group]);*/

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
            ))}
        </div>
    );
};

export default GroupMembersCard
