import { Group, GroupExpensesInterface, GroupExpensesInterfaceFields, GroupFields, GroupMember, GroupMemberFields } from '@/types/groupalExpenses'
import { useContext, useEffect, useState } from 'react'
import DialogAddGroupMovement from './DialogAddGroupMovement'
import { EntityWithIdFields } from '@/types/baseEntities'
import GroupExpensesDataCard from './GroupExpensesDataCard'
import { UserContext } from '@/utils/contexts/userContext'
import { numberFormatter } from '@/utils/formatters/numberFormatter'

interface GroupMovementsProps {
    group: Group
    updateGroups: (g: Group) => void
}

const GroupMovements = ({ group, updateGroups }: GroupMovementsProps) => {
    const [movements, setMovements] = useState<GroupExpensesInterface[]>(group[GroupFields.Expenses])
    const {user} = useContext(UserContext)
    const [total, setTotal] = useState<number>()

    useEffect(() => {
        setMovements(group[GroupFields.Expenses])
    }, [group])

    useEffect(() => {
        if (user) {
            const defaultTotals = group[GroupFields.Expenses].reduce((ac, e) => e[GroupExpensesInterfaceFields.DebtPay] ? ac + 0 : ac + (e?.[GroupExpensesInterfaceFields.Amount] || 0), 0)
            setTotal(defaultTotals)
        }
    }, [user, group])

    const handleUpdateInGroup = (updatedMovements: GroupExpensesInterface[], membersToUpdate?: GroupMember[]) => {
        setMovements(updatedMovements)
        const groupUpdated: Group = {
            ...group,
            [GroupFields.Members]: membersToUpdate ?? group[GroupFields.Members],
            [GroupFields.Expenses]: updatedMovements
        }
        updateGroups(groupUpdated)
    }

    const handleAddMovement = (mov: GroupExpensesInterface) => {
        const debt = (mov[GroupExpensesInterfaceFields.Amount] ?? 0) / (mov[GroupExpensesInterfaceFields.Debtors].length + 1)
        const adv = (mov[GroupExpensesInterfaceFields.Amount] ?? 0) - debt

        const debtorsUpdated = mov[GroupExpensesInterfaceFields.Debtors].map((d) => {
            return {
                ...d,
                [GroupMemberFields.Amount]: debt
            }
        })

        const payerUpdated = {
            ...mov[GroupExpensesInterfaceFields.Payer],
            [GroupMemberFields.Amount]: adv
        }

        const membersUpdated = group[GroupFields.Members].map((m) => {
            const matchDebtor = debtorsUpdated.find((d) => d[EntityWithIdFields.Id] == m[EntityWithIdFields.Id])
            const matchPayer = m[EntityWithIdFields.Id] == payerUpdated[EntityWithIdFields.Id]
            return {
                ...m,
                [GroupMemberFields.Amount]: matchDebtor ? m[GroupMemberFields.Amount] - matchDebtor[GroupMemberFields.Amount] 
                : matchPayer ? m[GroupMemberFields.Amount] + payerUpdated[GroupMemberFields.Amount] : m[GroupMemberFields.Amount]
            }
        })

        const newMov = {
            ...mov,
            [GroupExpensesInterfaceFields.Payer]: payerUpdated,
            [GroupExpensesInterfaceFields.Debtors]: debtorsUpdated,
            [EntityWithIdFields.Id]: movements.length + 1
        }

        const newMovements = [...movements, newMov]
        const currentTotal = newMovements.reduce((ac, e) => e[GroupExpensesInterfaceFields.DebtPay] ? ac + 0 : ac + (e?.[GroupExpensesInterfaceFields.Amount] || 0), 0)
        setTotal(currentTotal)
        handleUpdateInGroup(newMovements, membersUpdated)
    }
    
    const onDeleteMovement = (mov: GroupExpensesInterface) => {
        const debtPay = mov[GroupExpensesInterfaceFields.DebtPay]
        const membersUpdated = group[GroupFields.Members].map((m) => {
            const matchDebtor = mov[GroupExpensesInterfaceFields.Debtors].find((d) => d[EntityWithIdFields.Id] == m[EntityWithIdFields.Id])
            const matchPayer = mov[GroupExpensesInterfaceFields.Payer][EntityWithIdFields.Id] == m[EntityWithIdFields.Id]
            return {
                ...m,
                [GroupMemberFields.Amount]: matchDebtor ? debtPay ? m[GroupMemberFields.Amount] + Math.abs(matchDebtor[GroupMemberFields.Amount]) : m[GroupMemberFields.Amount] + matchDebtor[GroupMemberFields.Amount]
                : matchPayer ? m[GroupMemberFields.Amount] - mov[GroupExpensesInterfaceFields.Payer][GroupMemberFields.Amount] : m[GroupMemberFields.Amount]
            }
        })
        

        const newMovements = movements.filter(m => m[EntityWithIdFields.Id] !== mov[EntityWithIdFields.Id])
        const currentTotal = newMovements.reduce((ac, e) => e[GroupExpensesInterfaceFields.DebtPay] ? ac + 0 : ac + (e?.[GroupExpensesInterfaceFields.Amount] || 0), 0)
        setTotal(currentTotal)
        handleUpdateInGroup(newMovements, membersUpdated)
    }
    
    const handleUpdateMovement = (mov: GroupExpensesInterface) => {
        const debt = (mov[GroupExpensesInterfaceFields.Amount] ?? 0) / (mov[GroupExpensesInterfaceFields.Debtors].length + 1)
        const adv = (mov[GroupExpensesInterfaceFields.Amount] ?? 0) - debt
        const moveToEdit = movements.find((moves) => moves[EntityWithIdFields.Id] == mov[EntityWithIdFields.Id])
        const debtToEdit = (moveToEdit?.[GroupExpensesInterfaceFields.Amount] ?? 0) / ((moveToEdit?.[GroupExpensesInterfaceFields.Debtors].length ?? 0) + 1)
        const advToEdit = (moveToEdit?.[GroupExpensesInterfaceFields.Amount] ?? 0) - debtToEdit

        const prevDebtorsUpdated = moveToEdit?.[GroupExpensesInterfaceFields.Debtors].map((d) => {
            return {
                ...d,
                [GroupMemberFields.Amount]: debtToEdit
            }
        })

        const prevMembersInitialize = group[GroupFields.Members].map((member) => {
            const matchDebtor = prevDebtorsUpdated?.find((d) => d[EntityWithIdFields.Id] == member[EntityWithIdFields.Id])
            const matchPayer = member[EntityWithIdFields.Id] == moveToEdit?.[GroupExpensesInterfaceFields.Payer][EntityWithIdFields.Id]
            return {
                ...member,
                [GroupMemberFields.Amount]: matchDebtor ? member[GroupMemberFields.Amount] + debtToEdit
                : matchPayer ? member[GroupMemberFields.Amount] - advToEdit : member[GroupMemberFields.Amount]
            }
        })

        const debtorsUpdated = mov[GroupExpensesInterfaceFields.Debtors].map((d) => {
            return {
                ...d,
                [GroupMemberFields.Amount]: debt
            }
        })

        const payerUpdated = {
            ...mov[GroupExpensesInterfaceFields.Payer],
            [GroupMemberFields.Amount]: adv
        }

        const membersUpdated = prevMembersInitialize.map((m) => {
            const matchDebtor = debtorsUpdated.find((d) => d[EntityWithIdFields.Id] == m[EntityWithIdFields.Id])
            const matchPayer = m[EntityWithIdFields.Id] == mov[GroupExpensesInterfaceFields.Payer][EntityWithIdFields.Id]
            return {
                ...m,
                [GroupMemberFields.Amount]: matchDebtor ? m[GroupMemberFields.Amount] - matchDebtor[GroupMemberFields.Amount] 
                : matchPayer ? m[GroupMemberFields.Amount] + payerUpdated[GroupMemberFields.Amount] : m[GroupMemberFields.Amount]
            }
        })

        const newMov = {
            ...mov,
            [GroupExpensesInterfaceFields.Payer]: payerUpdated,
            [GroupExpensesInterfaceFields.Amount]: parseFloat(mov[GroupExpensesInterfaceFields.Amount]),
            [GroupExpensesInterfaceFields.Debtors]: debtorsUpdated
        }

        const newMovements = movements.map(m => {
            if (m[EntityWithIdFields.Id] === mov[EntityWithIdFields.Id]) return newMov
            return m;
          });
          
          const currentTotal = newMovements.reduce((ac, e) => {
            const amount = parseFloat(e[GroupExpensesInterfaceFields.Amount]) || 0;
            return e[GroupExpensesInterfaceFields.DebtPay] ? ac : ac + amount;
          }, 0);
          
          setTotal(currentTotal);
          

        handleUpdateInGroup(newMovements, membersUpdated)
    }

    return (
        <div className='bg-white rounded p-4 w-full flex flex-col gap-6'>
            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-col gap-1'>
                    <p className='font-medium text-2xl'>{`Movimientos de ${group[GroupFields.Name]}`}</p>
                    {
                        !!total && total !== 0 &&
                        <div className='flex flex-row space-x-2 items-center'>
                            <p className='text-lg'>El total de gastos es de</p>
                            <div className='bg-[#ca2f2f] border-1 rounded-full px-4 py-2'>
                                <p className='text-white'>{`- $ ${numberFormatter.toStringWithDecimals(total)}`}</p>
                            </div>
                        </div>
                    }
                </div>
                <DialogAddGroupMovement onAddMovement={handleAddMovement} groupMembers={group[GroupFields.Members]} />
            </div>
            <GroupExpensesDataCard
                expenses={movements}
                triggerDeleteExp={onDeleteMovement}
                onSaveEdit={handleUpdateMovement}
                friends={group[GroupFields.Members]}
            />
        </div>
    )
}

export default GroupMovements
