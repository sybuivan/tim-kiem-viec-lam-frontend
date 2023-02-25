import React from 'react';
import Pagination from '@mui/material/Pagination';

interface IPagination {
  count: number;
  handleOnChange: (page: number) => void;
  disabled?: boolean;
  page: number;
  sx?: any;
}

const PaginationComponent = (props: IPagination) => {
  const { count, handleOnChange, disabled, page, sx } = props;
  return (
    <Pagination
      disabled={disabled}
      sx={sx}
      count={count}
      page={page}
      color="primary"
      onChange={(event: React.ChangeEvent<unknown>, newPage: number) =>
        handleOnChange(newPage)
      }
    />
  );
};

export default PaginationComponent;
