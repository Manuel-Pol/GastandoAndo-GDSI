import { Form } from '@/components/ui/form'

import { useFormContext } from 'react-hook-form'
import { GroupExpensesInterfaceFields } from '@/types/groupalExpenses'
import { EntityWithIdAndDescription, EntityWithIdAndDescriptionFields } from '@/types/baseEntities'
import { TextField } from '@/components/forms/TextField'
import { TextArea } from '@/components/forms/TextArea'
import { SelectField } from '@/components/forms/SelectField'
import { MultiselectField } from '@/components/forms/MultiselectField'
import { useEffect, useState } from 'react'

interface GroupFormProps {
    groupMembers: EntityWithIdAndDescription[]
    selectedDebtors: EntityWithIdAndDescription[],
    setSelectedPayer?: (arg: string) => void,
    onSelectDebtor: (Debtor: EntityWithIdAndDescription) => void
    onUnselectDebtor: (Debtor: EntityWithIdAndDescription) => void
}

const GroupExpensesAddNewForm = ({
    groupMembers,
    selectedDebtors,
    setSelectedPayer,
    onSelectDebtor,
    onUnselectDebtor
}: GroupFormProps) => {
    const methods = useFormContext()

    const watchPayer = methods.watch(GroupExpensesInterfaceFields.Payer)
    const [members, setMembers] = useState<EntityWithIdAndDescription[]>(groupMembers)

    useEffect(() => {
        if (watchPayer) {
            setMembers(groupMembers.filter(m => m[EntityWithIdAndDescriptionFields.Description] !== watchPayer))
            setSelectedPayer && setSelectedPayer(watchPayer)
            const removeDebtor = selectedDebtors.find((s) => s[EntityWithIdAndDescriptionFields.Description] == watchPayer)
            removeDebtor && onUnselectDebtor(removeDebtor)
        }
    }, [watchPayer])

    return (
        <Form {...methods}>
            <div className='flex flex-col gap-2 justify-center'>
                <TextField label='Titulo' name={GroupExpensesInterfaceFields.Title} control={methods.control} />
                <TextArea
                    label='Descripcion'
                    name={GroupExpensesInterfaceFields.Description}
                    control={methods.control}
                />
                <TextField
                    label='Monto total'
                    name={GroupExpensesInterfaceFields.Amount}
                    control={methods.control}
                    adornment='$'
                />
                <SelectField
                    label='Pagado por'
                    name={GroupExpensesInterfaceFields.Payer}
                    control={methods.control}
                    values={groupMembers.map(member => member[EntityWithIdAndDescriptionFields.Description])}
                />
                <MultiselectField
                    control={methods.control}
                    name={GroupExpensesInterfaceFields.Debtors}
                    label='Seleccione entre quienes dividir el gasto'
                    values={members}
                    selected={selectedDebtors}
                    onSelect={onSelectDebtor}
                    onUnselect={onUnselectDebtor}
                />
            </div>
        </Form>
    )
}

export default GroupExpensesAddNewForm
