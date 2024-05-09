import { EntityWithId } from "./baseEntities";

export enum ExpensesInterfaceFields {
    Title = "titulo",
    Description = "descripcion",
    Image = "imagen",
    Amount = "monto",
    IsExpense = "esGasto",
    Date = "fecha",
}

export enum ExpenseType {
    Gasto = "gasto",
    Ingreso = "ingreso",
}

export interface ExpensesInterface extends EntityWithId {
    [ExpensesInterfaceFields.Title]: string;
    [ExpensesInterfaceFields.Description]: string;
    [ExpensesInterfaceFields.Image]?: string;
    [ExpensesInterfaceFields.Amount]?: number;
    [ExpensesInterfaceFields.IsExpense]: ExpenseType;
    [ExpensesInterfaceFields.Date]: string;
}
