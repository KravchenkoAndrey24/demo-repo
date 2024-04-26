import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { forwardRef } from 'react';

type InputProps = MuiTextFieldProps & {
  errorMessage?: string | React.ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({ errorMessage, ...props }, ref) => {
  return <MuiTextField {...props} ref={ref} error={!!errorMessage} helperText={errorMessage || ''}></MuiTextField>;
});
