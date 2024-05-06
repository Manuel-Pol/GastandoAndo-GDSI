import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ExpensesInterface, ExpenseType, ExpensesInterfaceFields } from "@/types/personalExpenses";

interface PersonalExpensesDataCardProps {
    expenses: ExpensesInterface[]
}


const PersonalExpensesDataCard = ({expenses}: PersonalExpensesDataCardProps) => {

    return (

        <div className="w-full">
            {expenses.length !== 0 ? (
                <div className="flex flex-col space-y-5">
                    {expenses.map((exp) => (
                        <Card>
                            <CardContent className="mt-6">
                                <div className="flex flex-row justify-between items-center">
                                    <div className="flex flex-row space-x-6 items-center">
                                        {exp[
                                            ExpensesInterfaceFields
                                                .IsExpense
                                        ] === ExpenseType.Gasto ? (
                                            <Badge className="bg-[#EF4444]">
                                                Gasto
                                            </Badge>
                                        ) : (
                                            <Badge className="bg-[#1C7549] text-white">
                                                Ingreso
                                            </Badge>
                                        )}
                                        <div className="flex flex-col">
                                            <h4 className="font-semibold">
                                                {
                                                    exp[
                                                        ExpensesInterfaceFields
                                                            .Title
                                                    ]
                                                }
                                            </h4>
                                            <h6 className="font-semibold text-gray-400">
                                                {
                                                    exp[
                                                        ExpensesInterfaceFields
                                                            .Description
                                                    ]
                                                }
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center space-x-4">
                                        <div>
                                            {exp[
                                                ExpensesInterfaceFields
                                                    .IsExpense
                                            ] === ExpenseType.Gasto ? (
                                                <p className="text-xl text-red-500">{`- $ ${
                                                    exp[
                                                        ExpensesInterfaceFields
                                                            .Amount
                                                    ]
                                                }`}</p>
                                            ) : (
                                                <p className="text-xl text-green-600">{`+ $ ${
                                                    exp[
                                                        ExpensesInterfaceFields
                                                            .Amount
                                                    ]
                                                }`}</p>
                                            )}
                                        </div>
                                        <div className="flex flex-row items-center space-x-2">
                                            <Button variant="outline" size="icon" className="rounded-full">
                                                <Edit className="h-4 w-4"/>
                                            </Button>
                                            <Button variant="outline" size="icon" className="rounded-full">
                                                <Trash className="h-4 w-4"/>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Alert
                    variant="default"
                    className="bg-white rounded-xl space-y-2 p-6"
                >
                    <div className="flex flex-row gap-2 text-xl items-center">
                        <AlertCircle />
                        <AlertTitle>Sin movimientos</AlertTitle>
                    </div>
                    <AlertDescription>
                        No hay movimientos por el momento. Presiona en
                        agregar para registrarlos
                    </AlertDescription>
                </Alert>
            )}
        </div>
    )
} 


export default PersonalExpensesDataCard