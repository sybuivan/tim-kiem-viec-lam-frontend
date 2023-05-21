import { Box, Typography } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import theme from 'src/theme';

interface IProps {
  title?: string;
  options: any[];
  keyOption: string;
  labelOption: string;
  value: string;
}

export const LabelOptions = (props: IProps) => {
  const { options, keyOption, labelOption, title, value } = props;

  const renderOptions = (value: string) => {
    return options.map((option, index) => (
      <Typography key={index} color={theme.palette.grey[600]} fontWeight="600">
        {option[keyOption] === value && option[labelOption]}
      </Typography>
    ));
  };

  return (
    <Box>
      <Typography fontWeight="600">{title}</Typography>
      {renderOptions(value)}
    </Box>
  );
};
