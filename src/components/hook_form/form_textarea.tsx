import React from 'react';
import { FormControl, FormLabel, SxProps, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import theme from 'src/theme';

interface IProps {
  control: any;
  name: string;
  minRows: number;
  label?: string;
  placeholder?: string;
  size?: 'small' | 'medium';
  disabled?: boolean;
  variant?: 'standard' | 'filled' | 'outlined';
  margin?: 'none' | 'dense' | 'normal';
  required?: boolean;
  sx?: SxProps;
  handleChange?: (name: string, value: any) => void;
}

export const FormTextarea = (props: IProps) => {
  const {
    control,
    sx,
    name,
    label,
    minRows,
    size = 'small',
    disabled = false,
    variant = 'outlined',
    margin = 'dense',
    required = false,
    handleChange,
    placeholder,
  } = props;

  return (
    <Controller
      name={name}
      rules={{
        required: {
          value: required,
          message: 'Vui lòng nhập trường này!',
        },
      }}
      control={control}
      render={({
        field: { value, onChange },
        fieldState: { error, invalid },
      }) => (
        <FormControl
          required={required}
          fullWidth
          size={size}
          margin={margin}
          sx={sx}
        >
          <FormLabel
            sx={{
              fontWeight: '600',
              color: error
                ? theme.palette.error.main
                : theme.palette.common.black,
              pb: label ? 0.5 : 0,
            }}
          >
            {label}
          </FormLabel>
          <TextField
            multiline
            variant={variant}
            disabled={disabled}
            error={invalid}
            helperText={error ? error.message : null}
            minRows={minRows}
            placeholder={placeholder}
            maxRows={minRows}
            onChange={(e) => {
              const value = e.target.value;

              onChange(value);
              if (handleChange) {
                handleChange(name, value);
              }
            }}
            value={value ? value : ''}
          />
        </FormControl>
      )}
    />
  );
};
