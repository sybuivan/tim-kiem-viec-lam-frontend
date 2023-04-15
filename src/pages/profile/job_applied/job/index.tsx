import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { IApply } from 'src/types/apply';
import moment from 'moment';
import { useNavigate } from 'react-router';

const checkStatus = (status: number) => {
  if (status === 0) return 'Nộp thành công';
  if (status === 1) return 'Đã liên hệ';
  if (status === 2) return "'Đã xem hồ sơ";
  if (status === 3) return 'Từ chối';
};

const JobSave = ({ job }: { job: IApply }) => {
  const {
    id_job,
    id_company,
    name_job,
    name_company,
    created_at,
    deadline,
    status,
  } = job;
  const navigate = useNavigate();
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
          <Box>
            <Typography
              fontWeight="600"
              py={0.5}
              sx={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                fontSize: '14px',
                margin: 0,
                maxWidth: '330px',
                cursor: 'pointer',
              }}
              onClick={() => {
                navigate(`/viec-lam/${id_job}`);
              }}
            >
              {name_job}
            </Typography>
            <Typography
              title="Tầng 15, Tòa nhà Centec, 72 -74 Nguyễn Thị Minh Khai, Phường Võ Thị
          Sáu, Quận 3, Thành Phố Hồ Chí Minh, Việt Nam"
              sx={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                fontSize: '14px',
                margin: 0,
                maxWidth: '330px',
                cursor: 'pointer',
              }}
              py={0.5}
              onClick={() => {
                navigate(`/cong-ty/${id_company}`);
              }}
            >
              {name_company}
            </Typography>
          </Box>
        </Box>

        <Box flex="0.2">
          <Typography pl="15px">Hồ sơ đính kèm</Typography>
        </Box>
        <Box flex="0.2">
          <Typography pl="5px">
            {moment(created_at).format('DD/MM/YYYY')}
          </Typography>
        </Box>
        <Box flex="0.2">
          <Typography pl="5px">
            {moment(deadline).format('DD/MM/YYYY')}
          </Typography>{' '}
        </Box>
        <Box flex="0.2">
          <Chip
            color="success"
            variant="outlined"
            label={checkStatus(status)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default JobSave;
