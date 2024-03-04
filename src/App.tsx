import { useMutation } from "@tanstack/react-query";
import { apiService } from "./services";
import { FileUpload } from "./components/FileUpload";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, Divider, TextField } from "@mui/material";
import { FileFormSchema, FileFormSchemaType, UploadOutDto } from "./types";

export const App = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [errors, setErros] = useState<{ message: string }[]>([]);
  const [successValue, setSuccessValue] = useState<UploadOutDto | null>(null);

  const { handleSubmit, register, formState, reset } =
    useForm<FileFormSchemaType>({
      resolver: yupResolver(FileFormSchema),
    });

  const resetValues = () => {
    reset();
    setUploadedFile(null);
    setErros([]);
  };

  const { mutate: handleUplaod, isPending } = useMutation({
    mutationFn: async (dto: FileFormSchemaType) => {
      resetValues();

      const formData = new FormData();
      formData.append("file", uploadedFile ?? "");
      formData.append("invoicingMonth", dto.invoicingMonth);
      return await apiService.post<UploadOutDto>("/upload", formData);
    },
    onSuccess: (res) => {
      setSuccessValue(res);
    },
    onError: (error: any) => {
      setErros(error.response.data.errors);
    },
  });

  const onSubmit: SubmitHandler<FileFormSchemaType> = (data) => {
    handleUplaod(data);
  };

  console.log(
    successValue?.invoicesData?.map((value, idx) => {
      return (
        <div key={idx}>
          {Object.keys(value).map((k: any) => (
            <div key={k}>
              {k}: {value[k]}
            </div>
          ))}
        </div>
      );
    })
  );

  return (
    <div className="mx-4 grid grid-cols-1 md:grid-cols-2 pt-[100px] gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <TextField
            {...register("invoicingMonth")}
            label="Invoicing Month"
            variant="outlined"
            error={!!formState?.errors?.invoicingMonth}
            fullWidth
            helperText={formState?.errors?.invoicingMonth?.message || ""}
          />

          <FileUpload
            onFileChange={setUploadedFile}
            uploadedFile={uploadedFile}
          />

          <Button
            disabled={!uploadedFile || isPending}
            type="submit"
            variant="contained"
          >
            UPLOAD
          </Button>
        </div>
      </form>

      <div className="grid gap-2">
        {isPending ? (
          <div className="flex justify-center mt-8">
            <CircularProgress />
          </div>
        ) : errors?.length ? (
          <div className="text-red-400">
            {errors.map((e) => (
              <div>{e.message}</div>
            ))}
          </div>
        ) : successValue ? (
          <div className="grid gap-4">
            <div className="font-bold text-xxl">
              Date: {successValue.invoicingMonth}
            </div>
            <div className="font-bold text-gray-500 text-xl">
              {Object.keys(successValue.currencyRates).map((key) => (
                <div key={key}>
                  {key}: {successValue.currencyRates[key]}
                </div>
              ))}
            </div>
            <div className="grid gap-6">
              <Divider className="mt-6 bg-black" />
              {successValue?.invoicesData?.map((value, idx) => {
                return (
                  <div key={idx}>
                    {Object.keys(value).map((k) => {
                      if (
                        k !== "validationErrors" &&
                        (typeof value[k] === "string" ||
                          typeof value[k] === "number")
                      ) {
                        return (
                          <div key={k}>
                            <span className="font-semibold">{k}:</span>{" "}
                            {value[k]}
                          </div>
                        );
                      }

                      if (k === "validationErrors") {
                        return (value[k] as Array<string>)?.map(
                          (message, index) => (
                            <div className="text-red-400 font-bold" key={index}>
                              {message}
                            </div>
                          )
                        );
                      }

                      return null;
                    })}
                    <Divider className="mt-6 bg-black" />
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
