import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Company = () => {
  return (
    <Box
      sx={{
        borderBottom: '1px solid #adbebf',
        py: 2,
        '&:last-child': {
          borderBottom: 'none',
        },
      }}
    >
      <Box display="flex" gap={5} alignItems="center">
        <Box flex="0.5" display="flex" gap={2}>
          <img
            src="https://cdn1.vieclam24h.vn/upload/files_cua_nguoi_dung/logo/2019/02/12/1549951205_57a95198dda12_1470714264_300x300.png"
            alt=""
            width="100px"
            height="100px"
            style={{
              borderRadius: '10px',
              border: '1px solid #c1c1c1',
            }}
          />
          <Box>
            <Typography
              fontWeight="600"
              py={0.5}
              sx={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                fontSize: '15px',
                margin: 0,
                maxWidth: '330px',
              }}
            >
              Công Ty Tài Chính TNHH MTV Quốc Tế Việt Nam Jaccs
            </Typography>
            <Typography
              title="Tầng 15, Tòa nhà Centec, 72 -74 Nguyễn Thị Minh Khai, Phường Võ Thị
          Sáu, Quận 3, Thành Phố Hồ Chí Minh, Việt Nam"
              sx={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                fontSize: '15px',
                margin: 0,
                maxWidth: '330px',
              }}
              py={0.5}
            >
              Tầng 15, Tòa nhà Centec, 72 -74 Nguyễn Thị Minh Khai, Phường Võ
              Thị Sáu, Quận 3, Thành Phố Hồ Chí Minh, Việt Nam{' '}
            </Typography>
            <Typography>Trên 300 người</Typography>
          </Box>
        </Box>

        <Box flex="0.2">
          <Typography pl="15px">81 vị trí</Typography>
        </Box>
        <Box flex="0.2">
          <Typography pl="10px">21/10/2022</Typography>
        </Box>
        <Box flex="0.2">
          <Button variant="outlined">Hủy theo dõi</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Company;
