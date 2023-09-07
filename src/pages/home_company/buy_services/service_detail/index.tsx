import { Box, Typography } from '@mui/material';
import React from 'react';
import theme from 'src/theme';
import { IService } from 'src/types/service';
import { formatPrice } from 'src/utils/function';

const ServiceDetail = ({
  service,
  selected,
  onSelected,
}: {
  selected: IService;
  service: IService;
  onSelected: (service: IService) => void;
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      width="100%"
      bgcolor={
        service.id_service === selected.id_service
          ? theme.palette.primary.contrastText
          : theme.palette.grey[300]
      }
      py={2}
      borderRadius="5px"
      sx={{
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onClick={() => onSelected(service)}
    >
      <Typography fontWeight="600" fontSize="14px">
        Tên dịch vụ: {service.name_service}
      </Typography>
      <Typography fontWeight="600" fontSize="12px">
        Giá: {formatPrice(service.price)} / {service.number_of_months} tháng
      </Typography>
    </Box>
  );
};

export default ServiceDetail;
