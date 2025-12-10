import * as Yup from "yup";

export const editTransactionFormSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
  value: Yup.number()
    .typeError("Value must be a number")
    .min(0.01, "Value must be at least 0.01")
    .required("Value is required"),
  categoryId: Yup.number()
    .typeError("Select a transaction category")
    .min(1, "Select a transaction category")
    .required("Category is required"),
  typeId: Yup.number()
    .min(1, "Select a transaction type")
    .required("Transaction type is required"),
});
