import { useState } from "react";
import { ExpensesInterface } from "@/types/personalExpenses";
import PersonalExpensesAddNewDialog from "./PersonalExpensesAddNewDialog";
import PersonalExpensesDataCard from "./PersonalExpensesDataCard";



const PersonalExpenses = () => {
    const [expenses, setExpenses] = useState<ExpensesInterface[]>([]);

    const onAddExpense = (exp: ExpensesInterface) => setExpenses([...expenses, exp])
    
    return (
        <div className="flex justify-center">
            <div className="flex flex-col gap-8 items-center w-full max-w-xl">
                <div className="w-full flex space-x-24 items-center justify-between">
                    <p className="text-6xl font-medium">Movimientos</p>
                    <PersonalExpensesAddNewDialog onAddExpense={onAddExpense}/>
                </div>
                <PersonalExpensesDataCard expenses={expenses} />
            </div>
        </div>
    );
};

export default PersonalExpenses;
