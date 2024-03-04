import { InferType, object, string } from "yup";

export const FileFormSchema = object({
  invoicingMonth: string()
    .required("Required field")
    .matches(/^\d{4}-(0[1-9]|1[0-2])$/, "Must be YYYY-MM format"),
});
export type FileFormSchemaType = InferType<typeof FileFormSchema>;

export type UploadOutDto = {
  invoicingMonth: string;
  currencyRates: {
    [key: string]: number;
  };
  invoicesData: { [key: string]: any }[];
};
