import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CirclePlusIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

enum ExpensesInterfaceFields {
    Title = "titulo",
    Description = "descripcion",
    Image = "imagen",
    Amount = "monto",
    IsExpense = "esGasto",
}

enum ExpenseType {
    Gasto = "gasto",
    Ingreso = "ingreso",
}

interface ExpensesInterface {
    [ExpensesInterfaceFields.Title]: string;
    [ExpensesInterfaceFields.Description]: string;
    [ExpensesInterfaceFields.Image]?: string;
    [ExpensesInterfaceFields.Amount]: number;
    [ExpensesInterfaceFields.IsExpense]: ExpenseType;
}

const PersonalExpenses = () => {
    const [expenses, setExpenses] = useState<ExpensesInterface[]>([]);
    const [isExpense, setIsExpense] = useState<ExpenseType>(ExpenseType.Gasto);
    const [open, setOpen] = useState<boolean>(false);

    const defaultFormValues: ExpensesInterface = {
        [ExpensesInterfaceFields.Image]: "",
        [ExpensesInterfaceFields.Amount]: 0,
        [ExpensesInterfaceFields.Description]: "",
        [ExpensesInterfaceFields.Title]: "",
        [ExpensesInterfaceFields.IsExpense]: ExpenseType.Gasto,
    };

    const methods = useForm<ExpensesInterface>({
        defaultValues: defaultFormValues,
    });

    useEffect(() => {
        if (open) {
            methods.reset(defaultFormValues);
            setIsExpense(ExpenseType.Gasto);
        }
    }, [open]);

    const onSubmitExpense = (data: ExpensesInterface) => {
        const submitData: ExpensesInterface = {
            ...data,
            [ExpensesInterfaceFields.IsExpense]: isExpense,
        };
        console.log(submitData);

        setExpenses([...expenses, submitData]);
        setOpen(false);
    };

    return (
        <div className="flex justify-center">
            <div className="flex flex-col gap-8 items-center w-full max-w-xl">
                <div className="w-full flex space-x-24 items-center justify-between">
                    <p className="text-6xl font-medium">Movimientos</p>

                    <div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    className="bg-[#E34400] hover:bg-[#E34400] rounded  text-white  py-6 "
                                    onClick={() => {
                                        setOpen(true);
                                    }}
                                >
                                    <CirclePlusIcon className="mr-2 text-white " />{" "}
                                    <p className="text-lg">Agregar</p>
                                </Button>
                            </DialogTrigger>
                            {open && (
                                <DialogContent className="sm:max-w-[425px] bg-white rounded">
                                    <DialogTitle className="text-black mb-2">
                                        Agregar Movimiento
                                    </DialogTitle>
                                    <Form {...methods}>
                                        <div className="flex flex-col gap-4 justify-center">
                                            <FormField
                                                control={methods.control}
                                                name={
                                                    ExpensesInterfaceFields.Title
                                                }
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Titulo
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={methods.control}
                                                name={
                                                    ExpensesInterfaceFields.Description
                                                }
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Descripcion
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={methods.control}
                                                name={
                                                    ExpensesInterfaceFields.Amount
                                                }
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="mr-2">
                                                            Monto
                                                        </FormLabel>
                                                        <div className="w-full">
                                                            <FormControl>
                                                                <Input
                                                                    placeholder=""
                                                                    {...field}
                                                                    startAdornment={
                                                                        <h5>
                                                                            $
                                                                        </h5>
                                                                    }
                                                                />
                                                            </FormControl>
                                                        </div>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                rules={{ required: true }}
                                                control={methods.control}
                                                name={
                                                    ExpensesInterfaceFields.IsExpense
                                                }
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Tipo de movimiento
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Select
                                                                onValueChange={(
                                                                    e: ExpenseType
                                                                ) =>
                                                                    setIsExpense(
                                                                        e
                                                                    )
                                                                }
                                                            >
                                                                <SelectTrigger className="w-[200px]">
                                                                    <SelectValue placeholder="Tipo de movimiento" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectItem
                                                                            className="cursor-pointer"
                                                                            value={
                                                                                ExpenseType.Gasto
                                                                            }
                                                                        >
                                                                            Gasto
                                                                        </SelectItem>
                                                                        <SelectItem
                                                                            className="cursor-pointer"
                                                                            value={
                                                                                ExpenseType.Ingreso
                                                                            }
                                                                        >
                                                                            Ingreso
                                                                        </SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </Form>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button
                                                onClick={methods.handleSubmit(
                                                    onSubmitExpense
                                                )}
                                                disabled={
                                                    !methods.watch(
                                                        ExpensesInterfaceFields.Amount
                                                    )
                                                }
                                            >
                                                <CirclePlusIcon className="mr-2 items-center" />{" "}
                                                Agregar
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            )}
                        </Dialog>
                    </div>
                </div>
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
                                                <div className="flex flex-col gap-2">
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
            </div>
        </div>
    );
};

export default PersonalExpenses;
