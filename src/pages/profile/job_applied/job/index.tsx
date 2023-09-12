import { Box, Chip, Grid, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router';
import theme from 'src/theme';
import { IApply } from 'src/types/apply';
import { renderColorStatus, renderLabelStatus } from 'src/utils/function';

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
        [theme.breakpoints.down('lg')]: {
          py: 2,
        },
      }}
    >
      <Grid container spacing={2} ml={0} alignItems="center">
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Box>
            <Typography
              fontWeight="600"
              py={0.5}
              sx={{
                [theme.breakpoints.up('lg')]: {
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  fontSize: '14px',
                  margin: 0,
                  maxWidth: '330px',
                  cursor: 'pointer',
                },
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
                [theme.breakpoints.up('lg')]: {
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  fontSize: '14px',
                  margin: 0,
                  maxWidth: '330px',
                  cursor: 'pointer',
                },
              }}
              py={0.5}
              onClick={() => {
                navigate(`/cong-ty/${id_company}`);
              }}
            >
              {name_company}
            </Typography>
          </Box>
        </Grid>

        <Grid item lg={2} md={2} sm={12} xs={12}>
          <Typography>Hồ sơ đính kèm</Typography>
        </Grid>
        <Grid item lg={2} md={2} sm={6} xs={12} display="flex" gap={1}>
          <Typography
            sx={{
              display: 'none',
              fontWeight: '600',
              [theme.breakpoints.down('md')]: {
                display: 'block',
              },
            }}
          >
            Ngày nộp:
          </Typography>
          <Typography>{moment(created_at).format('DD/MM/YYYY')}</Typography>
        </Grid>
        <Grid item lg={2} md={2} sm={6} xs={12} display="flex" gap={1}>
          <Typography
            sx={{
              display: 'none',
              fontWeight: '600',
              [theme.breakpoints.down('md')]: {
                display: 'block',
              },
            }}
          >
            Hạn nộp:
          </Typography>
          <Typography>{moment(deadline).format('DD/MM/YYYY')}</Typography>{' '}
        </Grid>
        <Grid item lg={2} md={2} sm={6} xs={12}>
          <Chip
            variant="outlined"
            label={renderLabelStatus(status)}
            sx={{
              background: renderColorStatus(status),
              color:
                status === 0
                  ? theme.palette.common.black
                  : theme.palette.common.white,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobSave;
