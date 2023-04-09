import React from 'react';
import { FormControl, FormLabel, SxProps, InputBase } from '@mui/material';
import { isNumber, isString } from 'lodash';
import { Controller } from 'react-hook-form';
import theme from 'src/theme';

interface IProps {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  size?: 'small' | 'medium';
  margin?: 'none' | 'dense' | 'normal';
  required?: boolean;
  sx?: SxProps;
  notSpacing?: boolean;
  handleChange?: (name: string, value: any) => void;
}

export const FormInputBase = (props: IProps) => {
  const {
    control,
    sx,
    name,
    label,
    size = 'small',
    margin = 'dense',
    required = false,
    notSpacing = false,
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
          <InputBase
            fullWidth
            sx={{
              ml: 1,
              flex: 1,
              fontSize: '14px',
              width: '80%',
              color: theme.palette.grey[600],
            }}
            size={size}
            type="text"
            placeholder={placeholder}
            onChange={(e) => {
              const value = notSpacing
                ? e.target.value.replace(/ /g, '')
                : e.target.value;

              onChange(value);
              if (handleChange) {
                handleChange(name, value);
              }
            }}
            value={
              isString(value) ? value : '' || isNumber(value) ? value : null
            }
          />
        </FormControl>
      )}
    />
  );
};
