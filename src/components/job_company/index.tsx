import { FavoriteRounded } from '@mui/icons-material';
import {
  AttachMoneyOutlined,
  FavoriteBorderOutlined,
  HourglassBottomOutlined,
  LocationOnOutlined,
} from '@mui/icons-material';
import {
  Box,
  IconButton,
  Typography,
  Chip,
  Tooltip,
  Grid,
} from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector, useSaveJob } from 'src/hooks';
import theme from 'src/theme';
import { IJob } from 'src/types/job';
import { checkIsSaveJob } from 'src/utils/common';

export const JobCompany = ({ job }: { job: IJob }) => {
  const navigate = useNavigate();

  const {
    saveJobList: { savedList },
  } = useAppSelector((state) => state.userSlice);
  const { me, token } = useAppSelector((state) => state.authSlice);

  const { handleOnUnSaved, handleOnSave } = useSaveJob(
    token,
    job.id_job,
    me?.id_user
  );
  return (
    <Box position="relative">
      <Box
        px={2}
        py={3}
        mb={0.4}
        border="1px solid #c1c1c1"
        borderRadius="4px"
        sx={{
          '&:hover': {
            border: `1px solid ${theme.palette.primary.dark}`,
            cursor: 'pointer',
          },
        }}
        onClick={() => {
          navigate(`/viec-lam/${job.id_job}`);
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={0.5}
        >
          <Typography fontWeight="600" fontSize="16px">
            {job.urgency === 1 && (
              <Chip
                label="Gấp"
                sx={{
                  background: theme.palette.error.main,
                  color: theme.palette.common.white,
                  mr: 1,
                  borderRadius: '10px',
                  height: '25px',
                }}
              />
            )}
            {job?.name_job}
          </Typography>
        </Box>
        <Grid container>
          <Grid
            item
            lg={4}
            md={4}
            sm={6}
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              [theme.breakpoints.down('sm')]: {
                flex: 0.6,
              },
            }}
          >
            <LocationOnOutlined
              sx={{
                color: theme.palette.grey[600],
              }}
            />
            {job.cities && job.cities.length > 0 && job.cities[0].name_city}{' '}
            {job.cities && job.cities?.length - 1 > 0 && (
              <Tooltip
                title={job.cities
                  .slice(1)
                  .map((item) => item.name_city)
                  .join(', ')}
              >
                <Typography ml={1}>
                  {'  '}+ {job.cities.length - 1}
                </Typography>
              </Tooltip>
            )}
          </Grid>
          <Grid
            item
            lg={4}
            md={4}
            sm={6}
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AttachMoneyOutlined
              sx={{
                color: theme.palette.grey[600],
              }}
            />
            <Typography
              sx={{
                color: theme.palette.grey[600],
                [theme.breakpoints.down('sm')]: {
                  display: 'none',
                },
              }}
            >
              Lương:
            </Typography>
            <Typography>{job?.name_range}</Typography>
          </Grid>
          <Grid
            item
            lg={4}
            md={4}
            sm={6}
            xs={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <HourglassBottomOutlined
              sx={{
                color: theme.palette.grey[600],
              }}
            />
            <Typography
              sx={{
                color: theme.palette.grey[600],
                [theme.breakpoints.down('sm')]: {
                  display: 'none',
                },
              }}
            >
              Hạn nộp:
            </Typography>
            <Typography>
              {moment(job?.deadline).format('DD-MM-YYYY')}{' '}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box position="absolute" top="2px" right="10px">
        {checkIsSaveJob(savedList, job.id_job) ? (
          <IconButton onClick={handleOnUnSaved}>
            <FavoriteRounded
              sx={{
                color: theme.palette.primary.main,
              }}
            />
          </IconButton>
        ) : (
          <IconButton onClick={handleOnSave}>
            <FavoriteBorderOutlined />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};
