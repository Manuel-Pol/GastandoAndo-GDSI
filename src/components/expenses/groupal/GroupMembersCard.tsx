import { EntityWithIdAndDescriptionFields, EntityWithIdFields } from '@/types/baseEntities'
import { UserMinus } from 'lucide-react'
import { Group, GroupExpensesInterface, GroupExpensesInterfaceFields, GroupFields } from '@/types/groupalExpenses.ts'
import { useMemo } from 'react'
import { stringFormatter } from '@/utils/formatters/stringFormatter'
import { numberFormatter } from '@/utils/formatters/numberFormatter'

interface GroupalMembersCardProps {
    group: Group
    onRemoveMember: (id: number) => void
}

const GroupMembersCard = ({ group, onRemoveMember }: GroupalMembersCardProps) => {
    const memberDebts = useMemo(() => {
        const debts: { [key: number]: number } = {};

        group[GroupFields.Expenses].forEach((expense: GroupExpensesInterface) => {
            const amountPerDebtor = (expense[GroupExpensesInterfaceFields.Amount] ?? 0) / expense[GroupExpensesInterfaceFields.Debtors].length;

            expense[GroupExpensesInterfaceFields.Debtors].forEach(debtor => {
                if (debts[debtor[EntityWithIdFields.Id]]) {
                    debts[debtor[EntityWithIdFields.Id]] += amountPerDebtor;
                } else {
                    debts[debtor[EntityWithIdFields.Id]] = amountPerDebtor;
                }
            });
        });

        return debts;
    }, [group]);

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
                            className={`text-sm ${memberDebts[member[EntityWithIdFields.Id]] ? 'text-red-500' : 'text-gray-500'}`}
                        >
                            {stringFormatter.cutIfHaveMoreThan(memberDebts[member[EntityWithIdFields.Id]] ? 
                                `- $${numberFormatter.toStringWithDecimals(parseFloat(memberDebts[member[EntityWithIdFields.Id]] ?? 0), 0, 0)}` : 
                                `$${numberFormatter.toStringWithDecimals(parseFloat(0), 0, 0)}`, 14)}
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
