import { Box, Typography } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import theme from 'src/theme';

interface IProps {
  title: string;
  control: any;
  name: string;
  options: any[];
  keyOption: string;
  labelOption: string;
}

export const LabelOptions = (props: IProps) => {
  const { control, name, options, keyOption, labelOption, title } = props;

  const renderOptions = (value: string) => {
    return options.map((option, index) => (
      <Typography key={index} color={theme.palette.grey[600]} fontWeight="600">
        {option[keyOption] === value && option[labelOption]}
      </Typography>
    ));
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange },
        fieldState: { error, invalid },
      }) => (
        <Box>
          <Typography fontWeight="600">{title}</Typography>
          {renderOptions(value)}
        </Box>
      )}
    />
  );
};
