import { Button } from "@/components/ui/button";
import {
  ExpenseType,
  ExpensesInterface,
  ExpensesInterfaceFields,
} from "@/types/personalExpenses";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { CirclePlusIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import PersonalExpensesAddNewForm from "./PersonalExpensesAddNewForm";
import { EntityWithIdFields } from "@/types/baseEntities";
import { createTransfer, PostTransfer } from "@/api/createTransfer";

interface PersonalExpensesAddNewDialogProps {
  onAddExpense: (exp: ExpensesInterface) => void;
}

const parseExpenses = (data: ExpensesInterface) => {
  const transfer: PostTransfer = {
    title: data.titulo,
    description: data.descripcion ? data.descripcion : "",
    amount: data.monto,
    date: data.fecha,
    isNegative: data.esGasto == "gasto" ? true : false,
  };
  return transfer;
};

const PersonalExpensesAddNewDialog = ({
  onAddExpense,
}: PersonalExpensesAddNewDialogProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isExpense, setIsExpense] = useState<ExpenseType>(ExpenseType.Gasto);

  const defaultFormValues: ExpensesInterface = {
    [EntityWithIdFields.Id]: 0,
    [ExpensesInterfaceFields.Image]: "",
    [ExpensesInterfaceFields.Amount]: 0,
    [ExpensesInterfaceFields.Description]: "",
    [ExpensesInterfaceFields.Title]: "",
    [ExpensesInterfaceFields.IsExpense]: ExpenseType.Gasto,
    [ExpensesInterfaceFields.Date]: new Date("2024-01-01T00:00:00"),
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

    createTransfer(parseExpenses(submitData));
    onAddExpense(submitData);
    setOpen(false);
  };

  const onChangeExpense = (expT: ExpenseType) => setIsExpense(expT);

  return (
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
            <FormProvider {...methods}>
              <PersonalExpensesAddNewForm onTriggerExpense={onChangeExpense} />
            </FormProvider>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  onClick={methods.handleSubmit(onSubmitExpense)}
                  disabled={!methods.watch(ExpensesInterfaceFields.Amount)}
                >
                  <CirclePlusIcon className="mr-2 items-center" /> Agregar
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default PersonalExpensesAddNewDialog;
