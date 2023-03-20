import React from 'react';
import { FormControl, FormLabel, SxProps, TextField } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { Control, Controller } from 'react-hook-form';
import theme from 'src/theme';

interface IProps {
  control: any;
  name: string;
  label: string;
  size?: 'small' | 'medium';
  disabled?: boolean;
  variant?: 'standard' | 'filled' | 'outlined';
  margin?: 'none' | 'dense' | 'normal';
  required?: boolean;
  sx?: SxProps;
  maxDate?: Date;
  minDate?: Date;
  handleChange?: (name: string, value: any) => void;
  disableFuture?: boolean;
}

export const FormDatePicker = (props: IProps) => {
  const {
    control,
    sx,
    name,
    label,
    size = 'small',
    disabled = false,
    variant = 'outlined',
    margin = 'dense',
    required = false,
    maxDate,
    minDate,
    handleChange,
    disableFuture = true,
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
        field: { value = null, onChange },
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
            {label} {required && '*'}
          </FormLabel>
          <MobileDatePicker
            disabled={disabled}
            // label={label}
            minDate={minDate}
            disableFuture={disableFuture}
            value={value}
            onChange={onChange}
            maxDate={maxDate}
            onAccept={(value: any) => {
              if (handleChange) {
                handleChange(name, value);
              }
            }}
            renderInput={(params: any) => (
              <TextField
                {...params}
                placeholder="DD/MM/YYYY"
                disabled={disabled}
                size={size}
                variant={variant}
                fullWidth
                error={invalid}
                helperText={error ? error.message : null}
              />
            )}
          />
        </FormControl>
      )}
    />
  );
};
