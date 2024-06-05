import { EntityWithIdAndDescriptionFields, EntityWithIdFields } from "@/types/baseEntities";
import { Group, GroupExpensesInterfaceFields, GroupFields, GroupMember, GroupMemberBalance, GroupMemberBalanceFields, GroupMemberFields } from "@/types/groupalExpenses";
import { stringFormatter } from "@/utils/formatters/stringFormatter";
import { UserMinus } from "lucide-react";
import { useEffect, useState } from "react";
import GroupMemberPayDebt from "./GroupMemberPayDebt";
import { numberFormatter } from "@/utils/formatters/numberFormatter";


interface GroupMemberDataCardProps {
    member: GroupMember,
    logged: GroupMember,
    group: Group,
    handleUpdateMember: (b: GroupMemberBalance, logged: GroupMember, payedMember: GroupMember) => void,
    onRemoveMember: (id: number) => void
}


const GroupMemberDataCard = ({member, logged, group, onRemoveMember, handleUpdateMember} : GroupMemberDataCardProps) => {
    const getBalance = () => {
        let balance = 0
        group[GroupFields.Expenses].map((e) => {
            const payerLogged = e[GroupExpensesInterfaceFields.Payer][EntityWithIdFields.Id] == logged[EntityWithIdFields.Id]
            const payerMember = e[GroupExpensesInterfaceFields.Payer][EntityWithIdFields.Id] == member[EntityWithIdFields.Id]
            if (payerLogged) {
                const isMemberDebtor = e[GroupExpensesInterfaceFields.Debtors].some((d) => d[EntityWithIdFields.Id] == member[EntityWithIdFields.Id])
                if (isMemberDebtor) {
                    balance += e[GroupExpensesInterfaceFields.DebtPay] ? e[GroupExpensesInterfaceFields.Amount] ?? 0 : (e[GroupExpensesInterfaceFields.Amount] ?? 0) / (e[GroupExpensesInterfaceFields.Debtors].length + 1)
                }
            }
            if (payerMember) {
                const isLoggedDebtor = e[GroupExpensesInterfaceFields.Debtors].some((d) => d[EntityWithIdFields.Id] == logged[EntityWithIdFields.Id])
                if (isLoggedDebtor) balance -= (e[GroupExpensesInterfaceFields.Amount] ?? 0) / (e[GroupExpensesInterfaceFields.Debtors].length + 1)
            }
        })
        return balance
    }


    const [balance, setBalance] = useState<GroupMemberBalance>({
        [EntityWithIdFields.Id]: member[EntityWithIdFields.Id],
        [EntityWithIdAndDescriptionFields.Description]: member[EntityWithIdAndDescriptionFields.Description],
        [GroupMemberBalanceFields.Balance]: getBalance()
    })

    const calculateBalance = () => {
        const b = {
            [EntityWithIdFields.Id]: member[EntityWithIdFields.Id],
            [EntityWithIdAndDescriptionFields.Description]: member[EntityWithIdAndDescriptionFields.Description],
            [GroupMemberBalanceFields.Balance]: getBalance()
        }

        setBalance(b)
    }

    useEffect(() => {
        calculateBalance()
    }, [group])


    const onUpdateMember = () => {
        handleUpdateMember(balance, logged, member)
    }

    return (
        <div className='w-full grid grid-cols-12 rounded px-4 py-2 items-center gap-2'>
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
                    {balance && balance[GroupMemberBalanceFields.Balance] < 0 && member[EntityWithIdFields.Id] !== logged[EntityWithIdFields.Id] &&
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
    )
}


export default GroupMemberDataCard