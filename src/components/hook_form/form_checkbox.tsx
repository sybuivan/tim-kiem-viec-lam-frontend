import React from 'react';
import { Controller } from 'react-hook-form';
import { Checkbox, FormControl, FormControlLabel } from '@mui/material';

interface IFormCheckBox {
  name: string;
  control: any;
  label?: string;
  disabled?: boolean;
  margin?: 'none' | 'normal' | 'dense';
  size?: 'small' | 'medium';
  onChange?: (name: string, checked: boolean) => void;
}

const FormCheckbox = ({
  name,
  control,
  label,
  disabled,
  size,
  onChange,
  margin = 'normal',
}: IFormCheckBox) => {
  return (
    <FormControl fullWidth margin={margin}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  size={size || 'medium'}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                    if (onChange) onChange(e.target.name, e.target.checked);
                  }}
                  disabled={disabled}
                  checked={field.value}
                />
              }
              label={label}
            />
          </>
        )}
      />
    </FormControl>
  );
};

export default FormCheckbox;
