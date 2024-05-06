import { ExpenseType, ExpensesInterface, ExpensesInterfaceFields } from "@/types/personalExpenses";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Save } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { EntityWithIdFields } from "@/types/baseEntities";
import { FormProvider, useForm } from "react-hook-form";
import PersonalExpensesAddNewForm from "./PersonalExpensesAddNewForm";

interface PersonalExpensesEditDialogProps {
    expense: ExpensesInterface,
    onSubmitEdit: (e: ExpensesInterface) => void
}


const PersonalExpensesEditDialog = ({expense, onSubmitEdit}: PersonalExpensesEditDialogProps) => {
    const [openEdit, setOpenEdit] = useState<boolean>(false)
    const [isExpense, setIsExpense] = useState<ExpenseType>(expense[ExpensesInterfaceFields.IsExpense]);

    const onEditExp = () => setOpenEdit(true)

    const defaultFormValues: ExpensesInterface = {
        [EntityWithIdFields.Id]: expense[EntityWithIdFields.Id],
        [ExpensesInterfaceFields.Image]: "",
        [ExpensesInterfaceFields.Amount]: expense[ExpensesInterfaceFields.Amount],
        [ExpensesInterfaceFields.Description]: expense[ExpensesInterfaceFields.Description],
        [ExpensesInterfaceFields.Title]: expense[ExpensesInterfaceFields.Title],
        [ExpensesInterfaceFields.IsExpense]: expense[ExpensesInterfaceFields.IsExpense]
    };

    const methods = useForm<ExpensesInterface>({
        defaultValues: defaultFormValues,
    });

    const onSubmitExpense = (data: ExpensesInterface) => {
        const submitData: ExpensesInterface = {
            ...data,
            [ExpensesInterfaceFields.IsExpense]: isExpense,
        };

        onSubmitEdit(submitData)
        setOpenEdit(false);
    };

    useEffect(() => {
        if (openEdit) {
            methods.reset(defaultFormValues);
            setIsExpense(expense[ExpensesInterfaceFields.IsExpense]);
        }
    }, [openEdit]);

    const onChangeExpense = (expT: ExpenseType) => setIsExpense(expT)
    
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-blue-500" onClick={onEditExp}>
                        <Edit className="h-4 w-4" color='#3B82F6'/>
                    </Button>
                </DialogTrigger>
                {openEdit && (
                    <DialogContent className="sm:max-w-[425px] bg-white rounded">
                        <DialogTitle className="text-black mb-2">
                            Editar Movimiento
                        </DialogTitle>
                        <FormProvider {...methods}>
                            <PersonalExpensesAddNewForm onTriggerExpense={onChangeExpense}/>
                        </FormProvider>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button onClick={methods.handleSubmit(onSubmitExpense)}
                                        disabled={!methods.watch(ExpensesInterfaceFields.Amount)}
                                >
                                    <Save className="mr-2 items-center" />{" "}
                                    Guardar
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                )}
            </Dialog>
        </div>
    )
}


export default PersonalExpensesEditDialog