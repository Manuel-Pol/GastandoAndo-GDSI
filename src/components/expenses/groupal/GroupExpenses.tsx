import { EntityWithIdAndDescriptionFields, EntityWithIdFields } from '@/types/baseEntities'
import { useContext, useState } from 'react'
import {
    Group,
    GroupExpensesInterface,
    GroupExpensesInterfaceFields,
    GroupFields,
    GroupMember,
    GroupMemberBalance,
    GroupMemberBalanceFields,
    GroupMemberFields,
    defaultFriends
} from '@/types/groupalExpenses'
import GroupExpensesAddDialog from './GroupExpensesAddDialog'
import GroupDataCard from './GroupDataCard'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import GroupMovements from './GroupMovements'
import { AlertCircle } from 'lucide-react'
import GroupMembersCard from './GroupMembersCard'
import { GroupAddMemberDialog } from './GroupAddMemberDialog'
import { removeData, saveNewData, updateData } from '@/api/Data'
import { dataGroups } from '@/api/GroupsData'
import { UserFields } from '@/types/users'
import { UserContext } from '@/utils/contexts/userContext'
import { dataUsers } from '@/api/UsersData'

const GroupExpenses = () => {
    const { user } = useContext(UserContext)

    const [currentGroups, setCurrentGroups] = useState<Group[]>(user[UserFields.Groups].map(id => dataGroups.data[id]))
    const [selectedGroup, setSelectedGroup] = useState<Group | undefined>(undefined)

    const handleAddGroup = (group: Group) => {
        const groupAdd = {
            ...group,
            [EntityWithIdFields.Id]: dataGroups.id
        }
        user[UserFields.Groups].push(groupAdd[EntityWithIdFields.Id])

        saveNewData(dataGroups, groupAdd[EntityWithIdFields.Id], groupAdd)
        updateData(dataUsers, user[EntityWithIdFields.Id], user)

        setCurrentGroups(user[UserFields.Groups].map(id => dataGroups.data[id]))
        setSelectedGroup(groupAdd)
    }

    const onClickGroup = (g: Group) => setSelectedGroup(g)

    const deleteGroup = (id: number) => {
        if (selectedGroup && selectedGroup[EntityWithIdFields.Id] === id) {
            setSelectedGroup(undefined)
        }
        if (id in dataGroups.data) {
            removeData(dataGroups, id)

            user[UserFields.Groups] = user[UserFields.Groups].filter(value => value !== id)
            updateData(dataUsers, user[EntityWithIdFields.Id], user)

            const newGroups = user[UserFields.Groups].map(id => dataGroups.data[id])
            setCurrentGroups(newGroups)
        }
    }

    const onSaveEdit = (group: Group) => {
        if (group[EntityWithIdFields.Id] in dataGroups.data) {
            updateData(dataGroups, group[EntityWithIdFields.Id], group)

            const newGroups = user[UserFields.Groups].map(id => dataGroups.data[id])
            setCurrentGroups(newGroups)
        }
        onClickGroup(group)
    }

    const onDeleteMember = (memberId: number) => {
        if (selectedGroup) {
            const newGroup: Group = {
                ...selectedGroup,
                [GroupFields.Members]: selectedGroup[GroupFields.Members].filter(
                    m => m[EntityWithIdFields.Id] !== memberId
                )
            }
            onSaveEdit(newGroup)
            setSelectedGroup(newGroup)
        }
    }

    const onUpdateExpensesByBalance = (balance: GroupMemberBalance, logged: GroupMember, payedMember: GroupMember) => {
        if (selectedGroup) {
            const loggedPayer = {
                ...logged,
                [GroupMemberFields.Amount]: Math.abs(balance[GroupMemberBalanceFields.Balance])
            }
            const newPayedMember = {
                ...payedMember,
                [GroupMemberFields.Amount]: balance[GroupMemberBalanceFields.Balance]
            }

            const currentExpenses = selectedGroup[GroupFields.Expenses]

            const newExp: GroupExpensesInterface = {
                [EntityWithIdFields.Id]: currentExpenses.length + 1,
                [GroupExpensesInterfaceFields.Payer]: loggedPayer,
                [GroupExpensesInterfaceFields.Amount]: Math.abs(balance[GroupMemberBalanceFields.Balance]),
                [GroupExpensesInterfaceFields.Date]: new Date(),
                [GroupExpensesInterfaceFields.Title]: 'Pago de deuda',
                [GroupExpensesInterfaceFields.Description]: `${
                    logged[EntityWithIdAndDescriptionFields.Description]
                } le pagó la deuda de $ ${Math.abs(balance[GroupMemberBalanceFields.Balance])} a ${
                    payedMember[EntityWithIdAndDescriptionFields.Description]
                }`,
                [GroupExpensesInterfaceFields.Debtors]: [newPayedMember],
                [GroupExpensesInterfaceFields.DebtPay]: true
            }

            const newExpenses: GroupExpensesInterface[] = [...currentExpenses, newExp]

            const membersUpdated = selectedGroup[GroupFields.Members].map(m => {
                const matchDebtor = m[EntityWithIdFields.Id] == payedMember[EntityWithIdFields.Id]
                const matchPayer = m[EntityWithIdFields.Id] == logged[EntityWithIdFields.Id]

                return {
                    ...m,
                    [GroupMemberFields.Amount]: matchPayer
                        ? m[GroupMemberFields.Amount] + loggedPayer[GroupMemberFields.Amount]
                        : matchDebtor
                        ? m[GroupMemberFields.Amount] + newPayedMember[GroupMemberFields.Amount]
                        : m[GroupMemberFields.Amount]
                }
            })

            const groupUpdated: Group = {
                ...selectedGroup,
                [GroupFields.Expenses]: newExpenses,
                [GroupFields.Members]: membersUpdated
            }

            onSaveEdit(groupUpdated)
        }
    }

    return (
        <div className='grid grid-cols-4 gap-6 justify-center items-start w-full'>
            <div className='col-span-1 bg-white rounded p-4'>
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-row justify-between items-center mb-2'>
                        <p className='text-2xl font-medium'>Grupos</p>
                        <GroupExpensesAddDialog onAddGroup={handleAddGroup} friends={defaultFriends} />
                    </div>
                    <GroupDataCard
                        groups={currentGroups}
                        onSelect={onClickGroup}
                        selectedGroup={selectedGroup}
                        onSaveEdit={onSaveEdit}
                        onDelete={deleteGroup}
                    />
                </div>
            </div>
            <div className='col-span-2'>
                {selectedGroup ? (
                    <GroupMovements group={selectedGroup} updateGroups={onSaveEdit} />
                ) : (
                    <div className='w-full'>
                        <Alert variant='default' className='bg-white rounded-xl space-y-2 p-6'>
                            <div className='flex flex-row gap-2 text-xl items-center'>
                                <AlertCircle />
                                <AlertTitle>Sin movimientos</AlertTitle>
                            </div>
                            <AlertDescription>Seleccione un grupo para visualizar sus movimientos.</AlertDescription>
                        </Alert>
                    </div>
                )}
            </div>
            {selectedGroup && (
                <div className='col-span-1 bg-white rounded'>
                    <div className='flex flex-col gap-2 rounded'>
                        <div className='text-white text-2xl rounded font-medium flex items-center justify-between bg-[#1C7549] py-1 px-4'>
                            <p>Integrantes</p>
                            <GroupAddMemberDialog />
                        </div>
                        <GroupMembersCard
                            group={selectedGroup}
                            onRemoveMember={onDeleteMember}
                            onUpdateMember={onUpdateExpensesByBalance}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default GroupExpenses
