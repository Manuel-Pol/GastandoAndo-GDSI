import { useState } from "react";
import { ExpensesInterface } from "@/types/personalExpenses";
import PersonalExpensesAddNewDialog from "./PersonalExpensesAddNewDialog";
import PersonalExpensesDataCard from "./PersonalExpensesDataCard";
import { EntityWithIdFields } from "@/types/baseEntities";



const PersonalExpenses = () => {
    const [expenses, setExpenses] = useState<ExpensesInterface[]>([]);

    const onAddExpense = (exp: ExpensesInterface) => {
        const expAdd: ExpensesInterface = {
            ...exp,
            [EntityWithIdFields.Id]: expenses.length + 1
        }
        setExpenses([...expenses, expAdd])
    }

    const onDeleteExpense = (exp: ExpensesInterface) => {
        const newExpenses = expenses.filter((e) => e[EntityWithIdFields.Id] !== exp[EntityWithIdFields.Id])
        setExpenses(newExpenses)
    }

    const onSaveEdit = (exp: ExpensesInterface) => {
        const newExpenses = expenses.map((e) => {
            if (e[EntityWithIdFields.Id] === exp[EntityWithIdFields.Id]) return exp
            
            return e
        })
        
        setExpenses(newExpenses)
    }
    
    return (
        <div className="flex justify-center">
            <div className="flex flex-col gap-8 items-center w-full max-w-xl">
                <div className="w-full flex space-x-24 items-center justify-between">
                    <p className="text-6xl font-medium">Movimientos</p>
                    <PersonalExpensesAddNewDialog onAddExpense={onAddExpense}/>
                </div>
                <PersonalExpensesDataCard expenses={expenses} triggerDeleteExp={onDeleteExpense} onSaveEdit={onSaveEdit}/>
            </div>
        </div>
    );
};

export default PersonalExpenses;
