import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ExpensesInterfaceFields, ExpenseType } from "@/types/personalExpenses"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form"


interface PersonalExpensesAddNewFormProps {
    onTriggerExpense: (expT: ExpenseType) => void
}

const PersonalExpensesAddNewForm = ({onTriggerExpense}: PersonalExpensesAddNewFormProps) => {

    const methods = useFormContext()

    return (
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
                                    onValueChange={(e: ExpenseType) => onTriggerExpense(e)}
                                    defaultValue={methods.getValues(ExpensesInterfaceFields.IsExpense)}
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
    )
}


export default PersonalExpensesAddNewForm